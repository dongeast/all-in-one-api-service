/**
 * Retake Video Section 参数定义
 * 支持模型: ltx-2-pro, ltx-2-3-pro
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    video_uri: {
      type: ParamType.STRING,
      elementType: ElementType.VIDEO_UPLOAD,
      required: true
    },

    start_time: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: true,
      min: 0,
      max: 180,
      default: 0,
      unit: 's'
    },

    duration: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: true,
      min: 2,
      max: 180,
      default: 5,
      unit: 's'
    },

    prompt: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: false,
      minLength: 1,
      maxLength: 5000
    },

    mode: {
      type: ParamType.ENUM,
      elementType: ElementType.RADIO,
      required: false,
      default: 'replace_audio_and_video',
      options: ['replace_audio', 'replace_video', 'replace_audio_and_video']
    },

    resolution: {
      type: ParamType.ENUM,
      elementType: ElementType.RESOLUTION,
      required: false,
      options: [
        '1920x1080',
        '1080x1920'
      ]
    },

    model: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      default: 'ltx-2-3-pro',
      options: ['ltx-2-pro', 'ltx-2-3-pro']
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
  }
}
