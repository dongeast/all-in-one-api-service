/**
 * 音频类共用参数
 */

const { textPrompt } = require('../templates')

module.exports = {
  input: {
    prompt: {
      ...textPrompt.prompt,
      description: '输入文本',
      maxLength: 4096
    },

    voice: {
      type: 'string',
      required: false,
      description: '语音类型',
      default: 'alloy'
    },

    speed: {
      type: 'number',
      required: false,
      description: '语速',
      min: 0.25,
      max: 4.0,
      default: 1.0
    },

    format: {
      type: 'enum',
      required: false,
      description: '音频格式',
      options: ['mp3', 'opus', 'aac', 'flac', 'wav', 'pcm'],
      default: 'mp3'
    },

    language: {
      type: 'string',
      required: false,
      description: '语言代码'
    },

    file: {
      type: 'string',
      required: false,
      description: '音频文件路径或URL'
    }
  },

  output: {
    audioUrl: {
      type: 'string',
      description: '音频URL',
      path: 'data.url'
    },

    audioContent: {
      type: 'string',
      description: 'Base64编码的音频内容',
      path: 'data.b64_json'
    },

    transcript: {
      type: 'string',
      description: '转录文本',
      path: 'text'
    },

    duration: {
      type: 'number',
      description: '音频时长（秒）',
      path: 'duration'
    }
  }
}
