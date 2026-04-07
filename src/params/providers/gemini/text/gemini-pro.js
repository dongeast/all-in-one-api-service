/**
 * Gemini Pro 参数模式
 */

const geminiCommon = require('./gemini-common')

module.exports = {
  input: {
    ...geminiCommon.input,

    model: {
      type: 'string',
      required: false,
      description: '模型名称',
      default: 'gemini-pro'
    }
  },

  output: geminiCommon.output
}
