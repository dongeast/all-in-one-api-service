/**
 * 全局共用参数模式入口
 */

const baseSchemas = require('./base-schemas')
const imageCommon = require('./image-common')
const videoCommon = require('./video-common')
const textCommon = require('./text-common')
const audioCommon = require('./audio-common')

module.exports = {
  baseSchemas,
  image: imageCommon,
  video: videoCommon,
  text: textCommon,
  audio: audioCommon
}
