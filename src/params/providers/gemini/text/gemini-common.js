/**
 * Gemini 系列共用参数
 */

const textCommon = require('../../../common/text-common')

module.exports = {
  input: {
    ...textCommon.input,

    contents: {
      type: 'array',
      required: true,
      description: '内容列表',
      itemSchema: {
        type: 'object',
        properties: {
          role: {
            type: 'enum',
            options: ['user', 'model']
          },
          parts: {
            type: 'array',
            itemSchema: {
              type: 'object',
              properties: {
                text: { type: 'string' }
              }
            }
          }
        }
      }
    },

    safetySettings: {
      type: 'array',
      required: false,
      description: '安全设置'
    },

    generationConfig: {
      type: 'object',
      required: false,
      description: '生成配置'
    }
  },

  output: {
    text: {
      type: 'string',
      description: '生成的文本',
      path: 'candidates[0].content.parts[0].text'
    },

    finishReason: {
      type: 'string',
      description: '结束原因',
      path: 'candidates[0].finishReason'
    },

    safetyRatings: {
      type: 'array',
      description: '安全评级',
      path: 'candidates[0].safetyRatings'
    }
  }
}
