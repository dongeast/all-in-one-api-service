/**
 * Vocal Cloning 参数定义
 */

const murekaCommon = require('../mureka-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    file: {
      type: ParamType.FILE,
      elementType: ElementType.UPLOAD,
      required: true,
      description: 'Vocal sample file (binary)',
      constraints: {
        maxSize: 10 * 1024 * 1024,
        formats: ['mp3', 'm4a']
      }
    }
  },

  output: {
    id: {
      type: 'string',
      description: 'Resource ID',
      path: 'id'
    },

    filename: {
      type: 'string',
      description: 'Uploaded file name',
      path: 'filename'
    },

    bytes: {
      type: 'number',
      description: 'File size (bytes)',
      path: 'bytes'
    },

    created_at: {
      type: 'number',
      description: 'Creation timestamp (seconds)',
      path: 'created_at'
    }
  }
}
