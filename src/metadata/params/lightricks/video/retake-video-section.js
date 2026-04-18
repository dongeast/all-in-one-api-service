/**
 * Retake Video Section 参数定义
 * 支持模型: ltx-2-pro, ltx-2-3-pro
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    video_uri: {
      type: ParamType.STRING,
      elementType: ElementType.UPLOAD,
      required: true,
      description: 'Input video URI for editing. Max resolution: 3840x2160 (4K), min frames: 73 (about 3 seconds @24fps)'
    },

    start_time: {
      type: ParamType.NUMBER,
      elementType: ElementType.INPUT,
      required: true,
      description: 'Start time (seconds), defines the section to edit',
      min: 0
    },

    duration: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: true,
      description: 'Duration (seconds), defines the duration of the section. Must be at least 2 seconds',
      min: 2,
      max: 20,
      default: 8,
      unit: 's'
    },

    prompt: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: false,
      description: 'Describe what should happen in the generated video section',
      minLength: 1,
      maxLength: 5000
    },

    mode: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      default: 'replace_audio_and_video',
      description: 'Edit mode for video section',
      options: ['replace_audio', 'replace_video', 'replace_audio_and_video']
    },

    resolution: {
      type: ParamType.ENUM,
      elementType: ElementType.RESOLUTION,
      required: false,
      description: 'Generated video resolution. Automatically determined by input video orientation',
      options: [
        '1920x1080',
        '1080x1920',
        '2560x1440',
        '1440x2560',
        '3840x2160',
        '2160x3840'
      ]
    },

    model: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      default: 'ltx-2-3-pro',
      description: 'Model to use (only Pro models supported: ltx-2-pro, ltx-2-3-pro)',
      options: ['ltx-2-pro', 'ltx-2-3-pro']
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
      value: 'ltx-2-3-pro',
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Generated video resolution. Automatically determined by input video orientation',
        options: [
          '1920x1080',
          '1080x1920',
          '2560x1440',
          '1440x2560',
          '3840x2160',
          '2160x3840'
        ]
      }
    },
    {
      dependsOn: 'model',
      value: 'ltx-2-pro',
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Generated video resolution (LTX-2 only supports landscape 16:9)',
        options: [
          '1920x1080',
          '2560x1440',
          '3840x2160'
        ]
      }
    }
  ]
}
