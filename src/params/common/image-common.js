/**
 * 图像类共用参数
 */

const { textPrompt, seed } = require('../templates')

module.exports = {
  input: {
    prompt: {
      ...textPrompt.prompt,
      description: '图像生成提示词',
      maxLength: 4000
    },

    negativePrompt: {
      type: 'string',
      required: false,
      description: '反向提示词',
      default: ''
    },

    seed: seed.seed,

    width: {
      type: 'number',
      required: false,
      description: '图像宽度',
      min: 64,
      max: 2048,
      integer: true
    },

    height: {
      type: 'number',
      required: false,
      description: '图像高度',
      min: 64,
      max: 2048,
      integer: true
    },

    numOutputs: {
      type: 'number',
      required: false,
      description: '生成图像数量',
      min: 1,
      max: 10,
      integer: true,
      default: 1
    }
  },

  output: {
    images: {
      type: 'array',
      description: '生成的图像列表',
      path: 'data',
      itemSchema: {
        fields: {
          url: { path: 'url' },
          b64Json: { path: 'b64_json' }
        }
      }
    },

    imageUrl: {
      type: 'string',
      description: '第一张图像的URL',
      path: 'data[0].url'
    },

    imageId: {
      type: 'string',
      description: '图像ID',
      path: 'data[0].id'
    },

    created: {
      type: 'number',
      description: '创建时间戳',
      path: 'created'
    }
  }
}
