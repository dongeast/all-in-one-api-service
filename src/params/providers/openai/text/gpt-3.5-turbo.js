/**
 * GPT-3.5 Turbo 参数模式
 */

const gptCommon = require('./gpt-common')

module.exports = {
  input: {
    ...gptCommon.input,

    model: {
      type: 'string',
      required: false,
      description: '模型名称',
      default: 'gpt-3.5-turbo'
    }
  },

  output: gptCommon.output
}
