/**
 * 元数据统一查询接口
 * 提供统一的元数据查询、翻译和关联查询功能
 */

const { unifiedRegistry } = require('../registry')
const { createLogger } = require('../utils/logger')

const logger = createLogger({ level: 'INFO' })

/**
 * 元数据查询类
 */
class MetadataQuery {
  /**
   * 创建元数据查询实例
   * @param {object} options - 配置选项
   */
  constructor(options = {}) {
    this.defaultLanguage = options.defaultLanguage || 'zh'
    this.enableTranslation = options.enableTranslation !== false
  }

  /**
   * 查询 API
   * @param {object} options - 查询选项
   * @param {string} options.provider - Provider 名称
   * @param {string} options.type - API 类型
   * @param {string} options.apiType - API 业务类型
   * @param {string} options.model - 模型名称
   * @param {string|Array} options.tags - 标签
   * @param {string} options.category - 分类
   * @param {string} options.sortBy - 排序字段
   * @param {string} options.sortOrder - 排序顺序
   * @param {string} language - 语言
   * @returns {Array} API 列表
   */
  queryAPIs(options = {}, language = this.defaultLanguage) {
    const apis = unifiedRegistry.apiRegistry.getAll(options)

    if (this.enableTranslation) {
      return apis.map(api => this.translateAPI(api, language))
    }

    return apis
  }

  /**
   * 根据 ID 获取 API
   * @param {string} apiName - API 名称
   * @param {string} language - 语言
   * @returns {object|null} API 元数据
   */
  getAPI(apiName, language = this.defaultLanguage) {
    const api = unifiedRegistry.apiRegistry.get(apiName)
    if (!api) return null

    if (this.enableTranslation) {
      return this.translateAPI(api, language)
    }

    return api
  }

  /**
   * 查询 Model
   * @param {object} options - 查询选项
   * @param {string} options.provider - Provider 名称
   * @param {string} options.type - API 类型
   * @param {string} options.series - 系列名称
   * @param {string|Array} options.tags - 标签
   * @param {string} options.sortBy - 排序字段
   * @param {string} options.sortOrder - 排序顺序
   * @param {string} language - 语言
   * @returns {Array} Model 列表
   */
  queryModels(options = {}, language = this.defaultLanguage) {
    const models = unifiedRegistry.modelRegistry.getAll(options)

    if (this.enableTranslation) {
      return models.map(model => this.translateModel(model, language))
    }

    return models
  }

  /**
   * 根据 ID 获取 Model
   * @param {string} modelName - Model 名称
   * @param {string} language - 语言
   * @returns {object|null} Model 元数据
   */
  getModel(modelName, language = this.defaultLanguage) {
    const model = unifiedRegistry.modelRegistry.get(modelName)
    if (!model) return null

    if (this.enableTranslation) {
      return this.translateModel(model, language)
    }

    return model
  }

  /**
   * 查询 Function
   * @param {object} options - 查询选项
   * @param {string} options.provider - Provider 名称
   * @param {string} options.type - Function 类型
   * @param {string} options.model - 模型名称
   * @param {string} options.category - 分类
   * @param {string} options.sortBy - 排序字段
   * @param {string} options.sortOrder - 排序顺序
   * @param {string} language - 语言
   * @returns {Array} Function 列表
   */
  queryFunctions(options = {}, language = this.defaultLanguage) {
    const functions = unifiedRegistry.functionRegistry.getAll(options)

    if (this.enableTranslation) {
      return functions.map(func => this.translateFunction(func, language))
    }

    return functions
  }

  /**
   * 根据 ID 获取 Function
   * @param {string} functionName - Function 名称
   * @param {string} language - 语言
   * @returns {object|null} Function 元数据
   */
  getFunction(functionName, language = this.defaultLanguage) {
    const func = unifiedRegistry.functionRegistry.get(functionName)
    if (!func) return null

    if (this.enableTranslation) {
      return this.translateFunction(func, language)
    }

    return func
  }

  /**
   * 查询 Function 关联的 APIs
   * @param {string} functionName - Function 名称
   * @param {string} language - 语言
   * @returns {object} API 映射
   */
  getFunctionAPIs(functionName, language = this.defaultLanguage) {
    const apis = unifiedRegistry.functionRegistry.getRelatedAPIs(functionName)
    if (!apis) return null

    const result = {}

    if (apis.request) {
      result.request = this.getAPI(apis.request, language)
    }

    if (apis.query) {
      result.query = this.getAPI(apis.query, language)
    }

    return result
  }

  /**
   * 查询 API 关联的 Function
   * @param {string} apiName - API 名称
   * @param {string} language - 语言
   * @returns {object|null} Function 元数据
   */
  getAPIFunction(apiName, language = this.defaultLanguage) {
    const func = unifiedRegistry.functionRegistry.getByAPI(apiName)
    if (!func) return null

    if (this.enableTranslation) {
      return this.translateFunction(func, language)
    }

    return func
  }

