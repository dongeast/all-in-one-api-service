/**
 * Skyreels 服务实现
 */

const BaseService = require('./base-service')

/**
 * Skyreels 服务类
 */
class SkyreelsService extends BaseService {
  /**
   * 创建 Skyreels 服务实例
   * @param {object} config - 服务配置
   */
  constructor(config = {}) {
    super(config)
    this.providerName = 'skyreels'
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
   * 提交异步任务
   * @param {string} endpoint - API端点
   * @param {object} params - 请求参数
   * @param {object} options - 请求选项
   * @returns {Promise<object>} 任务提交结果
   */
  async submitTask(endpoint, params = {}, options = {}) {
    const taskParams = {
      ...params,
      api_key: this.getApiKey()
    }

    return await this.call(endpoint, taskParams, options)
  }

  /**
   * 查询任务状态
   * @param {string} endpoint - API端点
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
   * @param {string} endpoint - 查询端点
   * @param {string} taskId - 任务ID
   * @param {object} options - 等待选项
   * @returns {Promise<object>} 任务结果
   */
  async waitForTask(endpoint, taskId, options = {}) {
    const { interval = 2000, maxAttempts = 300 } = options

    for (let i = 0; i < maxAttempts; i++) {
      const task = await this.queryTask(endpoint, taskId)

      if (task.status === 'succeeded' || task.code === 200 && task.data) {
        return task
      }

      if (task.status === 'failed') {
        const error = new Error(task.msg || 'Task failed')
        error.code = 'TASK_FAILED'
        error.details = task
        throw error
      }

      if (task.status === 'unknown') {
        const error = new Error('Task status unknown')
        error.code = 'TASK_UNKNOWN'
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
    const error = new Error(errorData.msg || errorData.message || `HTTP ${statusCode}`)
    error.code = errorData.code || `HTTP_${statusCode}`
    error.statusCode = statusCode
    error.details = errorData
    return error
  }
}

module.exports = SkyreelsService
