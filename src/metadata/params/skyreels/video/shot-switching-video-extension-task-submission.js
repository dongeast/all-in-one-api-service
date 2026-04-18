/**
 * Shot Switching Video Extension Task Submission 参数定义
 * 支持模型: Skyreels V3
 */

const { textPrompt } = require('../../templates')
const { ParamType, ElementType } = require('../../common')

module.exports = {
  input: {
    prompt: {
      ...textPrompt.prompt,
      elementType: ElementType.TEXTAREA,
      description: 'Video generation prompt',
      maxLength: 512
    },

    prefix_video: {
      type: ParamType.STRING,
      elementType: ElementType.UPLOAD,
      required: true,
      description: 'Video to extend, supports MP4 format, max 30 seconds',
      format: 'uri'
    },

    duration: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Video duration (seconds)',
      min: 2,
      max: 5,
      default: 5
    },

    cut_type: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: 'Shot switching type',
      options: [
        'Auto',
        'Cut-In',
        'Cut-Out',
        'Shot/Reverse Shot',
        'Multi-Angle',
        'Cut Away'
      ],
      default: 'Auto'
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
