/**
 * 火山引擎创建视频生成任务API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/volcengine/video/create-video-generation-task')

/**
 * 火山引擎创建视频生成任务API类
 */
class CreateVideoGenerationTask extends BaseAPI {
  /**
   * 创建火山引擎创建视频生成任务API实例
   * @param {object} service - 火山引擎服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'volcengine-video'
    this.endpoint = '/contents/generations/tasks'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    const apiParams = {
      model: params.model,
      content: params.content
    }

    if (params.callback_url !== undefined) {
      apiParams.callback_url = params.callback_url
    }

    if (params.return_last_frame !== undefined) {
      apiParams.return_last_frame = params.return_last_frame
    }

    if (params.service_tier !== undefined) {
      apiParams.service_tier = params.service_tier
    }

    if (params.execution_expires_after !== undefined) {
      apiParams.execution_expires_after = params.execution_expires_after
    }

    if (params.generate_audio !== undefined) {
      apiParams.generate_audio = params.generate_audio
    }

    if (params.draft !== undefined) {
      apiParams.draft = params.draft
    }

    if (params.tools !== undefined) {
      apiParams.tools = params.tools
    }

    if (params.safety_identifier !== undefined) {
      apiParams.safety_identifier = params.safety_identifier
    }

    if (params.resolution !== undefined) {
      apiParams.resolution = params.resolution
    }

    if (params.ratio !== undefined) {
      apiParams.ratio = params.ratio
    }

    if (params.duration !== undefined) {
      apiParams.duration = params.duration
    }

    if (params.frames !== undefined) {
      apiParams.frames = params.frames
    }

    if (params.seed !== undefined && params.seed !== -1) {
      apiParams.seed = params.seed
    }

    if (params.camera_fixed !== undefined) {
      apiParams.camera_fixed = params.camera_fixed
    }

    if (params.watermark !== undefined) {
      apiParams.watermark = params.watermark
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

module.exports = CreateVideoGenerationTask
