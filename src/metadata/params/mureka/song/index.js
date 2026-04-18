/**
 * Mureka Song 参数入口
 */

const generateSong = require('./generate-song')
const extendSong = require('./extend-song')
const describeSong = require('./describe-song')
const recognizeSong = require('./recognize-song')
const stemSong = require('./stem-song')
const queryTask = require('./query-task')

module.exports = {
  generateSong,
  extendSong,
  describeSong,
  recognizeSong,
  stemSong,
  queryTask
}
