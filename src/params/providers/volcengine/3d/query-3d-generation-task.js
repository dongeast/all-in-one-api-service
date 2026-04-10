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
      description: '3D生成任务ID'
    }
  },

  output: {
    id: {
      type: 'string',
      description: '3D生成任务ID',
      path: 'id'
    },

    model: {
      type: 'string',
      description: '使用的模型名称和版本',
      path: 'model'
    },

    status: {
      type: 'string',
      description: '任务状态',
      path: 'status'
    },

    error: {
      type: 'object',
      description: '错误信息',
      path: 'error'
    },

    'error.code': {
      type: 'string',
      description: '错误码',
      path: 'error.code'
    },

    'error.message': {
      type: 'string',
      description: '错误消息',
      path: 'error.message'
    },

    created_at: {
      type: 'number',
      description: '任务创建Unix时间戳（秒）',
      path: 'created_at'
    },

    updated_at: {
      type: 'number',
      description: '任务状态更新Unix时间戳（秒）',
      path: 'updated_at'
    },

    content: {
      type: 'object',
      description: '3D生成输出',
      path: 'content'
    },

    'content.file_url': {
      type: 'string',
      description: '生成的3D文件URL，有效期24小时',
      path: 'content.file_url'
    },

    usage: {
      type: 'object',
      description: 'Token使用信息',
      path: 'usage'
    },

    'usage.completion_tokens': {
      type: 'number',
      description: '3D生成消耗的token数',
      path: 'usage.completion_tokens'
    },

    'usage.total_tokens': {
      type: 'number',
      description: '总消耗token数',
      path: 'usage.total_tokens'
    }
  }
}
