/**
 * Complete Upload 参数定义
 * 支持模型: Mureka Upload Model
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    upload_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: true,
      description: 'The ID of the Upload object'
    },

    part_ids: {
      type: ParamType.ARRAY,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'The ordered list of part IDs. If this parameter is empty, it means using all parts added by uploads/add, in the order they were added'
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
