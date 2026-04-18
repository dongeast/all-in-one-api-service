/**
 * Recognize Song 参数定义
 * 支持模型: Mureka Recognize Model
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    upload_audio_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: true,
      description: 'Upload ID of the song to be recognized (via files/upload API, purpose: audio)'
    }
  },

  output: {
    duration: {
      type: 'number',
      description: 'Song duration in milliseconds',
      path: 'duration'
    },
    lyrics_sections: {
      type: 'array',
      description: 'Lyrics section information, including timestamps',
      path: 'lyrics_sections',
      isResultField: true
    }
  }
}
