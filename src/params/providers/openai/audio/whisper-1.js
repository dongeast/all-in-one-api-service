/**
 * Whisper-1 参数模式
 */

module.exports = {
  input: {
    file: {
      type: 'string',
      required: true,
      description: '音频文件路径或URL'
    },

    model: {
      type: 'string',
      required: false,
      description: '模型名称',
      default: 'whisper-1'
    },

    language: {
      type: 'string',
      required: false,
      description: '音频语言代码'
    },

    prompt: {
      type: 'string',
      required: false,
      description: '可选提示词'
    },

    responseFormat: {
      type: 'enum',
      required: false,
      description: '输出格式',
      options: ['json', 'text', 'srt', 'verbose_json', 'vtt'],
      default: 'json'
    },

    temperature: {
      type: 'number',
      required: false,
      description: '采样温度',
      min: 0,
      max: 1,
      default: 0
    }
  },

  output: {
    transcript: {
      type: 'string',
      description: '转录文本',
      path: 'text'
    },

    language: {
      type: 'string',
      description: '检测到的语言',
      path: 'language'
    },

    duration: {
      type: 'number',
      description: '音频时长（秒）',
      path: 'duration'
    }
  }
}
