/**
 * API层入口
 */

const BaseAPI = require('./base-api')

const Skyreels = require('./skyreels')
const LTX = require('./ltx')
const Volcengine = require('./volcengine')
const Mureka = require('./mureka')

module.exports = {
  BaseAPI,
  Skyreels,
  LTX,
  Volcengine,
  Mureka
}
