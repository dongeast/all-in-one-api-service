/**
 * 服务商参数模式入口
 */

const openai = require('./openai')
const stability = require('./stability')
const replicate = require('./replicate')
const gemini = require('./gemini')
const anthropic = require('./anthropic')
const midjourney = require('./midjourney')
const skyreels = require('./skyreels')

module.exports = {
  openai,
  stability,
  replicate,
  gemini,
  anthropic,
  midjourney,
  skyreels
}
