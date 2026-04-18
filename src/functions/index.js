/**
 * Function 层入口
 */

const BaseFunction = require('./base-function')
const functionRegistry = require('./function-registry')
const { functionManager, FunctionManager } = require('./function-manager')

const functionsMetadata = require('../metadata/functions')

functionRegistry.registerAll(functionsMetadata.mureka)
functionRegistry.registerAll(functionsMetadata.lightricks)
functionRegistry.registerAll(functionsMetadata.skyreels)
functionRegistry.registerAll(functionsMetadata.volcengine)
functionRegistry.registerAll(functionsMetadata.vidu)

module.exports = {
  BaseFunction,
  functionRegistry,
  functionManager,
  FunctionManager
}
