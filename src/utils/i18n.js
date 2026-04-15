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
    const keys = key.split('.')
    let value = this.translations.get(language)

    for (const k of keys) {
      if (value === undefined || value === null) {
        return undefined
      }
      value = value[k]
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
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match
    })
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
   * 获取支持的语言列表
   * @returns {string[]} 语言代码数组
   */
  getSupportedLanguages() {
    return Array.from(this.translations.keys())
  }
}

// 创建全局实例
const i18n = new I18n()

/**
 * 翻译函数
 * @param {string} key - 翻译键
 * @param {object} options - 选项 { language, ...params }
 * @returns {string} 翻译后的文本
 */
function t(key, options = {}) {
  const { language, ...params } = options
  return i18n.t(key, language, params)
}

module.exports = {
  I18n,
  i18n,
  t
}
