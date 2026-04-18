/**
 * Service基类
 * 所有服务商的基类实现
 */

const { generateId, retry } = require('../utils/helpers')
const { createLogger } = require('../utils/logger')
const { getFetch } = require('../utils/fetch-polyfill')

/**
 * Service基类
 */
class BaseService {
  /**
   * 创建服务实例
   * @param {object} config - 服务配置
   */
  constructor(config = {}) {
    this.config = {
      apiKey: config.apiKey,
      apiToken: config.apiToken,
      baseURL: config.baseURL,
      timeout: config.timeout || 30000,
      headers: config.headers || {},
      retryCount: config.retryCount || 3,
      retryDelay: config.retryDelay || 1000,
      ...config
    }

    this.initialized = false
    this.metadataLoaded = false
    this.metadata = null
    this.logger = config.logger || createLogger({ level: 'INFO' })
    this.providerName = this.constructor.name.replace('Service', '').toLowerCase()
  }

  /**
   * 加载元数据
   * @returns {void}
   */
  loadMetadata() {
    if (this.metadataLoaded) {
      return
    }

    try {
      const { unifiedRegistry } = require('../registry')
      
      if (!unifiedRegistry.isInitialized()) {
        this.logger.warn('UnifiedRegistry not initialized, skipping metadata load')
        return
      }

      this.metadata = {
        apis: unifiedRegistry.apiRegistry.getByProvider(this.providerName),
        models: unifiedRegistry.modelRegistry.getByProvider(this.providerName),
        functions: unifiedRegistry.functionRegistry.getByProvider(this.providerName)
      }

      this.metadataLoaded = true
      this.logger.debug(`Loaded metadata for ${this.providerName}`, {
        apis: this.metadata.apis.length,
        models: this.metadata.models.length,
        functions: this.metadata.functions.length
      })
    } catch (error) {
      this.logger.warn(`Failed to load metadata for ${this.providerName}:`, error.message)
    }
  }

  /**
   * 获取 API 元数据
   * @param {string} apiName - API 名称
   * @returns {object|null} API 元数据
   */
  getAPIMetadata(apiName) {
    if (!this.metadataLoaded) {
      this.loadMetadata()
    }

    if (!this.metadata || !this.metadata.apis) {
      return null
    }

    return this.metadata.apis.find(api => api.name === apiName) || null
  }

  /**
   * 获取 Model 元数据
   * @param {string} modelName - Model 名称
   * @returns {object|null} Model 元数据
   */
  getModelMetadata(modelName) {
    if (!this.metadataLoaded) {
      this.loadMetadata()
    }

    if (!this.metadata || !this.metadata.models) {
      return null
    }

    return this.metadata.models.find(model => model.name === modelName) || null
  }

  /**
   * 获取所有 API 元数据
   * @param {object} options - 过滤选项
   * @returns {Array} API 元数据列表
   */
  getAllAPIs(options = {}) {
    if (!this.metadataLoaded) {
      this.loadMetadata()
    }

    if (!this.metadata || !this.metadata.apis) {
      return []
    }

    let apis = this.metadata.apis

    if (options.type) {
      apis = apis.filter(api => api.type === options.type)
    }

    if (options.apiType) {
      apis = apis.filter(api => api.apiType === options.apiType)
    }

    return apis
  }

  /**
   * 获取所有 Model 元数据
   * @param {object} options - 过滤选项
   * @returns {Array} Model 元数据列表
   */
  getAllModels(options = {}) {
    if (!this.metadataLoaded) {
      this.loadMetadata()
    }

    if (!this.metadata || !this.metadata.models) {
      return []
    }

    let models = this.metadata.models

    if (options.type) {
      models = models.filter(model => model.type === options.type)
    }

    return models
  }

  /**
   * 流式调用API端点
   * @param {string} endpoint - API端点
   * @param {object} params - 请求参数
   * @param {object} options - 请求选项
   * @yields {object} 流式响应数据块
   */
  async *callStream(endpoint, params = {}, options = {}) {
    await this.initialize()

    const url = this.buildURL(endpoint)
    const headers = this.getHeaders()
    const body = JSON.stringify({ ...params, stream: true })

    this.logger.debug(`Calling ${this.providerName} API (stream)`, {
      endpoint,
      params: this.sanitizeParams(params)
    })

    const controller = new AbortController()
    const timeoutId = setTimeout(
      () => controller.abort(),
      options.timeout || this.config.timeout
    )

    try {
      const fetch = getFetch()
      const response = await fetch(url, {
        method: options.method || 'POST',
        headers,
        body,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await this.parseErrorResponse(response)
        throw this.createError(response.status, errorData)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmedLine = line.trim()
          if (!trimmedLine || trimmedLine === 'data: [DONE]') continue
          
          let data = trimmedLine
          if (data.startsWith('data: ')) {
            data = data.slice(6)
          }
          
          if (data) {
            try {
              yield JSON.parse(data)
            } catch (e) {
              this.logger.warn('Failed to parse stream chunk', { line: trimmedLine })
            }
          }
        }
      }
    } finally {
      clearTimeout(timeoutId)
    }
  }

