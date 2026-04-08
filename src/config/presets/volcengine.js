/**
 * 火山引擎预设配置
 */

module.exports = {
  name: 'volcengine',
  baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
  timeout: 120000,
  retryCount: 3,
  retryDelay: 2000,
  models: {
    image: {
      default: 'doubao-seedream-5.0-lite',
      options: [
        'doubao-seedream-5.0-lite',
        'doubao-seedream-4.5',
        'doubao-seedream-4.0',
        'doubao-seedream-3.0-t2i'
      ]
    },
    video: {
      default: 'doubao-seedance-2-0',
      options: [
        'doubao-seedance-2-0',
        'doubao-seedance-2-0-fast',
        'doubao-seedance-1-5-pro',
        'doubao-seedance-1-0-pro',
        'doubao-seedance-1-0-pro-fast',
        'doubao-seedance-1-0-lite'
      ]
    },
    '3d': {
      default: 'doubao-seed3d-1-0-250928',
      options: ['doubao-seed3d-1-0-250928']
    }
  },
  rateLimit: {
    requestsPerMinute: 60
  }
}
