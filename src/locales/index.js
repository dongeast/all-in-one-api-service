/**
 * 翻译资源加载入口
 * 负责加载所有语言的翻译资源并注册到 I18nManager
 */

const { i18nManager } = require('../utils/i18n-manager')
const { Languages } = require('../constants/languages')

const zhCommon = require('./zh/common.json')
const zhDocs = require('./zh/docs.json')
const zhErrors = require('./zh/errors.json')
const zhFunctions = require('./zh/functions.json')
const zhMetadata = require('./zh/metadata.json')
const zhParams = require('./zh/params.json')

const enCommon = require('./en/common.json')
const enDocs = require('./en/docs.json')
const enErrors = require('./en/errors.json')
const enFunctions = require('./en/functions.json')
const enMetadata = require('./en/metadata.json')
const enParams = require('./en/params.json')

/**
 * 加载指定语言的翻译资源
 * @param {string} language - 语言代码
 * @returns {object} 翻译资源对象
 */
function loadLanguageResources(language) {
  switch (language) {
  case Languages.ZH:
  case Languages.ZH_CN:
    return {
      ...zhCommon,
      ...zhDocs,
      ...zhErrors,
      ...zhFunctions,
      ...zhMetadata,
      ...zhParams
    }
  case Languages.EN:
    return {
      ...enCommon,
      ...enDocs,
      ...enErrors,
      ...enFunctions,
      ...enMetadata,
      ...enParams
    }
  default:
    return {}
  }
}

/**
 * 初始化所有翻译资源到 I18nManager
 */
function initializeTranslations() {
  const resourcesMap = {}
  
  Object.values(Languages).forEach(language => {
    const resources = loadLanguageResources(language)
    if (Object.keys(resources).length > 0) {
      resourcesMap[language] = resources
    }
  })
  
  i18nManager.initialize(resourcesMap)
}

/**
 * 获取翻译资源
 * @param {string} language - 语言代码
 * @returns {object} 翻译资源
 */
function getTranslations(language) {
  return loadLanguageResources(language)
}

/**
 * 获取 I18nManager 实例
 * @returns {I18nManager} I18nManager 实例
 */
function getI18nManager() {
  return i18nManager
}

initializeTranslations()

module.exports = {
  loadLanguageResources,
  initializeTranslations,
  getTranslations,
  getI18nManager,
  i18nManager
}
