/**
 * Midjourney 预设配置
 */

module.exports = {
  name: 'midjourney',
  baseURL: 'https://api.midjourney.com/v1',
  timeout: 120000,
  retryCount: 3,
  retryDelay: 2000,
  models: {
    image: {
      default: 'midjourney-v6',
      options: ['midjourney-v5', 'midjourney-v6']
    }
  },
  rateLimit: {
    requestsPerMinute: 20
  }
}
