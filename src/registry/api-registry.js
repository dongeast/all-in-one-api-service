/**
 * 接口元数据注册中心
 * 集中管理所有API接口的元数据信息
 */

const { getProviderPriority } = require('../constants')

/**
 * 接口元数据注册中心类
 */
class APIRegistry {
  constructor() {
    this.apis = new Map()
    this.typeIndex = new Map()
    this.tagIndex = new Map()
    this.providerIndex = new Map()
    this.modelIndex = new Map()
  }

  /**
   * 注册接口
   * 当不同 Provider 提供相同 ID 的接口时，保留优先级最高的
   * @param {object} apiMeta - 接口元数据
   */
  register(apiMeta) {
    const { name, type, tags, provider, models } = apiMeta

    const existingAPI = this.apis.get(name)
    if (existingAPI) {
      const existingPriority = getProviderPriority(existingAPI.provider)
      const currentPriority = getProviderPriority(provider)
      
      if (currentPriority <= existingPriority) {
        return
      }
    }

    this.apis.set(name, apiMeta)

    const types = Array.isArray(type) ? type : [type]
    types.forEach(t => {
      if (!this.typeIndex.has(t)) {
        this.typeIndex.set(t, new Set())
      }
      this.typeIndex.get(t).add(name)
    })

    if (tags && Array.isArray(tags)) {
      tags.forEach(tag => {
        if (!this.tagIndex.has(tag)) {
          this.tagIndex.set(tag, new Set())
        }
        this.tagIndex.get(tag).add(name)
      })
    }

    if (provider) {
      if (!this.providerIndex.has(provider)) {
        this.providerIndex.set(provider, new Set())
      }
      this.providerIndex.get(provider).add(name)
    }

    if (models && Array.isArray(models)) {
      models.forEach(model => {
        if (!this.modelIndex.has(model)) {
          this.modelIndex.set(model, new Set())
        }
        this.modelIndex.get(model).add(name)
      })
    }
  }

  /**
   * 批量注册接口
   * @param {object} apis - 接口元数据对象
   */
  registerAll(apis) {
    Object.values(apis).forEach(api => this.register(api))
  }

  /**
   * 根据名称获取接口
   * @param {string} name - 接口名称
   * @returns {object|null} 接口元数据
   */
  get(name) {
    return this.apis.get(name) || null
  }

  /**
   * 根据类型获取接口列表
   * @param {string} type - API类型
   * @param {object} options - 查询选项
   * @returns {Array} 接口列表
   */
  getByType(type, options = {}) {
    const apiNames = this.typeIndex.get(type)
    if (!apiNames) return []

    let apis = Array.from(apiNames).map(name => this.apis.get(name))

    if (options.tags) {
      const filterTags = Array.isArray(options.tags) ? options.tags : [options.tags]
      apis = apis.filter(api =>
        filterTags.some(tag => api.tags && api.tags.includes(tag))
      )
    }

    if (options.provider) {
      apis = apis.filter(api => api.provider === options.provider)
    }

    if (options.model) {
      apis = apis.filter(api =>
        api.models && api.models.includes(options.model)
      )
    }

    apis.sort((a, b) => (b.priority || 0) - (a.priority || 0))

    return apis
  }

  /**
   * 根据模型获取接口列表
   * @param {string} model - 模型名称
   * @param {object} options - 查询选项
   * @returns {Array} 接口列表
   */
  getByModel(model, options = {}) {
    const apiNames = this.modelIndex.get(model)
    if (!apiNames) return []

    let apis = Array.from(apiNames).map(name => this.apis.get(name))

    if (options.type) {
      apis = apis.filter(api => api.type === options.type)
    }

    apis.sort((a, b) => (b.priority || 0) - (a.priority || 0))

    return apis
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
   * 获取所有接口
   * @returns {Array} 接口列表
   */
  getAll() {
    return Array.from(this.apis.values())
  }

  /**
   * 根据Provider获取接口列表
   * @param {string} provider - Provider名称
   * @returns {Array} 接口列表
   */
  getByProvider(provider) {
    const apiNames = this.providerIndex.get(provider)
    if (!apiNames) return []
    return Array.from(apiNames).map(name => this.apis.get(name))
  }

  /**
   * 检查接口是否存在
   * @param {string} name - 接口名称
   * @returns {boolean} 是否存在
   */
  has(name) {
    return this.apis.has(name)
  }

  /**
   * 获取接口数量
   * @returns {number} 接口数量
   */
  size() {
    return this.apis.size
  }
}

const apiRegistry = new APIRegistry()

module.exports = apiRegistry
