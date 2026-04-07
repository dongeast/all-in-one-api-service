/**
 * Claude 3 Opus API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/anthropic/text/claude-3-opus')

/**
 * Claude 3 Opus API类
 */
class Claude3Opus extends BaseAPI {
  /**
   * 创建Claude 3 Opus API实例
   * @param {object} service - Anthropic服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'claude-3-opus-20240229'
    this.endpoint = '/messages'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    const apiParams = {
      model: this.modelName,
      max_tokens: params.maxTokens,
      messages: params.messages || [{ role: 'user', content: params.prompt }]
    }

    if (params.system) {
      apiParams.system = params.system
    }
    if (params.temperature !== undefined) {
      apiParams.temperature = params.temperature
    }
    if (params.topP !== undefined) {
      apiParams.top_p = params.topP
    }
    if (params.topK !== undefined) {
      apiParams.top_k = params.topK
    }
    if (params.stop) {
      apiParams.stop_sequences = params.stop
    }
    if (params.stream) {
      apiParams.stream = params.stream
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

module.exports = Claude3Opus
