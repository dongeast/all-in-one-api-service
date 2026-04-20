/**
 * Generate Video from Audio 参数定义
 * 支持模型: ltx-2-pro, ltx-2-3-pro
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    audio_uri: {
      type: ParamType.STRING,
      elementType: ElementType.AUDIO_UPLOAD,
      maxItems: 1,
      required: true
    },

    image_uri: {
      type: ParamType.STRING,
      elementType: ElementType.IMAGE_UPLOAD,
      required: false,
      maxItems: 1,
      maxSizeMB: 10
    },

    prompt: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: false,
      minLength: 1,
      maxLength: 5000
    },

    resolution: {
      type: ParamType.ENUM,
      elementType: ElementType.RESOLUTION,
      required: false,
      description: 'Generated video resolution, format is WIDTHxHEIGHT. Automatically determined by image orientation',
      options: [
        '1920x1080',
        '1080x1920'
      ]
    },

    guidance_scale: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      min: 1,
      max: 50,
      default: 5
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
