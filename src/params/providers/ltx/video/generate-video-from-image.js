/**
 * Generate Video from Image 参数定义
 */

const ltxCommon = require('../ltx-common')

module.exports = {
  input: {
    image_uri: {
      ...ltxCommon.input.image_uri,
      required: true,
      description: '图片URI，将用作视频的第一帧'
    },

    prompt: {
      ...ltxCommon.input.prompt,
      required: true,
      description: '描述图片应该如何动画化的文本'
    },

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
      description: '输出视频分辨率'
    },

    fps: {
      ...ltxCommon.input.fps,
      description: '帧率，根据模型和分辨率不同有不同的可用帧率'
    },

    generate_audio: {
      ...ltxCommon.input.generate_audio,
      description: '是否为视频生成音频'
    },

    last_frame_uri: {
      ...ltxCommon.input.last_frame_uri,
      description: '图片URI，将用作视频的最后一帧。视频将在第一帧和最后一帧之间插值。仅ltx-2-3模型支持'
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
