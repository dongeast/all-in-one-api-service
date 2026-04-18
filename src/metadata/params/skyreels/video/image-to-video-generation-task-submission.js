/**
 * Image to Video Generation Task Submission 参数定义
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

    first_frame_image: {
      type: ParamType.STRING,
      elementType: ElementType.IMAGE_UPLOAD,
      maxItems: 1,
      required: true,
      description: 'Video first frame image',
      format: 'uri'
    },

    end_frame_image: {
      type: ParamType.STRING,
      elementType: ElementType.IMAGE_UPLOAD,
      maxItems: 1,
      required: false,
      description: 'Video last frame image',
      format: 'uri'
    },

    mid_frame_images: {
      type: ParamType.ARRAY,
      elementType: ElementType.MID_FRAME_ARRAY,
      required: false,
      description: 'Video middle frame image list (tag auto-generated)',
      maxItems: 6,
      minItems: 0,
      maxSizeMB: 10,
      itemSchema: {
        type: ParamType.OBJECT,
        properties: {
          tag: {
            type: ParamType.STRING,
            elementType: ElementType.DEFAULT,
            required: true,
            description: 'Auto-generated tag identifier (e.g., @image1, @image2)',
            pattern: '^@image\\d+$'
          },
          image_url: {
            type: ParamType.STRING,
            elementType: ElementType.IMAGE_UPLOAD,
            maxItems: 1,
            required: true,
            description: 'Image URL',
            format: 'uri'
          },
          time_stamp: {
            type: ParamType.NUMBER,
            elementType: ElementType.DEFAULT,
            required: false,
            description: 'Target timestamp, -1 means unspecified',
            default: -1
          }
        }
      }
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
