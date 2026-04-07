/**
 * OpenAI 视频参数 - Sora
 */

const videoCommon = require('../../../common/video-common')

module.exports = {
  input: {
    ...videoCommon.input,

    aspectRatio: {
      type: 'enum',
      required: false,
      description: '视频宽高比',
      options: ['16:9', '9:16', '1:1'],
      default: '16:9'
    }
  },

  output: {
    ...videoCommon.output,

    taskId: {
      type: 'string',
      description: '任务ID',
      path: 'id'
    },

    status: {
      type: 'string',
      description: '任务状态',
      path: 'status'
    }
  }
}
