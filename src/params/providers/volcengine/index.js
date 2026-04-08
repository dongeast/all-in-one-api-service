/**
 * 火山引擎参数层入口
 */

const volcengineCommon = require('./volcengine-common')
const modelCapabilities = require('./model-capabilities')
const image = require('./image')
const video = require('./video')
const threeD = require('./3d')

module.exports = {
  common: volcengineCommon,
  modelCapabilities,
  image,
  video,
  '3d': threeD
}
