/**
 * 预设配置入口
 */

const skyreels = require('./skyreels')
const ltx = require('./ltx')
const volcengine = require('./volcengine')
const mureka = require('./mureka')
const vidu = require('./vidu')

module.exports = {
  version: '1.0',
  defaultProvider: 'ltx',
  providers: {
    skyreels,
    ltx,
    volcengine,
    mureka,
    vidu
  },
  logging: {
    level: 'info',
    format: 'json'
  }
}
