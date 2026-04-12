/**
 * Mureka 服务实现
 */

const BaseService = require('./base-service')

/**
 * Mureka 服务类
 */
class MurekaService extends BaseService {
  /**
   * 创建 Mureka 服务实例
   * @param {object} config - 服务配置
   */
  constructor(config = {}) {
    super(config)
    this.providerName = 'mureka'
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
}

module.exports = MurekaService
