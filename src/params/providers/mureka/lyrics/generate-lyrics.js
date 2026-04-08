/**
 * Generate Lyrics 参数定义
 */

const murekaCommon = require('../mureka-common')

module.exports = {
  input: {
    prompt: {
      type: 'string',
      required: true,
      description: '生成歌词的提示词'
    }
  },

  output: {
    title: {
      type: 'string',
      description: '生成的标题',
      path: 'title'
    },

    lyrics: {
      type: 'string',
      description: '生成的歌词',
      path: 'lyrics'
    }
  }
}
