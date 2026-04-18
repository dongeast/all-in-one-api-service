/**
 * 查询任务参数定义
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    task_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: true,
      description: 'Task ID to query'
    }
  },

  output: {
    task_id: {
      type: ParamType.STRING,
      description: 'Vidu generated task ID',
      path: 'task_id'
    },
    state: {
      type: ParamType.STRING,
      description: 'Processing status',
      path: 'state'
    },
    model: {
      type: ParamType.STRING,
      description: 'Model name used',
      path: 'model'
    },
    prompt: {
      type: ParamType.STRING,
      description: 'Prompt used',
      path: 'prompt'
    },
    created_at: {
      type: ParamType.STRING,
      description: 'Task creation time',
      path: 'created_at'
    },
    finished_at: {
      type: ParamType.STRING,
      description: 'Task completion time',
      path: 'finished_at'
    },
    video_url: {
      type: ParamType.STRING,
      description: 'Generated video URL',
      path: 'video_url'
    },
    watermarked_url: {
      type: ParamType.STRING,
      description: 'Watermarked video URL',
      path: 'watermarked_url'
    },
    credits: {
      type: ParamType.NUMBER,
      description: 'Credits used',
      path: 'credits'
    },
    failed_reason: {
      type: ParamType.STRING,
      description: 'Failure reason',
      path: 'failed_reason'
    }
  }
}
