/**
 * Stable Video API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/replicate/video/stable-video')

/**
 * Stable Video API类
 */
class StableVideo extends BaseAPI {
  /**
   * 创建Stable Video API实例
   * @param {object} service - Replicate服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'stability-ai/stable-video-diffusion'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return {
      input: params.prompt,
      fps: params.fps || 6,
      motion_bucket_id: params.motionBucketId || 127,
      cond_aug: params.condAug || 0.02,
      decoding_t: params.decodingT || 14,
      seed: params.seed
    }
  }

  /**
   * 调用API
   * @param {object} params - API参数
   * @param {object} options - 调用选项
   * @returns {Promise<any>} API响应
   */
  async callAPI(params, options) {
    const prediction = await this.service.createPrediction(this.modelName, params, options)
    const result = await this.service.waitForPrediction(prediction.id, options)
    return result
  }
}

module.exports = StableVideo
