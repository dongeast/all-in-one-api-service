/**
 * 翻译资源加载入口
 * 负责加载所有语言的翻译资源
 */

const path = require('path')
const fs = require('fs')
const { i18n } = require('../utils/i18n')
const { Languages } = require('../constants/languages')

/**
 * 加载指定语言的翻译资源
 * @param {string} language - 语言代码
 * @returns {object} 翻译资源对象
 */
function loadLanguageResources(language) {
  const resources = {}
  const localePath = path.join(__dirname, language)
  
  if (!fs.existsSync(localePath)) {
    return resources
  }
  
  const files = fs.readdirSync(localePath)
  
  files.forEach(file => {
    if (file.endsWith('.json')) {
      const filePath = path.join(localePath, file)
      try {
        const content = fs.readFileSync(filePath, 'utf-8')
        const fileContent = JSON.parse(content)
        Object.assign(resources, fileContent)
      } catch (error) {
        console.warn(`Failed to load translation file: ${filePath}`, error.message)
      }
    }
  })
  
  return resources
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
