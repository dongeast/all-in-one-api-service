/**
 * Text to Video Generation Task Query 参数定义
 */

const { ParamType, ElementType } = require('../../common')

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
    task_id: {
      type: 'string',
      description: 'Task ID',
      path: 'task_id'
    },
    msg: {
      type: 'string',
      description: 'Message description',
      path: 'msg'
    },
    code: {
      type: 'number',
      description: 'Status code',
      path: 'code'
    },
    status: {
      type: 'string',
      description: 'Task status',
      path: 'status'
    },
    trace_id: {
      type: 'string',
      description: 'Request trace ID',
      path: 'trace_id'
    },
    data: {
      type: 'object',
      description: 'Contains video data on success, null for other statuses',
      path: 'data',
      fields: {
        video_url: {
          type: 'string',
          description: 'Video URL',
          path: 'data.video_url'
        },
        duration: {
          type: 'number',
          description: 'Video duration (seconds)',
          path: 'data.duration'
        },
        resolution: {
          type: 'string',
          description: 'Video resolution',
          path: 'data.resolution'
        }
      }
    }
  }
}
