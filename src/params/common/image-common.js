/**
 * 图像类共用参数
 */

const { textPrompt, seed } = require('../templates')

module.exports = {
  input: {
    prompt: {
      ...textPrompt.prompt,
      description: 'Image generation prompt',
      maxLength: 4000
    },

    negativePrompt: {
      type: 'string',
      required: false,
      description: 'Negative prompt',
      default: ''
    },

    seed: seed.seed,

    width: {
      type: 'number',
      required: false,
      description: 'Image width',
      min: 64,
      max: 2048,
      integer: true
    },

    height: {
      type: 'number',
      required: false,
      description: 'Image height',
      min: 64,
      max: 2048,
      integer: true
    },

    numOutputs: {
      type: 'number',
      required: false,
      description: 'Number of images to generate',
      min: 1,
      max: 10,
      integer: true,
      default: 1
    }
  },

  output: {
    images: {
      type: 'array',
      description: 'Generated image list',
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
      description: 'First image URL',
      path: 'data[0].url'
    },

    imageId: {
      type: 'string',
      description: 'Image ID',
      path: 'data[0].id'
    },

    created: {
      type: 'number',
      description: 'Creation timestamp',
      path: 'created'
    }
  }
}
