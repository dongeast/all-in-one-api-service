/**
 * Generate Video from Text 参数定义
 */

const ltxCommon = require('../ltx-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    prompt: ltxCommon.input.prompt,

    model: {
      ...ltxCommon.input.model,
      required: true,
      description: 'Model to use (supports: ltx-2-fast, ltx-2-pro, ltx-2-3-fast, ltx-2-3-pro)'
    },

    duration: {
      ...ltxCommon.input.duration,
      required: true,
      description: 'Video duration (seconds), different available duration options depending on model'
    },

    resolution: {
      ...ltxCommon.input.resolution,
      required: true,
      description: 'Output video resolution (e.g.: 1920x1080, 1080x1920, 2560x1440, 3840x2160)'
    },

    fps: {
      ...ltxCommon.input.fps,
      description: 'Frame rate, different available frame rates depending on model and resolution'
    },

    generate_audio: {
      ...ltxCommon.input.generate_audio,
      description: 'Whether to generate audio for video, true includes AI-generated audio, false generates silent video only'
    },

    camera_motion: {
      ...ltxCommon.input.camera_motion,
      description: 'Apply camera motion effect to generated video'
    }
  },

  output: {
    video: ltxCommon.output.video,
    contentType: ltxCommon.output.contentType,
    error: ltxCommon.output.error
  }
}
