/**
 * Stem Song 参数定义
 */

const murekaCommon = require('../mureka-common')

module.exports = {
  input: {
    url: {
      type: 'string',
      required: true,
      description: 'The URL of the song to be processed. Supported formats: mp3, m4a. Max data size: 10 MB'
    }
  },

  output: {
    zip_url: {
      type: 'string',
      description: 'The URL of the ZIP file containing all the split song tracks',
      path: 'zip_url'
    },

    expires_at: {
      type: 'number',
      description: 'The Unix timestamp (in seconds) for when the url was expired',
      path: 'expires_at'
    }
  }
}
