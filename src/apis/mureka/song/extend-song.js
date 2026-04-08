/**
 * Extend Song API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/mureka/song/extend-song')

/**
 * Extend Song API类
 */
class ExtendSong extends BaseAPI {
  /**
   * 创建Extend Song API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'song-extend'
    this.endpoint = '/song/extend'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    const apiParams = {
      lyrics: params.lyrics,
      extend_at: params.extend_at
    }

    if (params.song_id) {
      apiParams.song_id = params.song_id
    }
    
    if (params.upload_audio_id) {
      apiParams.upload_audio_id = params.upload_audio_id
    }

    return apiParams
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

module.exports = ExtendSong
