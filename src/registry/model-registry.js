/**
 * 模型元数据注册中心
 * 集中管理所有模型的元数据信息
 */

const { getProviderPriority } = require('../constants')

/**
 * 模型元数据注册中心类
 */
class ModelRegistry {
  constructor() {
    this.models = new Map()
    this.typeIndex = new Map()
    this.tagIndex = new Map()
    this.providerIndex = new Map()
  }

  /**
   * 注册模型
   * 当不同 Provider 提供相同 ID 的模型时，保留优先级最高的
   * @param {object} modelMeta - 模型元数据
   */
  register(modelMeta) {
    const { name, type, tags, provider } = modelMeta

    const existingModel = this.models.get(name)
    if (existingModel) {
      const existingPriority = getProviderPriority(existingModel.provider)
      const currentPriority = getProviderPriority(provider)
      
      if (currentPriority <= existingPriority) {
        return
      }
    }

    this.models.set(name, modelMeta)

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
  }

  /**
   * 批量注册模型
   * @param {object} models - 模型元数据对象
   */
  registerAll(models) {
    Object.values(models).forEach(model => this.register(model))
  }

  /**
   * 根据名称获取模型
   * @param {string} name - 模型名称
   * @returns {object|null} 模型元数据
   */
  get(name) {
    return this.models.get(name) || null
  }

  /**
   * 根据类型获取模型列表
   * @param {string} type - API类型
   * @param {object} options - 查询选项
   * @returns {Array} 模型列表
   */
  getByType(type, options = {}) {
    const modelNames = this.typeIndex.get(type)
    if (!modelNames) return []

    let models = Array.from(modelNames).map(name => this.models.get(name))

    if (options.tags) {
      const filterTags = Array.isArray(options.tags) ? options.tags : [options.tags]
      models = models.filter(model =>
        filterTags.some(tag => model.tags && model.tags.includes(tag))
      )
    }

    if (options.provider) {
      models = models.filter(model => model.provider === options.provider)
    }

    models.sort((a, b) => (b.priority || 0) - (a.priority || 0))

    return models
  }

  /**
   * 根据标签获取模型列表
   * @param {string|Array} tags - 标签
   * @param {object} options - 查询选项
   * @returns {Array} 模型列表
   */
  getByTags(tags, options = {}) {
    const tagArray = Array.isArray(tags) ? tags : [tags]
    const modelSets = tagArray.map(tag => this.tagIndex.get(tag) || new Set())

    let modelNames = modelSets[0]
    for (let i = 1; i < modelSets.length; i++) {
      modelNames = new Set([...modelNames].filter(x => modelSets[i].has(x)))
    }

    let models = Array.from(modelNames).map(name => this.models.get(name))

    models.sort((a, b) => (b.priority || 0) - (a.priority || 0))

    return models
  }

  /**
   * 根据Provider获取模型列表
   * @param {string} provider - Provider名称
   * @returns {Array} 模型列表
   */
  getByProvider(provider) {
    const modelNames = this.providerIndex.get(provider)
    if (!modelNames) return []

    return Array.from(modelNames).map(name => this.models.get(name))
  }

  /**
   * 获取所有模型
   * @returns {Array} 模型列表
   */
  getAll() {
    return Array.from(this.models.values())
  }

  /**
   * 检查模型是否存在
   * @param {string} name - 模型名称
   * @returns {boolean} 是否存在
   */
  has(name) {
    return this.models.has(name)
  }

  /**
   * 获取模型数量
   * @returns {number} 模型数量
   */
  size() {
    return this.models.size
  }
}

const modelRegistry = new ModelRegistry()

module.exports = modelRegistry
