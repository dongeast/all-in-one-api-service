/**
 * Whisper-1 API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/openai/audio/whisper-1')

/**
 * Whisper-1 API类
 */
class Whisper1 extends BaseAPI {
  /**
   * 创建Whisper-1 API实例
   * @param {object} service - OpenAI服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'whisper-1'
    this.endpoint = '/audio/transcriptions'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    const apiParams = {
      model: this.modelName,
      file: params.file
    }

    if (params.language) {
      apiParams.language = params.language
    }
    if (params.prompt) {
      apiParams.prompt = params.prompt
    }
    if (params.responseFormat) {
      apiParams.response_format = params.responseFormat
    }
    if (params.temperature !== undefined) {
      apiParams.temperature = params.temperature
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
    return await this.service.call(this.endpoint, params, {
      ...options,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

module.exports = Whisper1
