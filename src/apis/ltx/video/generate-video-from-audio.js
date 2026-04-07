/**
 * Generate Video from Audio API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/ltx/video/generate-video-from-audio')

/**
 * Generate Video from Audio API类
 */
class GenerateVideoFromAudio extends BaseAPI {
  /**
   * 创建Generate Video from Audio API实例
   * @param {object} service - LTX服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'generate_video_from_audio_task'
    this.endpoint = '/v1/audio-to-video'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    const apiParams = {
      audio_uri: params.audio_uri
    }

    if (params.image_uri !== undefined) {
      apiParams.image_uri = params.image_uri
    }

    if (params.prompt !== undefined) {
      apiParams.prompt = params.prompt
    }

    if (params.resolution !== undefined) {
      apiParams.resolution = params.resolution
    }

    if (params.guidance_scale !== undefined) {
      apiParams.guidance_scale = params.guidance_scale
    }

    if (params.model !== undefined) {
      apiParams.model = params.model
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

module.exports = GenerateVideoFromAudio
