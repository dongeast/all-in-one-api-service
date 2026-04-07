/**
 * DALL-E 2 参数模式
 */

const dalleCommon = require('./dall-e-common')

module.exports = {
  input: {
    ...dalleCommon.input,

    size: {
      type: 'enum',
      required: false,
      description: '图像尺寸',
      options: ['256x256', '512x512', '1024x1024'],
      default: '1024x1024'
    },

    n: {
      type: 'number',
      required: false,
      description: '生成图像数量',
      min: 1,
      max: 10,
      integer: true,
      default: 1
    }
  },

  output: dalleCommon.output
}
