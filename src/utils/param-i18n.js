/**
 * 参数多语言支持工具
 * 提供参数的 label、description、placeholder 等多语言翻译功能
 */

const { i18nManager } = require('./i18n-manager')
const { Providers } = require('../constants')

/**
 * 获取参数标签
 * @param {string} provider - 提供商名称
 * @param {string} paramName - 参数名
 * @param {string} language - 语言代码(可选)
 * @param {string} fallback - 回退值(可选)
 * @returns {string} 参数标签
 */
function getParamLabel(provider, paramName, language, fallback = null) {
  const param = { name: paramName }
  const translated = i18nManager.translateParam(param, provider, paramName, language)
  return translated.label || fallback || i18nManager.formatParamName(paramName)
}

/**
 * 获取参数描述
 * @param {string} provider - 提供商名称
 * @param {string} paramName - 参数名
 * @param {string} language - 语言代码(可选)
 * @param {string} fallback - 回退值(可选)
 * @returns {string} 参数描述
 */
function getParamDescription(provider, paramName, language, fallback = null) {
  const param = { name: paramName }
  const translated = i18nManager.translateParam(param, provider, paramName, language)
  return translated.description || fallback || ''
}

/**
 * 获取参数占位符
 * @param {string} provider - 提供商名称
 * @param {string} paramName - 参数名
 * @param {string} language - 语言代码(可选)
 * @param {string} fallback - 回退值(可选)
 * @returns {string} 参数占位符
 */
function getParamPlaceholder(provider, paramName, language, fallback = null) {
  const param = { name: paramName }
  const translated = i18nManager.translateParam(param, provider, paramName, language)
  return translated.placeholder || fallback || ''
}

/**
 * 获取参数单位
 * @param {string} provider - 提供商名称
 * @param {string} paramName - 参数名
 * @param {string} language - 语言代码(可选)
 * @returns {string|null} 参数单位
 */
function getParamUnit(provider, paramName, language) {
  const param = { name: paramName }
  const translated = i18nManager.translateParam(param, provider, paramName, language)
  return translated.unit || null
}

/**
 * 获取参数完整翻译信息
 * @param {string} provider - 提供商名称
 * @param {string} paramName - 参数名
 * @param {string} language - 语言代码(可选)
 * @returns {object} 参数翻译信息
 */
function getParamTranslation(provider, paramName, language) {
  const param = { name: paramName }
  const translated = i18nManager.translateParam(param, provider, paramName, language)
  
  return {
    label: translated.label,
    description: translated.description,
    placeholder: translated.placeholder,
    unit: translated.unit
  }
}

/**
 * 为参数添加翻译信息
 * @param {object} param - 参数对象
 * @param {string} provider - 提供商名称
 * @param {string} language - 语言代码(可选)
 * @returns {object} 带翻译的参数对象
 */
function addTranslationsToParam(param, provider, language) {
  if (!param || !param.name) {
    return param
  }

  return i18nManager.translateParam(param, provider, param.name, language)
}

/**
 * 为参数列表添加翻译信息
 * @param {Array} params - 参数列表
 * @param {string} provider - 提供商名称
 * @param {string} language - 语言代码(可选)
 * @returns {Array} 带翻译的参数列表
 */
function addTranslationsToParams(params, provider, language) {
  if (!Array.isArray(params)) {
    return params
  }

  return params.map(param => addTranslationsToParam(param, provider, language))
}

/**
 * 格式化参数名称
 * 将 snake_case 或 camelCase 转换为 Title Case
 * @param {string} paramName - 参数名
 * @returns {string} 格式化后的名称
 */
function formatParamName(paramName) {
  return i18nManager.formatParamName(paramName)
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
  getParamLabel,
  getParamDescription,
  getParamPlaceholder,
  getParamUnit,
  getParamTranslation,
  addTranslationsToParam,
  addTranslationsToParams,
  formatParamName,
  getProviderName
}
