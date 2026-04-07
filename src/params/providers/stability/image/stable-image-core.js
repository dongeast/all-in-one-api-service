/**
 * Stable Image Core 参数模式
 */

const sdCommon = require('./sd-common')

module.exports = {
  input: {
    ...sdCommon.input,

    aspectRatio: {
      type: 'enum',
      required: false,
      description: '宽高比',
      options: ['16:9', '1:1', '21:9', '2:3', '3:2', '4:5', '5:4', '9:16', '9:21'],
      default: '1:1'
    },

    outputFormat: {
      type: 'enum',
      required: false,
      description: '输出格式',
      options: ['png', 'jpeg', 'webp'],
      default: 'png'
    }
  },

  output: sdCommon.output
}
