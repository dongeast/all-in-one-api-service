/**
 * GPT-4 API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/openai/text/gpt-4')

/**
 * GPT-4 API类
 */
class GPT4 extends BaseAPI {
  /**
   * 创建GPT-4 API实例
   * @param {object} service - OpenAI服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'gpt-4'
    this.endpoint = '/chat/completions'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    const apiParams = {
      model: this.modelName,
      messages: params.messages || [{ role: 'user', content: params.prompt }],
      max_tokens: params.maxTokens,
      temperature: params.temperature,
      top_p: params.topP,
      stream: params.stream || false
    }

    if (params.presencePenalty !== undefined) {
      apiParams.presence_penalty = params.presencePenalty
    }
    if (params.frequencyPenalty !== undefined) {
      apiParams.frequency_penalty = params.frequencyPenalty
    }
    if (params.stop) {
      apiParams.stop = params.stop
    }
    if (params.user) {
      apiParams.user = params.user
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

module.exports = GPT4
