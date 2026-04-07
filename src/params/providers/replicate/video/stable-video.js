/**
 * Stable Video 参数模式
 */

const videoCommon = require('../../../common/video-common')

module.exports = {
  input: {
    ...videoCommon.input,

    fps: {
      type: 'number',
      required: false,
      description: '帧率',
      min: 1,
      max: 24,
      integer: true,
      default: 6
    },

    motionBucketId: {
      type: 'number',
      required: false,
      description: '运动强度',
      min: 1,
      max: 255,
      integer: true,
      default: 127
    },

    condAug: {
      type: 'number',
      required: false,
      description: '条件增强',
      min: 0,
      max: 1,
      default: 0.02
    },

    decodingT: {
      type: 'number',
      required: false,
      description: '解码时间步数',
      min: 1,
      max: 14,
      integer: true,
      default: 14
    }
  },

  output: {
    videoUrl: {
      type: 'string',
      description: '视频URL',
      path: 'output'
    },

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
