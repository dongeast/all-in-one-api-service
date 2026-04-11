/**
 * Create Speech 参数定义
 */

const murekaCommon = require('../mureka-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    text: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: true,
      description: 'Text to convert to speech',
      maxLength: 500
    },

    voice: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: 'Voice selection',
      options: ['Ethan', 'Victoria', 'Jake', 'Luna', 'Emma'],
      mutuallyExclusiveWith: ['voice_id']
    },

    voice_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Custom voice ID (via files/upload API)',
      mutuallyExclusiveWith: ['voice']
    }
  },

  mutuallyExclusive: [
    ['voice', 'voice_id']
  ],

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
