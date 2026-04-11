/**
 * 文本提示词模板
 */

module.exports = {
  prompt: {
    type: 'string',
    required: true,
    description: 'Text prompt',
    minLength: 1,
    maxLength: 10000
  }
}
