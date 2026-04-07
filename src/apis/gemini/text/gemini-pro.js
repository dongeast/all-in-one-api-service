/**
 * Gemini Pro API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/gemini/text/gemini-pro')

/**
 * Gemini Pro API类
 */
class GeminiPro extends BaseAPI {
  /**
   * 创建Gemini Pro API实例
   * @param {object} service - Gemini服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'gemini-pro'
    this.endpoint = '/models/gemini-pro:generateContent'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    const contents = params.contents || [
      {
        role: 'user',
        parts: [{ text: params.prompt }]
      }
    ]

    const apiParams = {
      contents
    }

    if (params.generationConfig) {
      apiParams.generationConfig = params.generationConfig
    } else {
      apiParams.generationConfig = {
        temperature: params.temperature,
        topP: params.topP,
        topK: params.topK,
        maxOutputTokens: params.maxTokens
      }
    }

    if (params.safetySettings) {
      apiParams.safetySettings = params.safetySettings
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

module.exports = GeminiPro
