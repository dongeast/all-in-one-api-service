/**
 * Generate Video from Audio 参数定义
 */

const ltxCommon = require('../ltx-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    audio_uri: {
      ...ltxCommon.input.audio_uri,
      required: true,
      description: 'Audio file URI to use as video soundtrack. Duration must be between 2 and 20 seconds'
    },

    image_uri: {
      ...ltxCommon.input.image_uri,
      required: false,
      description: 'Input image URI to use as the first frame of the video. Required if prompt is not provided'
    },

    prompt: {
      ...ltxCommon.input.prompt,
      required: false,
      description: 'Text describing how the video should be generated. Required if image_uri is not provided'
    },

    resolution: {
      ...ltxCommon.input.resolution,
      required: false,
      description: 'Generated video resolution, format is WIDTHxHEIGHT. Automatically determined by image orientation'
    },

    guidance_scale: {
      ...ltxCommon.input.guidance_scale,
      description: 'Video generation guidance scale (CFG). Default is 5 for text-to-video, 9 when image is provided'
    },

    model: {
      ...ltxCommon.input.model,
      required: false,
      default: 'ltx-2-3-pro',
      description: 'Model to use (only Pro models supported: ltx-2-pro, ltx-2-3-pro)',
      options: ['ltx-2-pro', 'ltx-2-3-pro']
    }
  },

  validation: {
    conditionalRequired: [
      {
        condition: (params) => !params.image_uri,
        requiredParams: ['prompt'],
        message: '当未提供image_uri时，prompt参数为必填项'
      },
      {
        condition: (params) => !params.prompt,
        requiredParams: ['image_uri'],
        message: '当未提供prompt时，image_uri参数为必填项'
      }
    ],
    mutuallyExclusive: [
      {
        params: ['image_uri', 'prompt'],
        mode: 'at_least_one',
        message: 'image_uri和prompt参数至少需要提供一个'
      }
    ]
  },

  output: {
    video: ltxCommon.output.video,
    contentType: ltxCommon.output.contentType,
    error: ltxCommon.output.error
  }
}
