/**
 * Stable Image Core API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/stability/image/stable-image-core')

/**
 * Stable Image Core API类
 */
class StableImageCore extends BaseAPI {
  /**
   * 创建Stable Image Core API实例
   * @param {object} service - Stability服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'stable-image-core'
    this.endpoint = '/generation/stable-image-core/text-to-image'
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
      aspect_ratio: params.aspectRatio || '1:1',
      output_format: params.outputFormat || 'png'
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

module.exports = StableImageCore
