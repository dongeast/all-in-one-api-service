/**
 * 文本类共用参数
 */

const { textPrompt } = require('../templates')

module.exports = {
  input: {
    prompt: {
      ...textPrompt.prompt,
      description: 'Input text/prompt',
      maxLength: 128000
    },

    maxTokens: {
      type: 'number',
      required: false,
      description: 'Maximum output token count',
      min: 1,
      max: 128000,
      integer: true,
      default: 4096
    },

    temperature: {
      type: 'number',
      required: false,
      description: 'Temperature parameter (controls randomness)',
      min: 0,
      max: 2,
      default: 1
    },

    topP: {
      type: 'number',
      required: false,
      description: 'Top-p sampling parameter',
      min: 0,
      max: 1,
      default: 1
    },

    topK: {
      type: 'number',
      required: false,
      description: 'Top-k sampling parameter',
      min: 1,
      integer: true
    },

    stop: {
      type: 'array',
      required: false,
      description: 'Stop sequences',
      itemSchema: {
        type: 'string'
      }
    },

    stream: {
      type: 'boolean',
      required: false,
      description: 'Whether to stream output',
      default: false
    }
  },

  output: {
    text: {
      type: 'string',
      description: 'Generated text',
      path: 'choices[0].message.content'
    },

    finishReason: {
      type: 'string',
      description: 'Finish reason',
      path: 'choices[0].finish_reason'
    },

    usage: {
      type: 'object',
      description: 'Token usage',
      path: 'usage',
      fields: {
        promptTokens: { path: 'prompt_tokens' },
        completionTokens: { path: 'completion_tokens' },
        totalTokens: { path: 'total_tokens' }
      }
    },

    created: {
      type: 'number',
      description: 'Creation timestamp',
      path: 'created'
    },

    model: {
      type: 'string',
      description: 'Model used',
      path: 'model'
    }
  }
}
