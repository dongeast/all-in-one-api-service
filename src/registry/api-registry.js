/**
 * 接口元数据注册中心
 * 集中管理所有API接口的元数据信息
 * 作为唯一的API定义源
 */

const BaseRegistry = require('./base-registry')

/**
 * 接口元数据注册中心类
 */
class APIRegistry extends BaseRegistry {
  /**
   * 创建API注册中心实例
   */
  constructor() {
    super({
      itemName: 'api',
      idField: 'name',
      indexFields: ['apiType', 'type', 'tags', 'provider', 'models', 'category']
    })
  }

  /**
   * 根据类型获取接口列表
   * @param {string} type - API类型
   * @param {object} options - 查询选项
   * @returns {Array} 接口列表
   */
  getByType(type, options = {}) {
    return this.getByField('type', type, options)
  }

  /**
   * 根据模型获取接口列表
   * @param {string} model - 模型名称
   * @param {object} options - 查询选项
   * @returns {Array} 接口列表
   */
  getByModel(model, options = {}) {
    return this.getByField('models', model, options)
  }

  /**
   * 根据Provider获取接口列表
   * @param {string} provider - Provider名称
   * @returns {Array} 接口列表
   */
  getByProvider(provider) {
    return this.getByField('provider', provider)
  }

  /**
   * 根据标签获取接口列表
   * @param {string|Array} tags - 标签
   * @param {object} options - 查询选项
   * @returns {Array} 接口列表
   */
  getByTags(tags, options = {}) {
    return this.getByField('tags', tags, options)
  }

  /**
   * 根据分类获取接口列表
   * @param {string} category - 分类名称
   * @param {object} options - 查询选项
   * @returns {Array} 接口列表
   */
  getByCategory(category, options = {}) {
    return this.getByField('category', category, options)
  }

  /**
   * 根据API类型获取接口列表
   * @param {string} apiType - API类型
   * @param {object} options - 查询选项
   * @returns {Array} 接口列表
   */
  getByAPIType(apiType, options = {}) {
    return this.getByField('apiType', apiType, options)
  }

  /**
   * 根据API类型和模型获取最佳接口
   * @param {string} apiType - API类型
   * @param {string} model - 模型名称
   * @param {object} options - 查询选项
   * @returns {object|null} 最佳接口
   */
  getBestAPIByType(apiType, model, options = {}) {
    const apis = this.getByAPIType(apiType, { ...options, model })
    return apis.length > 0 ? apis[0] : null
  }

  /**
   * 根据类型和模型获取最佳接口
   * @param {string} type - API类型
   * @param {string} model - 模型名称
   * @param {object} options - 查询选项
   * @returns {object|null} 最佳接口
   */
  getBestAPI(type, model, options = {}) {
    const apis = this.getByType(type, { ...options, model })
    return apis.length > 0 ? apis[0] : null
  }

  /**
   * 获取API的endpoint
   * @param {string} apiName - API名称
   * @returns {string|null} endpoint
   */
  getEndpoint(apiName) {
    const api = this.get(apiName)
    return api?.endpoint || null
  }

  /**
   * 获取API的method
   * @param {string} apiName - API名称
   * @returns {string} method（默认POST）
   */
  getMethod(apiName) {
    const api = this.get(apiName)
    return api?.method || 'POST'
  }

  /**
   * 获取API的类型
   * @param {string} apiName - API名称
   * @returns {string|null} type
   */
  getType(apiName) {
    const api = this.get(apiName)
    return api?.type || null
  }

  /**
   * 获取API的参数schema
   * @param {string} apiName - API名称
   * @returns {object|null} paramSchema
   */
  getParamSchema(apiName) {
    const api = this.get(apiName)
    return api?.paramSchema || null
  }

  /**
   * 获取API的完整调用信息
   * @param {string} apiName - API名称
   * @returns {object|null} 调用信息
   */
  getCallInfo(apiName) {
    const api = this.get(apiName)
    if (!api) return null
    
    return {
      name: api.name,
      endpoint: api.endpoint,
      method: api.method || 'POST',
      type: api.type,
      provider: api.provider,
      category: api.category,
      paramSchema: api.paramSchema,
      models: api.models || [],
      tags: api.tags || [],
      priority: api.priority || 100
    }
  }

  /**
   * 验证API是否存在
   * @param {string} apiName - API名称
   * @returns {boolean} 是否存在
   */
  validateAPI(apiName) {
    return this.has(apiName)
  }

  /**
   * 获取所有可用的endpoint列表
   * @returns {Array<string>} endpoint列表
   */
  getAllEndpoints() {
    return this.getAll()
      .map(api => api.endpoint)
      .filter(endpoint => endpoint)
  }

  /**
   * 根据endpoint查找API
   * @param {string} endpoint - endpoint路径
   * @returns {object|null} API定义
   */
  getByEndpoint(endpoint) {
    const apis = this.getAll()
    return apis.find(api => api.endpoint === endpoint) || null
  }

  /**
   * 获取API的输入参数定义
   * @param {string} apiName - API名称
   * @returns {object} 输入参数定义
   */
  getInputSchema(apiName) {
    const api = this.get(apiName)
    return api?.paramSchema?.input || {}
  }

  /**
   * 获取API的输出参数定义
   * @param {string} apiName - API名称
   * @returns {object} 输出参数定义
   */
  getOutputSchema(apiName) {
    const api = this.get(apiName)
    return api?.paramSchema?.output || {}
  }

  /**
   * 验证API参数
   * @param {string} apiName - API名称
   * @param {object} params - 参数对象
   * @returns {object} 验证结果
   */
  validateParams(apiName, params) {
    const api = this.get(apiName)
    if (!api || !api.paramSchema) {
      return { valid: true, errors: [] }
    }
    
    const BaseParam = require('../params/base-param')
    const param = new BaseParam(api.paramSchema)
    return param.validate(params)
  }

  /**
   * 获取API的参数配置（支持多语言）
   * @param {string} apiName - API名称
   * @param {object} context - 参数上下文
   * @param {object} options - 选项（包含 provider 和 language）
   * @returns {object|null} 参数配置
   */
  getAPIParams(apiName, context = {}, options = {}) {
    // 首先确保翻译资源已加载
    require('../locales')

    const api = this.get(apiName)
    if (!api) return null

    const APIDefinition = require('../apis/api-definition')
    const apiDefinition = new APIDefinition({
      name: api.name,
      endpoint: api.endpoint,
      method: api.method || 'POST',
      paramSchema: api.paramSchema,
      modelName: api.models?.[0] || 'unknown',
      isAsync: false,
      outputMapping: api.outputMapping || null
    })

    // 合并 provider：优先使用 options 中的，否则使用 API 元数据中的
    const mergedOptions = {
      ...options,
      provider: options.provider || api.provider
    }

    // 获取参数配置
    const paramConfig = apiDefinition.getParamConfig(context, mergedOptions)

    // 添加多语言翻译
    if (paramConfig && paramConfig.parameters) {
      const { addTranslationsToParams } = require('../utils/param-i18n')
      paramConfig.parameters = addTranslationsToParams(
        paramConfig.parameters,
        mergedOptions.provider,
        mergedOptions.language
      )
    }

    return paramConfig
  }
}

const apiRegistry = new APIRegistry()

module.exports = apiRegistry
module.exports.APIRegistry = APIRegistry
