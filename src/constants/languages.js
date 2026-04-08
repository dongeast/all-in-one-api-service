/**
 * 语言常量定义
 * 定义支持的语言类型和相关配置
 */

/**
 * 支持的语言类型
 */
const Languages = {
  EN: 'en',
  ZH: 'zh',
  ZH_CN: 'zh-CN'
}

/**
 * 默认语言
 */
const DEFAULT_LANGUAGE = Languages.EN

/**
 * 语言显示名称
 */
const LanguageNames = {
  [Languages.EN]: 'English',
  [Languages.ZH]: '中文',
  [Languages.ZH_CN]: '简体中文'
}

/**
 * 语言映射(兼容不同写法)
 */
const LanguageAliases = {
  'en': Languages.EN,
  'en-US': Languages.EN,
  'en-us': Languages.EN,
  'zh': Languages.ZH,
  'zh-CN': Languages.ZH_CN,
  'zh-cn': Languages.ZH_CN,
  'zh-Hans': Languages.ZH_CN,
  'zh-hans': Languages.ZH_CN
}

/**
 * 规范化语言代码
 * @param {string} language - 语言代码
 * @returns {string} 规范化后的语言代码
 */
function normalizeLanguage(language) {
  if (!language) {
    return DEFAULT_LANGUAGE
  }
  
  const normalized = LanguageAliases[language]
  if (normalized) {
    return normalized
  }
  
  const lowerLang = language.toLowerCase()
  if (lowerLang.startsWith('zh')) {
    return Languages.ZH
  }
  
  return Languages.EN
}

module.exports = {
  Languages,
  DEFAULT_LANGUAGE,
  LanguageNames,
  LanguageAliases,
  normalizeLanguage
}
