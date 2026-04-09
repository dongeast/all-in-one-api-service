/**
 * 火山引擎服务实现
 */

const BaseService = require('./base-service')
const { getConfigManager } = require('../config')

/**
 * 火山引擎服务类
 */
class VolcengineService extends BaseService {
  /**
   * 创建火山引擎服务实例
   * @param {object} config - 服务配置
   */
  constructor(config = {}) {
    super(config)
    this.providerName = 'volcengine'
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
      const providerConfig = await configManager.getProviderConfig('volcengine')
      
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
      ...super.getHeaders(),
      'Authorization': `Bearer ${this.getApiKey()}`
    }
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
   * @param {string} endpoint - API端点
   * @param {string} taskId - 任务ID
   * @param {object} options - 请求选项
   * @returns {Promise<object>} 任务状态
   */
  async queryTask(endpoint, taskId, options = {}) {
    const finalEndpoint = endpoint.replace('{id}', taskId)
    return await this.call(finalEndpoint, {}, { method: 'GET', ...options })
  }

  /**
   * 查询任务列表
   * @param {string} endpoint - API端点
   * @param {object} queryParams - 查询参数
   * @param {object} options - 请求选项
   * @returns {Promise<object>} 任务列表
   */
  async queryTaskList(endpoint, queryParams = {}, options = {}) {
    const queryString = Object.entries(queryParams)
      .filter(([_key, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&')
    
    const finalEndpoint = queryString ? `${endpoint}?${queryString}` : endpoint
    return await this.call(finalEndpoint, {}, { method: 'GET', ...options })
  }

  /**
   * 取消或删除任务
   * @param {string} endpoint - API端点
   * @param {string} taskId - 任务ID
   * @param {object} options - 请求选项
   * @returns {Promise<void>}
   */
  async cancelDeleteTask(endpoint, taskId, options = {}) {
    const finalEndpoint = endpoint.replace('{id}', taskId)
    return await this.call(finalEndpoint, {}, { method: 'DELETE', ...options })
  }

  /**
   * 等待任务完成
   * @param {string} endpoint - 查询端点
   * @param {string} taskId - 任务ID
   * @param {object} options - 等待选项
   * @returns {Promise<object>} 任务结果
   */
  async waitForTask(endpoint, taskId, options = {}) {
    const { interval = 2000, maxAttempts = 300 } = options

    for (let i = 0; i < maxAttempts; i++) {
      const task = await this.queryTask(endpoint, taskId)

      if (task.status === 'succeeded') {
        return task
      }

      if (task.status === 'failed') {
        const error = new Error(task.error?.message || 'Task failed')
        error.code = 'TASK_FAILED'
        error.details = task
        throw error
      }

      if (task.status === 'cancelled') {
        const error = new Error('Task was cancelled')
        error.code = 'TASK_CANCELLED'
        error.details = task
        throw error
      }

      if (task.status === 'expired') {
        const error = new Error('Task expired')
        error.code = 'TASK_EXPIRED'
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
    error.code = errorData.error?.code || errorData.code || `HTTP_${statusCode}`
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

module.exports = VolcengineService
