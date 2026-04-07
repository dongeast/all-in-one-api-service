/**
 * Stable Diffusion XL API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/stability/image/stable-diffusion-xl')

/**
 * Stable Diffusion XL API类
 */
class StableDiffusionXL extends BaseAPI {
  /**
   * 创建Stable Diffusion XL API实例
   * @param {object} service - Stability服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'stable-diffusion-xl-1024-v1-0'
    this.endpoint = '/generation/stable-diffusion-xl-1024-v1-0/text-to-image'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    const apiParams = {
      text_prompts: [
        {
          text: params.prompt,
          weight: 1
        }
      ],
      cfg_scale: params.cfgScale || 7,
      height: params.height || 1024,
      width: params.width || 1024,
      samples: params.numOutputs || 1,
      steps: params.steps || 30
    }

    if (params.negativePrompt) {
      apiParams.text_prompts.push({
        text: params.negativePrompt,
        weight: -1
      })
    }

    if (params.seed !== undefined) {
      apiParams.seed = params.seed
    }
    if (params.stylePreset) {
      apiParams.style_preset = params.stylePreset
    }
    if (params.sampler) {
      apiParams.sampler = params.sampler
    }
    if (params.clipGuidancePreset) {
      apiParams.clip_guidance_preset = params.clipGuidancePreset
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

module.exports = StableDiffusionXL
