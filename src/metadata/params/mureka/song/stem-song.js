/**
 * Stem Song 参数定义
 * 支持模型: Mureka Stem Model
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    url: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: true,
      description: 'The URL of the song to be processed. Supported formats: mp3, m4a. Max data size: 10 MB. URL in base64 format is also supported'
    }
  },

  output: {
    zip_url: {
      type: 'string',
      description: 'The URL of the ZIP file containing all the split song tracks',
      path: 'zip_url',
      isResultField: true
    },
    expires_at: {
      type: 'number',
      description: 'The Unix timestamp (in seconds) for when the url was expired',
      path: 'expires_at'
    }
  }
}
