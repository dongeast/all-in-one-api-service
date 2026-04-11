/**
 * Complete Upload 参数定义
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

    part_ids: {
      type: ParamType.ARRAY,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Part ID list (in order)',
      items: 'string'
    }
  },

  output: {
    id: {
      type: 'string',
      description: 'Upload task ID',
      path: 'id'
    },

    upload_name: {
      type: 'string',
      description: 'Upload file name',
      path: 'upload_name'
    },

    purpose: {
      type: 'string',
      description: 'Upload purpose',
      path: 'purpose'
    },

    bytes: {
      type: 'number',
      description: 'File size',
      path: 'bytes'
    },

    created_at: {
      type: 'number',
      description: 'Creation timestamp (seconds)',
      path: 'created_at'
    },

    expires_at: {
      type: 'number',
      description: 'Expiration timestamp (seconds)',
      path: 'expires_at'
    },

    status: {
      type: 'string',
      description: 'Task status (completed)',
      path: 'status'
    },

    parts: {
      type: 'array',
      description: 'Part ID list',
      path: 'parts'
    }
  }
}
