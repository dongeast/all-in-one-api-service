/**
 * Upload File 参数定义
 * 支持模型: Mureka File Upload Model
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    file: {
      type: ParamType.FILE,
      elementType: ElementType.UPLOAD,
      required: true,
      description: 'The File object (not file name) to be uploaded',
      maxSizeMB: 10,
      formats: ['mp3', 'm4a', 'mid']
    },

    purpose: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: true,
      description: 'The intended purpose of the uploaded file',
      options: ['reference', 'vocal', 'melody', 'instrumental', 'voice', 'audio']
    }
  },

  output: {
    id: {
      type: 'string',
      description: 'The file identifier, which can be referenced in the API endpoints',
      path: 'id'
    },
    bytes: {
      type: 'number',
      description: 'The size of the file, in bytes',
      path: 'bytes'
    },
    created_at: {
      type: 'number',
      description: 'The Unix timestamp (in seconds) for when the file was created',
      path: 'created_at'
    },
    filename: {
      type: 'string',
      description: 'The name of the file',
      path: 'filename'
    },
    purpose: {
      type: 'string',
      description: 'The intended purpose of the file',
      path: 'purpose'
    }
  }
}
