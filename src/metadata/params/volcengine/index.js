/**
 * 火山引擎参数层入口
 */

const image = require('./image')
const video = require('./video')
const threeD = require('./3d')

module.exports = {
  image,
  video,
  '3d': threeD
}
