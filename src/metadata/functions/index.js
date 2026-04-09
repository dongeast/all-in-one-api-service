/**
 * Functions 元数据入口
 */

const murekaFunctions = require('./mureka')
const ltxFunctions = require('./ltx')
const skyreelsFunctions = require('./skyreels')
const volcengineFunctions = require('./volcengine')

module.exports = {
  mureka: murekaFunctions,
  ltx: ltxFunctions,
  skyreels: skyreelsFunctions,
  volcengine: volcengineFunctions
}
