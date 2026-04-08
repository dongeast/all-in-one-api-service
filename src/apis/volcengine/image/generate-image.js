/**
 * 火山引擎图像生成API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/volcengine/image/generate-image')

/**
 * 火山引擎图像生成API类
 */
class GenerateImage extends BaseAPI {
  /**
   * 创建火山引擎图像生成API实例
   * @param {object} service - 火山引擎服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'volcengine-image'
    this.endpoint = '/images/generations'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    const apiParams = {
      model: params.model,
      prompt: params.prompt
    }

    if (params.size) {
      apiParams.size = params.size
    } else if (params.width && params.height) {
      apiParams.size = `${params.width}x${params.height}`
    }

    if (params.image !== undefined) {
      apiParams.image = params.image
    }

    if (params.seed !== undefined && params.seed !== -1) {
      apiParams.seed = params.seed
    }

    if (params.sequential_image_generation !== undefined) {
      apiParams.sequential_image_generation = params.sequential_image_generation
    }

    if (params.sequential_image_generation_options !== undefined) {
      apiParams.sequential_image_generation_options = params.sequential_image_generation_options
    }

    if (params.stream !== undefined) {
      apiParams.stream = params.stream
    }

    if (params.guidance_scale !== undefined) {
      apiParams.guidance_scale = params.guidance_scale
    }

    if (params.output_format !== undefined) {
      apiParams.output_format = params.output_format
    }

    if (params.response_format !== undefined) {
      apiParams.response_format = params.response_format
    }

    if (params.watermark !== undefined) {
      apiParams.watermark = params.watermark
    }

    if (params.optimize_prompt_options !== undefined) {
      apiParams.optimize_prompt_options = params.optimize_prompt_options
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

module.exports = GenerateImage
