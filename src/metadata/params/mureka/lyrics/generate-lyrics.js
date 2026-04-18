/**
 * Generate Lyrics 参数定义
 * 支持模型: Mureka Lyrics Model
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    prompt: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: true,
      description: 'The prompt to generate lyrics for'
    }
  },

  output: {
    title: {
      type: 'string',
      description: 'The title generated based on the prompt',
      path: 'title'
    },
    lyrics: {
      type: 'string',
      description: 'The lyrics generated based on the prompt',
      path: 'lyrics',
      isResultField: true
    }
  }
}
