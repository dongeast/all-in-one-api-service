/**
 * 模型元数据入口
 * 支持多语言翻译
 */

const ltx = require('./ltx')
const volcengine = require('./volcengine')
const skyreels = require('./skyreels')
const mureka = require('./mureka')
const { registerModelsMetadata, getModelsMetadata, getModelMetadata, getAllModelsMetadata } = require('../metadata-registry')

registerModelsMetadata('ltx', ltx)
registerModelsMetadata('volcengine', volcengine)
registerModelsMetadata('skyreels', skyreels)
registerModelsMetadata('mureka', mureka)

module.exports = {
  ltx,
  volcengine,
  skyreels,
  mureka,
  getModelsMetadata,
  getModelMetadata,
  getAllModelsMetadata
}
