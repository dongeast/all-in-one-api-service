/**
 * Function 层入口
 */

const BaseFunction = require('./base-function')
const functionRegistry = require('./function-registry')
const apiMapping = require('./api-mapping')
const { functionManager, FunctionManager } = require('./function-manager')

const functionsMetadata = require('../metadata/functions')

functionRegistry.registerAll(functionsMetadata.mureka)
functionRegistry.registerAll(functionsMetadata.ltx)
functionRegistry.registerAll(functionsMetadata.skyreels)
functionRegistry.registerAll(functionsMetadata.volcengine)

module.exports = {
  BaseFunction,
  functionRegistry,
  apiMapping,
  functionManager,
  FunctionManager
}
