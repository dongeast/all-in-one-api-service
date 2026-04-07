/**
 * 文本类共用参数
 */

const { textPrompt } = require('../templates')

module.exports = {
  input: {
    prompt: {
      ...textPrompt.prompt,
      description: '输入文本/提示词',
      maxLength: 128000
    },

    maxTokens: {
      type: 'number',
      required: false,
      description: '最大输出token数',
      min: 1,
      max: 128000,
      integer: true,
      default: 4096
    },

    temperature: {
      type: 'number',
      required: false,
      description: '温度参数（控制随机性）',
      min: 0,
      max: 2,
      default: 1
    },

    topP: {
      type: 'number',
      required: false,
      description: 'Top-p采样参数',
      min: 0,
      max: 1,
      default: 1
    },

    topK: {
      type: 'number',
      required: false,
      description: 'Top-k采样参数',
      min: 1,
      integer: true
    },

    stop: {
      type: 'array',
      required: false,
      description: '停止序列',
      itemSchema: {
        type: 'string'
      }
    },

    stream: {
      type: 'boolean',
      required: false,
      description: '是否流式输出',
      default: false
    }
  },

  output: {
    text: {
      type: 'string',
      description: '生成的文本',
      path: 'choices[0].message.content'
    },

    finishReason: {
      type: 'string',
      description: '结束原因',
      path: 'choices[0].finish_reason'
    },

    usage: {
      type: 'object',
      description: 'Token使用情况',
      path: 'usage',
      fields: {
        promptTokens: { path: 'prompt_tokens' },
        completionTokens: { path: 'completion_tokens' },
        totalTokens: { path: 'total_tokens' }
      }
    },

    created: {
      type: 'number',
      description: '创建时间戳',
      path: 'created'
    },

    model: {
      type: 'string',
      description: '使用的模型',
      path: 'model'
    }
  }
}
