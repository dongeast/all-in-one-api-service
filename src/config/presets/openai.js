/**
 * OpenAI 预设配置
 */

module.exports = {
  name: 'openai',
  baseURL: 'https://api.openai.com/v1',
  timeout: 30000,
  retryCount: 3,
  retryDelay: 1000,
  models: {
    image: {
      default: 'dall-e-3',
      options: ['dall-e-2', 'dall-e-3']
    },
    text: {
      default: 'gpt-4',
      options: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo']
    },
    video: {
      default: 'sora',
      options: ['sora']
    },
    audio: {
      default: 'tts-1',
      options: ['tts-1', 'tts-1-hd', 'whisper-1']
    }
  },
  rateLimit: {
    requestsPerMinute: 60,
    tokensPerMinute: 90000
  }
}
