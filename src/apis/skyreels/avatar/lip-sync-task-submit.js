/**
 * Lip Sync Task Submit API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/skyreels/avatar/lip-sync-task-submit')

/**
 * Lip Sync Task Submit API类
 */
class LipSyncTaskSubmit extends BaseAPI {
  /**
   * 创建Lip Sync Task Submit API实例
   * @param {object} service - Skyreels服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'lip-sync'
    this.endpoint = '/video/retalking/submit'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    const apiParams = {
      api_key: this.service.getApiKey(),
      video_url: params.video_url,
      audio_url: params.audio_url
    }

    if (params.reference_char_url) {
      apiParams.reference_char_url = params.reference_char_url
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

module.exports = LipSyncTaskSubmit
