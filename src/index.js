/**
 * 源码入口
 */

const { initializer, Initializer } = require('./core')
const Services = require('./services')
const APIs = require('./apis')
const Params = require('./params')
const Config = require('./config')
const Utils = require('./utils')
const Functions = require('./functions')

const Constants = require('./constants')
const Registry = require('./registry')
const Query = require('./query')

const { setLanguage, getLanguage, t } = require('./utils/i18n')
const { metadataManager } = require('./utils/metadata-manager')
const { functionManager, FunctionManager } = require('./functions/function-manager')
const { CacheManager, CacheItem, cacheManager } = require('./utils/cache-manager')
const { creditCalculator, CreditCalculator } = require('./credits/credit-calculator')
const { getTranslations } = require('./locales')

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
} = require('./constants')

const QueryService = functionManager

const { apiRegistry, modelRegistry, functionRegistry, unifiedRegistry, serviceRegistry } = Registry
const { metadataQuery, MetadataQuery } = Query
const { BaseService } = Services
const { APIDefinition } = APIs
const { BaseParam } = Params
const { BaseFunction } = Functions

if (process.env.NODE_ENV !== 'test') {
  initializer.initialize().catch(error => {
    console.error('Failed to initialize framework:', error)
  })
}

module.exports = {
  Services,
  APIs,
  Params,
  Config,
  Utils,
  Functions,
  Constants,
  Registry,
  Query,
  QueryService,
  
  initializer,
  Initializer,
  
  setLanguage,
  getLanguage,
  t,
  getTranslations,
  
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
  functionManager,
  FunctionManager,
  
  apiRegistry,
  modelRegistry,
  functionRegistry,
  unifiedRegistry,
  serviceRegistry,
  
  metadataQuery,
  MetadataQuery,
  
  BaseService,
  APIDefinition,
  BaseParam,
  BaseFunction,
  
  CacheManager,
  CacheItem,
  cacheManager,
  
  creditCalculator,
  CreditCalculator
}
