/**
 * Anthropic 预设配置
 */

module.exports = {
  name: 'anthropic',
  baseURL: 'https://api.anthropic.com/v1',
  timeout: 60000,
  retryCount: 3,
  retryDelay: 1000,
  models: {
    text: {
      default: 'claude-3-sonnet-20240229',
      options: [
        'claude-3-opus-20240229',
        'claude-3-sonnet-20240229',
        'claude-3-haiku-20240307'
      ]
    }
  },
  rateLimit: {
    requestsPerMinute: 60
  }
}
