/**
 * 国际化工具类
 * 负责多语言翻译管理
 */

const { DEFAULT_LANGUAGE, normalizeLanguage } = require('../constants/languages')

/**
 * 国际化工具类
 */
class I18n {
  /**
   * 创建 I18n 实例
   * @param {string} defaultLanguage - 默认语言
   */
  constructor(defaultLanguage = DEFAULT_LANGUAGE) {
    this.defaultLanguage = normalizeLanguage(defaultLanguage)
    this.translations = new Map()
    this.currentLanguage = this.defaultLanguage
  }

  /**
   * 注册翻译资源
   * @param {string} language - 语言代码
   * @param {object} resources - 翻译资源对象
   */
  register(language, resources) {
    const normalizedLang = normalizeLanguage(language)
    if (!this.translations.has(normalizedLang)) {
      this.translations.set(normalizedLang, {})
    }
    Object.assign(this.translations.get(normalizedLang), resources)
  }

  /**
   * 获取翻译文本
   * @param {string} key - 翻译键(支持点号分隔的嵌套键)
   * @param {string} language - 语言代码(可选)
   * @param {object} params - 替换参数(可选)
   * @returns {string} 翻译后的文本
   */
  t(key, language, params = {}) {
    const lang = language ? normalizeLanguage(language) : this.currentLanguage
    
    let text = this.getNestedValue(key, lang)
    
    if (text === undefined) {
      text = this.getNestedValue(key, this.defaultLanguage)
    }
    
    if (text === undefined) {
      text = key
    }
    
    if (typeof text === 'string' && Object.keys(params).length > 0) {
      text = this.replaceParams(text, params)
    }
    
    return text
  }

  /**
   * 获取嵌套值
   * @param {string} key - 点号分隔的键
   * @param {string} language - 语言代码
   * @returns {any} 值
   */
  getNestedValue(key, language) {
    const translations = this.translations.get(language)
    if (!translations) {
      return undefined
    }

    const keys = key.split('.')
    let value = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return undefined
      }
    }
    
    return value
  }

  /**
   * 替换参数
   * @param {string} text - 文本
   * @param {object} params - 参数对象
   * @returns {string} 替换后的文本
   */
  replaceParams(text, params) {
    let result = text
    Object.keys(params).forEach(paramKey => {
      const regex = new RegExp(`\\{${paramKey}\\}`, 'g')
      result = result.replace(regex, params[paramKey])
    })
    return result
  }

  /**
   * 获取带语言参数的翻译
   * @param {string} key - 翻译键
   * @param {object} options - 选项(包含language和params)
   * @returns {string} 翻译后的文本
   */
  translate(key, options = {}) {
    const { language, ...params } = options
    return this.t(key, language, params)
  }

  /**
   * 设置当前语言
   * @param {string} language - 语言代码
   */
  setLanguage(language) {
    this.currentLanguage = normalizeLanguage(language)
  }

  /**
   * 获取当前语言
   * @returns {string} 当前语言代码
   */
  getLanguage() {
    return this.currentLanguage
  }

  /**
   * 设置默认语言
   * @param {string} language - 语言代码
   */
  setDefaultLanguage(language) {
    this.defaultLanguage = normalizeLanguage(language)
  }

  /**
   * 获取默认语言
   * @returns {string} 默认语言代码
   */
  getDefaultLanguage() {
    return this.defaultLanguage
  }

  /**
   * 检查是否支持指定语言
   * @param {string} language - 语言代码
   * @returns {boolean} 是否支持
   */
  hasLanguage(language) {
    const normalizedLang = normalizeLanguage(language)
    return this.translations.has(normalizedLang)
  }

  /**
   * 获取所有支持的语言
   * @returns {string[]} 语言代码列表
   */
  getSupportedLanguages() {
    return Array.from(this.translations.keys())
  }

  /**
   * 批量注册翻译资源
   * @param {object} resourcesMap - 语言到资源的映射
   */
  registerAll(resourcesMap) {
    Object.entries(resourcesMap).forEach(([language, resources]) => {
      this.register(language, resources)
    })
  }

  /**
   * 清空所有翻译资源
   */
  clear() {
    this.translations.clear()
  }
}

const i18n = new I18n()

/**
 * 设置全局语言
 * @param {string} language - 语言代码
 */
function setLanguage(language) {
  i18n.setLanguage(language)
}

/**
 * 获取全局语言
 * @returns {string} 当前语言代码
 */
function getLanguage() {
  return i18n.getLanguage()
}

/**
 * 翻译文本
 * @param {string} key - 翻译键
 * @param {object} options - 选项
 * @returns {string} 翻译后的文本
 */
function t(key, options = {}) {
  return i18n.translate(key, options)
}

module.exports = {
  I18n,
  i18n,
  setLanguage,
  getLanguage,
  t
}
