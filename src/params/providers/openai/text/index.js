/**
 * OpenAI 文本参数入口
 */

const gptCommon = require('./gpt-common')
const gpt35Turbo = require('./gpt-3.5-turbo')
const gpt4 = require('./gpt-4')
const gpt4Turbo = require('./gpt-4-turbo')

module.exports = {
  gptCommon,
  gpt35Turbo,
  gpt4,
  gpt4Turbo
}
