/**
 * 接口元数据入口
 * 支持多语言翻译
 */

const ltx = require('./ltx')
const volcengine = require('./volcengine')
const skyreels = require('./skyreels')
const mureka = require('./mureka')
const { registerAPIsMetadata, getAPIsMetadata, getAPIMetadata, getAllAPIsMetadata } = require('../metadata-registry')

registerAPIsMetadata('ltx', ltx)
registerAPIsMetadata('volcengine', volcengine)
registerAPIsMetadata('skyreels', skyreels)
registerAPIsMetadata('mureka', mureka)

module.exports = {
  ltx,
  volcengine,
  skyreels,
  mureka,
  getAPIsMetadata,
  getAPIMetadata,
  getAllAPIsMetadata
}
