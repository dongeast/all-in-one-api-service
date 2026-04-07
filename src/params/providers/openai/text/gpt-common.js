/**
 * GPT 系列共用参数
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
            options: ['system', 'user', 'assistant']
          },
          content: {
            type: 'string'
          }
        }
      }
    },

    presencePenalty: {
      type: 'number',
      required: false,
      description: '存在惩罚',
      min: -2,
      max: 2,
      default: 0
    },

    frequencyPenalty: {
      type: 'number',
      required: false,
      description: '频率惩罚',
      min: -2,
      max: 2,
      default: 0
    },

    logitBias: {
      type: 'object',
      required: false,
      description: 'Logit偏置'
    },

    user: {
      type: 'string',
      required: false,
      description: '用户标识'
    }
  },

  output: textCommon.output
}
