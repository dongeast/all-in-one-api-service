/**
 * Generate Video from Image 参数定义
 */

const ltxCommon = require('../ltx-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    image_uri: {
      ...ltxCommon.input.image_uri,
      required: true,
      description: 'Image URI to use as the first frame of the video'
    },

    prompt: {
      ...ltxCommon.input.prompt,
      required: true,
      description: 'Text describing how the image should be animated'
    },

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
      description: 'Output video resolution'
    },

    fps: {
      ...ltxCommon.input.fps,
      description: 'Frame rate, different available frame rates depending on model and resolution'
    },

    generate_audio: {
      ...ltxCommon.input.generate_audio,
      description: 'Whether to generate audio for video'
    },

    last_frame_uri: {
      ...ltxCommon.input.last_frame_uri,
      description: 'Image URI to use as the last frame of the video. Video will interpolate between first and last frame. Only supported by ltx-2-3 models'
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
