/**
 * 反向提示词模板
 */

module.exports = {
  negativePrompt: {
    type: 'string',
    required: false,
    description: 'Negative prompt (content to avoid)',
    maxLength: 10000,
    default: ''
  }
}
