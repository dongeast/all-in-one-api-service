/**
 * Segmented Camera Motion Task Submit API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/skyreels/avatar/segmented-camera-motion-task-submit')

/**
 * Segmented Camera Motion Task Submit API类
 */
class SegmentedCameraMotionTaskSubmit extends BaseAPI {
  /**
   * 创建Segmented Camera Motion Task Submit API实例
   * @param {object} service - Skyreels服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'segmented-camera-motion'
    this.endpoint = '/video/audio2video/camera/submit'
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
      audios: params.audios,
      mode: params.mode || 'std'
    }

    if (params.traj_type) {
      apiParams.traj_type = params.traj_type
      apiParams.camera_control_strength = params.camera_control_strength || 0.8
    }

    if (params.camera_control_pro) {
      apiParams.camera_control_pro = params.camera_control_pro
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

module.exports = SegmentedCameraMotionTaskSubmit
