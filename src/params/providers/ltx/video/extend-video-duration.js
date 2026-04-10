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
      description: '输入视频URI用于扩展。宽高比：16:9和9:16。最大分辨率：3840x2160 (4K)。最小帧数：73（约3秒@24fps）'
    },

    duration: {
      ...ltxCommon.input.duration,
      required: true,
      description: '扩展视频的时长（秒）。最小2秒，最大20秒（480帧@24fps）'
    },

    prompt: {
      ...ltxCommon.input.prompt,
      required: false,
      description: '描述扩展部分应该发生的内容'
    },

    mode: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      default: 'end',
      description: '在何处扩展视频',
      options: ['end', 'start']
    },

    model: {
      ...ltxCommon.input.model,
      required: false,
      default: 'ltx-2-3-pro',
      description: '使用的模型（仅支持Pro模型：ltx-2-pro, ltx-2-3-pro）',
      options: ['ltx-2-pro', 'ltx-2-3-pro']
    },

    context: {
      ...ltxCommon.input.context,
      required: false,
      description: '从输入视频使用的上下文时长（秒）。最大20秒。上下文+时长帧数≤505帧（约21秒@24fps）'
    }
  },

  output: {
    video: ltxCommon.output.video,
    contentType: ltxCommon.output.contentType,
    error: ltxCommon.output.error
  }
}
