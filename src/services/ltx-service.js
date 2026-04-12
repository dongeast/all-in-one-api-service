/**
 * LTX 服务实现
 */

const BaseService = require('./base-service')

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
}

module.exports = LTXService
