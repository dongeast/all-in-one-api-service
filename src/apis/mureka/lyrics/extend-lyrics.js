/**
 * Extend Lyrics API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/mureka/lyrics/extend-lyrics')

/**
 * Extend Lyrics API类
 */
class ExtendLyrics extends BaseAPI {
  /**
   * 创建Extend Lyrics API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'lyrics-extend'
    this.endpoint = '/lyrics/extend'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return {
      lyrics: params.lyrics
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

module.exports = ExtendLyrics
