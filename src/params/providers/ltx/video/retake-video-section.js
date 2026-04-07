/**
 * Retake Video Section 参数定义
 */

const ltxCommon = require('../ltx-common')

module.exports = {
  input: {
    video_uri: {
      ...ltxCommon.input.video_uri,
      required: true,
      description: '输入视频URI用于编辑。最大分辨率：3840x2160 (4K)，最小帧数：73（约3秒@24fps）'
    },

    start_time: {
      ...ltxCommon.input.start_time,
      required: true,
      description: '开始时间（秒），定义要编辑的部分'
    },

    duration: {
      ...ltxCommon.input.duration,
      required: true,
      description: '时长（秒），定义该部分的持续时间。必须至少2秒'
    },

    prompt: {
      ...ltxCommon.input.prompt,
      required: false,
      description: '描述生成的视频部分中需要发生的内容'
    },

    mode: {
      ...ltxCommon.input.mode,
      required: false,
      default: 'replace_audio_and_video',
      description: '视频部分的编辑模式',
      options: ['replace_audio', 'replace_video', 'replace_audio_and_video']
    },

    resolution: {
      ...ltxCommon.input.resolution,
      required: false,
      description: '生成的视频分辨率。由输入视频方向自动确定'
    },

    model: {
      ...ltxCommon.input.model,
      required: false,
      default: 'ltx-2-3-pro',
      description: '使用的模型（仅支持Pro模型：ltx-2-pro, ltx-2-3-pro）',
      options: ['ltx-2-pro', 'ltx-2-3-pro']
    }
  },

  output: {
    video: ltxCommon.output.video,
    contentType: ltxCommon.output.contentType,
    error: ltxCommon.output.error
  }
}
