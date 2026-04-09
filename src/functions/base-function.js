/**
 * Function 基类
 * 所有 Function 的基类实现
 * 作为核心执行层，从API Registry获取API定义，调用Service层执行请求
 */

const { generateId } = require('../utils/helpers')
const { createLogger } = require('../utils/logger')
const apiRegistry = require('../registry/api-registry')

/**
 * Function 基类
 */
class BaseFunction {
  /**
   * 创建 Function 实例
   * @param {object} service - 服务提供商实例
   * @param {object} metadata - Function 元数据
   */
  constructor(service, metadata) {
    this.service = service
    this.metadata = metadata
    this.logger = service.logger || createLogger({ level: 'INFO' })
    this.functionName = metadata.name
  }

  /**
   * 判断是否为异步 Function
   * @returns {boolean} 是否异步
   */
  isAsync() {
    return this.metadata.type === 'async'
  }

  /**
   * 获取API定义
   * @param {string} apiType - API类型（'request' 或 'query'）
   * @returns {object|null} API定义
   */
  getAPIDefinition(apiType) {
    const apiName = this.metadata.apis?.[apiType]
    if (!apiName) {
      return null
    }

    if (typeof apiName === 'string') {
      return apiRegistry.get(apiName)
    }

    return null
  }

  /**
   * 发起请求
   * @param {object} params - 输入参数
   * @param {object} options - 执行选项
   * @returns {Promise<object>} 请求结果
   */
  async request(params = {}, options = {}) {
    const requestId = generateId('req')
    const startTime = Date.now()

    try {
      this.logger.debug(`[${requestId}] Executing function ${this.functionName}`, {
        params: this.sanitizeParams(params)
      })

      const apiDefinition = this.getAPIDefinition('request')
      if (!apiDefinition) {
        throw new Error(`Request API not found for function ${this.functionName}`)
      }

      const { endpoint, method = 'POST' } = apiDefinition
      if (!endpoint) {
        throw new Error(`Endpoint not defined for API ${apiDefinition.name}`)
      }

      const result = await this.service.call(endpoint, params, { ...options, method })

      this.logger.debug(`[${requestId}] Function request completed`, {
        duration: Date.now() - startTime,
        isAsync: this.isAsync()
      })

      return result
    } catch (error) {
      this.logger.error(`[${requestId}] Function request failed`, error)
      throw error
    }
  }

  /**
   * 获取结果（异步时使用）
   * @param {string} taskId - 任务ID
   * @param {object} options - 执行选项
   * @returns {Promise<object>} 查询结果
   */
  async response(taskId, options = {}) {
    if (!this.isAsync()) {
      throw new Error(`Function ${this.functionName} is not async, use request() instead`)
    }

    const apiDefinition = this.getAPIDefinition('query')
    if (!apiDefinition) {
      throw new Error(`Query API not found for function ${this.functionName}`)
    }

    const { endpoint, method = 'GET' } = apiDefinition
    if (!endpoint) {
      throw new Error(`Endpoint not defined for API ${apiDefinition.name}`)
    }

    return await this.service.queryTask(endpoint, taskId, { ...options, method })
  }

  /**
   * 获取任务状态（异步时使用）
   * @param {string} taskId - 任务ID
   * @param {object} options - 执行选项
   * @returns {Promise<object>} 状态信息
   */
  async getStatus(taskId, options = {}) {
    const result = await this.response(taskId, options)
    
    if (!result.success) {
      return {
        success: false,
        status: 'error',
        error: result.error
      }
    }

    const status = result.data.status || 'unknown'
    
    return {
      success: true,
      status,
      taskId: result.data.id,
      createdAt: result.data.created_at,
      finishedAt: result.data.finished_at,
      model: result.data.model,
      failedReason: result.data.failed_reason
    }
  }

