/**
 * 图生视频参数定义
 * 支持模型: viduq3-turbo, viduq3-pro, viduq3-pro-fast, viduq2-pro-fast, viduq2-pro, viduq2-turbo, viduq1, viduq1-classic, vidu2.0
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    model: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: true,
      options: [
        'viduq3-turbo',
        'viduq3-pro',
        'viduq3-pro-fast',
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
      maxItems: 1,
      maxSizeMB: 50
    },

    prompt: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: false,
      minLength: 1,
      maxLength: 5000
    },

    audio: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      default: false
    },

    audio_type: {
      type: ParamType.ENUM,
      elementType: ElementType.RADIO,
      required: false,
      options: ['all', 'speech_only', 'sound_effect_only'],
      default: 'all'
    },

    voice_id: {
      type: ParamType.STRING,
      elementType: ElementType.DEFAULT,
      required: false,
    },

    // 是否使用系统推荐提示词
    is_rec: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.DEFAULT,
      required: false,
      default: false
    },

    bgm: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      default: false
    },

    duration: {
      // 根据约束生成
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

    resolution: {
      // 根据约束生成
    },

    movement_amplitude: {
      type: ParamType.ENUM,
      elementType: ElementType.RADIO,
      required: false,
      options: ['auto', 'small', 'medium', 'large'],
      default: 'auto'
    },

    payload: {
      type: ParamType.STRING,
      elementType: ElementType.DEFAULT,
      required: false,
      maxLength: 1048576
    },

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
      path: 'task_id'
    },
    state: {
      type: ParamType.STRING,
      path: 'state'
    },
    model: {
      type: ParamType.STRING,
      path: 'model'
    },
    prompt: {
      type: ParamType.STRING,
      path: 'prompt'
    },
    images: {
      type: ParamType.ARRAY,
      path: 'images',
      isResultField: true
    },
    duration: {
      type: ParamType.NUMBER,
      path: 'duration'
    },
    audio: {
      type: ParamType.BOOLEAN,
      path: 'audio'
    },
    audio_type: {
      type: ParamType.STRING,
      path: 'audio_type'
    },
    seed: {
      type: ParamType.NUMBER,
      path: 'seed'
    },
    resolution: {
      type: ParamType.STRING,
      path: 'resolution'
    },
    movement_amplitude: {
      type: ParamType.STRING,
      path: 'movement_amplitude'
    },
    payload: {
      type: ParamType.STRING,
      path: 'payload'
    },
    off_peak: {
      type: ParamType.BOOLEAN,
      path: 'off_peak'
    },
    credits: {
      type: ParamType.NUMBER,
      path: 'credits'
    },
    watermark: {
      type: ParamType.BOOLEAN,
      path: 'watermark'
    },
    created_at: {
      type: ParamType.STRING,
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
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RADIO,
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
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RADIO,
        required: false,
        options: ['540p', '720p', '1080p'],
        default: '720p'
      }
    },
    {
      dependsOn: 'model',
      value: 'viduq3-pro-fast',
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        min: 1,
        max: 16,
        default: 5,
        unit: 's'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RADIO,
        required: false,
        options: ['720p', '1080p'],
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
        min: 1,
        max: 10,
        default: 5,
        unit: 's'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RADIO,
        required: false,
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
        min: 1,
        max: 10,
        default: 5,
        unit: 's'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RADIO,
        required: false,
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
        min: 1,
        max: 10,
        default: 5,
        unit: 's'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RADIO,
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
        elementType: ElementType.DEFAULT,
        required: false,
        min: 5,
        max: 5,
        default: 5,
        unit: 's'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RADIO,
        required: false,
        options: ['1080p'],
        default: '1080p'
      }
    },
    {
      dependsOn: 'model',
      value: 'viduq1-classic',
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.DEFAULT,
        required: false,
        min: 5,
        max: 5,
        default: 5,
        unit: 's'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RADIO,
        required: false,
        options: ['1080p'],
        default: '1080p'
      }
    },
    {
      dependsOn: 'model',
      value: 'vidu2.0',
      duration: {
        type: ParamType.ENUM,
        elementType: ElementType.SLIDER,
        required: false,
        min: 4,
        max: 8,
        step: 4,
        default: 4,
        unit: 's'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        options: ['360p', '720p', '1080p'],
        default: '360p'
      }
    }
  ]
}
