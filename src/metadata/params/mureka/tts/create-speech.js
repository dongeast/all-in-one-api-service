/**
 * Create Speech 参数定义
 * 支持模型: Mureka TTS Model
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    text: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: true,
      description: 'The text to generate audio for',
      maxLength: 500
    },

    voice: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: 'The voice to use when generating the audio',
      options: ['Ethan', 'Victoria', 'Jake', 'Luna', 'Emma'],
      mutuallyExclusiveWith: ['voice_id']
    },

    voice_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Control audio generation by referencing voice (via files/upload API, purpose: voice)',
      mutuallyExclusiveWith: ['voice']
    }
  },

  mutuallyExclusive: [
    ['voice', 'voice_id']
  ],

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
