/**
 * Create Upload 参数定义
 */

const murekaCommon = require('../mureka-common')

module.exports = {
  input: {
    upload_name: {
      type: 'string',
      required: true,
      description: '上传文件名称'
    },

    purpose: {
      type: 'enum',
      required: true,
      description: '上传用途',
      options: ['fine-tuning']
    },

    bytes: {
      type: 'number',
      required: false,
      description: '文件总大小(字节)'
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
      description: '任务状态',
      path: 'status'
    },

    parts: {
      type: 'array',
      description: '部分ID列表',
      path: 'parts'
    }
  }
}
