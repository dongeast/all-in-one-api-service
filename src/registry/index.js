/**
 * 注册中心入口
 */

const BaseRegistry = require('./base-registry')
const modelRegistry = require('./model-registry')
const apiRegistry = require('./api-registry')
const functionRegistry = require('../functions/function-registry')
const unifiedRegistry = require('./unified-registry')
const serviceRegistry = require('../services/service-registry')

const { ModelRegistry } = modelRegistry
const { APIRegistry } = apiRegistry
const { FunctionRegistry } = functionRegistry
const { UnifiedRegistry } = unifiedRegistry
const { ServiceRegistry } = serviceRegistry

module.exports = {
  BaseRegistry,
  APIRegistry,
  ModelRegistry,
  FunctionRegistry,
  UnifiedRegistry,
  ServiceRegistry,
  modelRegistry,
  apiRegistry,
  functionRegistry,
  unifiedRegistry,
  serviceRegistry
}
