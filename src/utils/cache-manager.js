/**
 * 统一缓存管理器
 * 提供全局缓存管理功能
 */

const { createLogger } = require('./logger')

const logger = createLogger({ level: 'INFO' })

/**
 * 缓存项类
 */
class CacheItem {
  /**
   * 创建缓存项
   * @param {any} data - 缓存数据
   * @param {number} ttl - 过期时间（毫秒）
   */
  constructor(data, ttl) {
    this.data = data
    this.timestamp = Date.now()
    this.ttl = ttl
    this.accessCount = 0
  }

  /**
   * 检查是否过期
   * @returns {boolean} 是否过期
   */
  isExpired() {
    if (!this.ttl) return false
    return Date.now() - this.timestamp > this.ttl
  }

  /**
   * 访问缓存项
   * @returns {any} 缓存数据
   */
  access() {
    this.accessCount++
    return this.data
  }
}

/**
 * 缓存管理器类
 */
class CacheManager {
  /**
   * 创建缓存管理器实例
   * @param {object} options - 配置选项
   */
  constructor(options = {}) {
    this.caches = new Map()
    this.defaultTTL = options.defaultTTL || 3600000
    this.defaultMaxSize = options.defaultMaxSize || 1000
    this.enabled = options.enabled !== false
    this.globalStats = {
      hits: 0,
      misses: 0,
      evictions: 0,
      sets: 0
    }
  }

  /**
   * 创建或获取命名缓存
   * @param {string} name - 缓存名称
   * @param {object} options - 缓存选项
   * @returns {Map} 缓存实例
   */
  getOrCreateCache(name, options = {}) {
    if (!this.caches.has(name)) {
      const cache = {
        items: new Map(),
        maxSize: options.maxSize || this.defaultMaxSize,
        ttl: options.ttl || this.defaultTTL,
        stats: {
          hits: 0,
          misses: 0,
          evictions: 0
        }
      }
      this.caches.set(name, cache)
    }
    return this.caches.get(name)
  }

  /**
   * 生成缓存键
   * @param {string} namespace - 命名空间
   * @param {string} key - 键名
   * @param {string} suffix - 后缀（可选）
   * @returns {string} 缓存键
   */
  generateKey(namespace, key, suffix = '') {
    const parts = [namespace, key]
    if (suffix) parts.push(suffix)
    return parts.join(':')
  }

  /**
   * 获取缓存
   * @param {string} namespace - 命名空间
   * @param {string} key - 键名
   * @param {string} suffix - 后缀（可选）
   * @returns {any} 缓存数据
   */
  get(namespace, key, suffix = '') {
    if (!this.enabled) return null

    const cache = this.caches.get(namespace)
    if (!cache) {
      this.globalStats.misses++
      return null
    }

    const cacheKey = this.generateKey(namespace, key, suffix)
    const item = cache.items.get(cacheKey)

    if (!item) {
      cache.stats.misses++
      this.globalStats.misses++
      return null
    }

    if (item.isExpired()) {
      cache.items.delete(cacheKey)
      cache.stats.misses++
      this.globalStats.misses++
      return null
    }

    cache.stats.hits++
    this.globalStats.hits++
    logger.debug(`Cache hit: ${cacheKey}`)
    return item.access()
  }

  /**
   * 设置缓存
   * @param {string} namespace - 命名空间
   * @param {string} key - 键名
   * @param {any} data - 缓存数据
   * @param {object} options - 选项（可选）
   */
  set(namespace, key, data, options = {}) {
    if (!this.enabled) return

    const cache = this.getOrCreateCache(namespace, {
      maxSize: options.maxSize,
      ttl: options.ttl
    })

    const cacheKey = this.generateKey(namespace, key, options.suffix || '')

    if (cache.items.size >= cache.maxSize && !cache.items.has(cacheKey)) {
      this.evictOldest(namespace)
    }

    const item = new CacheItem(data, options.ttl || cache.ttl)
    cache.items.set(cacheKey, item)
    this.globalStats.sets++

    logger.debug(`Cache set: ${cacheKey}`)
  }

  /**
   * 删除缓存
   * @param {string} namespace - 命名空间
   * @param {string} key - 键名
   * @param {string} suffix - 后缀（可选）
   * @returns {boolean} 是否成功删除
   */
  delete(namespace, key, suffix = '') {
    const cache = this.caches.get(namespace)
    if (!cache) return false

    const cacheKey = this.generateKey(namespace, key, suffix)
    return cache.items.delete(cacheKey)
  }

  /**
   * 清空命名空间缓存
   * @param {string} namespace - 命名空间（可选，不提供则清空所有）
   */
  clear(namespace) {
    if (namespace) {
      const cache = this.caches.get(namespace)
      if (cache) {
        cache.items.clear()
        logger.info(`Cache cleared: ${namespace}`)
      }
    } else {
      this.caches.forEach(cache => cache.items.clear())
      this.caches.clear()
      logger.info('All caches cleared')
    }
  }

