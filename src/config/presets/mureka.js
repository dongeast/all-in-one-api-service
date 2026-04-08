/**
 * Mureka 预设配置
 */

module.exports = {
  name: 'mureka',
  baseURL: 'https://api.mureka.ai/v1',
  timeout: 120000,
  retryCount: 3,
  retryDelay: 2000,
  models: {
    song: {
      default: 'auto',
      options: ['auto', 'mureka-7.5', 'mureka-7.6', 'mureka-o2', 'mureka-8']
    },
    instrumental: {
      default: 'auto',
      options: ['auto', 'mureka-7.5', 'mureka-7.6', 'mureka-8']
    },
    tts: {
      voices: ['Ethan', 'Victoria', 'Jake', 'Luna', 'Emma']
    }
  },
  rateLimit: {
    requestsPerMinute: 60
  }
}
