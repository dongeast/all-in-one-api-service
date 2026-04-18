/**
 * Functions 元数据入口
 */

const { FunctionsMeta: murekaFunctionsMeta } = require('./mureka')
const { FunctionsMeta: lightricksFunctionsMeta } = require('./lightricks')
const { FunctionsMeta: skyreelsFunctionsMeta } = require('./skyreels')
const { FunctionsMeta: volcengineFunctionsMeta } = require('./volcengine')
const { FunctionsMeta: viduFunctionsMeta } = require('./vidu')

module.exports = {
  mureka: murekaFunctionsMeta,
  lightricks: lightricksFunctionsMeta,
  skyreels: skyreelsFunctionsMeta,
  volcengine: volcengineFunctionsMeta,
  vidu: viduFunctionsMeta
}
