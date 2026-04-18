/**
 * Mureka 参数模式入口
 */

const files = require('./files')
const instrumental = require('./instrumental')
const lyrics = require('./lyrics')
const song = require('./song')
const tts = require('./tts')
const upload = require('./upload')
const vocal = require('./vocal')

module.exports = {
  files,
  instrumental,
  lyrics,
  song,
  tts,
  upload,
  vocal
}
