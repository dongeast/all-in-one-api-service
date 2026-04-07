/**
 * Stability AI 预设配置
 */

module.exports = {
  name: 'stability',
  baseURL: 'https://api.stability.ai/v1',
  timeout: 60000,
  retryCount: 3,
  retryDelay: 1000,
  models: {
    image: {
      default: 'stable-diffusion-xl-1024-v1-0',
      options: [
        'stable-diffusion-xl-1024-v1-0',
        'stable-image-core',
        'stable-image-ultra'
      ]
    }
  },
  rateLimit: {
    requestsPerMinute: 150
  }
}
