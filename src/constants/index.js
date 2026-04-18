/**
 * 常量模块入口
 */

const { APITypes, MediaTypes, InputOutputTypes } = require('./types')
const { ModelTags, APITags, ProviderTags } = require('./tags')
const { HttpMethod, SyncType } = require('./network')

const {
  Providers,
  ProviderPriority,
  ProviderMeta,
  getProviderPriority,
  sortByProviderPriority,
  getHighestPriorityProvider
} = require('./providers')
const {
  Languages,
  DEFAULT_LANGUAGE,
  LanguageNames,
  LanguageAliases,
  normalizeLanguage
} = require('./languages')
const { Series, SeriesMeta } = require('./series')

module.exports = {
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
  HttpMethod,
  SyncType
}
