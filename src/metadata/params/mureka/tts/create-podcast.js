/**
 * Create Podcast 参数定义
 * 支持模型: Mureka TTS Model
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    conversations: {
      type: ParamType.ARRAY,
      elementType: ElementType.DEFAULT,
      required: true,
      description: 'Conversation array',
      maxItems: 10,
      itemSchema: {
        type: ParamType.OBJECT,
        properties: {
          text: {
            type: ParamType.STRING,
            elementType: ElementType.TEXTAREA,
            required: true,
            description: 'The text content for this conversation turn'
          },
          voice: {
            type: ParamType.ENUM,
            elementType: ElementType.SELECT,
            required: true,
            description: 'The voice to use: Ethan, Victoria, Jake, Luna, Emma',
            options: ['Ethan', 'Victoria', 'Jake', 'Luna', 'Emma']
          }
        }
      }
    }
  },

  output: {
    url: {
      type: 'string',
      description: 'The URL of the audio file',
      path: 'url',
      isResultField: true
    },
    expires_at: {
      type: 'number',
      description: 'The Unix timestamp (in seconds) for when the url was expired',
      path: 'expires_at'
    }
  }
}