  /**
   * 等待任务完成（异步时使用）
   * @param {string} taskId - 任务ID
   * @param {object} options - 等待选项
   * @returns {Promise<object>} 最终结果
   */
  async waitForCompletion(taskId, options = {}) {
    if (!this.isAsync()) {
      throw new Error(`Function ${this.functionName} is not async, use request() instead`)
    }

    const {
      pollInterval = 2000,
      maxAttempts = 100,
      onProgress = null
    } = options

    let attempts = 0

    while (attempts < maxAttempts) {
      attempts++

      const statusResult = await this.getStatus(taskId)
      
      if (onProgress) {
        onProgress({
          attempt: attempts,
          maxAttempts,
          status: statusResult.status
        })
      }

      if (statusResult.status === 'completed' || statusResult.status === 'success') {
        return await this.response(taskId)
      }

      if (statusResult.status === 'failed' || statusResult.status === 'error') {
        const result = await this.response(taskId)
        throw new Error(
          `Task ${taskId} failed: ${result.data?.failed_reason || 'Unknown error'}`
        )
      }

      await this.sleep(pollInterval)
    }

    throw new Error(
      `Task ${taskId} did not complete within ${maxAttempts} attempts (${maxAttempts * pollInterval / 1000}s)`
    )
  }

  /**
   * 执行完整流程（自动处理同步/异步）
   * @param {object} params - 输入参数
   * @param {object} options - 执行选项
   * @returns {Promise<object>} 最终结果
   */
  async execute(params = {}, options = {}) {
    const requestResult = await this.request(params, options)

    if (!requestResult.success) {
      return requestResult
    }

    if (!this.isAsync()) {
      return requestResult
    }

    const taskId = requestResult.data.id
    if (!taskId) {
      throw new Error('Async function did not return task ID')
    }

    const waitOptions = {
      pollInterval: options.pollInterval || 2000,
      maxAttempts: options.maxAttempts || 100,
      onProgress: options.onProgress
    }

    return await this.waitForCompletion(taskId, waitOptions)
  }

  /**
   * 执行流式请求
   * @param {object} params - 输入参数
   * @param {object} options - 执行选项
   * @yields {object} 流式响应数据块
   */
  async *executeStream(params = {}, options = {}) {
    const requestId = generateId('req')
    const startTime = Date.now()

    try {
      this.logger.debug(`[${requestId}] Executing function ${this.functionName} (stream)`, {
        params: this.sanitizeParams(params)
      })

      const apiDefinition = this.getAPIDefinition('request')
      if (!apiDefinition) {
        throw new Error(`Request API not found for function ${this.functionName}`)
      }

      const { endpoint, method = 'POST' } = apiDefinition
      if (!endpoint) {
        throw new Error(`Endpoint not defined for API ${apiDefinition.name}`)
      }

      yield* this.service.callStream(endpoint, params, { ...options, method })

      this.logger.debug(`[${requestId}] Stream completed`, {
        duration: Date.now() - startTime
      })
    } catch (error) {
      this.logger.error(`[${requestId}] Stream failed`, error)
      throw error
    }
  }

  /**
   * 获取 Function 元数据
   * @param {string} language - 语言代码（可选）
   * @returns {object} 元数据
   */
  getMetadata(language) {
    const metadata = { ...this.metadata }
    
    if (language) {
      const { getTranslatedFunctionMetadata } = require('../utils/function-i18n')
      const translated = getTranslatedFunctionMetadata(
        this.metadata.provider,
        this.functionName,
        language,
        this.metadata
      )
      metadata.displayName = translated.displayName
      metadata.description = translated.description
    }

    return metadata
  }

  /**
   * 获取输入参数模式
   * 优先从API层获取，保持向后兼容
   * @param {string} methodName - 方法名称（可选，默认为 'request'）
   * @returns {object} 输入参数模式
   */
  getInputSchema(methodName = 'request') {
    const apiType = methodName === 'execute' ? 'request' : methodName
    const apiDefinition = this.getAPIDefinition(apiType)
    
    if (apiDefinition && apiDefinition.paramSchema) {
      return apiDefinition.paramSchema.input || {}
    }
    
    if (this.metadata.methods && this.metadata.methods[methodName]) {
      return this.metadata.methods[methodName].input || {}
    }
    
    return this.metadata.inputSchema || {}
  }

