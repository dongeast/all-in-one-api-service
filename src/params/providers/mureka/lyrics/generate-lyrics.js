/**
 * Generate Lyrics 参数定义
 */

const murekaCommon = require('../mureka-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    prompt: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: true,
      description: 'Prompt for generating lyrics'
    }
  },

  output: {
    title: {
      type: 'string',
      description: 'Generated title',
      path: 'title'
    },

    lyrics: {
      type: 'string',
      description: 'Generated lyrics',
      path: 'lyrics'
    }
  }
}
