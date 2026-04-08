/**
 * Describe Song 参数定义
 */

const murekaCommon = require('../mureka-common')

module.exports = {
  input: {
    url: {
      type: 'string',
      required: true,
      description: 'The URL of the song to be processed. Supported formats: mp3, m4a. Max data size: 10 MB. URL in base64 format is also supported'
    }
  },

  output: {
    instrument: {
      type: 'array',
      description: 'List of instruments used in the song',
      path: 'instrument'
    },

    genres: {
      type: 'array',
      description: 'List of song genres',
      path: 'genres'
    },

    tags: {
      type: 'array',
      description: 'List of song tags',
      path: 'tags'
    },

    description: {
      type: 'string',
      description: 'Overall description of the song',
      path: 'description'
    }
  }
}
