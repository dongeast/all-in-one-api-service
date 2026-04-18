/**
 * Query Task 参数定义
 * 支持模型: All Mureka Models
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    task_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: true,
      description: 'The task_id of the song generation task'
    }
  },

  output: {
    id: {
      type: 'string',
      description: 'Task ID of the asynchronous song generation task',
      path: 'id'
    },
    created_at: {
      type: 'number',
      description: 'The Unix timestamp (in seconds) for when the task was created',
      path: 'created_at'
    },
    finished_at: {
      type: 'number',
      description: 'The Unix timestamp (in seconds) for when the task was finished',
      path: 'finished_at'
    },
    model: {
      type: 'string',
      description: 'The model used for song generation',
      path: 'model'
    },
    status: {
      type: 'string',
      description: 'The current status of the task: preparing, queued, running, streaming, succeeded, failed, timeouted, cancelled',
      path: 'status'
    },
    failed_reason: {
      type: 'string',
      description: 'The reason for the failure',
      path: 'failed_reason'
    },
    choices: {
      type: 'array',
      description: 'The generated songs, when the status is succeeded',
      path: 'choices',
      isResultField: true
    }
  }
}
