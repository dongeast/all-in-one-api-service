/**
 * Function 注册中心
 * 集中管理所有 Function 的元数据信息
 */

const BaseRegistry = require('../registry/base-registry')

/**
 * Function 注册中心类
 */
class FunctionRegistry extends BaseRegistry {
  /**
   * 创建Function注册中心实例
   */
  constructor() {
    super({
      itemName: 'function',
      idField: 'name',
      indexFields: ['type', 'provider', 'models', 'category']
    })
    
    this.apiToFunctionIndex = new Map()
  }

  /**
   * 注册 Function
   * @param {object} functionMeta - Function 元数据
   */
  register(functionMeta) {
    super.register(functionMeta)

    const { name, apis } = functionMeta
    if (apis) {
      if (apis.request && typeof apis.request === 'string') {
        this.apiToFunctionIndex.set(apis.request, name)
      }
      if (apis.query && typeof apis.query === 'string') {
        this.apiToFunctionIndex.set(apis.query, name)
      }
    }
  }

  /**
   * 根据类型获取 Function 列表
   * @param {string} type - Function 类型
   * @param {object} options - 查询选项
   * @returns {Array} Function 列表
   */
  getByType(type, options = {}) {
    return this.getByField('type', type, options)
  }

  /**
   * 根据模型获取 Function 列表
   * @param {string} model - 模型名称
   * @param {object} options - 查询选项
   * @returns {Array} Function 列表
   */
  getByModel(model, options = {}) {
    return this.getByField('models', model, options)
  }

  /**
   * 根据 Provider 获取 Function 列表
   * @param {string} provider - Provider 名称
   * @returns {Array} Function 列表
   */
  getByProvider(provider) {
    return this.getByField('provider', provider)
  }

  /**
   * 根据分类获取 Function 列表
   * @param {string} category - 分类名称
   * @param {object} options - 查询选项
   * @returns {Array} Function 列表
   */
  getByCategory(category, options = {}) {
    return this.getByField('category', category, options)
  }

  /**
   * 根据类型和模型获取最佳 Function
   * @param {string} type - Function 类型
   * @param {string} model - 模型名称
   * @param {object} options - 查询选项
   * @returns {object|null} 最佳 Function
   */
  getBestFunction(type, model, options = {}) {
    const funcs = this.getByType(type, { ...options, model })
    return funcs.length > 0 ? funcs[0] : null
  }

  /**
   * 根据 API 名称获取对应的 Function
   * @param {string} apiName - API 名称
   * @returns {object|null} Function 元数据
   */
  getByAPI(apiName) {
    const functionName = this.apiToFunctionIndex.get(apiName)
    if (!functionName) return null
    return this.items.get(functionName)
  }

  /**
   * 获取 Function 关联的所有 API
   * @param {string} functionName - Function 名称
   * @returns {object} API 映射
   */
  getRelatedAPIs(functionName) {
    const func = this.items.get(functionName)
    if (!func) return null

    return {
      request: typeof func.apis?.request === 'string' ? func.apis.request : null,
      query: typeof func.apis?.query === 'string' ? func.apis.query : null
    }
  }

  /**
   * 检查 API 是否是请求 API
   * @param {string} apiName - API 名称
   * @returns {boolean} 是否是请求 API
   */
  isRequestAPI(apiName) {
    const func = this.getByAPI(apiName)
    if (!func) return false
    return func.apis?.request === apiName
  }

  /**
   * 检查 API 是否是查询 API
   * @param {string} apiName - API 名称
   * @returns {boolean} 是否是查询 API
   */
  isQueryAPI(apiName) {
    const func = this.getByAPI(apiName)
    if (!func) return false
    return func.apis?.query === apiName
  }

  /**
   * 根据 API 名称获取 Function 名称
   * @param {string} apiName - API 名称
   * @returns {string|null} Function 名称
   */
  getFunctionNameByAPI(apiName) {
    return this.apiToFunctionIndex.get(apiName) || null
  }

  /**
   * 获取所有支持的类型
   * @returns {Array} 类型列表
   */
  getSupportedTypes() {
    return this.getIndexValues('type')
  }

  /**
   * 获取所有支持的分类
   * @returns {Array} 分类列表
   */
  getSupportedCategories() {
    return this.getIndexValues('category')
  }

  /**
   * 获取统计信息
   * @returns {object} 统计信息
   */
  getStats() {
    const stats = super.getStats(['provider', 'type', 'category'])
    
    stats.asyncCount = 0
    stats.syncCount = 0
    
    this.items.forEach(func => {
      if (func.type === 'async') stats.asyncCount++
      if (func.type === 'sync') stats.syncCount++
    })

    return stats
  }

  /**
   * 清空注册中心
   */
  clear() {
    super.clear()
    this.apiToFunctionIndex.clear()
  }
}

const functionRegistry = new FunctionRegistry()

module.exports = functionRegistry
module.exports.FunctionRegistry = FunctionRegistry
