/**
 * 注册中心入口
 */

const BaseRegistry = require('./base-registry')
const modelRegistry = require('./model-registry')
const apiRegistry = require('./api-registry')
const functionRegistry = require('../functions/function-registry')

const { ModelRegistry } = modelRegistry
const { APIRegistry } = apiRegistry
const { FunctionRegistry } = functionRegistry

const ltxModels = require('../metadata/models/ltx')
const volcengineModels = require('../metadata/models/volcengine')
const skyreelsModels = require('../metadata/models/skyreels')
const murekaModels = require('../metadata/models/mureka')

const ltxAPIs = require('../metadata/apis/ltx')
const volcengineAPIs = require('../metadata/apis/volcengine')
const skyreelsAPIs = require('../metadata/apis/skyreels')
const murekaAPIs = require('../metadata/apis/mureka')

modelRegistry.registerAll(ltxModels)
modelRegistry.registerAll(volcengineModels)
modelRegistry.registerAll(skyreelsModels)
modelRegistry.registerAll(murekaModels)

apiRegistry.registerAll(ltxAPIs)
apiRegistry.registerAll(volcengineAPIs)
apiRegistry.registerAll(skyreelsAPIs)
apiRegistry.registerAll(murekaAPIs)

module.exports = {
  BaseRegistry,
  APIRegistry,
  ModelRegistry,
  FunctionRegistry,
  modelRegistry,
  apiRegistry,
  functionRegistry
}
