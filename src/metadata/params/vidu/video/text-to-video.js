/**
 * 文生视频参数定义
 * 支持模型: viduq3-turbo, viduq3-pro, viduq2, viduq1
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    model: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: true,
      options: ['viduq3-turbo', 'viduq3-pro', 'viduq2', 'viduq1']
    },

    style: {
      type: ParamType.ENUM,
      elementType: ElementType.RADIO,
      required: false,
      options: ['general', 'anime'],
      default: 'general'
    },

    prompt: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: true,
      minLength: 1,
      maxLength: 5000
    },

    duration: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      default: 5,
      unit: 's'
    },

    seed: {
      type: ParamType.NUMBER,
      elementType: ElementType.DEFAULT,
      required: false,
      min: 0,
      max: 2147483647,
      default: 0,
      integer: true
    },

    aspect_ratio: {
      type: ParamType.ENUM,
      elementType: ElementType.DEFAULT,
      required: false,
      default: '16:9'
    },

    resolution: {
      type: ParamType.ENUM,
      elementType: ElementType.DEFAULT,
      required: false,
      default: '720p'
    },

    movement_amplitude: {
      type: ParamType.ENUM,
      elementType: ElementType.RADIO,
      required: false,
      options: ['auto', 'small', 'medium', 'large'],
      default: 'auto'
    },

    bgm: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      default: false
    },

    audio: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      default: true
    },

    payload: {
      type: ParamType.STRING,
      elementType: ElementType.DEFAULT,
      required: false,
      maxLength: 1048576
    },

    // 错峰生成视频
    off_peak: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.DEFAULT,
      required: false,
      default: false
    },

    watermark: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.DEFAULT,
      required: false,
      default: false
    },

    wm_position: {
      type: ParamType.ENUM,
      elementType: ElementType.DEFAULT,
      required: false,
      options: [
        { value: 1, label: 'Top Left' },
        { value: 2, label: 'Top Right' },
        { value: 3, label: 'Bottom Right' },
        { value: 4, label: 'Bottom Left' }
      ],
      default: 3
    },

    wm_url: {
      type: ParamType.STRING,
      elementType: ElementType.DEFAULT,
      required: false,
    },

    meta_data: {
      type: ParamType.STRING,
      elementType: ElementType.DEFAULT,
      required: false,
    },

    callback_url: {
      type: ParamType.STRING,
      elementType: ElementType.DEFAULT,
      required: false,
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
    duration: {
      type: ParamType.NUMBER,
      description: 'Video duration',
      path: 'duration'
    },
    seed: {
      type: ParamType.NUMBER,
      description: 'Random seed used',
      path: 'seed'
    },
    aspect_ratio: {
      type: ParamType.STRING,
      description: 'Aspect ratio used',
      path: 'aspect_ratio'
    },
    resolution: {
      type: ParamType.STRING,
      description: 'Resolution used',
      path: 'resolution'
    },
    bgm: {
      type: ParamType.BOOLEAN,
      description: 'Whether background music was added',
      path: 'bgm'
    },
    movement_amplitude: {
      type: ParamType.STRING,
      description: 'Movement amplitude used',
      path: 'movement_amplitude'
    },
    payload: {
      type: ParamType.STRING,
      description: 'Pass-through parameter',
      path: 'payload'
    },
    off_peak: {
      type: ParamType.BOOLEAN,
      description: 'Whether off-peak mode was used',
      path: 'off_peak'
    },
    credits: {
      type: ParamType.NUMBER,
      description: 'Credits used',
      path: 'credits'
    },
    watermark: {
      type: ParamType.BOOLEAN,
      description: 'Whether watermark was used',
      path: 'watermark'
    },
    created_at: {
      type: ParamType.STRING,
      description: 'Task creation time',
      path: 'created_at'
    }
  },

  cases: [
    {
      dependsOn: 'model',
      value: 'viduq3-turbo',
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        min: 1,
        max: 16,
        default: 5,
        unit: 's'
      },
      aspect_ratio: {
        type: ParamType.ENUM,
        elementType: ElementType.RATIO,
        required: false,
        options: ['16:9', '9:16', '1:1', '3:4', '4:3'],
        default: '16:9'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        options: ['540p', '720p', '1080p'],
        default: '720p'
      }
    },
    {
      dependsOn: 'model',
      value: 'viduq3-pro',
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        min: 1,
        max: 16,
        default: 5,
        unit: 's'
      },
      aspect_ratio: {
        type: ParamType.ENUM,
        elementType: ElementType.RATIO,
        required: false,
        options: ['16:9', '9:16', '1:1', '3:4', '4:3'],
        default: '16:9'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        options: ['540p', '720p', '1080p'],
        default: '720p'
      }
    },
    {
      dependsOn: 'model',
      value: 'viduq2',
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        min: 1,
        max: 10,
        default: 5,
        unit: 's'
      },
      aspect_ratio: {
        type: ParamType.ENUM,
        elementType: ElementType.RATIO,
        required: false,
        options: ['16:9', '9:16', '1:1', '3:4', '4:3', '21:9', '2:3', '3:2'],
        default: '16:9'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        options: ['540p', '720p', '1080p'],
        default: '720p'
      }
    },
    {
      dependsOn: 'model',
      value: 'viduq1',
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        min: 5,
        max: 5,
        default: 5,
        unit: 's'
      },
      aspect_ratio: {
        type: ParamType.ENUM,
        elementType: ElementType.RATIO,
        required: false,
        options: ['16:9', '9:16', '1:1'],
        default: '16:9'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        options: ['1080p'],
        default: '1080p'
      }
    }
  ]
}
