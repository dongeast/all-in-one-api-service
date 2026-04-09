/**
 * 浏览器环境翻译资源加载入口
 * 在浏览器环境中，直接导入翻译资源
 */

const { i18n } = require('../../src/utils/i18n')
const { Languages } = require('../../src/constants/languages')

const zhCommon = require('../../src/locales/zh/common.json')
const zhDocs = require('../../src/locales/zh/docs.json')
const zhErrors = require('../../src/locales/zh/errors.json')
const zhFunctions = require('../../src/locales/zh/functions.json')
const zhMetadata = require('../../src/locales/zh/metadata.json')
const zhParams = require('../../src/locales/zh/params.json')

const enCommon = require('../../src/locales/en/common.json')
const enDocs = require('../../src/locales/en/docs.json')
const enErrors = require('../../src/locales/en/errors.json')
const enFunctions = require('../../src/locales/en/functions.json')
const enMetadata = require('../../src/locales/en/metadata.json')
const enParams = require('../../src/locales/en/params.json')

/**
 * 加载指定语言的翻译资源
 * @param {string} language - 语言代码
 * @returns {object} 翻译资源对象
 */
function loadLanguageResources(language) {
  switch (language) {
  case Languages.ZH:
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
 * 初始化所有翻译资源
 */
function initializeTranslations() {
  Object.values(Languages).forEach(language => {
    const resources = loadLanguageResources(language)
    if (Object.keys(resources).length > 0) {
      i18n.register(language, resources)
    }
  })
}

/**
 * 获取翻译资源
 * @param {string} language - 语言代码
 * @returns {object} 翻译资源
 */
function getTranslations(language) {
  return loadLanguageResources(language)
}

initializeTranslations()

module.exports = {
  loadLanguageResources,
  initializeTranslations,
  getTranslations
}
