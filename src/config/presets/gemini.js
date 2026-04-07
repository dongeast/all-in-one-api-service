/**
 * Google Gemini 预设配置
 */

module.exports = {
  name: 'gemini',
  baseURL: 'https://generativelanguage.googleapis.com/v1',
  timeout: 30000,
  retryCount: 3,
  retryDelay: 1000,
  models: {
    text: {
      default: 'gemini-pro',
      options: ['gemini-pro', 'gemini-ultra']
    },
    image: {
      default: 'imagen',
      options: ['imagen']
    }
  },
  rateLimit: {
    requestsPerMinute: 60
  }
}
