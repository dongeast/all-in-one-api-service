/**
 * 注册中心基类
 * 提供统一的注册、索引和查询功能
 */

const { getProviderPriority } = require('../constants')

/**
 * 注册中心基类
 */
class BaseRegistry {
  /**
   * 创建注册中心实例
   * @param {object} options - 配置选项
   * @param {string} options.itemName - 项目名称（用于日志）
   * @param {string} options.idField - ID字段名（默认 'name'）
   * @param {Array<string>} options.indexFields - 需要索引的字段列表
   */
  constructor(options = {}) {
    this.itemName = options.itemName || 'item'
    this.idField = options.idField || 'name'
    this.indexFields = options.indexFields || []
    
    this.items = new Map()
    this.indexes = new Map()
    
    this.indexFields.forEach(field => {
      this.indexes.set(field, new Map())
    })
  }

  /**
   * 注册项目
   * 当不同 Provider 提供相同 ID 的项目时，保留优先级最高的
   * @param {object} itemMeta - 项目元数据
   */
  register(itemMeta) {
    const id = itemMeta[this.idField]
    const provider = itemMeta.provider

    const existingItem = this.items.get(id)
    if (existingItem) {
      const existingPriority = getProviderPriority(existingItem.provider)
      const currentPriority = getProviderPriority(provider)
      
      if (currentPriority <= existingPriority) {
        return
      }
    }

    this.items.set(id, itemMeta)

    this.indexFields.forEach(field => {
      const fieldValue = itemMeta[field]
      if (fieldValue) {
        const indexMap = this.indexes.get(field)
        const values = Array.isArray(fieldValue) ? fieldValue : [fieldValue]
        
        values.forEach(value => {
          if (!indexMap.has(value)) {
            indexMap.set(value, new Set())
          }
          indexMap.get(value).add(id)
        })
      }
    })
  }

  /**
   * 批量注册项目
   * @param {object} items - 项目元数据对象
   */
  registerAll(items) {
    Object.values(items).forEach(item => this.register(item))
  }

  /**
   * 根据ID获取项目
   * @param {string} id - 项目ID
   * @returns {object|null} 项目元数据
   */
  get(id) {
    return this.items.get(id) || null
  }

  /**
   * 根据索引字段获取项目列表
   * @param {string} field - 索引字段名
   * @param {string} value - 字段值
   * @param {object} options - 查询选项
   * @returns {Array} 项目列表
   */
  getByField(field, value, options = {}) {
    const indexMap = this.indexes.get(field)
    if (!indexMap) return []

    const itemIds = indexMap.get(value)
    if (!itemIds) return []

    let items = Array.from(itemIds).map(id => this.items.get(id))

    items = this.applyFilters(items, options)
    items = this.applySorting(items, options)

    return items
  }

  /**
   * 根据多个索引字段获取项目列表（交集）
   * @param {object} criteria - 查询条件
   * @param {object} options - 查询选项
   * @returns {Array} 项目列表
   */
  getByCriteria(criteria, options = {}) {
    let resultIds = null

    Object.entries(criteria).forEach(([field, value]) => {
      const indexMap = this.indexes.get(field)
      if (!indexMap) return

      const values = Array.isArray(value) ? value : [value]
      const fieldIds = new Set()

      values.forEach(v => {
        const ids = indexMap.get(v)
        if (ids) {
          ids.forEach(id => fieldIds.add(id))
        }
      })

      if (resultIds === null) {
        resultIds = fieldIds
      } else {
        resultIds = new Set([...resultIds].filter(id => fieldIds.has(id)))
      }
    })

    if (resultIds === null) {
      return this.getAll(options)
    }

    let items = Array.from(resultIds).map(id => this.items.get(id))
    items = this.applyFilters(items, options)
    items = this.applySorting(items, options)

    return items
  }

  /**
   * 应用过滤器
   * @param {Array} items - 项目列表
   * @param {object} options - 过滤选项
   * @returns {Array} 过滤后的项目列表
   */
  applyFilters(items, options) {
    let filtered = [...items]

    if (options.provider) {
      filtered = filtered.filter(item => item.provider === options.provider)
    }

    if (options.type) {
      filtered = filtered.filter(item => {
        if (Array.isArray(item.type)) {
          return item.type.includes(options.type)
        }
        return item.type === options.type
      })
    }

    if (options.tags) {
      const filterTags = Array.isArray(options.tags) ? options.tags : [options.tags]
      filtered = filtered.filter(item =>
        filterTags.some(tag => item.tags && item.tags.includes(tag))
      )
    }

    if (options.model) {
      filtered = filtered.filter(item =>
        item.models && item.models.includes(options.model)
      )
    }

    if (options.category) {
      filtered = filtered.filter(item => item.category === options.category)
    }

    if (options.asyncOnly !== undefined) {
      filtered = filtered.filter(item => 
        options.asyncOnly ? item.type === 'async' : item.type === 'sync'
      )
    }

    return filtered
  }

  /**
   * 应用排序
   * @param {Array} items - 项目列表
   * @param {object} options - 排序选项
   * @returns {Array} 排序后的项目列表
   */
  applySorting(items, options = {}) {
    const sortField = options.sortBy || 'priority'
    const sortOrder = options.sortOrder || 'desc'

    return items.sort((a, b) => {
      const aVal = a[sortField] || 0
      const bVal = b[sortField] || 0
      return sortOrder === 'desc' ? bVal - aVal : aVal - bVal
    })
  }

  /**
   * 获取所有项目
   * @param {object} options - 查询选项
   * @returns {Array} 项目列表
   */
  getAll(options = {}) {
    let items = Array.from(this.items.values())
    items = this.applyFilters(items, options)
    items = this.applySorting(items, options)
    return items
  }

  /**
   * 检查项目是否存在
   * @param {string} id - 项目ID
   * @returns {boolean} 是否存在
   */
  has(id) {
    return this.items.has(id)
  }

  /**
   * 获取项目数量
   * @returns {number} 项目数量
   */
  size() {
    return this.items.size
  }

  /**
   * 获取索引值列表
   * @param {string} field - 索引字段名
   * @returns {Array} 索引值列表
   */
  getIndexValues(field) {
    const indexMap = this.indexes.get(field)
    if (!indexMap) return []
    return Array.from(indexMap.keys())
  }

  /**
   * 清空注册中心
   */
  clear() {
    this.items.clear()
    this.indexes.forEach(indexMap => indexMap.clear())
  }

  /**
   * 获取统计信息
   * @param {Array<string>} groupByFields - 分组统计字段
   * @returns {object} 统计信息
   */
  getStats(groupByFields = ['provider', 'type']) {
    const stats = {
      total: this.items.size,
      byField: {}
    }

    groupByFields.forEach(field => {
      stats.byField[field] = {}
      const indexMap = this.indexes.get(field)
      if (indexMap) {
        indexMap.forEach((ids, value) => {
          stats.byField[field][value] = ids.size
        })
      }
    })

    return stats
  }
}

module.exports = BaseRegistry
