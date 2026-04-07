/**
 * 文本提示词模板
 */

module.exports = {
  prompt: {
    type: 'string',
    required: true,
    description: '文本提示词',
    minLength: 1,
    maxLength: 10000
  }
}
