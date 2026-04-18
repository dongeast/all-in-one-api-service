/**
 * 浏览器环境模块入口
 */

require('./locales')

const Services = require('../src/services')
const APIs = require('../src/apis')
const Params = require('../src/params')
const Config = require('./config')
const Utils = require('./utils')
const Functions = require('../src/functions')

const Constants = require('../src/constants')
const Registry = require('../src/registry')

const { setLanguage, getLanguage, t } = require('../src/utils/i18n')
const { metadataManager } = require('../src/utils/metadata-manager')
const { functionManager } = require('../src/functions/function-manager')
const { i18nManager } = require('../src/utils/i18n-manager')

const {
  APITypes,
  MediaTypes,
  InputOutputTypes,
  ModelTags,
  APITags,
  ProviderTags,
  Providers,
  ProviderPriority,
  ProviderMeta,
  getProviderPriority,
  sortByProviderPriority,
  getHighestPriorityProvider,
  Languages,
  DEFAULT_LANGUAGE,
  LanguageNames,
  LanguageAliases,
  normalizeLanguage,
  Series,
  SeriesMeta
} = require('../src/constants')

const QueryService = functionManager

module.exports = {
  Services,
  APIs,
  Params,
  Config,
  Utils,
  Functions,
  Constants,
  Registry,
  QueryService,
  i18nManager,
  
  setLanguage,
  getLanguage,
  t,
  
  APITypes,
  MediaTypes,
  InputOutputTypes,
  ModelTags,
  APITags,
  ProviderTags,
  Providers,
  ProviderPriority,
  ProviderMeta,
  getProviderPriority,
  sortByProviderPriority,
  getHighestPriorityProvider,
  Languages,
  DEFAULT_LANGUAGE,
  LanguageNames,
  LanguageAliases,
  normalizeLanguage,
  Series,
  SeriesMeta,
  
  getFunction: (name, language) => metadataManager.getFunction(name, language),
  getFunctions: (options, language) => metadataManager.getFunctions(options, language),
  getFunctionByAPI: (apiName, language) => metadataManager.getFunctionByAPI(apiName, language),
  getAPI: (name, language) => metadataManager.getAPI(name, language),
  getAPIs: (options, language) => metadataManager.getAPIs(options, language),
  getModel: (name, language) => metadataManager.getModel(name, language),
  getModels: (options, language) => metadataManager.getModels(options, language),
  getBestFunction: (type, model, options, language) => metadataManager.getBestFunction(type, model, options, language),
  getBestAPI: (type, model, options, language) => metadataManager.getBestAPI(type, model, options, language),
  metadataManager,
  
  executeFunction: (name, params, options) => functionManager.execute(name, params, options),
  queryFunctions: (options, language) => functionManager.query(options, language),
  getFunctionDetail: (name, language) => functionManager.getDetail(name, language),
  getBestFunctionInstance: (type, model, options, language) => functionManager.getBest(type, model, options, language),
  functionManager
}
