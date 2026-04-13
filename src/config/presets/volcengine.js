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
      default: 'doubao-seedream-5-0-260128',
      options: [
        'doubao-seedream-5-0-260128',
        'doubao-seedream-4-5-251128',
        'doubao-seedream-4-0-250828',
        'doubao-seedream-3-0-t2i-250415'
      ]
    },
    video: {
      default: 'doubao-seedance-2-0-260128',
      options: [
        'doubao-seedance-2-0-260128',
        'doubao-seedance-2-0-fast-260128',
        'doubao-seedance-1-5-pro-251215',
        'doubao-seedance-1-0-pro-250528',
        'doubao-seedance-1-0-pro-fast-251015',
        'doubao-seedance-1-0-lite-t2v-250428'
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
