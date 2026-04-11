/**
 * Query Instrumental Task 参数定义
 */

const murekaCommon = require('../mureka-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    task_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: true,
      description: 'Task ID'
    }
  },

  output: {
    id: {
      ...murekaCommon.output.id,
      description: 'Task ID',
      path: 'id'
    },

    created_at: {
      ...murekaCommon.output.created_at,
      description: 'Creation timestamp (seconds)',
      path: 'created_at'
    },

    finished_at: {
      ...murekaCommon.output.finished_at,
      description: 'Completion timestamp (seconds)',
      path: 'finished_at'
    },

    model: {
      ...murekaCommon.output.model,
      description: 'Model to use',
      path: 'model'
    },

    status: {
      ...murekaCommon.output.status,
      description: 'Task status',
      path: 'status'
    },

    failed_reason: {
      ...murekaCommon.output.failed_reason,
      description: 'Failure reason',
      path: 'failed_reason'
    },

    choices: {
      ...murekaCommon.output.choices,
      description: 'Generation results list',
      path: 'choices'
    }
  }
}
