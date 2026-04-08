/**
 * 元数据注册器
 * 提供元数据的注册和获取功能,支持多语言翻译
 */

const { 
  addTranslationsToAPIs, 
  addTranslationsToModels,
  getProviderName 
} = require('../utils/metadata-i18n')

/**
 * 元数据存储
 */
const apiMetadataStore = new Map()
const modelMetadataStore = new Map()

/**
 * 注册API元数据
 * @param {string} provider - 提供商名称
 * @param {object} metadata - API元数据对象
 */
function registerAPIsMetadata(provider, metadata) {
  apiMetadataStore.set(provider, metadata)
}

/**
 * 注册模型元数据
 * @param {string} provider - 提供商名称
 * @param {object} metadata - 模型元数据对象
 */
function registerModelsMetadata(provider, metadata) {
  modelMetadataStore.set(provider, metadata)
}

/**
 * 获取API元数据
 * @param {string} provider - 提供商名称
 * @param {string} language - 语言代码(可选)
 * @returns {object} API元数据(带翻译)
 */
function getAPIsMetadata(provider, language) {
  const metadata = apiMetadataStore.get(provider)
  if (!metadata) {
    return {}
  }
  
  if (!language) {
    return metadata
  }
  
  return addTranslationsToAPIs(metadata, provider, language)
}

/**
 * 获取模型元数据
 * @param {string} provider - 提供商名称
 * @param {string} language - 语言代码(可选)
 * @returns {object} 模型元数据(带翻译)
 */
function getModelsMetadata(provider, language) {
  const metadata = modelMetadataStore.get(provider)
  if (!metadata) {
    return {}
  }
  
  if (!language) {
    return metadata
  }
  
  return addTranslationsToModels(metadata, provider, language)
}

/**
 * 获取单个API元数据
 * @param {string} provider - 提供商名称
 * @param {string} apiName - API名称
 * @param {string} language - 语言代码(可选)
 * @returns {object|null} API元数据(带翻译)
 */
function getAPIMetadata(provider, apiName, language) {
  const metadata = apiMetadataStore.get(provider)
  if (!metadata || !metadata[apiName]) {
    return null
  }
  
  const apiMetadata = metadata[apiName]
  
  if (!language) {
    return apiMetadata
  }
  
  const translated = addTranslationsToAPIs({ [apiName]: apiMetadata }, provider, language)
  return translated[apiName]
}

/**
 * 获取单个模型元数据
 * @param {string} provider - 提供商名称
 * @param {string} modelName - 模型名称
 * @param {string} language - 语言代码(可选)
 * @returns {object|null} 模型元数据(带翻译)
 */
function getModelMetadata(provider, modelName, language) {
  const metadata = modelMetadataStore.get(provider)
  if (!metadata || !metadata[modelName]) {
    return null
  }
  
  const modelMeta = metadata[modelName]
  
  if (!language) {
    return modelMeta
  }
  
  const translated = addTranslationsToModels({ [modelName]: modelMeta }, provider, language)
  return translated[modelName]
}

/**
 * 获取所有API元数据
 * @param {string} language - 语言代码(可选)
 * @returns {object} 所有API元数据(带翻译)
 */
function getAllAPIsMetadata(language) {
  const result = {}
  
  for (const [provider, metadata] of apiMetadataStore.entries()) {
    result[provider] = language 
      ? addTranslationsToAPIs(metadata, provider, language)
      : metadata
  }
  
  return result
}

/**
 * 获取所有模型元数据
 * @param {string} language - 语言代码(可选)
 * @returns {object} 所有模型元数据(带翻译)
 */
function getAllModelsMetadata(language) {
  const result = {}
  
  for (const [provider, metadata] of modelMetadataStore.entries()) {
    result[provider] = language
      ? addTranslationsToModels(metadata, provider, language)
      : metadata
  }
  
  return result
}

module.exports = {
  registerAPIsMetadata,
  registerModelsMetadata,
  getAPIsMetadata,
  getModelsMetadata,
  getAPIMetadata,
  getModelMetadata,
  getAllAPIsMetadata,
  getAllModelsMetadata
}
