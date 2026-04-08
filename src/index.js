/**
 * 源码入口
 */

require('./locales')

const Services = require('./services')
const APIs = require('./apis')
const Params = require('./params')
const Config = require('./config')
const Utils = require('./utils')

const Constants = require('./constants')
const Registry = require('./registry')
const QueryService = require('./services/query-service')

const { setLanguage, getLanguage, t } = require('./utils/i18n')

module.exports = {
  Services,
  APIs,
  Params,
  Config,
  Utils,
  Constants,
  Registry,
  QueryService,
  setLanguage,
  getLanguage,
  t
}
