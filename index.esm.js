/**
 * 模块主入口 (ES Module)
 */

import Services from './src/services/index.js'
import APIs from './src/apis/index.js'
import Params from './src/params/index.js'
import Config from './src/config/index.js'
import Utils from './src/utils/index.js'
import Functions from './src/functions/index.js'
import Constants from './src/constants/index.js'
import Registry from './src/registry/index.js'
import Credits from './src/credits/index.js'

import { setLanguage, getLanguage, t } from './src/utils/i18n.js'
import { metadataManager } from './src/utils/metadata-manager.js'
import { functionManager } from './src/functions/function-manager.js'
import { creditCalculator, CreditCalculator } from './src/credits/credit-calculator.esm.js'

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
} = Constants

const QueryService = functionManager

const getFunction = (name, language) => metadataManager.getFunction(name, language)
const getFunctions = (options, language) => metadataManager.getFunctions(options, language)
const getFunctionByAPI = (apiName, language) => metadataManager.getFunctionByAPI(apiName, language)
const getAPI = (name, language) => metadataManager.getAPI(name, language)
const getAPIs = (options, language) => metadataManager.getAPIs(options, language)
const getModel = (name, language) => metadataManager.getModel(name, language)
const getModels = (options, language) => metadataManager.getModels(options, language)
const getBestFunction = (type, model, options, language) => metadataManager.getBestFunction(type, model, options, language)
const getBestAPI = (type, model, options, language) => metadataManager.getBestAPI(type, model, options, language)

const executeFunction = (name, params, options) => functionManager.execute(name, params, options)
const queryFunctions = (options, language) => functionManager.query(options, language)
const getFunctionDetail = (name, language) => functionManager.getDetail(name, language)
const getBestFunctionInstance = (type, model, options, language) => functionManager.getBest(type, model, options, language)

export {
  Services,
  APIs,
  Params,
  Config,
  Utils,
  Functions,
  Constants,
  Registry,
  QueryService,
  
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
  
  getFunction,
  getFunctions,
  getFunctionByAPI,
  getAPI,
  getAPIs,
  getModel,
  getModels,
  getBestFunction,
  getBestAPI,
  metadataManager,
  
  executeFunction,
  queryFunctions,
  getFunctionDetail,
  getBestFunctionInstance,
  functionManager,
  Credits,
  creditCalculator,
  CreditCalculator
}

export default {
  Services,
  APIs,
  Params,
  Config,
  Utils,
  Functions,
  Constants,
  Registry,
  QueryService,
  
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
  
  setLanguage,
  getLanguage,
  t,
  
  getFunction,
  getFunctions,
  getFunctionByAPI,
  getAPI,
  getAPIs,
  getModel,
  getModels,
  getBestFunction,
  getBestAPI,
  metadataManager,
  
  executeFunction,
  queryFunctions,
  getFunctionDetail,
  getBestFunctionInstance,
  functionManager,
  Credits,
  creditCalculator,
  CreditCalculator
}
