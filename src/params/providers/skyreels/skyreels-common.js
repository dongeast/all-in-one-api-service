/**
 * Skyreels 通用参数定义
 */

const { textPrompt } = require('../../templates')
const { ParamType, ElementType } = require('../../common')

module.exports = {
  input: {
    prompt: {
      ...textPrompt.prompt,
      elementType: ElementType.TEXTAREA,
      description: 'Video generation prompt',
      maxLength: 1280
    },

    duration: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Video duration (seconds)',
      min: 1,
      max: 30,
      default: 5
    },

    aspect_ratio: {
      type: ParamType.ENUM,
      elementType: ElementType.RATIO,
      required: false,
      description: 'Video aspect ratio',
      options: ['16:9', '9:16', '3:4', '4:3', '1:1'],
      default: '16:9'
    },

    mode: {
      type: ParamType.ENUM,
      elementType: ElementType.RADIO,
      required: false,
      description: 'Quality/performance mode',
      options: ['fast', 'std', 'pro'],
      default: 'std'
    },

    sound: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Whether to include sound effects',
      default: false
    },

    prompt_optimizer: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Whether to enable automatic prompt optimization',
      default: false
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

    video_url: {
      type: 'string',
      description: 'Video URL',
      path: 'data.video_url'
    },

    duration_output: {
      type: 'number',
      description: 'Video duration (seconds)',
      path: 'data.duration'
    },

    resolution: {
      type: 'string',
      description: 'Video resolution',
      path: 'data.resolution'
    },

    cost_credits: {
      type: 'number',
      description: 'Credits consumed',
      path: 'data.cost_credits'
    }
  },

  taskStatus: {
    SUBMITTED: 'submitted',
    PENDING: 'pending',
    RUNNING: 'running',
    FAILED: 'failed',
    UNKNOWN: 'unknown'
  }
}
