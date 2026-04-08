/**
 * 预设配置入口
 */

const skyreels = require('./skyreels')
const ltx = require('./ltx')
const volcengine = require('./volcengine')
const mureka = require('./mureka')

module.exports = {
  version: '1.0',
  defaultProvider: 'ltx',
  providers: {
    skyreels,
    ltx,
    volcengine,
    mureka
  },
  logging: {
    level: 'info',
    format: 'json'
  }
}
