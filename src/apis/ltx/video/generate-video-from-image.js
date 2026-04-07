/**
 * Generate Video from Image API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/ltx/video/generate-video-from-image')

/**
 * Generate Video from Image API类
 */
class GenerateVideoFromImage extends BaseAPI {
  /**
   * 创建Generate Video from Image API实例
   * @param {object} service - LTX服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'generate_video_from_image_task'
    this.endpoint = '/v1/image-to-video'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    const apiParams = {
      image_uri: params.image_uri,
      prompt: params.prompt,
      model: params.model,
      duration: params.duration,
      resolution: params.resolution
    }

    if (params.fps !== undefined) {
      apiParams.fps = params.fps
    }

    if (params.generate_audio !== undefined) {
      apiParams.generate_audio = params.generate_audio
    }

    if (params.last_frame_uri !== undefined) {
      apiParams.last_frame_uri = params.last_frame_uri
    }

    if (params.camera_motion !== undefined) {
      apiParams.camera_motion = params.camera_motion
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

module.exports = GenerateVideoFromImage
