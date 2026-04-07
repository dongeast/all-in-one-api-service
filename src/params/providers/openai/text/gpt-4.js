/**
 * GPT-4 参数模式
 */

const gptCommon = require('./gpt-common')

module.exports = {
  input: {
    ...gptCommon.input,

    model: {
      type: 'string',
      required: false,
      description: '模型名称',
      default: 'gpt-4'
    }
  },

  output: gptCommon.output
}
