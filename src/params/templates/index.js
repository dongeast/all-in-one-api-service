/**
 * 参数模板入口
 */

const textPrompt = require('./text-prompt')
const imageSize = require('./image-size')
const seed = require('./seed')
const negativePrompt = require('./negative-prompt')

module.exports = {
  textPrompt,
  imageSize,
  seed,
  negativePrompt
}
