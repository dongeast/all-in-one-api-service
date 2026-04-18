/**
 * 火山引擎视频生成任务参数定义
 * 支持模型: Seedance 2.0, Seedance 2.0 fast, Seedance 1.5 pro,
 *          Seedance 1.0 pro, Seedance 1.0 pro fast, Seedance 1.0 lite
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    model: {
      type: ParamType.ENUM,
      elementType: ElementType.DEFAULT,
      required: true,
      description: 'Model ID or endpoint ID',
      options: [
        'doubao-seedance-2-0-260128',
        'doubao-seedance-2-0-fast-260128',
        'doubao-seedance-1-5-pro-251215',
        'doubao-seedance-1-0-pro-250528',
        'doubao-seedance-1-0-pro-fast-251015',
        'doubao-seedance-1-0-lite-t2v-250428'
      ]
    },

    content: {
      type: ParamType.ARRAY,
      elementType: ElementType.TEXTAREA,
      required: true,
      description: 'Video generation input content, supports text, image, audio, video'
    },

    callback_url: {
      type: ParamType.STRING,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Callback URL for task status notification'
    },

    return_last_frame: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Whether to return the last frame of generated video',
      default: false
    },

    service_tier: {
      type: ParamType.ENUM,
      elementType: ElementType.RADIO,
      required: false,
      description: 'Service tier type',
      options: ['default', 'flex'],
      default: 'default'
    },

    execution_expires_after: {
      type: ParamType.NUMBER,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Task timeout threshold (seconds)',
      min: 3600,
      max: 259200,
      default: 172800
    },

    generate_audio: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Whether to generate synchronized audio',
      default: true
    },

    draft: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Whether to enable draft mode',
      default: false
    },

    tools: {
      type: ParamType.ARRAY,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Model tool configuration'
    },

    safety_identifier: {
      type: ParamType.STRING,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'End user unique identifier',
      maxLength: 64
    },

    resolution: {
      type: ParamType.ENUM,
      elementType: ElementType.RESOLUTION,
      required: false,
      description: 'Video resolution',
      options: ['480p', '720p', '1080p'],
      default: '720p'
    },

    ratio: {
      type: ParamType.ENUM,
      elementType: ElementType.RATIO,
      required: false,
      description: 'Generated video aspect ratio',
      options: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9', 'adaptive'],
      default: '16:9'
    },

    duration: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Video duration (seconds)',
      min: 2,
      max: 15,
      default: 5
    },

    frames: {
      type: ParamType.NUMBER,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Video frame count (format: 25+4n, range: 29-289)',
      min: 29,
      max: 289
    },

    seed: {
      type: ParamType.NUMBER,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Random seed for controlling generation randomness (-1 for random)',
      min: -1,
      max: 4294967295,
      default: -1
    },

    camera_fixed: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Whether to fix camera (not supported for reference image scenarios)',
      default: false
    },

    watermark: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Whether to add watermark to video',
      default: false
    }
  },

  output: {
    id: {
      type: 'string',
      description: 'Video generation task ID, valid for 7 days',
      path: 'id',
      isResultField: true
    }
  },

  cases: [
    {
      dependsOn: 'model',
      value: 'doubao-seedance-2-0-260128',
      ratio: {
        type: ParamType.ENUM,
        elementType: ElementType.RATIO,
        required: false,
        description: 'Generated video aspect ratio',
        options: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9', 'adaptive'],
        default: '16:9'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Video resolution',
        options: ['480p', '720p', '1080p'],
        default: '720p'
      },
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        description: 'Video duration (seconds), -1 for auto',
        min: 4,
        max: 15,
        default: 5
      },
      generate_audio: {
        type: ParamType.BOOLEAN,
        elementType: ElementType.SWITCH,
        required: false,
        description: 'Whether to generate synchronized audio',
        default: true
      },
      tools: {
        type: ParamType.ARRAY,
        elementType: ElementType.DEFAULT,
        required: false,
        description: 'Model tool configuration (web search, etc.)'
      }
    },
    {
      dependsOn: 'model',
      value: 'doubao-seedance-2-0-fast-260128',
      ratio: {
        type: ParamType.ENUM,
        elementType: ElementType.RATIO,
        required: false,
        description: 'Generated video aspect ratio',
        options: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9', 'adaptive'],
        default: '16:9'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Video resolution',
        options: ['480p', '720p', '1080p'],
        default: '720p'
      },
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        description: 'Video duration (seconds), -1 for auto',
        min: 4,
        max: 15,
        default: 5
      },
      generate_audio: {
        type: ParamType.BOOLEAN,
        elementType: ElementType.SWITCH,
        required: false,
        description: 'Whether to generate synchronized audio',
        default: true
      },
      tools: {
        type: ParamType.ARRAY,
        elementType: ElementType.DEFAULT,
        required: false,
        description: 'Model tool configuration (web search, etc.)'
      }
    },
    {
      dependsOn: 'model',
      value: 'doubao-seedance-1-5-pro-251215',
      ratio: {
        type: ParamType.ENUM,
        elementType: ElementType.RATIO,
        required: false,
        description: 'Generated video aspect ratio',
        options: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9'],
        default: '16:9'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Video resolution',
        options: ['480p', '720p', '1080p'],
        default: '720p'
      },
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        description: 'Video duration (seconds), -1 for auto',
        min: 4,
        max: 12,
        default: 5
      },
      generate_audio: {
        type: ParamType.BOOLEAN,
        elementType: ElementType.SWITCH,
        required: false,
        description: 'Whether to generate synchronized audio',
        default: true
      },
      draft: {
        type: ParamType.BOOLEAN,
        elementType: ElementType.SWITCH,
        required: false,
        description: 'Whether to enable draft mode',
        default: false
      }
    },
    {
      dependsOn: 'model',
      value: 'doubao-seedance-1-0-pro-250528',
      ratio: {
        type: ParamType.ENUM,
        elementType: ElementType.RATIO,
        required: false,
        description: 'Generated video aspect ratio',
        options: ['16:9', '4:3', '1:1', '3:4', '9:16'],
        default: '16:9'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Video resolution',
        options: ['480p', '720p', '1080p'],
        default: '720p'
      },
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        description: 'Video duration (seconds)',
        min: 2,
        max: 12,
        default: 5
      }
    },
    {
      dependsOn: 'model',
      value: 'doubao-seedance-1-0-pro-fast-251015',
      ratio: {
        type: ParamType.ENUM,
        elementType: ElementType.RATIO,
        required: false,
        description: 'Generated video aspect ratio',
        options: ['16:9', '4:3', '1:1', '3:4', '9:16'],
        default: '16:9'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Video resolution',
        options: ['480p', '720p', '1080p'],
        default: '720p'
      },
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        description: 'Video duration (seconds)',
        min: 2,
        max: 12,
        default: 5
      }
    },
    {
      dependsOn: 'model',
      value: 'doubao-seedance-1-0-lite-t2v-250428',
      ratio: {
        type: ParamType.ENUM,
        elementType: ElementType.RATIO,
        required: false,
        description: 'Generated video aspect ratio',
        options: ['16:9', '4:3', '1:1', '3:4', '9:16'],
        default: '16:9'
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Video resolution',
        options: ['480p', '720p'],
        default: '720p'
      },
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        description: 'Video duration (seconds)',
        min: 2,
        max: 12,
        default: 4
      }
    }
  ]
}
