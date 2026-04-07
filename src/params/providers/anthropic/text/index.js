/**
 * Anthropic 文本参数入口
 */

const claudeCommon = require('./claude-common')
const claude3Opus = require('./claude-3-opus')
const claude3Sonnet = require('./claude-3-sonnet')
const claude3Haiku = require('./claude-3-haiku')

module.exports = {
  claudeCommon,
  claude3Opus,
  claude3Sonnet,
  claude3Haiku
}
