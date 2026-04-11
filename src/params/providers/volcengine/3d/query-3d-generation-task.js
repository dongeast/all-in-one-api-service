/**
 * 火山引擎查询3D生成任务参数定义
 */

const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: true,
      description: '3D generation task ID'
    }
  },

  output: {
    id: {
      type: 'string',
      description: '3D generation task ID',
      path: 'id'
    },

    model: {
      type: 'string',
      description: 'Model name and version used',
      path: 'model'
    },

    status: {
      type: 'string',
      description: 'Task status',
      path: 'status'
    },

    error: {
      type: 'object',
      description: 'Error information',
      path: 'error'
    },

    'error.code': {
      type: 'string',
      description: 'Error code',
      path: 'error.code'
    },

    'error.message': {
      type: 'string',
      description: 'Error message',
      path: 'error.message'
    },

    created_at: {
      type: 'number',
      description: 'Task creation Unix timestamp (seconds)',
      path: 'created_at'
    },

    updated_at: {
      type: 'number',
      description: 'Task status update Unix timestamp (seconds)',
      path: 'updated_at'
    },

    content: {
      type: 'object',
      description: '3D generation output',
      path: 'content'
    },

    'content.file_url': {
      type: 'string',
      description: 'Generated 3D file URL, valid for 24 hours',
      path: 'content.file_url'
    },

    usage: {
      type: 'object',
      description: 'Token usage information',
      path: 'usage'
    },

    'usage.completion_tokens': {
      type: 'number',
      description: 'Tokens consumed for 3D generation',
      path: 'usage.completion_tokens'
    },

    'usage.total_tokens': {
      type: 'number',
      description: 'Total tokens consumed',
      path: 'usage.total_tokens'
    }
  }
}
