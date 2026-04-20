/**
 * Extend Video Duration 参数定义
 * 支持模型: ltx-2-pro, ltx-2-3-pro
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    video_uri: {
      type: ParamType.STRING,
      elementType: ElementType.VIDEO_UPLOAD,
      required: true,
    },

    duration: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: true,
      min: 2,
      max: 20,
      default: 8,
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
      default: 'end',
      options: ['end', 'start']
    },

    model: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      default: 'ltx-2-3-pro',
      options: ['ltx-2-pro', 'ltx-2-3-pro']
    },

    context: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      min: 1,
      max: 20,
      step: 1,
      unit: 's'
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
