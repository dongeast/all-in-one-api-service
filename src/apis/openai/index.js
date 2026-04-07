/**
 * OpenAI 服务商API入口
 */

const Image = require('./image')
const Text = require('./text')
const Video = require('./video')
const Audio = require('./audio')

module.exports = {
  Image,
  Text,
  Video,
  Audio
}
