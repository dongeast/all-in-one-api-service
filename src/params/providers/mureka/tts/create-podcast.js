/**
 * Create Podcast 参数定义
 */

const murekaCommon = require('../mureka-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    conversations: {
      type: ParamType.ARRAY,
      elementType: ElementType.INPUT,
      required: true,
      description: '对话内容数组',
      maxItems: 10,
      minItems: 1,
      itemSchema: {
        type: ParamType.OBJECT,
        properties: {
          text: {
            type: ParamType.STRING,
            elementType: ElementType.TEXTAREA,
            required: true,
            description: '对话文本内容'
          },
          voice: {
            type: ParamType.ENUM,
            elementType: ElementType.SELECT,
            required: true,
            description: '语音选择',
            options: ['Ethan', 'Victoria', 'Jake', 'Luna', 'Emma']
          }
        }
      }
    }
  },

  output: {
    url: {
      type: 'string',
      description: '音频文件URL',
      path: 'url'
    },

    expires_at: {
      type: 'number',
      description: 'URL过期时间戳(秒)',
      path: 'expires_at'
    }
  }
}
