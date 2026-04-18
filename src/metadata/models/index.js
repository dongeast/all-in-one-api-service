/**
 * 模型元数据入口
 * 支持多语言翻译
 */

const { Models: LightricksModels, ModelsMeta: LightricksModelsMeta } = require('./lightricks')
const { Models: VolcengineModels, ModelsMeta: VolcengineModelsMeta } = require('./volcengine')
const { Models: SkyreelsModels, ModelsMeta: SkyreelsModelsMeta } = require('./skyreels')
const { Models: MurekaModels, ModelsMeta: MurekaModelsMeta } = require('./mureka')
const { Models: ViduModels, ModelsMeta: ViduModelsMeta } = require('./vidu')
const { registerModelsMetadata, getModelsMetadata, getModelMetadata, getAllModelsMetadata } = require('../../utils/metadata-manager')

const Models = {
  ...LightricksModels,
  ...VolcengineModels,
  ...SkyreelsModels,
  ...MurekaModels,
  ...ViduModels
}

const ModelsMeta = {
  ...LightricksModelsMeta,
  ...VolcengineModelsMeta,
  ...SkyreelsModelsMeta,
  ...MurekaModelsMeta,
  ...ViduModelsMeta
}

registerModelsMetadata('lightricks', LightricksModelsMeta)
registerModelsMetadata('volcengine', VolcengineModelsMeta)
registerModelsMetadata('skyreels', SkyreelsModelsMeta)
registerModelsMetadata('mureka', MurekaModelsMeta)
registerModelsMetadata('vidu', ViduModelsMeta)

module.exports = {
  Models,
  ModelsMeta,
  LightricksModels,
  LightricksModelsMeta,
  VolcengineModels,
  VolcengineModelsMeta,
  SkyreelsModels,
  SkyreelsModelsMeta,
  MurekaModels,
  MurekaModelsMeta,
  ViduModels,
  ViduModelsMeta,
  getModelsMetadata,
  getModelMetadata,
  getAllModelsMetadata
}
