/**
 * 统一元数据管理器
 * 整合所有元数据的管理和查询
 */

const { createLogger } = require('./logger')
const { metadataCache } = require('./metadata-cache')
const { addTranslationsToFunctionMetadata } = require('./function-i18n')
const { addTranslationsToAPIs, addTranslationsToModels } = require('./metadata-i18n')

const logger = createLogger({ level: 'INFO' })

const apiMetadataStore = new Map()
const modelMetadataStore = new Map()

/**
 * 注册API元数据
 * @param {string} provider - 提供商名称
 * @param {object} metadata - API元数据对象
 */
function registerAPIsMetadata(provider, metadata) {
  apiMetadataStore.set(provider, metadata)
}

/**
 * 注册模型元数据
 * @param {string} provider - 提供商名称
 * @param {object} metadata - 模型元数据对象
 */
function registerModelsMetadata(provider, metadata) {
  modelMetadataStore.set(provider, metadata)
}

/**
 * 获取API元数据
 * @param {string} provider - 提供商名称
 * @param {string} language - 语言代码(可选)
 * @returns {object} API元数据(带翻译)
 */
function getAPIsMetadata(provider, language) {
  const metadata = apiMetadataStore.get(provider)
  if (!metadata) {
    return {}
  }
  
  if (!language) {
    return metadata
  }
  
  return addTranslationsToAPIs(metadata, provider, language)
}

/**
 * 获取模型元数据
 * @param {string} provider - 提供商名称
 * @param {string} language - 语言代码(可选)
 * @returns {object} 模型元数据(带翻译)
 */
function getModelsMetadata(provider, language) {
  const metadata = modelMetadataStore.get(provider)
  if (!metadata) {
    return {}
  }
  
  if (!language) {
    return metadata
  }
  
  return addTranslationsToModels(metadata, provider, language)
}

/**
 * 获取单个API元数据
 * @param {string} provider - 提供商名称
 * @param {string} apiName - API名称
 * @param {string} language - 语言代码(可选)
 * @returns {object|null} API元数据(带翻译)
 */
function getAPIMetadata(provider, apiName, language) {
  const metadata = apiMetadataStore.get(provider)
  if (!metadata || !metadata[apiName]) {
    return null
  }
  
  const apiMetadata = metadata[apiName]
  
  if (!language) {
    return apiMetadata
  }
  
  const translated = addTranslationsToAPIs({ [apiName]: apiMetadata }, provider, language)
  return translated[apiName]
}

/**
 * 获取单个模型元数据
 * @param {string} provider - 提供商名称
 * @param {string} modelName - 模型名称
 * @param {string} language - 语言代码(可选)
 * @returns {object|null} 模型元数据(带翻译)
 */
function getModelMetadata(provider, modelName, language) {
  const metadata = modelMetadataStore.get(provider)
  if (!metadata || !metadata[modelName]) {
    return null
  }
  
  const modelMeta = metadata[modelName]
  
  if (!language) {
    return modelMeta
  }
  
  const translated = addTranslationsToModels({ [modelName]: modelMeta }, provider, language)
  return translated[modelName]
}

/**
 * 获取所有API元数据
 * @param {string} language - 语言代码(可选)
 * @returns {object} 所有API元数据(带翻译)
 */
function getAllAPIsMetadata(language) {
  const result = {}
  
  for (const [provider, metadata] of apiMetadataStore.entries()) {
    result[provider] = language 
      ? addTranslationsToAPIs(metadata, provider, language)
      : metadata
  }
  
  return result
}

/**
 * 获取所有模型元数据
 * @param {string} language - 语言代码(可选)
 * @returns {object} 所有模型元数据(带翻译)
 */
function getAllModelsMetadata(language) {
  const result = {}
  
  for (const [provider, metadata] of modelMetadataStore.entries()) {
    result[provider] = language
      ? addTranslationsToModels(metadata, provider, language)
      : metadata
  }
  
  return result
}

