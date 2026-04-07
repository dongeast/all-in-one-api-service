/**
 * LTX 服务实现
 */

const BaseService = require('./base-service')
const { getConfigManager } = require('../config')

/**
 * LTX 服务类
 */
class LTXService extends BaseService {
  /**
   * 创建 LTX 服务实例
   * @param {object} config - 服务配置
   */
  constructor(config = {}) {
    super(config)
    this.providerName = 'ltx'
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
      const providerConfig = configManager.getProviderConfig('ltx')
      
      this.config = BaseService.mergeConfig(providerConfig, this.config)
    }

    await super.initialize()
  }

  /**
   * 获取API密钥
   * @returns {string|null} API密钥
   */
  getApiKey() {
    return this.config.apiKey || this.config.apiToken || null
  }

  /**
   * 获取请求头
   * @returns {object} 请求头
   */
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getApiKey()}`,
      ...this.config.headers
    }
  }

  /**
   * 解析响应
   * LTX API 成功时返回视频二进制流，失败时返回 JSON 错误信息
   * @param {Response} response - fetch响应对象
   * @returns {Promise<any>} 解析后的数据
   */
  async parseResponse(response) {
    const contentType = response.headers.get('content-type')

    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    }

    const buffer = await response.arrayBuffer()
    return {
      video: Buffer.from(buffer),
      contentType: contentType || 'video/mp4'
    }
  }

  /**
   * 创建错误对象
   * @param {number} statusCode - HTTP状态码
   * @param {object} errorData - 错误数据
   * @returns {Error} 错误对象
   */
  createError(statusCode, errorData) {
    const error = new Error(
      errorData.error?.message || 
      errorData.message || 
      `HTTP ${statusCode}`
    )
    error.code = errorData.error?.type || errorData.code || `HTTP_${statusCode}`
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

module.exports = LTXService
