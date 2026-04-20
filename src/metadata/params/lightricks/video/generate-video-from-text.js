/**
 * Generate Video from Text 参数定义
 * 支持模型: ltx-2-fast, ltx-2-pro, ltx-2-3-fast, ltx-2-3-pro
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    prompt: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: true,
      description: 'Text prompt describing the desired video content',
      minLength: 1,
      maxLength: 5000
    },

    model: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: true,
      description: 'Model to use (supports: ltx-2-fast, ltx-2-pro, ltx-2-3-fast, ltx-2-3-pro)',
      options: ['ltx-2-fast', 'ltx-2-pro', 'ltx-2-3-fast', 'ltx-2-3-pro']
    },

    duration: {
      // 视频时长，单位秒，不同模型和分辨率有不同的可用选项
    },

    resolution: {
      // 视频分辨率，不同模型有不同的可用选项
    },

    fps: {
      // 视频帧率，不同模型和分辨率有不同的可用选项
    },

    generate_audio: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Whether to generate audio for video, true includes AI-generated audio, false generates silent video only',
      default: true
    },

    camera_motion: {
      type: ParamType.ENUM,
      elementType: ElementType.CAMERA_MOTION,
      required: false,
      description: 'Apply camera motion effect to generated video',
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
