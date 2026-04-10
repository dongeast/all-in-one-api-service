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
      description: '要转换为语音的文本',
      maxLength: 500
    },

    voice: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: '语音选择',
      options: ['Ethan', 'Victoria', 'Jake', 'Luna', 'Emma'],
      mutuallyExclusiveWith: ['voice_id']
    },

    voice_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: '自定义语音ID(通过 files/upload API)',
      mutuallyExclusiveWith: ['voice']
    }
  },

  mutuallyExclusive: [
    ['voice', 'voice_id']
  ],

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
