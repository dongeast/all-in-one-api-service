/**
 * DALL-E 3 API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/openai/image/dall-e-3')

/**
 * DALL-E 3 API类
 */
class DallE3 extends BaseAPI {
  /**
   * 创建DALL-E 3 API实例
   * @param {object} service - OpenAI服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'dall-e-3'
    this.endpoint = '/images/generations'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return {
      model: this.modelName,
      prompt: params.prompt,
      size: params.size || '1024x1024',
      quality: params.quality || 'standard',
      style: params.style || 'vivid',
      response_format: params.responseFormat || 'url',
      user: params.user
    }
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

module.exports = DallE3
