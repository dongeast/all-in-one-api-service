/**
 * Google Gemini 服务实现
 */

const BaseService = require('./base-service')
const { getConfigManager } = require('../config')

/**
 * Google Gemini 服务类
 */
class GeminiService extends BaseService {
  /**
   * 创建 Gemini 服务实例
   * @param {object} config - 服务配置
   */
  constructor(config = {}) {
    super(config)
    this.providerName = 'gemini'
  }

  /**
   * 初始化服务
   * @returns {Promise<void>}
   */
  async initialize() {
    if (this.initialized) {
      return
    }

    if (!this.config.apiKey && !this.config.skipConfigLoad) {
      const configManager = getConfigManager()
      const providerConfig = await configManager.getProviderConfig('gemini')
      this.config = BaseService.mergeConfig(providerConfig, this.config)
    }

    await super.initialize()
  }

  /**
   * 构建完整URL
   * @param {string} endpoint - API端点
   * @returns {string} 完整URL
   */
  buildURL(endpoint) {
    const baseURL = this.getBaseURL()
    const apiKey = this.getApiKey()

    if (endpoint.startsWith('http')) {
      return endpoint
    }

    const separator = endpoint.includes('?') ? '&' : '?'
    return `${baseURL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}${separator}key=${apiKey}`
  }

  /**
   * 获取请求头
   * @returns {object} 请求头
   */
  getHeaders() {
    return {
      ...super.getHeaders()
    }
  }

  /**
   * 调用 API 端点
   * @param {string} endpoint - API端点
   * @param {object} params - 请求参数
   * @param {object} options - 请求选项
   * @returns {Promise<any>} 响应结果
   */
  async call(endpoint, params = {}, options = {}) {
    const result = await super.call(endpoint, params, options)

    if (result.error) {
      const error = new Error(result.error.message)
      error.code = result.error.code
      error.details = result.error
      throw error
    }

    return result
  }

  /**
   * 获取提供商信息
   * @returns {object} 提供商信息
   */
  getProviderInfo() {
    return {
      ...super.getProviderInfo(),
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
}

module.exports = GeminiService
