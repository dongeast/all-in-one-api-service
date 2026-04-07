/**
 * Video Restyling Task Submission API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/skyreels/video/video-restyling-task-submission')

/**
 * Video Restyling Task Submission API类
 */
class VideoRestylingTaskSubmission extends BaseAPI {
  /**
   * 创建Video Restyling Task Submission API实例
   * @param {object} service - Skyreels服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'video-restyling'
    this.endpoint = '/video/styletransfer/submit'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return {
      api_key: this.service.getApiKey(),
      video_url: params.video_url,
      style_name: params.style_name
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

module.exports = VideoRestylingTaskSubmission
