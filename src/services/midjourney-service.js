/**
 * Midjourney 服务实现
 */

const BaseService = require('./base-service')
const { getConfigManager } = require('../config')

/**
 * Midjourney 服务类
 */
class MidjourneyService extends BaseService {
  /**
   * 创建 Midjourney 服务实例
   * @param {object} config - 服务配置
   */
  constructor(config = {}) {
    super(config)
    this.providerName = 'midjourney'
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
      const providerConfig = await configManager.getProviderConfig('midjourney')
      this.config = BaseService.mergeConfig(providerConfig, this.config)
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
      'Authorization': `Bearer ${this.getApiKey()}`
    }
  }

  /**
   * 创建生成任务
   * @param {object} params - 生成参数
   * @returns {Promise<object>} 任务信息
   */
  async createTask(params) {
    const endpoint = '/imagine'
    return await this.call(endpoint, params)
  }

  /**
   * 获取任务状态
   * @param {string} taskId - 任务ID
   * @returns {Promise<object>} 任务状态
   */
  async getTaskStatus(taskId) {
    const endpoint = `/task/${taskId}`
    return await this.call(endpoint, {}, { method: 'GET' })
  }

  /**
   * 等待任务完成
   * @param {string} taskId - 任务ID
   * @param {object} options - 等待选项
   * @returns {Promise<object>} 任务结果
   */
  async waitForTask(taskId, options = {}) {
    const { interval = 5000, maxAttempts = 120 } = options

    for (let i = 0; i < maxAttempts; i++) {
      const task = await this.getTaskStatus(taskId)

      if (task.status === 'completed') {
        return task
      }

      if (task.status === 'failed') {
        const error = new Error(task.error || 'Task failed')
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

module.exports = MidjourneyService
