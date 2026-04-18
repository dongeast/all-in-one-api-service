/**
 * 国际化管理器
 * 统一管理所有翻译资源，支持从 request 提取语言偏好
 */

const { DEFAULT_LANGUAGE, normalizeLanguage } = require('../constants/languages')
const { createLogger } = require('./logger')

const logger = createLogger({ level: 'INFO' })

/**
 * 国际化管理器类
 */
class I18nManager {
  /**
   * 创建 I18nManager 实例
   * @param {object} options - 配置选项
   * @param {string} options.defaultLanguage - 默认语言
   * @param {boolean} options.enableCache - 是否启用缓存
   */
  constructor(options = {}) {
    this.defaultLanguage = normalizeLanguage(options.defaultLanguage || DEFAULT_LANGUAGE)
    this.enableCache = options.enableCache !== false
    this.translations = new Map()
    this.cache = new Map()
    this.currentLanguage = this.defaultLanguage
    this.initialized = false
  }

  /**
   * 注册翻译资源
   * @param {string} language - 语言代码
   * @param {object} resources - 翻译资源对象
   */
  registerResources(language, resources) {
    const normalizedLang = normalizeLanguage(language)
    
    if (!this.translations.has(normalizedLang)) {
      this.translations.set(normalizedLang, {})
    }
    
    const existing = this.translations.get(normalizedLang)
    this.translations.set(normalizedLang, this.deepMerge(existing, resources))
    
    logger.debug(`Registered translation resources for language: ${normalizedLang}`)
    
    if (this.enableCache) {
      this.clearCacheForLanguage(normalizedLang)
    }
  }

  /**
   * 深度合并对象
   * @param {object} target - 目标对象
   * @param {object} source - 源对象
   * @returns {object} 合并后的对象
   */
  deepMerge(target, source) {
    const result = { ...target }
    
    for (const key of Object.keys(source)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(result[key] || {}, source[key])
      } else {
        result[key] = source[key]
      }
    }
    
