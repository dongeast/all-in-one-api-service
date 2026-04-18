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
      path: 'video'
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
      fps: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        description: 'Frame rate (LTX-2.3 supports 24, 25, 48, 50 fps)',
        options: [24, 25, 48, 50],
        default: 24
      },
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: true,
        description: 'Video duration (1080p: 6-20s, other resolutions: 6-10s)',
        options: [6, 8, 10, 12, 14, 16, 18, 20],
        default: 8
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
        elementType: ElementType.SLIDER,
        required: false,
        description: 'Frame rate (LTX-2.3 supports 24, 25, 48, 50 fps)',
        options: [24, 25, 48, 50],
        default: 24
      },
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: true,
        description: 'Video duration (LTX-2.3 Pro supports 6, 8, 10 seconds)',
        options: [6, 8, 10],
        default: 8
      }
    },
    {
      dependsOn: 'model',
      value: 'ltx-2-fast',
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: true,
        description: 'Output video resolution (LTX-2 only supports landscape 16:9)',
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
        description: 'Frame rate (LTX-2 supports 25, 50 fps)',
        options: [25, 50],
        default: 25
      },
      duration: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: true,
        description: 'Video duration (1080p: 6-20s, other resolutions: 6-10s)',
        options: [6, 8, 10, 12, 14, 16, 18, 20],
        default: 8
      }
    },
    {
      dependsOn: 'model',
      value: 'ltx-2-pro',
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: true,
        description: 'Output video resolution (LTX-2 only supports landscape 16:9)',
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
        description: 'Frame rate (LTX-2 supports 25, 50 fps)',
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