  /**
   * 查询 API 的积分配置
   * @param {string} apiName - API 名称
   * @param {string} language - 语言
   * @returns {object|null} 积分配置
   */
  getAPICredits(apiName, language = this.defaultLanguage) {
    const credits = unifiedRegistry.creditRegistry.getAPICredits(apiName)
    if (!credits) return null

    return credits
  }

  /**
   * 翻译 API 元数据
   * @param {object} api - API 元数据
   * @param {string} language - 语言
   * @returns {object} 翻译后的 API 元数据
   */
  translateAPI(api, language) {
    try {
      const { translateAPIMetadata } = require('../utils/metadata-i18n')
      return translateAPIMetadata(api, api.provider, language)
    } catch (error) {
      logger.debug(`Failed to translate API ${api.name}:`, error.message)
      return api
    }
  }

  /**
   * 翻译 Model 元数据
   * @param {object} model - Model 元数据
   * @param {string} language - 语言
   * @returns {object} 翻译后的 Model 元数据
   */
  translateModel(model, language) {
    try {
      const { translateModelMetadata } = require('../utils/metadata-i18n')
      return translateModelMetadata(model, model.provider, language)
    } catch (error) {
      logger.debug(`Failed to translate model ${model.name}:`, error.message)
      return model
    }
  }

  /**
   * 翻译 Function 元数据
   * @param {object} func - Function 元数据
   * @param {string} language - 语言
   * @returns {object} 翻译后的 Function 元数据
   */
  translateFunction(func, language) {
    try {
      const { translateFunctionMetadata } = require('../utils/function-i18n')
      return translateFunctionMetadata(func, func.provider, language)
    } catch (error) {
      logger.debug(`Failed to translate function ${func.name}:`, error.message)
      return func
    }
  }

  /**
   * 批量查询 API
   * @param {Array<string>} apiNames - API 名称列表
   * @param {string} language - 语言
   * @returns {Array} API 列表
   */
  getAPIs(apiNames, language = this.defaultLanguage) {
    return apiNames
      .map(name => this.getAPI(name, language))
      .filter(api => api !== null)
  }

  /**
   * 批量查询 Model
   * @param {Array<string>} modelNames - Model 名称列表
   * @param {string} language - 语言
   * @returns {Array} Model 列表
   */
  getModels(modelNames, language = this.defaultLanguage) {
    return modelNames
      .map(name => this.getModel(name, language))
      .filter(model => model !== null)
  }

  /**
   * 批量查询 Function
   * @param {Array<string>} functionNames - Function 名称列表
   * @param {string} language - 语言
   * @returns {Array} Function 列表
   */
  getFunctions(functionNames, language = this.defaultLanguage) {
    return functionNames
      .map(name => this.getFunction(name, language))
      .filter(func => func !== null)
  }

  /**
   * 搜索 API
   * @param {string} keyword - 搜索关键词
   * @param {object} options - 查询选项
   * @param {string} language - 语言
   * @returns {Array} API 列表
   */
  searchAPIs(keyword, options = {}, language = this.defaultLanguage) {
    const apis = this.queryAPIs(options, language)

    if (!keyword) return apis

    const lowerKeyword = keyword.toLowerCase()
    return apis.filter(api => {
      return (
        (api.name && api.name.toLowerCase().includes(lowerKeyword)) ||
        (api.displayName && api.displayName.toLowerCase().includes(lowerKeyword)) ||
        (api.description && api.description.toLowerCase().includes(lowerKeyword)) ||
        (api.endpoint && api.endpoint.toLowerCase().includes(lowerKeyword))
      )
    })
  }

  /**
   * 搜索 Model
   * @param {string} keyword - 搜索关键词
   * @param {object} options - 查询选项
   * @param {string} language - 语言
   * @returns {Array} Model 列表
   */
  searchModels(keyword, options = {}, language = this.defaultLanguage) {
    const models = this.queryModels(options, language)

    if (!keyword) return models

    const lowerKeyword = keyword.toLowerCase()
    return models.filter(model => {
      return (
        (model.name && model.name.toLowerCase().includes(lowerKeyword)) ||
        (model.displayName && model.displayName.toLowerCase().includes(lowerKeyword)) ||
        (model.description && model.description.toLowerCase().includes(lowerKeyword))
      )
    })
  }

  /**
   * 搜索 Function
   * @param {string} keyword - 搜索关键词
   * @param {object} options - 查询选项
   * @param {string} language - 语言
   * @returns {Array} Function 列表
   */
  searchFunctions(keyword, options = {}, language = this.defaultLanguage) {
    const functions = this.queryFunctions(options, language)

    if (!keyword) return functions

    const lowerKeyword = keyword.toLowerCase()
    return functions.filter(func => {
      return (
        (func.name && func.name.toLowerCase().includes(lowerKeyword)) ||
        (func.displayName && func.displayName.toLowerCase().includes(lowerKeyword)) ||
        (func.description && func.description.toLowerCase().includes(lowerKeyword))
      )
    })
  }

  /**
   * 获取统计信息
   * @returns {object} 统计信息
   */
  getStats() {
    return unifiedRegistry.getStats()
  }
}

const metadataQuery = new MetadataQuery()

module.exports = metadataQuery
module.exports.MetadataQuery = MetadataQuery
