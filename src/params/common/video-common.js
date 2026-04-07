/**
 * 视频类共用参数
 */

const { textPrompt, seed } = require('../templates')

module.exports = {
  input: {
    prompt: {
      ...textPrompt.prompt,
      description: '视频生成提示词',
      maxLength: 2000
    },

    seed: seed.seed,

    duration: {
      type: 'number',
      required: false,
      description: '视频时长（秒）',
      min: 1,
      max: 60,
      default: 5
    },

    fps: {
      type: 'number',
      required: false,
      description: '帧率',
      min: 1,
      max: 60,
      integer: true,
      default: 24
    },

    width: {
      type: 'number',
      required: false,
      description: '视频宽度',
      min: 256,
      max: 2048,
      integer: true
    },

    height: {
      type: 'number',
      required: false,
      description: '视频高度',
      min: 256,
      max: 2048,
      integer: true
    }
  },

  output: {
    videoUrl: {
      type: 'string',
      description: '视频URL',
      path: 'data.url'
    },

    videoId: {
      type: 'string',
      description: '视频ID',
      path: 'data.id'
    },

    duration: {
      type: 'number',
      description: '视频时长（秒）',
      path: 'data.duration'
    },

    created: {
      type: 'number',
      description: '创建时间戳',
      path: 'created'
    }
  }
}
