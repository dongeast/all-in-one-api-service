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

module.exports = {
  BaseParam,
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
