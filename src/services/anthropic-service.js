/**
 * Anthropic 服务实现
 */

const BaseService = require('./base-service')
const { getConfigManager } = require('../config')

/**
 * Anthropic 服务类
 */
class AnthropicService extends BaseService {
  /**
   * 创建 Anthropic 服务实例
   * @param {object} config - 服务配置
   */
  constructor(config = {}) {
    super(config)
    this.providerName = 'anthropic'
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
      const providerConfig = configManager.getProviderConfig('anthropic')
      this.config = {
        ...providerConfig,
        ...this.config
      }
    }

    await super.initialize()
  }

  /**
   * 获取请求头
   * @returns {object} 请求头
   */
  getHeaders() {
    return {
      ...super.getHeaders(),
      'x-api-key': this.getApiKey(),
      'anthropic-version': this.config.apiVersion || '2023-06-01'
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
      error.code = result.error.type || 'UNKNOWN_ERROR'
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

module.exports = AnthropicService
