/**
 * Reference to Video Task Submission API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/skyreels/video/reference-to-video-task-submission')

/**
 * Reference to Video Task Submission API类
 */
class ReferenceToVideoTaskSubmission extends BaseAPI {
  /**
   * 创建Reference to Video Task Submission API实例
   * @param {object} service - Skyreels服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'reference-to-video'
    this.endpoint = '/video/multiobject/submit'
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
      ref_images: params.ref_images,
      duration: params.duration || 5,
      aspect_ratio: params.aspect_ratio || '16:9'
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

module.exports = ReferenceToVideoTaskSubmission
