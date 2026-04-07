/**
 * Anthropic 文本API入口
 */

const Claude3Opus = require('./claude-3-opus')
const Claude3Sonnet = require('./claude-3-sonnet')
const Claude3Haiku = require('./claude-3-haiku')

module.exports = {
  Claude3Opus,
  Claude3Sonnet,
  Claude3Haiku
}
