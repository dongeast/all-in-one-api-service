/**
 * Generate Instrumental 参数定义
 */

const murekaCommon = require('../mureka-common')

module.exports = {
  input: {
    model: {
      type: 'enum',
      required: false,
      description: '模型选择',
      options: ['auto', 'mureka-7.5', 'mureka-7.6', 'mureka-8'],
      default: 'auto'
    },

    n: {
      type: 'number',
      required: false,
      description: '生成数量',
      min: 1,
      max: 3,
      default: 2
    },

    prompt: {
      type: 'string',
      required: false,
      description: '音乐风格提示词',
      maxLength: 1024
    },

    instrumental_id: {
      type: 'string',
      required: false,
      description: '伴奏ID(通过 files/upload API)'
    },

    stream: {
      type: 'boolean',
      required: false,
      description: '是否启用流式播放',
      default: false
    }
  },

  output: {
    id: {
      type: 'string',
      description: '任务ID',
      path: 'id'
    },

    created_at: {
      type: 'number',
      description: '创建时间戳(秒)',
      path: 'created_at'
    },

    finished_at: {
      type: 'number',
      description: '完成时间戳(秒)',
      path: 'finished_at'
    },

    model: {
      type: 'string',
      description: '使用的模型',
      path: 'model'
    },

    status: {
      type: 'string',
      description: '任务状态',
      path: 'status'
    },

    failed_reason: {
      type: 'string',
      description: '失败原因',
      path: 'failed_reason'
    },

    choices: {
      type: 'array',
      description: '生成结果列表',
      path: 'choices'
    }
  }
}