  /**
   * 淘汰最旧的缓存项
   * @param {string} namespace - 命名空间
   */
  evictOldest(namespace) {
    const cache = this.caches.get(namespace)
    if (!cache) return

    let oldestKey = null
    let oldestTimestamp = Infinity

    for (const [key, item] of cache.items.entries()) {
      if (item.timestamp < oldestTimestamp) {
        oldestTimestamp = item.timestamp
        oldestKey = key
      }
    }

    if (oldestKey) {
      cache.items.delete(oldestKey)
      cache.stats.evictions++
      this.globalStats.evictions++
      logger.debug(`Evicted oldest cache entry: ${oldestKey}`)
    }
  }

  /**
   * 淘汰最少使用的缓存项
   * @param {string} namespace - 命名空间
   */
  evictLRU(namespace) {
    const cache = this.caches.get(namespace)
    if (!cache) return

    let lruKey = null
    let minAccess = Infinity

    for (const [key, item] of cache.items.entries()) {
      if (item.accessCount < minAccess) {
        minAccess = item.accessCount
        lruKey = key
      }
    }

    if (lruKey) {
      cache.items.delete(lruKey)
      cache.stats.evictions++
      this.globalStats.evictions++
      logger.debug(`Evicted LRU cache entry: ${lruKey}`)
    }
  }

  /**
   * 获取缓存统计信息
   * @param {string} namespace - 命名空间（可选）
   * @returns {object} 统计信息
   */
  getStats(namespace) {
    if (namespace) {
      const cache = this.caches.get(namespace)
      if (!cache) return null

      const total = cache.stats.hits + cache.stats.misses
      return {
        ...cache.stats,
        size: cache.items.size,
        maxSize: cache.maxSize,
        hitRate: total > 0 ? (cache.stats.hits / total * 100).toFixed(2) + '%' : '0%'
      }
    }

    const total = this.globalStats.hits + this.globalStats.misses
    const namespaceStats = {}
    
    this.caches.forEach((cache, name) => {
      namespaceStats[name] = {
        size: cache.items.size,
        hits: cache.stats.hits,
        misses: cache.stats.misses
      }
    })

    return {
      ...this.globalStats,
      hitRate: total > 0 ? (this.globalStats.hits / total * 100).toFixed(2) + '%' : '0%',
      namespaces: Object.keys(namespaceStats),
      namespaceStats
    }
  }

  /**
   * 启用缓存
   */
  enable() {
    this.enabled = true
    logger.info('Cache enabled')
  }

  /**
   * 禁用缓存
   */
  disable() {
    this.enabled = false
    logger.info('Cache disabled')
  }

  /**
   * 检查缓存是否存在
   * @param {string} namespace - 命名空间
   * @param {string} key - 键名
   * @param {string} suffix - 后缀（可选）
   * @returns {boolean} 是否存在
   */
  has(namespace, key, suffix = '') {
    if (!this.enabled) return false

    const cache = this.caches.get(namespace)
    if (!cache) return false

    const cacheKey = this.generateKey(namespace, key, suffix)
    const item = cache.items.get(cacheKey)

    if (!item) return false
    if (item.isExpired()) {
      cache.items.delete(cacheKey)
      return false
    }

    return true
  }

  /**
   * 获取或设置缓存（如果不存在则通过loader加载）
   * @param {string} namespace - 命名空间
   * @param {string} key - 键名
   * @param {Function} loader - 加载函数
   * @param {object} options - 选项
   * @returns {any} 缓存数据
   */
  async getOrSet(namespace, key, loader, options = {}) {
    const cached = this.get(namespace, key, options.suffix)
    if (cached !== null) {
      return cached
    }

    const data = await loader()
    this.set(namespace, key, data, options)
    return data
  }

  /**
   * 批量获取缓存
   * @param {string} namespace - 命名空间
   * @param {Array<string>} keys - 键名列表
   * @param {string} suffix - 后缀（可选）
   * @returns {object} 缓存数据映射
   */
  getMany(namespace, keys, suffix = '') {
    const result = {}
    for (const key of keys) {
      result[key] = this.get(namespace, key, suffix)
    }
    return result
  }

  /**
   * 批量设置缓存
   * @param {string} namespace - 命名空间
   * @param {object} items - 缓存项映射
   * @param {object} options - 选项
   */
  setMany(namespace, items, options = {}) {
    for (const [key, data] of Object.entries(items)) {
      this.set(namespace, key, data, options)
    }
  }
}

const cacheManager = new CacheManager()

module.exports = {
  CacheManager,
  CacheItem,
  cacheManager
}
