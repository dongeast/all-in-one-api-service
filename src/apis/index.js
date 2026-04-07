/**
 * API层入口
 */

const BaseAPI = require('./base-api')

const OpenAI = require('./openai')
const Stability = require('./stability')
const Replicate = require('./replicate')
const Gemini = require('./gemini')
const Anthropic = require('./anthropic')
const Midjourney = require('./midjourney')
const Skyreels = require('./skyreels')

module.exports = {
  BaseAPI,
  OpenAI,
  Stability,
  Replicate,
  Gemini,
  Anthropic,
  Midjourney,
  Skyreels
}
