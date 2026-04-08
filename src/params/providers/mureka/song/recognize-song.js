/**
 * Recognize Song 参数定义
 */

const murekaCommon = require('../mureka-common')

module.exports = {
  input: {
    upload_audio_id: {
      type: 'string',
      required: true,
      description: 'Upload ID of the song to be recognized'
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
      path: 'lyrics_sections'
    }
  }
}
