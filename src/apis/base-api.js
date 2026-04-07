/**
 * API基类
 * 所有API的基类实现
 */

const { generateId, formatError } = require('../utils/helpers')
const { createLogger } = require('../utils/logger')
const BaseParam = require('../params/base-param')
const ParamConfigManager = require('../params/param-config-manager')

/**
 * API基类
 */
class BaseAPI {
  /**
   * 创建API实例
   * @param {object} service - 服务提供商实例
   * @param {object} paramSchema - 参数模式
   */
  constructor(service, paramSchema = null) {
    this.service = service
    this.param = paramSchema ? new BaseParam(paramSchema) : new BaseParam()
    this.logger = service.logger || createLogger({ level: 'INFO' })
    this.apiName = this.constructor.name
    this.configManager = new ParamConfigManager()
  }

  /**
   * 执行API调用
   * @param {object} inputParams - 输入参数
   * @param {object} options - 执行选项
   * @returns {Promise<object>} API结果
   */
  async execute(inputParams = {}, options = {}) {
    const requestId = generateId('req')
    const startTime = Date.now()

    try {
      this.logger.debug(`[${requestId}] Executing ${this.apiName}`, {
        params: this.sanitizeParams(inputParams)
      })

      const validationResult = this.param.validate(inputParams)
      if (!validationResult.valid) {
        return this.createErrorResult(
          requestId,
          'E003',
          'Parameter validation failed',
          { errors: validationResult.errors }
        )
      }

      const transformedParams = this.param.transform(inputParams)
      const apiParams = this.prepareAPIParams(transformedParams)

      const response = await this.callAPI(apiParams, options)

      const result = this.param.extractOutput(response)

      const metadata = this.buildMetadata(requestId, startTime, response)

      this.logger.debug(`[${requestId}] API call succeeded`, {
        duration: metadata.duration
      })

      return {
        success: true,
        data: result,
        metadata
      }
    } catch (error) {
      this.logger.error(`[${requestId}] API call failed`, error)

      return this.createErrorResult(
        requestId,
        error.code || 'E007',
        error.message,
        error.details || error.stack
      )
    }
  }

  /**
   * 执行流式API调用
   * @param {object} inputParams - 输入参数
   * @param {object} options - 执行选项
   * @yields {object} 流式响应数据块
   */
  async *executeStream(inputParams = {}, options = {}) {
    const requestId = generateId('req')
    const startTime = Date.now()

    try {
      this.logger.debug(`[${requestId}] Executing ${this.apiName} (stream)`, {
        params: this.sanitizeParams(inputParams)
      })

      const validationResult = this.param.validate(inputParams)
      if (!validationResult.valid) {
        yield {
          success: false,
          error: {
            code: 'E003',
            message: 'Parameter validation failed',
            details: { errors: validationResult.errors }
          },
          metadata: {
            requestId,
            timestamp: startTime,
            provider: this.service.providerName
          }
        }
        return
      }

      const transformedParams = this.param.transform(inputParams)
      const apiParams = this.prepareAPIParams(transformedParams)

      const stream = this.callStreamAPI(apiParams, options)
      let chunkCount = 0

      for await (const chunk of stream) {
        chunkCount++
        
        const processedChunk = this.processStreamChunk(chunk)
        
        if (processedChunk) {
          yield {
            success: true,
            data: processedChunk,
            metadata: {
              requestId,
              timestamp: Date.now(),
              provider: this.service.providerName,
              model: this.getModelName(),
              chunkIndex: chunkCount,
              isStream: true
            }
          }
        }
      }

      this.logger.debug(`[${requestId}] Stream completed`, {
        duration: Date.now() - startTime,
        chunkCount
      })
    } catch (error) {
      this.logger.error(`[${requestId}] Stream failed`, error)
      
      yield {
        success: false,
        error: {
          code: error.code || 'E007',
          message: error.message,
          details: error.details || error.stack
        },
        metadata: {
          requestId,
          timestamp: Date.now(),
          provider: this.service.providerName
        }
      }
    }
  }

  /**
   * 调用流式API
   * @param {object} params - API参数
   * @param {object} options - 调用选项
   * @returns {AsyncGenerator} 流式响应
   */
  async *callStreamAPI(params, options) {
    yield* this.service.callStream(this.endpoint, params, options)
  }

