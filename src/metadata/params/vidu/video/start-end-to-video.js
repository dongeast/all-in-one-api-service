/**
 * 首尾帧参数定义
 * 支持模型: viduq3-turbo, viduq3-pro, viduq2-pro-fast, viduq2-pro, viduq2-turbo, viduq1, viduq1-classic, vidu2.0
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    model: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: true,
      description: 'Model to use',
      options: [
        'viduq3-turbo',
        'viduq3-pro',
        'viduq2-pro-fast',
        'viduq2-pro',
        'viduq2-turbo',
        'viduq1',
        'viduq1-classic',
        'vidu2.0'
      ]
    },

    images: {
      type: ParamType.ARRAY,
      elementType: ElementType.IMAGE_UPLOAD,
      required: true,
      description: 'Start and end frame images (exactly 2 images, first is start, second is end)',
      minItems: 2,
      maxItems: 2,
      maxSizeMB: 50
    },

    prompt: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: false,
      description: 'Text description (ignored if is_rec is used)',
      minLength: 1,
      maxLength: 5000
    },

    is_rec: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Use recommended prompt (costs 10 extra credits)',
      default: false
    },

    duration: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Video duration (varies by model)',
      default: 5,
      unit: 's'
    },

    seed: {
      type: ParamType.NUMBER,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Random seed, 0 for random',
      min: 0,
      max: 2147483647,
      integer: true
    },

    resolution: {
      type: ParamType.ENUM,
      elementType: ElementType.RESOLUTION,
      required: false,
      description: 'Resolution',
      default: '720p'
    },

    movement_amplitude: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: 'Movement amplitude',
      options: ['auto', 'small', 'medium', 'large'],
      default: 'auto'
    },

    audio: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Audio-video sync (only q3 series supports this)',
      default: true
    },

    bgm: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Add background music',
      default: false
    },

    payload: {
      type: ParamType.STRING,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Pass-through parameter',
      maxLength: 1048576
    },

    off_peak: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Off-peak mode (lower cost, within 48 hours)',
      default: false
    },

    watermark: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Add watermark',
      default: false
    },

    wm_position: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: 'Watermark position',
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
      elementType: ElementType.INPUT,
      required: false,
      description: 'Watermark image URL'
    },

    meta_data: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: false,
      description: 'Metadata identifier (JSON format)'
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
    prompt: {
      type: ParamType.STRING,
      description: 'Prompt used',
      path: 'prompt'
    },
    images: {
      type: ParamType.ARRAY,
      description: 'Images used',
      path: 'images',
      isResultField: true
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
        description: 'Video duration (1-16 seconds)',
        min: 1,
        max: 16,
        default: 5,
        unit: 's'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Resolution',
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
        description: 'Video duration (1-16 seconds)',
        min: 1,
        max: 16,
        default: 5,
        unit: 's'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Resolution',
        options: ['540p', '720p', '1080p'],
        default: '720p'
      }
    },
    {
      dependsOn: 'model',
      value: 'viduq2-pro-fast',
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        description: 'Video duration (1-8 seconds)',
        min: 1,
        max: 8,
        default: 5,
        unit: 's'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Resolution',
        options: ['720p', '1080p'],
        default: '720p'
      }
    },
    {
      dependsOn: 'model',
      value: 'viduq2-pro',
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        description: 'Video duration (1-8 seconds)',
        min: 1,
        max: 8,
        default: 5,
        unit: 's'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Resolution',
        options: ['540p', '720p', '1080p'],
        default: '720p'
      }
    },
    {
      dependsOn: 'model',
      value: 'viduq2-turbo',
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        description: 'Video duration (1-8 seconds)',
        min: 1,
        max: 8,
        default: 5,
        unit: 's'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Resolution',
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
        description: 'Video duration (5 seconds)',
        min: 5,
        max: 5,
        default: 5,
        unit: 's'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Resolution',
        options: ['1080p'],
        default: '1080p'
      }
    },
    {
      dependsOn: 'model',
      value: 'viduq1-classic',
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        description: 'Video duration (5 seconds)',
        min: 5,
        max: 5,
        default: 5,
        unit: 's'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Resolution',
        options: ['1080p'],
        default: '1080p'
      }
    },
    {
      dependsOn: 'model',
      value: 'vidu2.0',
      duration: {
        type: ParamType.ENUM,
        elementType: ElementType.SELECT,
        required: false,
        description: 'Video duration (4 or 8 seconds)',
        options: [4, 8],
        default: 4
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Resolution',
        options: ['360p', '720p', '1080p'],
        default: '360p'
      }
    }
  ]
}
