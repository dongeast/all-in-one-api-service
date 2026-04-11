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
      description: 'Dialogue content array',
      maxItems: 10,
      minItems: 1,
      itemSchema: {
        type: ParamType.OBJECT,
        properties: {
          text: {
            type: ParamType.STRING,
            elementType: ElementType.TEXTAREA,
            required: true,
            description: 'Dialogue text content'
          },
          voice: {
            type: ParamType.ENUM,
            elementType: ElementType.SELECT,
            required: true,
            description: 'Voice selection',
            options: ['Ethan', 'Victoria', 'Jake', 'Luna', 'Emma']
          }
        }
      }
    }
  },

  output: {
    url: {
      type: 'string',
      description: 'Audio file URL',
      path: 'url'
    },

    expires_at: {
      type: 'number',
      description: 'URL expiration timestamp (seconds)',
      path: 'expires_at'
    }
  }
}