  /**
   * 处理流式数据块
   * @param {object} chunk - 原始数据块
   * @returns {object|null} 处理后的数据块
   */
  processStreamChunk(chunk) {
    return chunk
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return params
  }

  /**
   * 调用API
   * @param {object} params - API参数
   * @param {object} options - 调用选项
   * @returns {Promise<any>} API响应
   */
  async callAPI(params, options) {
    throw new Error('callAPI must be implemented by subclass')
  }

  /**
   * 构建元数据
   * @param {string} requestId - 请求ID
   * @param {number} startTime - 开始时间
   * @param {any} response - API响应
   * @returns {object} 元数据
   */
  buildMetadata(requestId, startTime, response) {
    return {
      requestId,
      timestamp: startTime,
      duration: Date.now() - startTime,
      provider: this.service.providerName,
      model: this.getModelName()
    }
  }

  /**
   * 获取模型名称
   * @returns {string} 模型名称
   */
  getModelName() {
    return this.modelName || 'unknown'
  }

  /**
   * 创建错误结果
   * @param {string} requestId - 请求ID
   * @param {string} code - 错误码
   * @param {string} message - 错误消息
   * @param {any} details - 错误详情
   * @returns {object} 错误结果
   */
  createErrorResult(requestId, code, message, details) {
    return {
      success: false,
      error: {
        code,
        message,
        details
      },
      metadata: {
        requestId,
        timestamp: Date.now(),
        provider: this.service.providerName
      }
    }
  }

  /**
   * 验证参数
   * @param {object} params - 参数对象
   * @returns {{valid: boolean, errors: string[]}} 验证结果
   */
  validateParams(params) {
    return this.param.validate(params)
  }

  /**
   * 获取完整参数模式
   * @returns {object} 参数模式
   */
  getParamSchema() {
    return this.param.getSchema()
  }

  /**
   * 获取输入参数结构
   * @returns {object} 输入参数模式
   */
  getInputSchema() {
    return this.param.getInputSchema()
  }

  /**
   * 获取输出结果结构
   * @returns {object} 输出结果模式
   */
  getOutputSchema() {
    return this.param.getOutputSchema()
  }

  /**
   * 获取简化输入参数信息
   * @returns {Array} 参数信息列表
   */
  getInputInfo() {
    return this.param.getInputInfo()
  }

  /**
   * 获取简化输出结果信息
   * @returns {Array} 输出信息列表
   */
  getOutputInfo() {
    return this.param.getOutputInfo()
  }

  /**
   * 获取单个参数详情
   * @param {string} paramName - 参数名
   * @returns {object|null} 参数详情
   */
  getParamDetail(paramName) {
    return this.param.getParamDetail(paramName)
  }

  /**
   * 获取参数配置（统一接口）
   * @param {object} context - 当前参数上下文
   * @returns {object} 参数配置
   */
  getParamConfig(context = {}) {
    const schema = this.param.getSchema()
    schema.apiName = this.apiName
    schema.modelName = this.getModelName()
    
    return this.configManager.getParamConfig(
      schema,
      context,
      this.param.modelCapabilities
    )
  }

  /**
   * 验证参数并返回建议（统一接口）
   * @param {object} params - 参数对象
   * @returns {object} 验证结果
   */
  validateParamsWithContext(params) {
    const validationResult = this.param.validate(params)
    const config = this.getParamConfig(params)
    
    return {
      valid: validationResult.valid,
      errors: validationResult.errors.map(error => ({
        message: error,
        suggestions: this.getSuggestions(error, params)
      })),
      state: config.state
    }
  }

  /**
   * 获取错误建议
   * @param {string} error - 错误信息
   * @param {object} params - 参数对象
   * @returns {object} 建议信息
   */
  getSuggestions(error, params) {
    const suggestions = {}
    
    if (error.includes('时长') && error.includes('超出允许范围')) {
      if (params.model && params.resolution && params.fps) {
        const config = this.getParamConfig(params)
        const durationParam = config.parameters.find(p => p.name === 'duration')
        if (durationParam) {
          suggestions.durationRange = {
            min: durationParam.min,
            max: durationParam.max
          }
          
          const fpsParam = config.parameters.find(p => p.name === 'fps')
          if (fpsParam && fpsParam.options) {
            suggestions.suggestedFPS = fpsParam.options.filter(fps => {
              const testParams = { ...params, fps }
              const testConfig = this.getParamConfig(testParams)
              const testDuration = testConfig.parameters.find(p => p.name === 'duration')
              return testDuration && testDuration.max >= params.duration
            })
          }
        }
      }
    }
    
    return suggestions
  }

