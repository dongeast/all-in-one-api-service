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
      description: 'Video file URL, supports MP4 format',
      format: 'uri'
    },

    audio_url: {
      type: ParamType.STRING,
      elementType: ElementType.UPLOAD,
      required: true,
      description: 'Audio file URL',
      format: 'uri'
    },

    reference_char_url: {
      type: ParamType.STRING,
      elementType: ElementType.UPLOAD,
      required: false,
      description: 'Reference character image URL for face driving',
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