/**
 * 元数据管理器类
 */
class MetadataManager {
  constructor() {
    this.initialized = false
    this.functionRegistry = null
    this.apiRegistry = null
    this.modelRegistry = null
    this.translations = {}
  }

  /**
   * 初始化元数据管理器
   */
  initialize() {
    if (this.initialized) {
      return
    }

    this.functionRegistry = require('../functions/function-registry')
    this.apiRegistry = require('../registry/api-registry')
    this.modelRegistry = require('../registry/model-registry')

    this.loadTranslations()

    this.initialized = true
    logger.info('MetadataManager initialized')
  }

  /**
   * 加载翻译文件
   */
  loadTranslations() {
    try {
      logger.info('Loading translations...')
      
      const zhFunctions = require('../locales/zh/functions.json')
      const zhMetadata = require('../locales/zh/metadata.json')
      const enFunctions = require('../locales/en/functions.json')
      const enMetadata = require('../locales/en/metadata.json')
      
      logger.info('Translation files loaded successfully')
      logger.info('zhMetadata keys:', Object.keys(zhMetadata))
      logger.info('zhMetadata.scenes exists:', !!zhMetadata.scenes)
      logger.info('zhMetadata.scenes count:', zhMetadata.scenes ? Object.keys(zhMetadata.scenes).length : 0)
      
      this.translations = {
        zh: {
          functions: zhFunctions.functions,
          metadata: zhMetadata
        },
        en: {
          functions: enFunctions.functions,
          metadata: enMetadata
        }
      }
      
      logger.info('Translations loaded successfully')
    } catch (error) {
      logger.error('Failed to load translations:', error)
      logger.error('Error stack:', error.stack)
      this.translations = {}
    }
  }

  /**
   * 获取 Function 元数据
   * @param {string} name - Function 名称
   * @param {string} language - 语言代码（可选）
   * @returns {object|null} Function 元数据
   */
  getFunction(name, language = 'zh') {
    this.ensureInitialized()

    const cached = metadataCache.get('function', name, language)
    if (cached) {
      return cached
    }

    const metadata = this.functionRegistry.get(name)
    if (!metadata) {
      return null
    }

    const translatedMetadata = this.translateFunctionMetadata(metadata, language)
    
    metadataCache.set('function', name, translatedMetadata, language)
    
    return translatedMetadata
  }

  /**
   * 获取 API 元数据
   * @param {string} name - API 名称
   * @param {string} language - 语言代码（可选）
   * @returns {object|null} API 元数据
   */
  getAPI(name, language = 'zh') {
    this.ensureInitialized()

    const cached = metadataCache.get('api', name, language)
    if (cached) {
      return cached
    }

    const metadata = this.apiRegistry.get(name)
    if (!metadata) {
      return null
    }

    const translatedMetadata = this.translateAPIMetadata(metadata, language)
    
    metadataCache.set('api', name, translatedMetadata, language)
    
    return translatedMetadata
  }

  /**
   * 获取 Model 元数据
   * @param {string} name - Model 名称
   * @param {string} language - 语言代码（可选）
   * @returns {object|null} Model 元数据
   */
  getModel(name, language = 'zh') {
    this.ensureInitialized()

    const cached = metadataCache.get('model', name, language)
    if (cached) {
      return cached
    }

    const metadata = this.modelRegistry.get(name)
    if (!metadata) {
      return null
    }

    const translatedMetadata = this.translateModelMetadata(metadata, language)
    
    metadataCache.set('model', name, translatedMetadata, language)
    
    return translatedMetadata
  }