  /**
   * 合并配置（过滤掉 undefined 值）
   * @param {object} baseConfig - 基础配置（优先级低）
   * @param {object} overrideConfig - 覆盖配置（优先级高）
   * @returns {object} 合并后的配置
   */
  static mergeConfig(baseConfig = {}, overrideConfig = {}) {
    // 过滤掉 undefined 值
    const filteredOverride = {}
    Object.keys(overrideConfig).forEach(key => {
      if (overrideConfig[key] !== undefined) {
        filteredOverride[key] = overrideConfig[key]
      }
    })

    return {
      ...baseConfig,
      ...filteredOverride
    }
  }

  /**
   * 初始化服务
   * @returns {Promise<void>}
   */
  async initialize() {
    if (this.initialized) {
      return
    }

    if (!this.getApiKey() && !this.config.skipConfigLoad) {
      const { getConfigManager } = require('../config')
      const configManager = getConfigManager()
      const providerConfig = await configManager.getProviderConfig(this.providerName)
      
      this.config = BaseService.mergeConfig(providerConfig, this.config)
    }

    if (!this.getApiKey()) {
      throw new Error(`API key is required for ${this.providerName} service`)
    }

    this.loadMetadata()

    this.initialized = true
    this.logger.debug(`${this.providerName} service initialized`)
  }

  /**
   * 获取API密钥
   * @returns {string|null} API密钥
   */
  getApiKey() {
    return this.config.apiKey || this.config.apiToken || null
  }

  /**
   * 获取基础URL
   * @returns {string} 基础URL
   */
  getBaseURL() {
    return this.config.baseURL
  }

