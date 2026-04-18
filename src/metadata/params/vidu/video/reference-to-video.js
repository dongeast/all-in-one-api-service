/**
 * 参考生视频参数定义
 * 支持模型: viduq3-turbo, viduq3, viduq2-pro, viduq2, viduq1, vidu2.0
 * todo 这个接口比较复杂，暂时不实现
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
        'viduq3',
        'viduq2-pro',
        'viduq2',
        'viduq1',
        'vidu2.0'
      ]
    },

    auto_subjects: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Use intelligent subject library',
      default: false
    },

    subjects: {
      type: ParamType.ARRAY,
      elementType: ElementType.DEFAULT,
      required: true,
      description: 'Subject list (use @subject_name in prompt to reference)',
      items: {
        type: ParamType.OBJECT,
        properties: {
          name: {
            type: ParamType.STRING,
            description: 'Subject ID for @subject_id reference',
            required: true
          },
          images: {
            type: ParamType.ARRAY,
            elementType: ElementType.IMAGE_UPLOAD,
            description: 'Subject images (max 3 per subject)',
            maxItems: 3
          },
          videos: {
            type: ParamType.ARRAY,
            elementType: ElementType.UPLOAD,
            description: 'Subject videos (only viduq2-pro, max 1 video up to 5s)',
            maxItems: 1
          },
          voice_id: {
            type: ParamType.STRING,
            description: 'Voice ID for this subject'
          }
        }
      }
    },

    prompt: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: true,
      description: 'Text description (use @subject_name to reference subjects)',
      minLength: 1,
      maxLength: 5000
    },

    audio: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Audio-video sync (viduq3, viduq3-turbo default: true)',
      default: false
    },

    audio_type: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: 'Audio type when audio is enabled',
      options: ['all', 'speech_only', 'sound_effect_only'],
      default: 'all'
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

    aspect_ratio: {
      type: ParamType.ENUM,
      elementType: ElementType.RATIO,
      required: false,
      description: 'Aspect ratio',
      default: '16:9'
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
    audio: {
      type: ParamType.BOOLEAN,
      description: 'Whether audio-video sync was enabled',
      path: 'audio'
    },
    audio_type: {
      type: ParamType.STRING,
      description: 'Audio type output',
      path: 'audio_type'
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
        description: 'Video duration (3-16 seconds)',
        min: 3,
        max: 16,
        default: 5,
        unit: 's'
      },
      aspect_ratio: {
        type: ParamType.ENUM,
        elementType: ElementType.RATIO,
        required: false,
        description: 'Aspect ratio',
        options: ['16:9', '9:16', '1:1'],
        default: '16:9'
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
      value: 'viduq3',
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        description: 'Video duration (3-16 seconds)',
        min: 3,
        max: 16,
        default: 5,
        unit: 's'
      },
      aspect_ratio: {
        type: ParamType.ENUM,
        elementType: ElementType.RATIO,
        required: false,
        description: 'Aspect ratio',
        options: ['16:9', '9:16', '1:1'],
        default: '16:9'
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
      value: 'viduq2-pro',
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        description: 'Video duration (0-10 seconds, 0 for auto-detect)',
        min: 0,
        max: 10,
        default: 5,
        unit: 's'
      },
      aspect_ratio: {
        type: ParamType.ENUM,
        elementType: ElementType.RATIO,
        required: false,
        description: 'Aspect ratio',
        options: ['16:9', '9:16', '1:1'],
        default: '16:9'
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
      value: 'viduq2',
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        description: 'Video duration (1-10 seconds)',
        min: 1,
        max: 10,
        default: 5,
        unit: 's'
      },
      aspect_ratio: {
        type: ParamType.ENUM,
        elementType: ElementType.RATIO,
        required: false,
        description: 'Aspect ratio',
        options: ['16:9', '9:16', '1:1'],
        default: '16:9'
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
      aspect_ratio: {
        type: ParamType.ENUM,
        elementType: ElementType.RATIO,
        required: false,
        description: 'Aspect ratio',
        options: ['16:9', '9:16', '1:1'],
        default: '16:9'
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
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        description: 'Video duration (4 seconds)',
        min: 4,
        max: 4,
        default: 4,
        unit: 's'
      },
      aspect_ratio: {
        type: ParamType.ENUM,
        elementType: ElementType.RATIO,
        required: false,
        description: 'Aspect ratio',
        options: ['16:9', '9:16', '1:1'],
        default: '16:9'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Resolution',
        options: ['360p', '720p'],
        default: '360p'
      }
    }
  ]
}