  /**
   * 获取翻译
   * @param {string} key - 翻译键
   * @param {string} language - 语言代码
   * @returns {string} 翻译文本
   */
  getTranslation(key, language = 'zh') {
    const keys = key.split('.')
    let value = this.translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key
      }
    }

    return typeof value === 'string' ? value : key
  }

  /**
   * 翻译 Function 元数据
   * @param {object} metadata - 原始元数据
   * @param {string} language - 语言代码
   * @returns {object} 翻译后的元数据
   */
  translateFunctionMetadata(metadata, language) {
    return addTranslationsToFunctionMetadata(metadata, metadata.provider, language)
  }

  /**
   * 通用翻译方法
   * @param {object} metadata - 原始元数据
   * @param {string} language - 语言代码
   * @param {string} type - 类型 ('apis' 或 'models')
   * @returns {object} 翻译后的元数据
   */
  translateMetadata(metadata, language, type) {
    const provider = metadata.provider
    const name = metadata.name

    const translation = this.translations[language]?.metadata?.[type]?.[provider]?.[name]

    if (!translation) {
      return metadata
    }

    return {
      ...metadata,
      displayName: translation.displayName || metadata.displayName,
      description: translation.description || metadata.description
    }
  }

  /**
   * 翻译 API 元数据
   * @param {object} metadata - 原始元数据
   * @param {string} language - 语言代码
   * @returns {object} 翻译后的元数据
   */
  translateAPIMetadata(metadata, language) {
    return this.translateMetadata(metadata, language, 'apis')
  }

  /**
   * 翻译 Model 元数据
   * @param {object} metadata - 原始元数据
   * @param {string} language - 语言代码
   * @returns {object} 翻译后的元数据
   */
  translateModelMetadata(metadata, language) {
    const name = metadata.name
    const series = metadata.series

    // 优先使用系列名称查找翻译（因为翻译文件按系列分组）
    let translation = null
    if (series) {
      translation = this.translations[language]?.metadata?.models?.[series]?.[name]
    }

    // 如果找不到，再尝试使用提供商名称查找
    if (!translation) {
      translation = this.translations[language]?.metadata?.models?.[metadata.provider]?.[name]
    }

    if (!translation) {
      return metadata
    }

    return {
      ...metadata,
      displayName: translation.displayName || metadata.displayName,
      description: translation.description || metadata.description
    }
  }

  /**
   * 批量获取 Functions
   * @param {object} options - 查询选项
   * @param {string} language - 语言代码
   * @returns {Array} Function 列表
   */
  getFunctions(options = {}, language = 'zh') {
    this.ensureInitialized()

    let functions = this.functionRegistry.getAll()

    if (options.type) {
      functions = functions.filter(f => f.type === options.type)
    }

    if (options.provider) {
      functions = functions.filter(f => f.provider === options.provider)
    }

    if (options.category) {
      functions = functions.filter(f => f.category === options.category)
    }

    if (options.model) {
      functions = functions.filter(f => 
        f.models && f.models.includes(options.model)
      )
    }

    if (options.asyncOnly !== undefined) {
      functions = functions.filter(f =>
        options.asyncOnly ? f.type === 'async' : f.type === 'sync'
      )
    }

    functions.sort((a, b) => (b.priority || 0) - (a.priority || 0))

    return functions.map(f => this.translateFunctionMetadata(f, language))
  }

  /**
   * 批量获取 APIs
   * @param {object} options - 查询选项
   * @param {string} language - 语言代码
   * @returns {Array} API 列表
   */
  getAPIs(options = {}, language = 'zh') {
    this.ensureInitialized()

    let apis = this.apiRegistry.getAll()

    if (options.type) {
      apis = apis.filter(a => a.type === options.type)
    }

    if (options.provider) {
      apis = apis.filter(a => a.provider === options.provider)
    }

    if (options.tags) {
      apis = apis.filter(a =>
        options.tags.some(tag => a.tags && a.tags.includes(tag))
      )
    }

    apis.sort((a, b) => (b.priority || 0) - (a.priority || 0))

    return apis.map(a => this.translateAPIMetadata(a, language))
  }

  /**
   * 批量获取 Models
   * @param {object} options - 查询选项
   * @param {string} language - 语言代码
   * @returns {Array} Model 列表
   */
  getModels(options = {}, language = 'zh') {
    this.ensureInitialized()

    let models = this.modelRegistry.getAll()

    if (options.type) {
      models = models.filter(m => {
        const types = Array.isArray(m.type) ? m.type : [m.type]
        return types.some(t => {
          const typeId = typeof t === 'object' && t.id ? t.id : t
          return typeId === options.type
        })
      })
    }

    if (options.provider) {
      models = models.filter(m => m.provider === options.provider)
    }

    if (options.series) {
      models = models.filter(m => m.series === options.series)
    }

    if (options.tags) {
      models = models.filter(m =>
        options.tags.some(tag => m.tags && m.tags.includes(tag))
      )
    }

    models.sort((a, b) => (b.priority || 0) - (a.priority || 0))

    return models.map(m => this.translateModelMetadata(m, language))
  }

  /**
   * 获取最佳 Function
   * @param {string} type - Function 类型
   * @param {string} model - 模型名称
   * @param {object} options - 查询选项
   * @param {string} language - 语言代码
   * @returns {object|null} 最佳 Function
   */
  getBestFunction(type, model, options = {}, language = 'zh') {
    const functions = this.getFunctions({ ...options, type, model }, language)
    return functions.length > 0 ? functions[0] : null
  }

  /**
   * 获取最佳 API
   * @param {string} type - API 类型
   * @param {string} model - 模型名称
   * @param {object} options - 查询选项
   * @param {string} language - 语言代码
   * @returns {object|null} 最佳 API
   */
  getBestAPI(type, model, options = {}, language = 'zh') {
    const apis = this.getAPIs({ ...options, type, model }, language)
    return apis.length > 0 ? apis[0] : null
  }

  /**
   * 根据 API 获取对应的 Function
   * @param {string} apiName - API 名称
   * @param {string} language - 语言代码
   * @returns {object|null} Function 元数据
   */
  getFunctionByAPI(apiName, language = 'zh') {
    const functionName = this.functionRegistry.apiToFunctionIndex.get(apiName)
    if (!functionName) {
      return null
    }
    return this.getFunction(functionName, language)
  }

  /**
   * 获取 Function 关联的所有 API
   * @param {string} functionName - Function 名称
   * @returns {object|null} API 映射
   */
  getRelatedAPIs(functionName) {
    return this.functionRegistry.getRelatedAPIs(functionName)
  }

  /**
   * 获取统计信息
   * @returns {object} 统计信息
   */
  getStats() {
    this.ensureInitialized()

    return {
      functions: this.functionRegistry.getStats(),
      apis: {
        total: this.apiRegistry.size()
      },
      models: {
        total: this.modelRegistry.size()
      },
      cache: metadataCache.getStats()
    }
  }

  /**
   * 确保已初始化
   */
  ensureInitialized() {
    if (!this.initialized) {
      this.initialize()
    }
  }

  /**
   * 清除缓存
   */
  clearCache() {
    metadataCache.clear()
    logger.info('Metadata cache cleared')
  }

  /**
   * 重新加载翻译
   */
  reloadTranslations() {
    this.loadTranslations()
    this.clearCache()
    logger.info('Translations reloaded')
  }
}

const metadataManager = new MetadataManager()

/**
 * 获取翻译文本的便捷方法
 * @param {string} key - 翻译键
 * @param {string} language - 语言代码
 * @returns {string} 翻译文本
 */
function getTranslation(key, language = 'zh') {
  return metadataManager.getTranslation(key, language)
}

module.exports = {
  MetadataManager,
  metadataManager,
  registerAPIsMetadata,
  registerModelsMetadata,
  getAPIsMetadata,
  getModelsMetadata,
  getAPIMetadata,
  getModelMetadata,
  getAllAPIsMetadata,
  getAllModelsMetadata,
  getTranslation
}
