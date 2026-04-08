/**
 * Create Podcast API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/mureka/tts/create-podcast')

/**
 * Create Podcast API类
 */
class CreatePodcast extends BaseAPI {
  /**
   * 创建Create Podcast API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'tts-podcast'
    this.endpoint = '/tts/podcast'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return {
      conversations: params.conversations
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

module.exports = CreatePodcast
