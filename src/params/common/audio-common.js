/**
 * 音频类共用参数
 */

const { textPrompt } = require('../templates')

module.exports = {
  input: {
    prompt: {
      ...textPrompt.prompt,
      description: 'Input text',
      maxLength: 4096
    },

    voice: {
      type: 'string',
      required: false,
      description: 'Voice type',
      default: 'alloy'
    },

    speed: {
      type: 'number',
      required: false,
      description: 'Speech rate',
      min: 0.25,
      max: 4.0,
      default: 1.0
    },

    format: {
      type: 'enum',
      required: false,
      description: 'Audio format',
      options: ['mp3', 'opus', 'aac', 'flac', 'wav', 'pcm'],
      default: 'mp3'
    },

    language: {
      type: 'string',
      required: false,
      description: 'Language code'
    },

    file: {
      type: 'string',
      required: false,
      description: 'Audio file path or URL'
    }
  },

  output: {
    audioUrl: {
      type: 'string',
      description: 'Audio URL',
      path: 'data.url'
    },

    audioContent: {
      type: 'string',
      description: 'Base64 encoded audio content',
      path: 'data.b64_json'
    },

    transcript: {
      type: 'string',
      description: 'Transcribed text',
      path: 'text'
    },

    duration: {
      type: 'number',
      description: 'Audio duration (seconds)',
      path: 'duration'
    }
  }
}
