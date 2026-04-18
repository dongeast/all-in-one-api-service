/**
 * 智能多帧参数定义
 * 支持模型: viduq2-turbo, viduq2-pro
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    model: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: true,
      description: 'Model to use (supports: viduq2-turbo, viduq2-pro)',
      options: ['viduq2-turbo', 'viduq2-pro']
    },

    start_image: {
      type: ParamType.STRING,
      elementType: ElementType.IMAGE_UPLOAD,
      required: true,
      description: 'Start frame image',
      maxSizeMB: 50
    },

    image_settings: {
      type: ParamType.ARRAY,
      elementType: ElementType.DEFAULT,
      required: true,
      description: 'Key frame configuration (max 9 key frames, min 2)',
      minItems: 2,
      maxItems: 9,
      items: {
        type: ParamType.OBJECT,
        properties: {
          prompt: {
            type: ParamType.STRING,
            elementType: ElementType.TEXTAREA,
            description: 'Prompt for extending from previous image'
          },
          key_image: {
            type: ParamType.STRING,
            elementType: ElementType.IMAGE_UPLOAD,
            description: 'Middle frame reference image',
            required: true
          },
          duration: {
            type: ParamType.NUMBER,
            elementType: ElementType.SLIDER,
            description: 'Multi-frame duration (2-7 seconds)',
            min: 2,
            max: 7,
            default: 5
          }
        }
      }
    },

    resolution: {
      type: ParamType.ENUM,
      elementType: ElementType.RESOLUTION,
      required: false,
      description: 'Video resolution',
      options: ['540p', '720p', '1080p'],
      default: '720p'
    },

    watermark: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Add watermark',
      default: false
    },

    wm_url: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Watermark image URL'
    },

    wm_position: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: 'Watermark position',
      options: ['top_left', 'top_right', 'bottom_right', 'bottom_left'],
      default: 'bottom_left'
    },

    meta_data: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: false,
      description: 'Metadata identifier (JSON format)'
    },

    payload: {
      type: ParamType.STRING,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Pass-through parameter',
      maxLength: 1048576
    },

    callback_url: {
      type: ParamType.STRING,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Callback URL for task status notification'
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
    start_image: {
      type: ParamType.STRING,
      description: 'Start frame image used',
      path: 'start_image'
    },
    image_settings: {
      type: ParamType.ARRAY,
      description: 'Multi-frame configuration used',
      path: 'image_settings'
    },
    resolution: {
      type: ParamType.STRING,
      description: 'Resolution used',
      path: 'resolution'
    },
    watermark: {
      type: ParamType.BOOLEAN,
      description: 'Whether watermark was used',
      path: 'watermark'
    },
    wm_url: {
      type: ParamType.STRING,
      description: 'Watermark content used',
      path: 'wm_url'
    },
    wm_position: {
      type: ParamType.STRING,
      description: 'Watermark position used',
      path: 'wm_position'
    },
    meta_data: {
      type: ParamType.STRING,
      description: 'Metadata identifier used',
      path: 'meta_data'
    },
    payload: {
      type: ParamType.STRING,
      description: 'Pass-through parameter',
      path: 'payload'
    },
    credits: {
      type: ParamType.NUMBER,
      description: 'Credits used',
      path: 'credits'
    },
    created_at: {
      type: ParamType.STRING,
      description: 'Task creation time',
      path: 'created_at'
    }
  }
}
