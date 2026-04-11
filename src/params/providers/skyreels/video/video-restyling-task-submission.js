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
      description: 'Original video URL, supports MP4 format, max 30 seconds',
      format: 'uri'
    },

    style_name: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: true,
      description: 'Target video style name',
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
