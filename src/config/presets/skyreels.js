/**
 * Skyreels 预设配置
 */

module.exports = {
  name: 'skyreels',
  baseURL: 'https://api-gateway.skyreels.ai/api/v1',
  timeout: 120000,
  retryCount: 3,
  retryDelay: 2000,
  models: {
    video: {
      default: 'skyreels-v4',
      options: ['skyreels-v3', 'skyreels-v4']
    },
    avatar: {
      default: 'skyreels-v3',
      options: ['skyreels-v3']
    }
  },
  rateLimit: {
    requestsPerMinute: 60
  }
}
