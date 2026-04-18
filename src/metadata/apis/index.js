/**
 * 接口元数据入口
 * 支持多语言翻译
 */

const { APIs: LightricksAPIs, APIsMeta: LightricksAPIsMeta } = require('./lightricks')
const { APIs: VolcengineAPIs, APIsMeta: VolcengineAPIsMeta } = require('./volcengine')
const { APIs: SkyreelsAPIs, APIsMeta: SkyreelsAPIsMeta } = require('./skyreels')
const { APIs: MurekaAPIs, APIsMeta: MurekaAPIsMeta } = require('./mureka')
const { APIs: ViduAPIs, APIsMeta: ViduAPIsMeta } = require('./vidu')
const { registerAPIsMetadata, getAPIsMetadata, getAPIMetadata, getAllAPIsMetadata } = require('../../utils/metadata-manager')

const APIs = {
  ...LightricksAPIs,
  ...VolcengineAPIs,
  ...SkyreelsAPIs,
  ...MurekaAPIs,
  ...ViduAPIs
}

const APIsMeta = {
  ...LightricksAPIsMeta,
  ...VolcengineAPIsMeta,
  ...SkyreelsAPIsMeta,
  ...MurekaAPIsMeta,
  ...ViduAPIsMeta
}

registerAPIsMetadata('lightricks', LightricksAPIsMeta)
registerAPIsMetadata('volcengine', VolcengineAPIsMeta)
registerAPIsMetadata('skyreels', SkyreelsAPIsMeta)
registerAPIsMetadata('mureka', MurekaAPIsMeta)
registerAPIsMetadata('vidu', ViduAPIsMeta)

module.exports = {
  APIs,
  APIsMeta,
  LightricksAPIs,
  LightricksAPIsMeta,
  VolcengineAPIs,
  VolcengineAPIsMeta,
  SkyreelsAPIs,
  SkyreelsAPIsMeta,
  MurekaAPIs,
  MurekaAPIsMeta,
  ViduAPIs,
  ViduAPIsMeta,
  getAPIsMetadata,
  getAPIMetadata,
  getAllAPIsMetadata
}
