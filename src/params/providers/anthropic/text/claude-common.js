/**
 * Claude 系列共用参数
 */

const textCommon = require('../../../common/text-common')

module.exports = {
  input: {
    ...textCommon.input,

    messages: {
      type: 'array',
      required: true,
      description: '消息列表',
      itemSchema: {
        type: 'object',
        properties: {
          role: {
            type: 'enum',
            options: ['user', 'assistant']
          },
          content: {
            type: 'string'
          }
        }
      }
    },

    system: {
      type: 'string',
      required: false,
      description: '系统提示词',
      maxLength: 100000
    },

    maxTokens: {
      type: 'number',
      required: true,
      description: '最大输出token数',
      min: 1,
      max: 4096,
      integer: true
    }
  },

  output: {
    text: {
      type: 'string',
      description: '生成的文本',
      path: 'content[0].text'
    },

    finishReason: {
      type: 'string',
      description: '结束原因',
      path: 'stop_reason'
    },

    role: {
      type: 'string',
      description: '角色',
      path: 'role'
    },

    usage: {
      type: 'object',
      description: 'Token使用情况',
      path: 'usage',
      fields: {
        inputTokens: { path: 'input_tokens' },
        outputTokens: { path: 'output_tokens' }
      }
    },

    model: {
      type: 'string',
      description: '使用的模型',
      path: 'model'
    }
  }
}
