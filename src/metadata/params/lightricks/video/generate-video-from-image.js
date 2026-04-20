/**
 * Generate Video from Image 参数定义
 * 支持模型: ltx-2-fast, ltx-2-pro, ltx-2-3-fast, ltx-2-3-pro
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    image_uri: {
      type: ParamType.STRING,
      elementType: ElementType.IMAGE_UPLOAD,
      required: true,
      maxItems: 1,
      maxSizeMB: 10,
    },

    prompt: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: true,
      minLength: 1,
      maxLength: 5000
    },

    model: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: true,
      options: ['ltx-2-fast', 'ltx-2-pro', 'ltx-2-3-fast', 'ltx-2-3-pro']
    },

    duration: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: true,
      description: 'Video duration (seconds), different available duration options depending on model and resolution',
      min: 6,
      max: 20,
      default: 8,
      unit: 's'
    },

    resolution: {
      type: ParamType.ENUM,
      elementType: ElementType.RESOLUTION,
      required: true,
      description: 'Output video resolution',
      options: [
        '1920x1080',
        '1080x1920',
        '2560x1440',
        '1440x2560',
        '3840x2160',
        '2160x3840'
      ]
    },

    fps: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Frame rate, different available frame rates depending on model and resolution',
      min: 24,
      max: 50,
      integer: true,
      default: 24,
      unit: 'fps'
    },

    generate_audio: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      default: true
    },

    last_frame_uri: {
      // 根据模型适配
      type: ParamType.STRING,
      required: false,
      elementType: ElementType.DEFAULT
    },

    camera_motion: {
      type: ParamType.ENUM,
      elementType: ElementType.CAMERA_MOTION,
      required: false,
      options: [
        'dolly_in',
        'dolly_out',
        'dolly_left',
        'dolly_right',
        'jib_up',
        'jib_down',
        'static',
        'focus_shift'
      ]
    }
  },

  output: {
    video: {
      type: 'buffer',
      description: 'Video binary data',
      path: 'video',
      isResult: true
    },

    contentType: {
      type: 'string',
      description: 'Content type',
      path: 'contentType'
    },

    error: {
      type: 'object',
      description: 'Error information',
      path: 'error'
    }
  },

  cases: [
    {
      dependsOn: 'model',
      value: 'ltx-2-3-fast',
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: true,
        description: 'Output video resolution',
        options: [
          '1920x1080',
          '1080x1920',
          '2560x1440',
          '1440x2560',
          '3840x2160',
          '2160x3840'
        ]
      },
      // 待完善，缺少对 	1080p	24, 25	6, 8, 10, 12, 14, 16, 18, 20 的多级限制支持
      fps: {
        type: ParamType.NUMBER,
        elementType: ElementType.RADIO,
        required: false,
        options: [24, 25, 48, 50],
        default: 24
      },
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: true,
        min: 6,
        max: 10,
        step: 2,
        default: 6
      },
      last_frame_uri: {
        type: ParamType.STRING,
        elementType: ElementType.IMAGE_UPLOAD,
        required: false,
        maxItems: 1,
        maxSizeMB: 10,
      }
    },
    {
      dependsOn: 'model',
      value: 'ltx-2-3-pro',
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: true,
        description: 'Output video resolution',
        options: [
          '1920x1080',
          '1080x1920',
          '2560x1440',
          '1440x2560',
          '3840x2160',
          '2160x3840'
        ]
      },
      fps: {
        type: ParamType.NUMBER,
        elementType: ElementType.RADIO,
        required: false,
        options: [24, 25, 48, 50],
        default: 24
      },
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: true,
        min: 6,
        max: 10,
        step: 2,
        default: 6
      },
      last_frame_uri: {
        type: ParamType.STRING,
        elementType: ElementType.IMAGE_UPLOAD,
        required: false,
        maxItems: 1,
        maxSizeMB: 10,
      }
    },
    {
      dependsOn: 'model',
      value: 'ltx-2-fast',
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: true,
        options: [
          '1920x1080',
          '2560x1440',
          '3840x2160'
        ]
      },
      // 待完善，缺少对 	1080p	25	6, 8, 10, 12, 14, 16, 18, 20 的多级限制支持
      fps: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        options: [25, 50],
        default: 25
      },
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: true,
        min: 6,
        max: 10,
        step: 2,
        default: 6
      }
    },
    {
      dependsOn: 'model',
      value: 'ltx-2-pro',
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: true,
        options: [
          '1920x1080',
          '2560x1440',
          '3840x2160'
        ]
      },
      fps: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        options: [25, 50],
        default: 25
      },
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: true,
        description: 'Video duration (LTX-2 Pro supports 6, 8, 10 seconds)',
        options: [6, 8, 10],
        default: 8
      }
    }
  ]
}
