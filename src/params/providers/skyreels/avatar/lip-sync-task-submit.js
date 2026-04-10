/**
 * Lip Sync Task Submit 参数定义
 */

const skyreelsCommon = require('../skyreels-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    video_url: {
      type: ParamType.STRING,
      elementType: ElementType.UPLOAD,
      required: true,
      description: '视频文件URL,支持MP4格式',
      format: 'uri'
    },

    audio_url: {
      type: ParamType.STRING,
      elementType: ElementType.UPLOAD,
      required: true,
      description: '音频文件URL',
      format: 'uri'
    },

    reference_char_url: {
      type: ParamType.STRING,
      elementType: ElementType.UPLOAD,
      required: false,
      description: '用于人脸驱动的参考角色图片URL',
      format: 'uri'
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
