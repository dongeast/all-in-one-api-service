/**
 * Query Instrumental Task 参数定义
 */

const murekaCommon = require('../mureka-common')

module.exports = {
  input: {
    task_id: {
      type: 'string',
      required: true,
      description: '任务ID'
    }
  },

  output: {
    id: {
      ...murekaCommon.output.id,
      description: '任务ID',
      path: 'id'
    },

    created_at: {
      ...murekaCommon.output.created_at,
      description: '创建时间戳(秒)',
      path: 'created_at'
    },

    finished_at: {
      ...murekaCommon.output.finished_at,
      description: '完成时间戳(秒)',
      path: 'finished_at'
    },

    model: {
      ...murekaCommon.output.model,
      description: '使用的模型',
      path: 'model'
    },

    status: {
      ...murekaCommon.output.status,
      description: '任务状态',
      path: 'status'
    },

    failed_reason: {
      ...murekaCommon.output.failed_reason,
      description: '失败原因',
      path: 'failed_reason'
    },

    choices: {
      ...murekaCommon.output.choices,
      description: '生成结果列表',
      path: 'choices'
    }
  }
}
