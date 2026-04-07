/**
 * Retake Video Section API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/ltx/video/retake-video-section')

/**
 * Retake Video Section API类
 */
class RetakeVideoSection extends BaseAPI {
  /**
   * 创建Retake Video Section API实例
   * @param {object} service - LTX服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'retake_video_section_task'
    this.endpoint = '/v1/retake'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    const apiParams = {
      video_uri: params.video_uri,
      start_time: params.start_time,
      duration: params.duration
    }

    if (params.prompt !== undefined) {
      apiParams.prompt = params.prompt
    }

    if (params.mode !== undefined) {
      apiParams.mode = params.mode
    }

    if (params.resolution !== undefined) {
      apiParams.resolution = params.resolution
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

module.exports = RetakeVideoSection
