/**
 * Stable Diffusion XL 参数模式
 */

const sdCommon = require('./sd-common')

module.exports = {
  input: {
    ...sdCommon.input,

    width: {
      type: 'number',
      required: false,
      description: '图像宽度',
      min: 512,
      max: 2048,
      integer: true,
      default: 1024
    },

    height: {
      type: 'number',
      required: false,
      description: '图像高度',
      min: 512,
      max: 2048,
      integer: true,
      default: 1024
    }
  },

  output: sdCommon.output
}
