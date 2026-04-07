/**
 * Flux API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/replicate/image/flux')

/**
 * Flux API类
 */
class Flux extends BaseAPI {
  /**
   * 创建Flux API实例
   * @param {object} service - Replicate服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'black-forest-labs/flux-schnell'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return {
      prompt: params.prompt,
      aspect_ratio: params.aspectRatio || '1:1',
      num_inference_steps: params.numInferenceSteps || 28,
      guidance_scale: params.guidanceScale || 3.5,
      output_format: params.outputFormat || 'webp',
      output_quality: params.outputQuality || 80,
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

module.exports = Flux
