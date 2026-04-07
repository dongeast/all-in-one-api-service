/**
 * GPT-4 流式API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/openai/text/gpt-4')

/**
 * GPT-4 流式API类
 */
class GPT4Stream extends BaseAPI {
  /**
   * 创建GPT-4流式API实例
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
    return {
      model: this.modelName,
      messages: params.messages,
      temperature: params.temperature || 1,
      top_p: params.topP,
      n: params.n || 1,
      stream: true,
      stop: params.stop,
      max_tokens: params.maxTokens,
      presence_penalty: params.presencePenalty,
      frequency_penalty: params.frequencyPenalty,
      user: params.user
    }
  }

  /**
   * 处理流式数据块
   * @param {object} chunk - 原始数据块
   * @returns {object|null} 处理后的数据块
   */
  processStreamChunk(chunk) {
    if (!chunk || !chunk.choices || chunk.choices.length === 0) {
      return null
    }

    const choice = chunk.choices[0]
    const delta = choice.delta || {}

    if (choice.finish_reason) {
      return {
        content: '',
        finishReason: choice.finish_reason,
        done: true,
        usage: chunk.usage
      }
    }

    return {
      content: delta.content || '',
      role: delta.role,
      finishReason: null,
      done: false
    }
  }

  /**
   * 执行流式聊天
   * @param {object} inputParams - 输入参数
   * @param {object} options - 执行选项
   * @yields {object} 流式响应数据块
   */
  async *chat(inputParams = {}, options = {}) {
    yield* this.executeStream(inputParams, options)
  }

  /**
   * 执行流式聊天并收集完整响应
   * @param {object} inputParams - 输入参数
   * @param {object} options - 执行选项
   * @returns {Promise<object>} 完整响应
   */
  async chatComplete(inputParams = {}, options = {}) {
    let fullContent = ''
    let finishReason = null
    let usage = null
    const requestId = generateId('req')
    const startTime = Date.now()

    try {
      for await (const chunk of this.executeStream(inputParams, options)) {
        if (!chunk.success) {
          return chunk
        }

        if (chunk.data.content) {
          fullContent += chunk.data.content
        }

        if (chunk.data.finishReason) {
          finishReason = chunk.data.finishReason
        }

        if (chunk.data.usage) {
          usage = chunk.data.usage
        }
      }

      return {
        success: true,
        data: {
          content: fullContent,
          role: 'assistant',
          finishReason,
          usage
        },
        metadata: {
          requestId,
          timestamp: startTime,
          duration: Date.now() - startTime,
          provider: this.service.providerName,
          model: this.modelName
        }
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: error.code || 'E007',
          message: error.message,
          details: error.details || error.stack
        },
        metadata: {
          requestId,
          timestamp: Date.now(),
          provider: this.service.providerName
        }
      }
    }
  }
}

const { generateId } = require('../../../utils/helpers')

module.exports = GPT4Stream
