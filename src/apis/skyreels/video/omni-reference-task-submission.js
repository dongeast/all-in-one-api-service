/**
 * Omni Reference Task Submission API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/skyreels/video/omni-reference-task-submission')

/**
 * Omni Reference Task Submission API类
 */
class OmniReferenceTaskSubmission extends BaseAPI {
  /**
   * 创建Omni Reference Task Submission API实例
   * @param {object} service - Skyreels服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'omni-reference'
    this.endpoint = '/video/omni-video/submit'
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
      duration: params.duration || 5,
      sound: params.sound || false,
      prompt_optimizer: params.prompt_optimizer !== false,
      mode: params.mode || 'std'
    }

    if (params.aspect_ratio) {
      apiParams.aspect_ratio = params.aspect_ratio
    }

    if (params.ref_images) {
      apiParams.ref_images = params.ref_images
    }

    if (params.ref_videos) {
      apiParams.ref_videos = params.ref_videos
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

module.exports = OmniReferenceTaskSubmission
