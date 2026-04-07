/**
 * 基础参数模式定义
 */

module.exports = {
  prompt: {
    type: 'string',
    required: true,
    description: '提示词',
    minLength: 1
  },

  model: {
    type: 'string',
    required: false,
    description: '模型名称'
  },

  timeout: {
    type: 'number',
    required: false,
    description: '超时时间（毫秒）',
    min: 1000,
    max: 300000,
    default: 30000
  },

  retryCount: {
    type: 'number',
    required: false,
    description: '重试次数',
    min: 0,
    max: 10,
    integer: true,
    default: 3
  }
}