  /**
   * 获取请求头
   * @returns {object} 请求头
   */
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      ...this.config.headers
    }
  }

  /**
   * 执行带超时控制的请求
   * @param {string} url - 请求URL
   * @param {object} fetchOptions - fetch选项
   * @param {object} options - 请求选项
   * @returns {Promise<any>} 响应结果
   */
  async executeWithTimeout(url, fetchOptions, options = {}) {
    const controller = new AbortController()
    const timeoutId = setTimeout(
      () => controller.abort(),
      options.timeout || this.config.timeout
    )

    try {
      const fetch = getFetch()
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await this.parseErrorResponse(response)
        throw this.createError(response.status, errorData)
      }

      return await this.parseResponse(response)
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  }

  /**
   * 调用API端点
   * @param {string} endpoint - API端点
   * @param {object} params - 请求参数
   * @param {object} options - 请求选项
   * @returns {Promise<any>} 响应结果
   */
  async call(endpoint, params = {}, options = {}) {
    await this.initialize()

    const url = this.buildURL(endpoint)
    const headers = this.getHeaders()
    const body = JSON.stringify(params)

    this.logger.debug(`Calling ${this.providerName} API`, {
      endpoint,
      params: this.sanitizeParams(params)
    })

    const executeRequest = () => this.executeWithTimeout(url, {
      method: options.method || 'POST',
      headers,
      body: options.method === 'GET' ? undefined : body
    }, options)

    return retry(executeRequest, {
      maxRetries: options.retryCount || this.config.retryCount,
      delay: options.retryDelay || this.config.retryDelay,
      shouldRetry: (error) => this.shouldRetry(error)
    })
  }

  /**
   * 上传文件(multipart/form-data)
   * @param {string} endpoint - API端点
   * @param {FormData|object} formData - 表单数据
   * @param {object} options - 请求选项
   * @returns {Promise<any>} 响应结果
   */
  async uploadFile(endpoint, formData, options = {}) {
    await this.initialize()

    const url = this.buildURL(endpoint)
    const headers = this.getHeaders()
    
    delete headers['Content-Type']

    this.logger.debug(`Uploading file to ${this.providerName} API`, {
      endpoint
    })

    const executeRequest = () => this.executeWithTimeout(url, {
      method: 'POST',
      headers,
      body: formData
    }, options)

    return retry(executeRequest, {
      maxRetries: options.retryCount || this.config.retryCount,
      delay: options.retryDelay || this.config.retryDelay,
      shouldRetry: (error) => this.shouldRetry(error)
    })
  }

  /**
   * 提交异步任务
   * @param {string} endpoint - API端点
   * @param {object} params - 请求参数
   * @param {object} options - 请求选项
   * @returns {Promise<object>} 任务提交结果
   */
  async submitTask(endpoint, params = {}, options = {}) {
    return await this.call(endpoint, params, options)
  }

  /**
   * 查询任务状态
   * @param {string} endpoint - API端点(可包含{task_id}占位符)
   * @param {string} taskId - 任务ID
   * @param {object} options - 请求选项
   * @returns {Promise<object>} 任务状态
   */
  async queryTask(endpoint, taskId, options = {}) {
    const finalEndpoint = endpoint.replace('{task_id}', taskId)
    return await this.call(finalEndpoint, {}, { method: 'GET', ...options })
  }

  /**
   * 等待任务完成
   * @param {string} endpoint - 查询端点(可包含{task_id}占位符)
   * @param {string} taskId - 任务ID
   * @param {object} options - 等待选项
   * @returns {Promise<object>} 任务结果
   */
  async waitForTask(endpoint, taskId, options = {}) {
    const {
      interval = 2000,
      maxAttempts = 300,
      successStatus = 'succeeded',
      failedStatus = ['failed', 'timeouted', 'cancelled']
    } = options

    for (let i = 0; i < maxAttempts; i++) {
      const task = await this.queryTask(endpoint, taskId)

      if (task.status === successStatus) {
        return task
      }

      if (failedStatus.includes(task.status)) {
        const error = new Error(task.failed_reason || task.msg || 'Task failed')
        error.code = 'TASK_FAILED'
        error.details = task
        throw error
      }

      await new Promise(resolve => setTimeout(resolve, interval))
    }

    const error = new Error('Task timeout')
    error.code = 'TASK_TIMEOUT'
    throw error
  }

  /**
   * 构建完整URL
   * @param {string} endpoint - API端点
   * @returns {string} 完整URL
   */
  buildURL(endpoint) {
    const baseURL = this.getBaseURL()
    if (endpoint.startsWith('http')) {
      return endpoint
    }
    return `${baseURL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`
  }

  /**
   * 解析响应
   * @param {Response} response - fetch响应对象
   * @returns {Promise<any>} 解析后的数据
   */
  async parseResponse(response) {
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    }
    return await response.text()
  }

  /**
   * 解析错误响应
   * @param {Response} response - fetch响应对象
   * @returns {Promise<any>} 错误数据
   */
  async parseErrorResponse(response) {
    try {
      const text = await response.text()
      try {
        return JSON.parse(text)
      } catch {
        return { message: text }
      }
    } catch {
      return { message: 'Unknown error' }
    }
  }

  /**
   * 创建错误对象
   * @param {number} statusCode - HTTP状态码
   * @param {object} errorData - 错误数据
   * @returns {Error} 错误对象
   */
  createError(statusCode, errorData) {
    const error = new Error(errorData.message || errorData.error?.message || `HTTP ${statusCode}`)
    error.code = errorData.code || errorData.error?.code || `HTTP_${statusCode}`
    error.statusCode = statusCode
    error.details = errorData
    return error
  }

  /**
   * 判断是否应该重试
   * @param {Error} error - 错误对象
   * @returns {boolean} 是否应该重试
   */
  shouldRetry(error) {
    if (error.name === 'AbortError') {
      return true
    }
    if (error.statusCode) {
      return error.statusCode >= 500 || error.statusCode === 429
    }
    return false
  }

  /**
   * 健康检查
   * @returns {Promise<boolean>} 是否健康
   */
  async healthCheck() {
    try {
      await this.initialize()
      return true
    } catch {
      return false
    }
  }

  /**
   * 获取提供商信息
   * @returns {object} 提供商信息
   */
  getProviderInfo() {
    return {
      name: this.providerName,
      baseURL: this.getBaseURL(),
      initialized: this.initialized,
      metadataLoaded: this.metadataLoaded,
      apisCount: this.metadata?.apis?.length || 0,
      modelsCount: this.metadata?.models?.length || 0,
      functionsCount: this.metadata?.functions?.length || 0,
      models: this.config.models
    }
  }

  /**
   * 获取可用模型列表
   * @param {string} type - 模型类型
   * @returns {string[]} 模型列表
   */
  getAvailableModels(type) {
    if (this.config.models && this.config.models[type]) {
      return this.config.models[type].options || []
    }
    return []
  }

  /**
   * 获取默认模型
   * @param {string} type - 模型类型
   * @returns {string} 默认模型
   */
  getDefaultModel(type) {
    if (this.config.models && this.config.models[type]) {
      return this.config.models[type].default
    }
    return null
  }

  /**
   * 清理敏感参数（用于日志）
   * @param {object} params - 参数对象
   * @returns {object} 清理后的参数
   */
  sanitizeParams(params) {
    const sanitized = { ...params }
    const sensitiveKeys = ['apiKey', 'apiToken', 'password', 'secret']

    Object.keys(sanitized).forEach(key => {
      if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
        sanitized[key] = '***'
      }
    })

    return sanitized
  }

  /**
   * 生成请求ID
   * @returns {string} 请求ID
   */
  generateRequestId() {
    return generateId(this.providerName)
  }
}

module.exports = BaseService
