/**
 * Retake Video Section 参数定义
 */

const ltxCommon = require('../ltx-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    video_uri: {
      ...ltxCommon.input.video_uri,
      required: true,
      description: 'Input video URI for editing. Max resolution: 3840x2160 (4K), min frames: 73 (about 3 seconds @24fps)'
    },

    start_time: {
      ...ltxCommon.input.start_time,
      required: true,
      description: 'Start time (seconds), defines the section to edit'
    },

    duration: {
      ...ltxCommon.input.duration,
      required: true,
      description: 'Duration (seconds), defines the duration of the section. Must be at least 2 seconds'
    },

    prompt: {
      ...ltxCommon.input.prompt,
      required: false,
      description: 'Describe what should happen in the generated video section'
    },

    mode: {
      ...ltxCommon.input.mode,
      required: false,
      default: 'replace_audio_and_video',
      description: 'Edit mode for video section',
      options: ['replace_audio', 'replace_video', 'replace_audio_and_video']
    },

    resolution: {
      ...ltxCommon.input.resolution,
      required: false,
      description: 'Generated video resolution. Automatically determined by input video orientation'
    },

    model: {
      ...ltxCommon.input.model,
      required: false,
      default: 'ltx-2-3-pro',
      description: 'Model to use (only Pro models supported: ltx-2-pro, ltx-2-3-pro)',
      options: ['ltx-2-pro', 'ltx-2-3-pro']
    }
  },

  output: {
    video: ltxCommon.output.video,
    contentType: ltxCommon.output.contentType,
    error: ltxCommon.output.error
  }
}
