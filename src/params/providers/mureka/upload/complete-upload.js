/**
 * Complete Upload 参数定义
 */

const murekaCommon = require('../mureka-common')

module.exports = {
  input: {
    upload_id: {
      type: 'string',
      required: true,
      description: '上传任务ID'
    },

    part_ids: {
      type: 'array',
      required: false,
      description: '部分ID列表(按顺序)',
      items: 'string'
    }
  },

  output: {
    id: {
      type: 'string',
      description: '上传任务ID',
      path: 'id'
    },

    upload_name: {
      type: 'string',
      description: '上传文件名',
      path: 'upload_name'
    },

    purpose: {
      type: 'string',
      description: '上传用途',
      path: 'purpose'
    },

    bytes: {
      type: 'number',
      description: '文件大小',
      path: 'bytes'
    },

    created_at: {
      type: 'number',
      description: '创建时间戳(秒)',
      path: 'created_at'
    },

    expires_at: {
      type: 'number',
      description: '过期时间戳(秒)',
      path: 'expires_at'
    },

    status: {
      type: 'string',
      description: '任务状态(completed)',
      path: 'status'
    },

    parts: {
      type: 'array',
      description: '部分ID列表',
      path: 'parts'
    }
  }
}
