/**
 * Flux 参数模式
 */

const imageCommon = require('../../../common/image-common')

module.exports = {
  input: {
    ...imageCommon.input,

    aspectRatio: {
      type: 'enum',
      required: false,
      description: '宽高比',
      options: ['1:1', '16:9', '2:3', '3:2', '4:5', '5:4', '9:16'],
      default: '1:1'
    },

    numInferenceSteps: {
      type: 'number',
      required: false,
      description: '推理步数',
      min: 1,
      max: 50,
      integer: true,
      default: 28
    },

    guidanceScale: {
      type: 'number',
      required: false,
      description: '引导比例',
      min: 1,
      max: 20,
      default: 3.5
    },

    outputFormat: {
      type: 'enum',
      required: false,
      description: '输出格式',
      options: ['webp', 'jpg', 'png'],
      default: 'webp'
    },

    outputQuality: {
      type: 'number',
      required: false,
      description: '输出质量',
      min: 1,
      max: 100,
      integer: true,
      default: 80
    }
  },

  output: {
    imageUrl: {
      type: 'string',
      description: '生成的图像URL',
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
