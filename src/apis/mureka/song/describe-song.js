/**
 * Describe Song API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/mureka/song/describe-song')

/**
 * Describe Song API类
 */
class DescribeSong extends BaseAPI {
  /**
   * 创建Describe Song API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'song-describe'
    this.endpoint = '/song/describe'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return {
      url: params.url
    }
  }

  /**
   * 调用API
   * @param {object} params - API参数
   * @param {object} options - 调用选项
   * @returns {Promise<any>} API响应
   */
  async callAPI(params, options) {
    return await this.service.call(this.endpoint, params, options)
  }
}

module.exports = DescribeSong
