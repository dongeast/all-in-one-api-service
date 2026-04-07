/**
 * Sora API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/openai/video/sora')

/**
 * Sora API类
 */
class Sora extends BaseAPI {
  /**
   * 创建Sora API实例
   * @param {object} service - OpenAI服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'sora'
    this.endpoint = '/videos/generations'
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
      duration: params.duration || 5,
      aspect_ratio: params.aspectRatio || '16:9'
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

module.exports = Sora
