/**
 * Multi Actor Avatar Task Submission API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/skyreels/avatar/multi-actor-avatar-task-submission')

/**
 * Multi Actor Avatar Task Submission API类
 */
class MultiActorAvatarTaskSubmission extends BaseAPI {
  /**
   * 创建Multi Actor Avatar Task Submission API实例
   * @param {object} service - Skyreels服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'multi-actor-avatar'
    this.endpoint = '/video/audio2video/multi/submit'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return {
      api_key: this.service.getApiKey(),
      prompt: params.prompt,
      first_frame_image: params.first_frame_image,
      audios: params.audios,
      bboxes: params.bboxes,
      bboxes_type: params.bboxes_type || 'face',
      mode: params.mode || 'std'
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

module.exports = MultiActorAvatarTaskSubmission
