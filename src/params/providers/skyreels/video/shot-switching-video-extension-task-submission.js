/**
 * Shot Switching Video Extension Task Submission 参数定义
 */

const skyreelsCommon = require('../skyreels-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    prompt: {
      ...skyreelsCommon.input.prompt,
      maxLength: 512
    },

    prefix_video: {
      type: ParamType.STRING,
      elementType: ElementType.UPLOAD,
      required: true,
      description: '要扩展的视频,支持MP4格式,最大30秒',
      format: 'uri'
    },

    duration: {
      ...skyreelsCommon.input.duration,
      min: 2,
      max: 5,
      default: 5
    },

    cut_type: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: '镜头切换类型',
      options: [
        'Auto',
        'Cut-In',
        'Cut-Out',
        'Shot/Reverse Shot',
        'Multi-Angle',
        'Cut Away'
      ],
      default: 'Auto'
    }
  },

  output: {
    task_id: skyreelsCommon.output.task_id,
    msg: skyreelsCommon.output.msg,
    code: skyreelsCommon.output.code,
    status: skyreelsCommon.output.status,
    trace_id: skyreelsCommon.output.trace_id
  }
}
