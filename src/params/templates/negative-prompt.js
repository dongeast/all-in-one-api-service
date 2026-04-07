/**
 * 反向提示词模板
 */

module.exports = {
  negativePrompt: {
    type: 'string',
    required: false,
    description: '反向提示词（不希望出现的内容）',
    maxLength: 10000,
    default: ''
  }
}
