/**
 * 翻译资源加载入口
 * 负责加载所有语言的翻译资源
 */

const { i18n } = require('../utils/i18n')
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
