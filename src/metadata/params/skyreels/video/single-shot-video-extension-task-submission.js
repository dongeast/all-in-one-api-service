/**
 * Single-shot Video Extension Task Submission 参数定义
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
      min: 5,
      max: 30,
      default: 5
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
