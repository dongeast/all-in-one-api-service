/**
 * Create Upload 参数定义
 */

const murekaCommon = require('../mureka-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    upload_name: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: true,
      description: 'Upload file name'
    },

    purpose: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: true,
      description: 'Upload purpose',
      options: ['fine-tuning']
    },

    bytes: {
      type: ParamType.NUMBER,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Total file size (bytes)'
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
      description: 'Task status',
      path: 'status'
    },

    parts: {
      type: 'array',
      description: 'Part ID list',
      path: 'parts'
    }
  }
}
