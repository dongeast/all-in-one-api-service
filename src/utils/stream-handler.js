/**
 * 流式响应处理器
 * 用于处理SSE(Server-Sent Events)流式响应
 */

const { createLogger } = require('./logger')

/**
 * SSE事件类型
 */
const SSE_EVENT_TYPES = {
  MESSAGE: 'message',
  ERROR: 'error',
  DONE: 'done'
}

/**
 * 流式处理器类
 */
class StreamHandler {
  /**
   * 创建流式处理器实例
   * @param {object} options - 处理器选项
   */
  constructor(options = {}) {
    this.logger = options.logger || createLogger({ level: 'INFO' })
    this.buffer = ''
    this.encoding = options.encoding || 'utf-8'
  }

  /**
   * 解析SSE数据块
   * @param {string} chunk - 数据块
   * @returns {Array<object>} 解析后的事件列表
   */
  parseSSEChunk(chunk) {
    this.buffer += chunk
    const events = []
    const lines = this.buffer.split('\n')
    
    this.buffer = lines.pop() || ''

    let currentEvent = null

    for (const line of lines) {
      if (line.trim() === '') {
        if (currentEvent) {
          events.push(currentEvent)
          currentEvent = null
        }
        continue
      }

      if (!currentEvent) {
        currentEvent = { type: 'message', data: '' }
      }

      if (line.startsWith('event:')) {
        currentEvent.type = line.substring(6).trim()
      } else if (line.startsWith('data:')) {
        currentEvent.data += (currentEvent.data ? '\n' : '') + line.substring(5).trim()
      } else if (line.startsWith('id:')) {
        currentEvent.id = line.substring(3).trim()
      } else if (line.startsWith('retry:')) {
        currentEvent.retry = parseInt(line.substring(6).trim(), 10)
      }
    }

    return events
  }

  /**
   * 解析JSON数据
   * @param {string} data - JSON字符串
   * @returns {object|null} 解析后的对象
   */
  parseJSON(data) {
    if (!data || data.trim() === '') {
      return null
    }

    try {
      return JSON.parse(data)
    } catch (error) {
      this.logger.warn('Failed to parse JSON data', { data, error: error.message })
      return { raw: data }
    }
  }

  /**
   * 处理流式响应
   * @param {ReadableStream} stream - 可读流
   * @param {object} callbacks - 回调函数
   * @param {Function} callbacks.onData - 数据回调
   * @param {Function} callbacks.onError - 错误回调
   * @param {Function} callbacks.onDone - 完成回调
   * @returns {Promise<void>}
   */
  async handleStream(stream, callbacks = {}) {
    const { onError, onDone } = callbacks
    const reader = stream.getReader()
    const decoder = new TextDecoder(this.encoding)

    try {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          if (this.buffer.trim()) {
            const events = this.parseSSEChunk('\n')
            for (const event of events) {
              await this.processEvent(event, callbacks)
            }
          }
          break
        }

        const chunk = decoder.decode(value, { stream: true })
        const events = this.parseSSEChunk(chunk)

        for (const event of events) {
          await this.processEvent(event, callbacks)
        }
      }

      if (onDone) {
        await onDone()
      }
    } catch (error) {
      this.logger.error('Stream handling error', error)
      if (onError) {
        await onError(error)
      }
      throw error
    } finally {
      reader.releaseLock()
    }
  }

  /**
   * 处理单个SSE事件
   * @param {object} event - SSE事件
   * @param {object} callbacks - 回调函数
   * @returns {Promise<void>}
   */
  async processEvent(event, callbacks) {
    const { onData, onError, onDone } = callbacks

    if (event.type === 'error' || event.data?.includes('[ERROR]')) {
      const error = new Error(event.data || 'Stream error')
      if (onError) {
        await onError(error)
      }
      return
    }

    if (event.data === '[DONE]' || event.type === 'done') {
      if (onDone) {
        await onDone()
      }
      return
    }

    const parsedData = this.parseJSON(event.data)
    
    if (parsedData && onData) {
      await onData(parsedData, event)
    }
  }

  /**
   * 重置缓冲区
   */
  reset() {
    this.buffer = ''
  }
}

/**
 * 创建流式处理器
 * @param {object} options - 处理器选项
 * @returns {StreamHandler} 流式处理器实例
 */
function createStreamHandler(options = {}) {
  return new StreamHandler(options)
}

/**
 * OpenAI流式响应解析器
 * @param {object} data - OpenAI流式数据
 * @returns {object} 解析后的数据
 */
function parseOpenAIStreamData(data) {
  if (!data || !data.choices || data.choices.length === 0) {
    return null
  }

  const choice = data.choices[0]
  const delta = choice.delta || {}

  return {
    content: delta.content || '',
    role: delta.role,
    finishReason: choice.finish_reason,
    index: choice.index,
    usage: data.usage
  }
}

/**
 * Anthropic流式响应解析器
 * @param {object} data - Anthropic流式数据
 * @returns {object} 解析后的数据
 */
function parseAnthropicStreamData(data) {
  if (!data) {
    return null
  }

  return {
    type: data.type,
    content: data.delta?.text || '',
    message: data.message,
    usage: data.usage
  }
}

module.exports = {
  StreamHandler,
  SSE_EVENT_TYPES,
  createStreamHandler,
  parseOpenAIStreamData,
  parseAnthropicStreamData
}
