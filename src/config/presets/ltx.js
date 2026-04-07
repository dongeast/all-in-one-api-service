/**
 * LTX 预设配置
 */

module.exports = {
  name: 'ltx',
  baseURL: 'https://api.ltx.video',
  timeout: 300000,
  retryCount: 3,
  retryDelay: 2000,
  models: {
    video: {
      default: 'ltx-2-3-pro',
      options: ['ltx-2-fast', 'ltx-2-pro', 'ltx-2-3-fast', 'ltx-2-3-pro']
    }
  },
  rateLimit: {
    requestsPerMinute: 60
  }
}
