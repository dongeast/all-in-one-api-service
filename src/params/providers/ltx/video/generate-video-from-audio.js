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
      description: '音频文件URI，将用作视频的音轨。时长必须在2到20秒之间'
    },

    image_uri: {
      ...ltxCommon.input.image_uri,
      required: false,
      description: '输入图片URI，将用作视频的第一帧。如果未提供prompt则必需'
    },

    prompt: {
      ...ltxCommon.input.prompt,
      required: false,
      description: '描述视频应该如何生成的文本。如果未提供image_uri则必需'
    },

    resolution: {
      ...ltxCommon.input.resolution,
      required: false,
      description: '生成的视频分辨率，格式为WIDTHxHEIGHT。由图片方向自动确定'
    },

    guidance_scale: {
      ...ltxCommon.input.guidance_scale,
      description: '视频生成的引导比例（CFG）。文本生成视频默认为5，提供图片时默认为9'
    },

    model: {
      ...ltxCommon.input.model,
      required: false,
      default: 'ltx-2-3-pro',
      description: '使用的模型（仅支持Pro模型：ltx-2-pro, ltx-2-3-pro）',
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
