/**
 * Video Restyling Task Submission 参数定义
 */

const skyreelsCommon = require('../skyreels-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    video_url: {
      type: ParamType.STRING,
      elementType: ElementType.UPLOAD,
      required: true,
      description: '原始视频URL,支持MP4格式,最大30秒',
      format: 'uri'
    },

    style_name: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: true,
      description: '目标视频风格名称',
      options: [
        'simpsons',
        'lego',
        'paper_cutting',
        'amigurumi',
        'animal_crossing',
        'van_gogh',
        'pixel_art'
      ]
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