    return result
  }

  /**
   * 批量注册翻译资源
   * @param {object} resourcesMap - 语言到资源的映射
   */
  registerAll(resourcesMap) {
    Object.entries(resourcesMap).forEach(([language, resources]) => {
      this.registerResources(language, resources)
    })
  }

  /**
   * 从 request 获取语言偏好
   * @param {object} request - 请求对象
   * @returns {string} 语言代码
   */
  getLanguageFromRequest(request) {
    if (!request) {
      return this.defaultLanguage
    }

    let language = null

    if (request.query) {
      language = request.query.language || request.query.lang
    }

    if (!language && request.body && typeof request.body === 'object') {
      language = request.body.language || request.body.lang
    }

    if (!language && request.headers) {
      const acceptLanguage = request.headers['accept-language'] || 
                            request.headers['Accept-Language']
      if (acceptLanguage) {
        language = this.parseAcceptLanguage(acceptLanguage)
      }
    }

    if (!language && request.session && request.session.language) {
      language = request.session.language
    }

    if (!language && request.user && request.user.language) {
      language = request.user.language
    }

    return language ? normalizeLanguage(language) : this.defaultLanguage
  }

  /**
   * 解析 Accept-Language Header
   * @param {string} acceptLanguage - Accept-Language 值
   * @returns {string|null} 语言代码
   */
  parseAcceptLanguage(acceptLanguage) {
    if (!acceptLanguage) return null

    const languages = acceptLanguage.split(',').map(lang => {
      const parts = lang.trim().split(';')
      const code = parts[0].trim()
      let quality = 1.0
      
      if (parts[1]) {
        const qMatch = parts[1].match(/q=([0-9.]+)/)
        if (qMatch) {
          quality = parseFloat(qMatch[1])
        }
      }
      
      return { code, quality }
    })

    languages.sort((a, b) => b.quality - a.quality)

    const supportedLanguages = Array.from(this.translations.keys())
    
    for (const lang of languages) {
      const normalized = normalizeLanguage(lang.code)
      if (supportedLanguages.includes(normalized)) {
        return normalized
      }
      
      const baseLang = normalized.split('-')[0]
      for (const supported of supportedLanguages) {
        if (supported.startsWith(baseLang)) {
          return supported
        }
      }
    }

    return null
  }

  /**
   * 获取翻译
   * @param {string} key - 翻译键（支持点号分隔的嵌套键）
   * @param {object} options - 选项
   * @param {string} options.language - 语言代码
   * @param {object} options.params - 替换参数
   * @returns {string} 翻译后的文本
   */
  t(key, options = {}) {
    const { language, ...params } = options
    const lang = language ? normalizeLanguage(language) : this.currentLanguage

    if (this.enableCache) {
      const cacheKey = `${lang}:${key}:${JSON.stringify(params)}`
      const cached = this.cache.get(cacheKey)
      if (cached !== undefined) {
        return cached
      }
    }

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

    if (this.enableCache && typeof text === 'string') {
      const cacheKey = `${lang}:${key}:${JSON.stringify(params)}`
      this.cache.set(cacheKey, text)
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
      return params[key] !== undefined ? String(params[key]) : match
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

  /**
   * 批量翻译元数据
   * @param {object} metadata - 元数据对象
   * @param {string} type - 元数据类型（'apis', 'models', 'functions', 'series'）
   * @param {string} language - 语言代码
   * @returns {object} 翻译后的元数据
   */
  translateMetadata(metadata, type, language) {
    if (!metadata || !metadata.name) {
      return metadata
    }

    const { name } = metadata
    const provider = metadata.provider
    
    let displayNameKey, descriptionKey
    
    if (provider) {
      displayNameKey = `${type}.${provider}.${name}.displayName`
      descriptionKey = `${type}.${provider}.${name}.description`
    } else {
      displayNameKey = `${type}.${name}.displayName`
      descriptionKey = `${type}.${name}.description`
    }

    const translatedDisplayName = this.t(displayNameKey, { language })
    const translatedDescription = this.t(descriptionKey, { language })

    return {
      ...metadata,
      displayName: translatedDisplayName !== displayNameKey 
        ? translatedDisplayName 
        : (metadata.displayName || name),
      description: translatedDescription !== descriptionKey 
        ? translatedDescription 
        : (metadata.description || '')
    }
  }

  /**
   * 翻译参数配置
   * @param {object} params - 参数配置对象
   * @param {string} provider - 提供商名称
   * @param {string} language - 语言代码
   * @returns {object} 翻译后的参数配置
   */
  translateParamConfig(params, provider, language) {
    if (!params || typeof params !== 'object') {
      return params
    }

    const result = {}

    for (const [paramName, paramConfig] of Object.entries(params)) {
      result[paramName] = this.translateParam(paramConfig, provider, paramName, language)
    }

    return result
  }

  /**
   * 翻译单个参数
   * @param {object} param - 参数配置
   * @param {string} provider - 提供商名称
   * @param {string} paramName - 参数名称
   * @param {string} language - 语言代码
   * @returns {object} 翻译后的参数配置
   */
  translateParam(param, provider, paramName, language) {
    if (!param || typeof param !== 'object') {
      return param
    }

    const labelKey = `params.${provider}.${paramName}.label`
    const descriptionKey = `params.${provider}.${paramName}.description`
    const placeholderKey = `params.${provider}.${paramName}.placeholder`
    const unitKey = `params.${provider}.${paramName}.unit`

    const translatedLabel = this.t(labelKey, { language })
    const translatedDescription = this.t(descriptionKey, { language })
    const translatedPlaceholder = this.t(placeholderKey, { language })
    const translatedUnit = this.t(unitKey, { language })

    const commonLabelKey = `params.common.${paramName}.label`
    const commonDescriptionKey = `params.common.${paramName}.description`
    const commonPlaceholderKey = `params.common.${paramName}.placeholder`
    const commonUnitKey = `params.common.${paramName}.unit`

    const commonLabel = this.t(commonLabelKey, { language })
    const commonDescription = this.t(commonDescriptionKey, { language })
    const commonPlaceholder = this.t(commonPlaceholderKey, { language })
    const commonUnit = this.t(commonUnitKey, { language })

    const legacyLabelKey = `${provider}.${paramName}.label`
    const legacyDescriptionKey = `${provider}.${paramName}.description`
    const legacyPlaceholderKey = `${provider}.${paramName}.placeholder`
    const legacyUnitKey = `${provider}.${paramName}.unit`

    const legacyLabel = this.t(legacyLabelKey, { language })
    const legacyDescription = this.t(legacyDescriptionKey, { language })
    const legacyPlaceholder = this.t(legacyPlaceholderKey, { language })
    const legacyUnit = this.t(legacyUnitKey, { language })

    const legacyCommonLabelKey = `common.${paramName}.label`
    const legacyCommonDescriptionKey = `common.${paramName}.description`
    const legacyCommonPlaceholderKey = `common.${paramName}.placeholder`
    const legacyCommonUnitKey = `common.${paramName}.unit`

    const legacyCommonLabel = this.t(legacyCommonLabelKey, { language })
    const legacyCommonDescription = this.t(legacyCommonDescriptionKey, { language })
    const legacyCommonPlaceholder = this.t(legacyCommonPlaceholderKey, { language })
    const legacyCommonUnit = this.t(legacyCommonUnitKey, { language })

    let finalLabel = this.formatParamName(paramName)
    let finalDescription = param.description || ''
    let finalPlaceholder = ''
    let finalUnit = null

    if (translatedLabel !== labelKey) {
      finalLabel = translatedLabel
    } else if (commonLabel !== commonLabelKey) {
      finalLabel = commonLabel
    } else if (legacyLabel !== legacyLabelKey) {
      finalLabel = legacyLabel
    } else if (legacyCommonLabel !== legacyCommonLabelKey) {
      finalLabel = legacyCommonLabel
    }

    if (translatedDescription !== descriptionKey) {
      finalDescription = translatedDescription
    } else if (commonDescription !== commonDescriptionKey) {
      finalDescription = commonDescription
    } else if (legacyDescription !== legacyDescriptionKey) {
      finalDescription = legacyDescription
    } else if (legacyCommonDescription !== legacyCommonDescriptionKey) {
      finalDescription = legacyCommonDescription
    }

    if (translatedPlaceholder !== placeholderKey) {
      finalPlaceholder = translatedPlaceholder
    } else if (commonPlaceholder !== commonPlaceholderKey) {
      finalPlaceholder = commonPlaceholder
    } else if (legacyPlaceholder !== legacyPlaceholderKey) {
      finalPlaceholder = legacyPlaceholder
    } else if (legacyCommonPlaceholder !== legacyCommonPlaceholderKey) {
      finalPlaceholder = legacyCommonPlaceholder
    }

    if (translatedUnit !== unitKey) {
      finalUnit = translatedUnit
    } else if (commonUnit !== commonUnitKey) {
      finalUnit = commonUnit
    } else if (legacyUnit !== legacyUnitKey) {
      finalUnit = legacyUnit
    } else if (legacyCommonUnit !== legacyCommonUnitKey) {
      finalUnit = legacyCommonUnit
    }

    return {
      ...param,
      label: finalLabel,
      description: finalDescription,
      placeholder: finalPlaceholder,
      unit: finalUnit
    }
  }

  /**
   * 格式化参数名称
   * @param {string} paramName - 参数名
   * @returns {string} 格式化后的名称
   */
  formatParamName(paramName) {
    if (!paramName) {
      return ''
    }

    return paramName
      .split('_')
      .flatMap(part => part.split(/(?=[A-Z])/))
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim()
  }

  /**
   * 清除指定语言的缓存
   * @param {string} language - 语言代码
   */
  clearCacheForLanguage(language) {
    const normalized = normalizeLanguage(language)
    for (const key of this.cache.keys()) {
      if (key.startsWith(`${normalized}:`)) {
        this.cache.delete(key)
      }
    }
  }

  /**
   * 清除所有缓存
   */
  clearCache() {
    this.cache.clear()
    logger.debug('I18n cache cleared')
  }

  /**
   * 初始化翻译资源
   * @param {object} resourcesMap - 语言到资源的映射
   */
  initialize(resourcesMap) {
    if (this.initialized) {
      return
    }

    this.registerAll(resourcesMap)
    this.initialized = true
    logger.info(`I18nManager initialized with ${this.translations.size} languages`)
  }

  /**
   * 获取统计信息
   * @returns {object} 统计信息
   */
  getStats() {
    const stats = {
      languages: this.translations.size,
      supportedLanguages: this.getSupportedLanguages(),
      cacheSize: this.cache.size,
      initialized: this.initialized
    }

    this.translations.forEach((resources, language) => {
      stats[language] = {
        keys: this.countKeys(resources)
      }
    })

    return stats
  }

  /**
   * 递归计算对象的键数量
   * @param {object} obj - 对象
   * @returns {number} 键数量
   */
  countKeys(obj) {
    let count = 0
    
    for (const value of Object.values(obj)) {
      if (typeof value === 'object' && value !== null) {
        count += this.countKeys(value)
      } else {
        count++
      }
    }
    
    return count
  }
}

const i18nManager = new I18nManager()

module.exports = {
  I18nManager,
  i18nManager
}
