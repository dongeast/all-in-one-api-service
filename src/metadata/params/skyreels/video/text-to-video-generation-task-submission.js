/**
 * Text to Video Generation Task Submission 参数定义
 * 支持模型: Skyreels V4
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
      min: 3,
      max: 15,
      default: 5
    },

    aspect_ratio: {
      type: ParamType.ENUM,
      elementType: ElementType.RATIO,
      required: false,
      description: 'Video aspect ratio',
      options: ['16:9', '4:3', '1:1', '9:16', '3:4'],
      default: '16:9'
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
      default: true
    },

    mode: {
      type: ParamType.ENUM,
      elementType: ElementType.RADIO,
      required: false,
      description: 'Quality/performance mode (currently only std supported)',
      options: ['fast', 'std', 'pro'],
      default: 'std'
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
    }
  }
}
