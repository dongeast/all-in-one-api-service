/**
 * Claude 3 Sonnet 参数模式
 */

const claudeCommon = require('./claude-common')

module.exports = {
  input: {
    ...claudeCommon.input,

    model: {
      type: 'string',
      required: false,
      description: '模型名称',
      default: 'claude-3-sonnet-20240229'
    }
  },

  output: claudeCommon.output
}
