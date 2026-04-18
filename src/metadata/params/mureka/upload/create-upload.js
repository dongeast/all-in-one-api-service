/**
 * Create Upload 参数定义
 * 支持模型: Mureka Upload Model
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    upload_name: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: true,
      description: 'Give a name for this upload, or the name of the large file to upload'
    },

    purpose: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: true,
      description: 'The intended purpose of this upload',
      options: ['fine-tuning']
    },

    bytes: {
      type: ParamType.NUMBER,
      elementType: ElementType.INPUT,
      required: false,
      description: 'The total size of this upload. If not provided, the size will not be checked at the end'
    }
  },

  output: {
    id: {
      type: 'string',
      description: 'Task ID of the asynchronous task',
      path: 'id'
    },
    upload_name: {
      type: 'string',
      description: 'The name of the upload',
      path: 'upload_name'
    },
    purpose: {
      type: 'string',
      description: 'The intended purpose of the upload',
      path: 'purpose'
    },
    bytes: {
      type: 'number',
      description: 'The total size of this upload',
      path: 'bytes'
    },
    created_at: {
      type: 'number',
      description: 'The Unix timestamp (in seconds) for when the task was created',
      path: 'created_at'
    },
    expires_at: {
      type: 'number',
      description: 'The Unix timestamp (in seconds) for when the task was expired',
      path: 'expires_at'
    },
    status: {
      type: 'string',
      description: 'The current status of the task. Valid values: pending, completed, cancelled',
      path: 'status'
    },
    parts: {
      type: 'array',
      description: 'The list of parts included in this upload, which only have values when the status is completed',
      path: 'parts'
    }
  }
}
