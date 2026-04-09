/**
 * Function 多语言支持工具
 * 提供 Function 的多语言翻译功能
 */

const { t } = require('./i18n')
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
  const displayNameKey = `functions.${provider}.${functionName}.displayName`
  const descriptionKey = `functions.${provider}.${functionName}.description`
  
  const translatedDisplayName = t(displayNameKey, { language })
  const translatedDescription = t(descriptionKey, { language })
  
  return {
    displayName: translatedDisplayName !== displayNameKey ? translatedDisplayName : (originalMetadata?.displayName || displayNameKey),
    description: translatedDescription !== descriptionKey ? translatedDescription : (originalMetadata?.description || descriptionKey)
  }
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
  
  const translatedDescription = t(descriptionKey, { language })
  
  return {
    description: translatedDescription !== descriptionKey ? translatedDescription : (originalMetadata?.description || descriptionKey)
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
  
  const translated = getTranslatedFunctionMetadata(provider, metadata.name, language, metadata)
  
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
  const providerMap = {
    [Providers.LTX]: 'ltx',
    [Providers.MUREKA]: 'mureka',
    [Providers.SKYREELS]: 'skyreels',
    [Providers.VOLCENGINE]: 'volcengine'
  }
  
  return providerMap[provider] || provider.toLowerCase()
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
  const result = {}
  
  for (const [paramName, paramSchema] of Object.entries(inputSchema)) {
    const paramKey = `params.${provider}.${functionName}.input.${paramName}`
    const descriptionKey = `${paramKey}.description`
    
    const translatedDescription = t(descriptionKey, { language })
    
    result[paramName] = {
      ...paramSchema,
      description: translatedDescription !== descriptionKey ? translatedDescription : (paramSchema.description || descriptionKey)
    }
  }
  
  return result
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
  const result = {}
  
  for (const [fieldName, fieldSchema] of Object.entries(outputSchema)) {
    const fieldKey = `params.${provider}.${functionName}.output.${fieldName}`
    const descriptionKey = `${fieldKey}.description`
    
    const translatedDescription = t(descriptionKey, { language })
    
    result[fieldName] = {
      ...fieldSchema,
      description: translatedDescription !== descriptionKey ? translatedDescription : (fieldSchema.description || descriptionKey)
    }
  }
  
  return result
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
