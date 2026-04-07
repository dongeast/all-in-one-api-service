/**
 * Claude 3 Haiku 参数模式
 */

const claudeCommon = require('./claude-common')

module.exports = {
  input: {
    ...claudeCommon.input,

    model: {
      type: 'string',
      required: false,
      description: '模型名称',
      default: 'claude-3-haiku-20240307'
    }
  },

  output: claudeCommon.output
}
