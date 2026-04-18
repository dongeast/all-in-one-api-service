/**
 * Lip Sync Task Submit 参数定义
 * 支持模型: Skyreels V3
 */

const { ParamType, ElementType } = require('../../common')

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
