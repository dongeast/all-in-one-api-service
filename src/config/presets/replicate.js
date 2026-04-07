/**
 * Replicate 预设配置
 */

module.exports = {
  name: 'replicate',
  baseURL: 'https://api.replicate.com/v1',
  timeout: 120000,
  retryCount: 3,
  retryDelay: 2000,
  models: {
    image: {
      default: 'black-forest-labs/flux-schnell',
      options: [
        'black-forest-labs/flux-schnell',
        'black-forest-labs/flux-dev'
      ]
    },
    video: {
      default: 'stability-ai/stable-video-diffusion',
      options: [
        'stability-ai/stable-video-diffusion'
      ]
    }
  },
  rateLimit: {
    requestsPerMinute: 60
  }
}
