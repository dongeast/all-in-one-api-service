/**
 * 预设配置入口
 */

const openai = require('./openai')
const stability = require('./stability')
const replicate = require('./replicate')
const gemini = require('./gemini')
const anthropic = require('./anthropic')
const midjourney = require('./midjourney')
const skyreels = require('./skyreels')

module.exports = {
  version: '1.0',
  defaultProvider: 'openai',
  providers: {
    openai,
    stability,
    replicate,
    gemini,
    anthropic,
    midjourney,
    skyreels
  },
  logging: {
    level: 'info',
    format: 'json'
  }
}
