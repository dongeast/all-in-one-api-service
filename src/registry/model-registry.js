/**
 * 模型元数据注册中心
 * 集中管理所有模型的元数据信息
 */

const BaseRegistry = require('./base-registry')

/**
 * 模型元数据注册中心类
 */
class ModelRegistry extends BaseRegistry {
  /**
   * 创建模型注册中心实例
   */
  constructor() {
    super({
      itemName: 'model',
      idField: 'name',
      indexFields: ['type', 'tags', 'provider']
    })
  }

  /**
   * 根据类型获取模型列表
   * @param {string} type - API类型
   * @param {object} options - 查询选项
   * @returns {Array} 模型列表
   */
  getByType(type, options = {}) {
    return this.getByField('type', type, options)
  }

  /**
   * 根据标签获取模型列表
   * @param {string|Array} tags - 标签
   * @param {object} options - 查询选项
   * @returns {Array} 模型列表
   */
  getByTags(tags, options = {}) {
    const tagArray = Array.isArray(tags) ? tags : [tags]
    const indexMap = this.indexes.get('tags')
    if (!indexMap) return []

    const modelSets = tagArray.map(tag => indexMap.get(tag) || new Set())

    let modelNames = modelSets[0]
    for (let i = 1; i < modelSets.length; i++) {
      modelNames = new Set([...modelNames].filter(x => modelSets[i].has(x)))
    }

    let models = Array.from(modelNames).map(name => this.items.get(name))
    models = this.applySorting(models, options)

    return models
  }

  /**
   * 根据Provider获取模型列表
   * @param {string} provider - Provider名称
   * @returns {Array} 模型列表
   */
  getByProvider(provider) {
    return this.getByField('provider', provider)
  }
}

const modelRegistry = new ModelRegistry()

module.exports = modelRegistry
module.exports.ModelRegistry = ModelRegistry
