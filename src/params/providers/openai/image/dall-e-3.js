/**
 * DALL-E 3 参数模式
 */

const dalleCommon = require('./dall-e-common')

module.exports = {
  input: {
    ...dalleCommon.input,

    size: {
      type: 'enum',
      required: false,
      description: '图像尺寸',
      options: ['1024x1024', '1792x1024', '1024x1792'],
      default: '1024x1024'
    },

    quality: {
      type: 'enum',
      required: false,
      description: '图像质量',
      options: ['standard', 'hd'],
      default: 'standard'
    },

    style: {
      type: 'enum',
      required: false,
      description: '图像风格',
      options: ['vivid', 'natural'],
      default: 'vivid'
    }
  },

  output: dalleCommon.output
}
