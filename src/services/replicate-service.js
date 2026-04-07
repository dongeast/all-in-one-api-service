/**
 * Replicate 服务实现
 */

const BaseService = require('./base-service')
const { getConfigManager } = require('../config')

/**
 * Replicate 服务类
 */
class ReplicateService extends BaseService {
  /**
   * 创建 Replicate 服务实例
   * @param {object} config - 服务配置
   */
  constructor(config = {}) {
    super(config)
    this.providerName = 'replicate'
  }

  /**
   * 初始化服务
   * @returns {Promise<void>}
   */
  async initialize() {
    if (this.initialized) {
      return
    }

    if (!this.config.apiToken && !this.config.skipConfigLoad) {
      const configManager = getConfigManager()
      const providerConfig = configManager.getProviderConfig('replicate')
      this.config = {
        ...providerConfig,
        ...this.config
      }
    }

    await super.initialize()
  }

  /**
   * 获取API密钥
   * @returns {string|null} API密钥
   */
  getApiKey() {
    return this.config.apiToken || this.config.apiKey || null
  }

  /**
   * 获取请求头
   * @returns {object} 请求头
   */
  getHeaders() {
    return {
      ...super.getHeaders(),
      'Authorization': `Token ${this.getApiKey()}`
    }
  }

  /**
   * 创建预测
   * @param {string} model - 模型标识 (owner/name)
   * @param {object} input - 输入参数
   * @param {object} options - 额外选项
   * @returns {Promise<object>} 预测结果
   */
  async createPrediction(model, input, options = {}) {
    const [owner, name] = model.split('/')
    const endpoint = '/predictions'

    const body = {
      version: options.version,
      input,
      webhook: options.webhook,
      webhook_events_filter: options.webhookEventsFilter
    }

    if (!body.version) {
      const modelInfo = await this.getModelInfo(model)
      body.version = modelInfo.latest_version?.id
    }

    return await this.call(endpoint, body)
  }

  /**
   * 获取预测状态
   * @param {string} predictionId - 预测ID
   * @returns {Promise<object>} 预测状态
   */
  async getPrediction(predictionId) {
    const endpoint = `/predictions/${predictionId}`
    return await this.call(endpoint, {}, { method: 'GET' })
  }

  /**
   * 等待预测完成
   * @param {string} predictionId - 预测ID
   * @param {object} options - 等待选项
   * @returns {Promise<object>} 预测结果
   */
  async waitForPrediction(predictionId, options = {}) {
    const { interval = 1000, maxAttempts = 300 } = options

    for (let i = 0; i < maxAttempts; i++) {
      const prediction = await this.getPrediction(predictionId)

      if (prediction.status === 'succeeded') {
        return prediction
      }

      if (prediction.status === 'failed') {
        const error = new Error(prediction.error || 'Prediction failed')
        error.code = 'PREDICTION_FAILED'
        error.details = prediction
        throw error
      }

      if (prediction.status === 'canceled') {
        const error = new Error('Prediction was canceled')
        error.code = 'PREDICTION_CANCELED'
        throw error
      }

      await new Promise(resolve => setTimeout(resolve, interval))
    }

    const error = new Error('Prediction timeout')
    error.code = 'PREDICTION_TIMEOUT'
    throw error
  }

  /**
   * 获取模型信息
   * @param {string} model - 模型标识
   * @returns {Promise<object>} 模型信息
   */
  async getModelInfo(model) {
    const endpoint = `/models/${model}`
    return await this.call(endpoint, {}, { method: 'GET' })
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

module.exports = ReplicateService
