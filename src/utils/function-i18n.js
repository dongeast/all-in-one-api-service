/**
 * Function 多语言支持工具
 * 提供 Function 的多语言翻译功能
 */

const { i18nManager } = require('./i18n-manager')
const { Providers } = require('../constants')

/**
 * 获取翻译后的 Function 元数据
 * @param {string} provider - 提供商名称
 * @param {string} functionName - Function 名称
 * @param {string} language - 语言代码(可选)
 * @param {object} originalMetadata - 原始元数据(可选,用于回退)
 * @returns {object} 翻译后的元数据
 */
function getTranslatedFunctionMetadata(provider, functionName, language, originalMetadata = null) {
  const metadata = originalMetadata || { name: functionName, provider }
  return i18nManager.translateMetadata(metadata, 'functions', language)
}

/**
 * 获取翻译后的方法描述
 * @param {string} provider - 提供商名称
 * @param {string} functionName - Function 名称
 * @param {string} methodName - 方法名称
 * @param {string} language - 语言代码(可选)
 * @param {object} originalMetadata - 原始元数据(可选,用于回退)
 * @returns {object} 翻译后的方法描述
 */
function getTranslatedMethodDescription(provider, functionName, methodName, language, originalMetadata = null) {
  const descriptionKey = `functions.${provider}.${functionName}.methods.${methodName}.description`
  const translatedDescription = i18nManager.t(descriptionKey, { language })
  
  return {
    description: translatedDescription !== descriptionKey 
      ? translatedDescription 
      : (originalMetadata?.description || descriptionKey)
  }
}

/**
 * 为 Function 元数据添加翻译
 * @param {object} metadata - 原始元数据
 * @param {string} provider - 提供商名称
 * @param {string} language - 语言代码(可选)
 * @returns {object} 带翻译的元数据
 */
function addTranslationsToFunctionMetadata(metadata, provider, language) {
  if (!metadata || !metadata.name) {
    return metadata
  }
  
  const translated = i18nManager.translateMetadata(metadata, 'functions', language)
  
  const result = {
    ...metadata,
    displayName: translated.displayName,
    description: translated.description
  }
  
  if (metadata.methods) {
    result.methods = {}
    for (const [methodName, methodDef] of Object.entries(metadata.methods)) {
      const translatedMethod = getTranslatedMethodDescription(provider, metadata.name, methodName, language, methodDef)
      result.methods[methodName] = {
        ...methodDef,
        description: translatedMethod.description
      }
    }
  }
  
  return result
}

/**
 * 批量为 Function 元数据添加翻译
 * @param {object} functionsMetadata - Function 元数据对象
 * @param {string} provider - 提供商名称
 * @param {string} language - 语言代码(可选)
 * @returns {object} 带翻译的元数据
 */
function addTranslationsToFunctions(functionsMetadata, provider, language) {
  const result = {}
  
  for (const [functionName, metadata] of Object.entries(functionsMetadata)) {
    result[functionName] = addTranslationsToFunctionMetadata(metadata, provider, language)
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

/**
 * 为输入参数添加翻译
 * @param {object} inputSchema - 输入参数模式
 * @param {string} provider - 提供商名称
 * @param {string} functionName - Function 名称
 * @param {string} language - 语言代码(可选)
 * @returns {object} 带翻译的参数模式
 */
function addTranslationsToInputSchema(inputSchema, provider, functionName, language) {
  return i18nManager.translateParamConfig(inputSchema, provider, language)
}

/**
 * 为输出结果添加翻译
 * @param {object} outputSchema - 输出结果模式
 * @param {string} provider - 提供商名称
 * @param {string} functionName - Function 名称
 * @param {string} language - 语言代码(可选)
 * @returns {object} 带翻译的结果模式
 */
function addTranslationsToOutputSchema(outputSchema, provider, functionName, language) {
  return i18nManager.translateParamConfig(outputSchema, provider, language)
}

module.exports = {
  getTranslatedFunctionMetadata,
  getTranslatedMethodDescription,
  addTranslationsToFunctionMetadata,
  addTranslationsToFunctions,
  getProviderName,
  addTranslationsToInputSchema,
  addTranslationsToOutputSchema
}
