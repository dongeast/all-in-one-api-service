/**
 * OpenAI 服务商参数入口
 */

const image = require('./image')
const text = require('./text')
const video = require('./video')
const audio = require('./audio')

module.exports = {
  image,
  text,
  video,
  audio
}
