/**
 * Add Upload Part 参数定义
 */

const murekaCommon = require('../mureka-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    upload_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: true,
      description: 'Upload task ID'
    },

    file: {
      type: ParamType.FILE,
      elementType: ElementType.UPLOAD,
      required: true,
      description: 'File object (binary)',
      constraints: {
        maxSize: 10 * 1024 * 1024,
        formats: ['mp3', 'm4a'],
        minDuration: 30,
        maxDuration: 270
      }
    }
  },

  output: {
    id: {
      type: 'string',
      description: 'Upload part ID',
      path: 'id'
    },

    upload_id: {
      type: 'string',
      description: 'Upload task ID',
      path: 'upload_id'
    },

    created_at: {
      type: 'number',
      description: 'Creation timestamp (seconds)',
      path: 'created_at'
    }
  }
}
