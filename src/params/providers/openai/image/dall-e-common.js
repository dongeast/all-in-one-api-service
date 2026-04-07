/**
 * DALL-E 系列共用参数
 */

const imageCommon = require('../../../common/image-common')

module.exports = {
  input: {
    ...imageCommon.input,

    size: {
      type: 'enum',
      required: false,
      description: '图像尺寸',
      options: ['256x256', '512x512', '1024x1024', '1792x1024', '1024x1792'],
      default: '1024x1024'
    },

    responseFormat: {
      type: 'enum',
      required: false,
      description: '返回格式',
      options: ['url', 'b64_json'],
      default: 'url'
    },

    user: {
      type: 'string',
      required: false,
      description: '用户标识'
    }
  },

  output: {
    ...imageCommon.output,

    revisedPrompt: {
      type: 'string',
      description: 'OpenAI优化后的提示词',
      path: 'data[0].revised_prompt'
    }
  }
}
