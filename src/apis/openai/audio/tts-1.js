/**
 * TTS-1 API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/openai/audio/tts-1')

/**
 * TTS-1 API类
 */
class TTS1 extends BaseAPI {
  /**
   * 创建TTS-1 API实例
   * @param {object} service - OpenAI服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'tts-1'
    this.endpoint = '/audio/speech'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return {
      model: this.modelName,
      input: params.prompt,
      voice: params.voice || 'alloy',
      response_format: params.format || 'mp3',
      speed: params.speed || 1.0
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

module.exports = TTS1
