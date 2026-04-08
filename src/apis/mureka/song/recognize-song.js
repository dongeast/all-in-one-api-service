/**
 * Recognize Song API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/mureka/song/recognize-song')

/**
 * Recognize Song API类
 */
class RecognizeSong extends BaseAPI {
  /**
   * 创建Recognize Song API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'song-recognize'
    this.endpoint = '/song/recognize'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return {
      upload_audio_id: params.upload_audio_id
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

module.exports = RecognizeSong
