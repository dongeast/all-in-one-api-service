/**
 * Extend Video Duration API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/ltx/video/extend-video-duration')

/**
 * Extend Video Duration API类
 */
class ExtendVideoDuration extends BaseAPI {
  /**
   * 创建Extend Video Duration API实例
   * @param {object} service - LTX服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'extend_video_duration_task'
    this.endpoint = '/v1/extend'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    const apiParams = {
      video_uri: params.video_uri,
      duration: params.duration
    }

    if (params.prompt !== undefined) {
      apiParams.prompt = params.prompt
    }

    if (params.mode !== undefined) {
      apiParams.mode = params.mode
    }

    if (params.model !== undefined) {
      apiParams.model = params.model
    }

    if (params.context !== undefined) {
      apiParams.context = params.context
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

module.exports = ExtendVideoDuration
