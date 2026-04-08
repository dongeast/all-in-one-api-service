/**
 * Generate Lyrics API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/mureka/lyrics/generate-lyrics')

/**
 * Generate Lyrics API类
 */
class GenerateLyrics extends BaseAPI {
  /**
   * 创建Generate Lyrics API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'lyrics-generate'
    this.endpoint = '/lyrics/generate'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return {
      prompt: params.prompt
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

module.exports = GenerateLyrics
