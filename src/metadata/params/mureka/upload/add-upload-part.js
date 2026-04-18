/**
 * Add Upload Part 参数定义
 * 支持模型: Mureka Upload Model
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    file: {
      type: ParamType.FILE,
      elementType: ElementType.UPLOAD,
      required: true,
      description: 'The File object (not file name) to be uploaded. Supported format: mp3, m4a. Audio duration: 30-270 seconds. Max size: 10MB',
      maxSizeMB: 10,
      formats: ['mp3', 'm4a']
    },

    upload_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: true,
      description: 'The ID of the Upload object that this Part was added to'
    }
  },

  output: {
    id: {
      type: 'string',
      description: 'The upload part ID, which can be referenced in API endpoints',
      path: 'id'
    },
    upload_id: {
      type: 'string',
      description: 'The ID of the Upload object that this Part was added to',
      path: 'upload_id'
    },
    created_at: {
      type: 'number',
      description: 'The Unix timestamp (in seconds) for when the part was created',
      path: 'created_at'
    }
  }
}
