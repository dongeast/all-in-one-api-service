/**
 * Create Podcast 参数定义
 */

const murekaCommon = require('../mureka-common')

module.exports = {
  input: {
    conversations: {
      type: 'array',
      required: true,
      description: '对话内容数组',
      maxItems: 10,
      minItems: 1,
      itemSchema: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            required: true,
            description: '对话文本内容'
          },
          voice: {
            type: 'enum',
            required: true,
            description: '语音选择',
            options: ['Ethan', 'Victoria', 'Jake', 'Luna', 'Emma']
          }
        }
      }
    }
  },

  output: {
    url: {
      type: 'string',
      description: '音频文件URL',
      path: 'url'
    },

    expires_at: {
      type: 'number',
      description: 'URL过期时间戳(秒)',
      path: 'expires_at'
    }
  }
}
