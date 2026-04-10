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
      description: '使用的模型（支持：ltx-2-fast, ltx-2-pro, ltx-2-3-fast, ltx-2-3-pro）'
    },

    duration: {
      ...ltxCommon.input.duration,
      required: true,
      description: '视频时长（秒），根据模型不同有不同的可用时长选项'
    },

    resolution: {
      ...ltxCommon.input.resolution,
      required: true,
      description: '输出视频分辨率（如：1920x1080, 1080x1920, 2560x1440, 3840x2160）'
    },

    fps: {
      ...ltxCommon.input.fps,
      description: '帧率，根据模型和分辨率不同有不同的可用帧率'
    },

    generate_audio: {
      ...ltxCommon.input.generate_audio,
      description: '是否为视频生成音频，true时包含AI生成的音频，false时仅生成无声视频'
    },

    camera_motion: {
      ...ltxCommon.input.camera_motion,
      description: '对生成的视频应用镜头运动效果'
    }
  },

  output: {
    video: ltxCommon.output.video,
    contentType: ltxCommon.output.contentType,
    error: ltxCommon.output.error
  }
}
