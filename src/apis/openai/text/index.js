/**
 * OpenAI 文本API入口
 */

const GPT35Turbo = require('./gpt-3.5-turbo')
const GPT4 = require('./gpt-4')
const GPT4Turbo = require('./gpt-4-turbo')
const GPT4Stream = require('./gpt-4-stream')

module.exports = {
  GPT35Turbo,
  GPT4,
  GPT4Turbo,
  GPT4Stream
}
