/**
 * Create Speech API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/mureka/tts/create-speech')

/**
 * Create Speech API类
 */
class CreateSpeech extends BaseAPI {
  /**
   * 创建Create Speech API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'tts-generate'
    this.endpoint = '/tts/generate'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    const apiParams = {
      text: params.text
    }

    if (params.voice) {
      apiParams.voice = params.voice
    }
    
    if (params.voice_id) {
      apiParams.voice_id = params.voice_id
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

module.exports = CreateSpeech
