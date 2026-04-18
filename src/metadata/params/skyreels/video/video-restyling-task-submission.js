/**
 * Video Restyling Task Submission 参数定义
 * 支持模型: Skyreels V3
 */

const { ParamType, ElementType } = require('../../common')

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
    task_id: {
      type: 'string',
      description: 'Task ID',
      path: 'task_id'
    },

    msg: {
      type: 'string',
      description: 'Message description',
      path: 'msg'
    },

    code: {
      type: 'number',
      description: 'Status code',
      path: 'code'
    },

    status: {
      type: 'string',
      description: 'Task status',
      path: 'status'
    },

    trace_id: {
      type: 'string',
      description: 'Request trace ID',
      path: 'trace_id'
    }
  }
}