  /**
   * 获取输出结果模式
   * 优先从API层获取，保持向后兼容
   * @param {string} methodName - 方法名称（可选，默认为 'request'）
   * @returns {object} 输出结果模式
   */
  getOutputSchema(methodName = 'request') {
    const apiType = methodName === 'execute' ? 'request' : methodName
    const apiDefinition = this.getAPIDefinition(apiType)
    
    if (apiDefinition && apiDefinition.paramSchema) {
      return apiDefinition.paramSchema.output || {}
    }
    
    if (this.metadata.methods && this.metadata.methods[methodName]) {
      return this.metadata.methods[methodName].output || {}
    }
    
    return this.metadata.outputSchema || {}
  }

  /**
   * 获取方法定义
   * @param {string} methodName - 方法名称
   * @returns {object|null} 方法定义
   */
  getMethodDefinition(methodName) {
    if (this.metadata.methods && this.metadata.methods[methodName]) {
      return this.metadata.methods[methodName]
    }
    return null
  }

  /**
   * 获取方法输入定义
   * @param {string} methodName - 方法名称
   * @returns {object} 输入定义
   */
  getMethodInput(methodName) {
    const methodDef = this.getMethodDefinition(methodName)
    return methodDef ? methodDef.input || {} : {}
  }

  /**
   * 获取方法输出定义
   * @param {string} methodName - 方法名称
   * @returns {object} 输出定义
   */
  getMethodOutput(methodName) {
    const methodDef = this.getMethodDefinition(methodName)
    return methodDef ? methodDef.output || {} : {}
  }

  /**
   * 获取所有方法列表
   * @returns {Array<string>} 方法名称列表
   */
  getAvailableMethods() {
    if (this.metadata.methods) {
      return Object.keys(this.metadata.methods)
    }
    return ['request', 'execute']
  }

  /**
   * 获取方法描述
   * @param {string} methodName - 方法名称
   * @returns {string} 方法描述
   */
  getMethodDescription(methodName) {
    const methodDef = this.getMethodDefinition(methodName)
    return methodDef ? methodDef.description || '' : ''
  }

  /**
   * 获取支持的模型列表
   * @returns {Array<string>} 模型列表
   */
  getSupportedModels() {
    return this.metadata.models || []
  }

  /**
   * 获取参数配置（统一接口）
   * @param {object} context - 当前参数上下文
   * @returns {object} 参数配置
   */
  getParamConfig(context = {}) {
    const apiDefinition = this.getAPIDefinition('request')
    if (apiDefinition && apiDefinition.paramSchema) {
      const ParamConfigManager = require('../params/param-config-manager')
      const configManager = new ParamConfigManager()
      return configManager.getParamConfig(
        apiDefinition.paramSchema,
        context,
        null
      )
    }
    
    return this.service.getParamConfig ? 
      this.service.getParamConfig(this.functionName, context) : 
      null
  }

  /**
   * 验证参数
   * @param {object} params - 参数对象
   * @returns {object} 验证结果
   */
  validateParams(params) {
    const apiDefinition = this.getAPIDefinition('request')
    if (apiDefinition && apiDefinition.paramSchema) {
      const BaseParam = require('../params/base-param')
      const param = new BaseParam(apiDefinition.paramSchema)
      return param.validate(params)
    }
    
    return this.service.validateParams ? 
      this.service.validateParams(this.functionName, params) : 
      { valid: true, errors: [] }
  }

  /**
   * 清理敏感参数（用于日志）
   * @param {object} params - 参数对象
   * @returns {object} 清理后的参数
   */
  sanitizeParams(params) {
    return this.service.sanitizeParams(params)
  }

  /**
   * 延迟函数
   * @param {number} ms - 毫秒数
   * @returns {Promise<void>}
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

module.exports = BaseFunction
