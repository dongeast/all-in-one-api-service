/**
 * Extend Video Duration 参数定义
 */

const ltxCommon = require('../ltx-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    video_uri: {
      ...ltxCommon.input.video_uri,
      required: true,
      description: 'Input video URI for extension. Aspect ratio: 16:9 and 9:16. Max resolution: 3840x2160 (4K). Min frames: 73 (about 3 seconds @24fps)'
    },

    duration: {
      ...ltxCommon.input.duration,
      required: true,
      description: 'Extended video duration (seconds). Min 2 seconds, max 20 seconds (480 frames @24fps)'
    },

    prompt: {
      ...ltxCommon.input.prompt,
      required: false,
      description: 'Describe what should happen in the extended section'
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
      ...ltxCommon.input.model,
      required: false,
      default: 'ltx-2-3-pro',
      description: 'Model to use (only Pro models supported: ltx-2-pro, ltx-2-3-pro)',
      options: ['ltx-2-pro', 'ltx-2-3-pro']
    },

    context: {
      ...ltxCommon.input.context,
      required: false,
      description: 'Context duration from input video (seconds). Max 20 seconds. Context + duration frames ≤ 505 frames (about 21 seconds @24fps)'
    }
  },

  output: {
    video: ltxCommon.output.video,
    contentType: ltxCommon.output.contentType,
    error: ltxCommon.output.error
  }
}
