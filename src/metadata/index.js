/**
 * 元数据入口
 * 支持多语言翻译
 */

const models = require('./models')
const apis = require('./apis')

module.exports = {
  models,
  apis,
  getAPIsMetadata: apis.getAPIsMetadata,
  getAPIMetadata: apis.getAPIMetadata,
  getAllAPIsMetadata: apis.getAllAPIsMetadata,
  getModelsMetadata: models.getModelsMetadata,
  getModelMetadata: models.getModelMetadata,
  getAllModelsMetadata: models.getAllModelsMetadata
}
