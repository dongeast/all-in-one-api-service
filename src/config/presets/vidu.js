/**
 * Vidu 预设配置
 */

module.exports = {
  name: 'vidu',
  baseURL: 'https://api.vidu.cn',
  timeout: 300000,
  retryCount: 3,
  retryDelay: 2000,
  models: {
    video: {
      default: 'viduq3-pro',
      options: [
        'viduq3-mix',
        'viduq3-turbo',
        'viduq3-pro',
        'viduq3-pro-fast',
        'viduq2-pro',
        'viduq2-pro-fast',
        'viduq2-turbo',
        'viduq2',
        'viduq1',
        'viduq1-classic',
        'vidu2.0'
      ]
    },
    image: {
      default: 'viduq2',
      options: ['viduq2', 'viduq1']
    }
  },
  rateLimit: {
    requestsPerMinute: 60
  }
}
