/**
 * Extend Lyrics 参数定义
 * 支持模型: Mureka Lyrics Model
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    lyrics: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: true,
      description: 'Lyrics to be continued'
    }
  },

  output: {
    lyrics: {
      type: 'string',
      description: 'The lyrics extended based on the input lyrics',
      path: 'lyrics',
      isResultField: true
    }
  }
}
