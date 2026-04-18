/**
 * Reference to Video Task Submission 参数定义
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

    ref_images: {
      type: ParamType.ARRAY,
      elementType: ElementType.INPUT,
      required: true,
      description: '1-4 subject reference images',
      minItems: 1,
      maxItems: 4,
      items: {
        type: ParamType.STRING,
        elementType: ElementType.UPLOAD,
        format: 'uri'
      }
    },

    duration: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Video duration (seconds)',
      min: 1,
      max: 5,
      default: 5
    },

    aspect_ratio: {
      type: ParamType.ENUM,
      elementType: ElementType.RATIO,
      required: false,
      description: 'Video aspect ratio',
      options: ['16:9', '9:16', '3:4', '4:3', '1:1'],
      default: '16:9'
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
