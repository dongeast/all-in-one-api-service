/**
 * Midjourney V6 参数模式
 */

const imageCommon = require('../../../common/image-common')

module.exports = {
  input: {
    ...imageCommon.input,

    prompt: {
      ...imageCommon.input.prompt,
      description: '图像生成提示词（支持Midjourney参数）',
      maxLength: 6000
    },

    aspectRatio: {
      type: 'enum',
      required: false,
      description: '宽高比',
      options: ['1:1', '2:3', '3:2', '4:5', '5:4', '9:16', '16:9'],
      default: '1:1'
    },

    version: {
      type: 'enum',
      required: false,
      description: '模型版本',
      options: ['v5', 'v5.1', 'v5.2', 'v6'],
      default: 'v6'
    },

    stylize: {
      type: 'number',
      required: false,
      description: '风格化程度',
      min: 0,
      max: 1000,
      integer: true,
      default: 100
    },

    chaos: {
      type: 'number',
      required: false,
      description: '混乱度',
      min: 0,
      max: 100,
      integer: true,
      default: 0
    },

    quality: {
      type: 'enum',
      required: false,
      description: '质量',
      options: ['low', 'medium', 'high'],
      default: 'high'
    },

    mode: {
      type: 'enum',
      required: false,
      description: '模式',
      options: ['fast', 'relax', 'turbo'],
      default: 'fast'
    }
  },

  output: {
    imageUrl: {
      type: 'string',
      description: '生成的图像URL',
      path: 'imageUrl'
    },

    taskId: {
      type: 'string',
      description: '任务ID',
      path: 'taskId'
    },

    status: {
      type: 'string',
      description: '任务状态',
      path: 'status'
    },

    progress: {
      type: 'number',
      description: '进度百分比',
      path: 'progress'
    }
  }
}
