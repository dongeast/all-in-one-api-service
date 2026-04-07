/**
 * Image to Video Generation Task Submission API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/skyreels/video/image-to-video-generation-task-submission')

/**
 * Image to Video Generation Task Submission API类
 */
class ImageToVideoGenerationTaskSubmission extends BaseAPI {
  /**
   * 创建Image to Video Generation Task Submission API实例
   * @param {object} service - Skyreels服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'image-to-video'
    this.endpoint = '/video/image2video/submit'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    const apiParams = {
      api_key: this.service.getApiKey(),
      prompt: params.prompt,
      first_frame_image: params.first_frame_image,
      duration: params.duration || 5,
      sound: params.sound || false,
      prompt_optimizer: params.prompt_optimizer !== false,
      mode: params.mode || 'std'
    }

    if (params.end_frame_image) {
      apiParams.end_frame_image = params.end_frame_image
    }

    if (params.mid_frame_images) {
      apiParams.mid_frame_images = params.mid_frame_images
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

module.exports = ImageToVideoGenerationTaskSubmission
