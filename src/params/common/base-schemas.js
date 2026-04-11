/**
 * 基础参数模式定义
 */

module.exports = {
  prompt: {
    type: 'string',
    required: true,
    description: 'Prompt',
    minLength: 1
  },

  model: {
    type: 'string',
    required: false,
    description: 'Model name'
  },

  timeout: {
    type: 'number',
    required: false,
    description: 'Timeout (milliseconds)',
    min: 1000,
    max: 300000,
    default: 30000
  },

  retryCount: {
    type: 'number',
    required: false,
    description: 'Number of retries',
    min: 0,
    max: 10,
    integer: true,
    default: 3
  }
}
