/**
 * Vidu 服务实现
 * Vidu AI 视频生成平台
 */

const BaseService = require('./base-service')

/**
 * Vidu 服务类
 * 所有视频生成接口均为异步调用，需要通过任务ID查询生成结果
 */
class ViduService extends BaseService {
  /**
   * 创建 Vidu 服务实例
   * @param {object} config - 服务配置
   */
  constructor(config = {}) {
    super(config)
    this.providerName = 'vidu'
  }

  /**
   * 获取请求头
   * Vidu 使用 Token 认证方式
   * @returns {object} 请求头
   */
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.getApiKey()}`,
      ...this.config.headers
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
    const finalEndpoint = endpoint.replace('{task_id}', taskId)
    return await this.call(finalEndpoint, {}, { method: 'GET', ...options })
  }

  /**
   * 取消任务
   * @param {string} endpoint - API端点
   * @param {string} taskId - 任务ID
   * @param {object} options - 请求选项
   * @returns {Promise<object>} 取消结果
   */
  async cancelTask(endpoint, taskId, options = {}) {
    const finalEndpoint = endpoint.replace('{task_id}', taskId)
    return await this.call(finalEndpoint, {}, { method: 'POST', ...options })
  }

  /**
   * 等待任务完成
   * @param {string} endpoint - 查询端点
   * @param {string} taskId - 任务ID
   * @param {object} options - 等待选项
   * @returns {Promise<object>} 任务结果
   */
  async waitForTask(endpoint, taskId, options = {}) {
    const {
      interval = 2000,
      maxAttempts = 300,
      successStatus = 'success',
      failedStatus = ['failed', 'cancelled']
    } = options

    for (let i = 0; i < maxAttempts; i++) {
      const task = await this.queryTask(endpoint, taskId)

      if (task.state === successStatus) {
        return task
      }

      if (failedStatus.includes(task.state)) {
        const error = new Error(task.failed_reason || 'Task failed')
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
}

module.exports = ViduService
