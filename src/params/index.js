/**
 * Param层入口
 */

const BaseParam = require('./base-param')
const validators = require('./validators')
const transformers = require('./transformers')
const extractors = require('./extractors')
const templates = require('./templates')
const common = require('./common')
const providers = require('./providers')
const { ParamProcessor, createParamProcessor } = require('./param-processor')

module.exports = {
  BaseParam,
  ParamProcessor,
  createParamProcessor,
  ...validators,
  ...transformers,
  ...extractors,
  Templates: templates,
  Common: common,
  Providers: providers,
  Schemas: {
    Skyreels: providers.skyreels,
    LTX: providers.ltx,
    Volcengine: providers.volcengine,
    Mureka: providers.mureka
  }
}
