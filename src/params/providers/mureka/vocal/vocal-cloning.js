/**
 * Vocal Cloning 参数定义
 */

const murekaCommon = require('../mureka-common')

module.exports = {
  input: {
    file: {
      type: 'file',
      required: true,
      description: '人声样本文件(二进制)',
      constraints: {
        maxSize: 10 * 1024 * 1024,
        formats: ['mp3', 'm4a']
      }
    }
  },

  output: {
    id: {
      type: 'string',
      description: '资源ID',
      path: 'id'
    },

    filename: {
      type: 'string',
      description: '上传的文件名',
      path: 'filename'
    },

    bytes: {
      type: 'number',
      description: '文件大小(字节)',
      path: 'bytes'
    },

    created_at: {
      type: 'number',
      description: '创建时间戳(秒)',
      path: 'created_at'
    }
  }
}
