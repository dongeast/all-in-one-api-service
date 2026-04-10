/**
 * Extend Lyrics 参数定义
 */

const murekaCommon = require('../mureka-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    lyrics: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: true,
      description: '要扩展的歌词内容'
    }
  },

  output: {
    lyrics: {
      type: 'string',
      description: '扩展后的歌词',
      path: 'lyrics'
    }
  }
}