  /**
   * 获取模型参数选项
   * @param {string} model - 模型名称（可选）
   * @returns {object|null} 参数选项
   */
  getModelParamOptions(model) {
    if (!this.param.modelCapabilities) {
      return null
    }

    if (model) {
      return this.param.modelCapabilities[model] || null
    }

    return this.param.modelCapabilities
  }

  /**
   * 获取可用的参数选项（根据上下文）
   * @param {string} model - 模型名称
   * @param {object} context - 上下文参数
   * @returns {object|null} 可用选项
   */
  getAvailableOptions(model, context = {}) {
    return this.param.getAvailableOptions(model, context)
  }

  /**
   * 生成参数文档
   * @param {string} format - 文档格式 (markdown, json, html)
   * @returns {string} 文档内容
   */
  generateDocs(format = 'markdown') {
    const inputInfo = this.getInputInfo()
    const outputInfo = this.getOutputInfo()

    switch (format) {
      case 'json':
        return JSON.stringify({
          api: this.apiName,
          model: this.getModelName(),
          input: inputInfo,
          output: outputInfo
        }, null, 2)

      case 'markdown':
        return this.generateMarkdownDocs(inputInfo, outputInfo)

      case 'html':
        return this.generateHTMLDocs(inputInfo, outputInfo)

      default:
        return this.generateMarkdownDocs(inputInfo, outputInfo)
    }
  }

  /**
   * 生成Markdown文档
   * @param {Array} inputInfo - 输入参数信息
   * @param {Array} outputInfo - 输出参数信息
   * @returns {string} Markdown文档
   */
  generateMarkdownDocs(inputInfo, outputInfo) {
    let doc = `# ${this.apiName}\n\n`
    doc += `Model: ${this.getModelName()}\n\n`

    doc += `## Input Parameters\n\n`
    doc += `| Name | Type | Required | Default | Description |\n`
    doc += `|------|------|----------|---------|-------------|\n`

    inputInfo.forEach(param => {
      doc += `| ${param.name} | ${param.type} | ${param.required ? 'Yes' : 'No'} | ${param.default || '-'} | ${param.description || '-'} |\n`
    })

    doc += `\n## Output Fields\n\n`
    doc += `| Name | Type | Description |\n`
    doc += `|------|------|-------------|\n`

    outputInfo.forEach(field => {
      doc += `| ${field.name} | ${field.type} | ${field.description || '-'} |\n`
    })

    return doc
  }

  /**
   * 生成HTML文档
   * @param {Array} inputInfo - 输入参数信息
   * @param {Array} outputInfo - 输出参数信息
   * @returns {string} HTML文档
   */
  generateHTMLDocs(inputInfo, outputInfo) {
    let html = `<h1>${this.apiName}</h1>\n`
    html += `<p>Model: ${this.getModelName()}</p>\n`

    html += `<h2>Input Parameters</h2>\n`
    html += `<table>\n`
    html += `<tr><th>Name</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr>\n`

    inputInfo.forEach(param => {
      html += `<tr>`
      html += `<td>${param.name}</td>`
      html += `<td>${param.type}</td>`
      html += `<td>${param.required ? 'Yes' : 'No'}</td>`
      html += `<td>${param.default || '-'}</td>`
      html += `<td>${param.description || '-'}</td>`
      html += `</tr>\n`
    })

    html += `</table>\n`

    html += `<h2>Output Fields</h2>\n`
    html += `<table>\n`
    html += `<tr><th>Name</th><th>Type</th><th>Description</th></tr>\n`

    outputInfo.forEach(field => {
      html += `<tr>`
      html += `<td>${field.name}</td>`
      html += `<td>${field.type}</td>`
      html += `<td>${field.description || '-'}</td>`
      html += `</tr>\n`
    })

    html += `</table>\n`

    return html
  }

  /**
   * 清理敏感参数（用于日志）
   * @param {object} params - 参数对象
   * @returns {object} 清理后的参数
   */
  sanitizeParams(params) {
    return this.service.sanitizeParams(params)
  }
}

module.exports = BaseAPI
