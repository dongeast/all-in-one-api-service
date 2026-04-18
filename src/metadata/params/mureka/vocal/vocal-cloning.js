/**
 * Vocal Cloning 参数定义
 * 支持模型: Mureka Vocal Clone Model
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    file: {
      type: ParamType.FILE,
      elementType: ElementType.UPLOAD,
      required: true,
      description: 'The vocal sample file to upload',
      maxSizeMB: 10,
      formats: ['mp3', 'm4a']
    }
  },

  output: {
    id: {
      type: 'string',
      description: 'The resource ID',
      path: 'id'
    },
    filename: {
      type: 'string',
      description: 'The uploaded file name, keeping only basename.ext',
      path: 'filename'
    },
    bytes: {
      type: 'number',
      description: 'File size in bytes',
      path: 'bytes'
    },
    created_at: {
      type: 'number',
      description: 'The Unix timestamp (in seconds) for when the resource was created',
      path: 'created_at'
    }
  }
}
