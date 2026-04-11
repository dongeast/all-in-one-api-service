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
      description: 'Lyrics content to extend'
    }
  },

  output: {
    lyrics: {
      type: 'string',
      description: 'Extended lyrics',
      path: 'lyrics'
    }
  }
}
