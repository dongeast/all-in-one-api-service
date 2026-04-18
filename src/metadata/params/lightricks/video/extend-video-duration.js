/**
 * Extend Video Duration 参数定义
 * 支持模型: ltx-2-pro, ltx-2-3-pro
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    video_uri: {
      type: ParamType.STRING,
      elementType: ElementType.UPLOAD,
      required: true,
      description: 'Input video URI for extension. Aspect ratio: 16:9 and 9:16. Max resolution: 3840x2160 (4K). Min frames: 73 (about 3 seconds @24fps)'
    },

    duration: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: true,
      description: 'Extended video duration (seconds). Min 2 seconds, max 20 seconds (480 frames @24fps)',
      min: 2,
      max: 20,
      default: 8,
      unit: 's'
    },

    prompt: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: false,
      description: 'Describe what should happen in the extended section',
      minLength: 1,
      maxLength: 5000
    },

    mode: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      default: 'end',
      description: 'Where to extend the video',
      options: ['end', 'start']
    },

    model: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      default: 'ltx-2-3-pro',
      description: 'Model to use (only Pro models supported: ltx-2-pro, ltx-2-3-pro)',
      options: ['ltx-2-pro', 'ltx-2-3-pro']
    },

    context: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Context duration from input video (seconds). Max 20 seconds. Context + duration frames ≤ 505 frames (about 21 seconds @24fps)',
      min: 0,
      max: 20,
      unit: 's'
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
      value: 'ltx-2-3-pro'
    },
    {
      dependsOn: 'model',
      value: 'ltx-2-pro'
    }
  ]
}
