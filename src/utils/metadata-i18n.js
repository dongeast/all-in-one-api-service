/**
 * 元数据翻译辅助工具
 * 提供元数据的多语言翻译功能
 */

const { i18nManager } = require('./i18n-manager')
const { Providers } = require('../constants')

/**
 * 获取翻译后的API元数据
 * @param {string} provider - 提供商名称
 * @param {string} apiName - API名称
 * @param {string} language - 语言代码(可选)
 * @param {object} originalMetadata - 原始元数据(可选,用于回退)
 * @returns {object} 翻译后的元数据
 */
function getTranslatedAPIMetadata(provider, apiName, language, originalMetadata = null) {
  const metadata = originalMetadata || { name: apiName, provider }
  return i18nManager.translateMetadata(metadata, 'apis', language)
}

/**
 * 获取翻译后的模型元数据
 * @param {string} provider - 提供商名称
 * @param {string} modelName - 模型名称
 * @param {string} language - 语言代码(可选)
 * @param {object} originalMetadata - 原始元数据(可选,用于回退)
 * @returns {object} 翻译后的元数据
 */
function getTranslatedModelMetadata(provider, modelName, language, originalMetadata = null) {
  const metadata = originalMetadata || { name: modelName, provider }
  return i18nManager.translateMetadata(metadata, 'models', language)
}

/**
 * 为API元数据添加翻译
 * @param {object} metadata - 原始元数据
 * @param {string} provider - 提供商名称
 * @param {string} language - 语言代码(可选)
 * @returns {object} 带翻译的元数据
 */
function addTranslationsToAPIMetadata(metadata, provider, language) {
  if (!metadata || !metadata.name) {
    return metadata
  }
  
  return i18nManager.translateMetadata(metadata, 'apis', language)
}

/**
 * 为模型元数据添加翻译
 * @param {object} metadata - 原始元数据
 * @param {string} provider - 提供商名称
 * @param {string} language - 语言代码(可选)
 * @returns {object} 带翻译的元数据
 */
function addTranslationsToModelMetadata(metadata, provider, language) {
  if (!metadata || !metadata.name) {
    return metadata
  }
  
  return i18nManager.translateMetadata(metadata, 'models', language)
}

/**
 * 翻译 API 元数据（简化接口）
 * @param {object} metadata - API 元数据
 * @param {string} provider - 提供商名称
 * @param {string} language - 语言代码(可选)
 * @returns {object} 翻译后的元数据
 */
function translateAPIMetadata(metadata, provider, language) {
  return addTranslationsToAPIMetadata(metadata, provider, language)
}

/**
 * 翻译 Model 元数据（简化接口）
 * @param {object} metadata - Model 元数据
 * @param {string} provider - 提供商名称
 * @param {string} language - 语言代码(可选)
 * @returns {object} 翻译后的元数据
 */
function translateModelMetadata(metadata, provider, language) {
  return addTranslationsToModelMetadata(metadata, provider, language)
}

/**
 * 批量为API元数据添加翻译
 * @param {object} apisMetadata - API元数据对象
 * @param {string} provider - 提供商名称
 * @param {string} language - 语言代码(可选)
 * @returns {object} 带翻译的元数据
 */
function addTranslationsToAPIs(apisMetadata, provider, language) {
  const result = {}
  
  for (const [apiName, metadata] of Object.entries(apisMetadata)) {
    result[apiName] = addTranslationsToAPIMetadata(metadata, provider, language)
  }
  
  return result
}

/**
 * 批量为模型元数据添加翻译
 * @param {object} modelsMetadata - 模型元数据对象
 * @param {string} provider - 提供商名称
 * @param {string} language - 语言代码(可选)
 * @returns {object} 带翻译的元数据
 */
function addTranslationsToModels(modelsMetadata, provider, language) {
  const result = {}
  
  for (const [modelName, metadata] of Object.entries(modelsMetadata)) {
    result[modelName] = addTranslationsToModelMetadata(metadata, provider, language)
  }
  
  return result
}

/**
 * 获取提供商名称
 * @param {string} provider - 提供商常量
 * @returns {string} 提供商名称(小写)
 */
function getProviderName(provider) {
  return provider.toLowerCase()
}

module.exports = {
  getTranslatedAPIMetadata,
  getTranslatedModelMetadata,
  addTranslationsToAPIMetadata,
  addTranslationsToModelMetadata,
  addTranslationsToAPIs,
  addTranslationsToModels,
  getProviderName,
  translateAPIMetadata,
  translateModelMetadata
}
