/**
 * Shot Switching Video Extension Task Submission API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/skyreels/video/shot-switching-video-extension-task-submission')

/**
 * Shot Switching Video Extension Task Submission API类
 */
class ShotSwitchingVideoExtensionTaskSubmission extends BaseAPI {
  /**
   * 创建Shot Switching Video Extension Task Submission API实例
   * @param {object} service - Skyreels服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'shot-switching-video-extension'
    this.endpoint = '/video/extension/cutshot/submit'
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
      prefix_video: params.prefix_video,
      duration: params.duration || 5,
      cut_type: params.cut_type || 'Auto'
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

module.exports = ShotSwitchingVideoExtensionTaskSubmission
