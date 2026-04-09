/**
 * 元数据缓存管理器
 * 提供元数据的缓存和懒加载功能
 */

const { createLogger } = require('./logger')

const logger = createLogger({ level: 'INFO' })

/**
 * 元数据缓存类
 */
class MetadataCache {
  constructor(options = {}) {
    this.cache = new Map()
    this.enabled = options.enabled !== false
    this.ttl = options.ttl || 3600000 // 默认 1 小时
    this.maxSize = options.maxSize || 100
    this.stats = {
      hits: 0,
      misses: 0,
      evictions: 0
    }
  }

  /**
   * 生成缓存键
   * @param {string} type - 元数据类型
   * @param {string} key - 元数据键
   * @param {string} language - 语言代码
   * @returns {string} 缓存键
   */
  generateKey(type, key, language = 'default') {
    return `${type}:${key}:${language}`
  }

  /**
   * 获取缓存
   * @param {string} type - 元数据类型
   * @param {string} key - 元数据键
   * @param {string} language - 语言代码
   * @returns {object|null} 缓存的数据
   */
  get(type, key, language = 'default') {
    if (!this.enabled) {
      return null
    }

    const cacheKey = this.generateKey(type, key, language)
    const cached = this.cache.get(cacheKey)

    if (!cached) {
      this.stats.misses++
      return null
    }

    if (Date.now() - cached.timestamp > this.ttl) {
      this.cache.delete(cacheKey)
      this.stats.misses++
      return null
    }

    this.stats.hits++
    logger.debug(`Cache hit: ${cacheKey}`)
    return cached.data
  }

  /**
   * 设置缓存
   * @param {string} type - 元数据类型
   * @param {string} key - 元数据键
   * @param {object} data - 要缓存的数据
   * @param {string} language - 语言代码
   */
  set(type, key, data, language = 'default') {
    if (!this.enabled) {
      return
    }

    const cacheKey = this.generateKey(type, key, language)

    if (this.cache.size >= this.maxSize && !this.cache.has(cacheKey)) {
      this.evictOldest()
    }

    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    })

    logger.debug(`Cache set: ${cacheKey}`)
  }

  /**
   * 删除缓存
   * @param {string} type - 元数据类型
   * @param {string} key - 元数据键
   * @param {string} language - 语言代码
   * @returns {boolean} 是否成功删除
   */
  delete(type, key, language = 'default') {
    const cacheKey = this.generateKey(type, key, language)
    return this.cache.delete(cacheKey)
  }

  /**
   * 清空缓存
   */
  clear() {
    this.cache.clear()
    logger.info('Cache cleared')
  }

  /**
   * 淘汰最旧的缓存项
   */
  evictOldest() {
    let oldestKey = null
    let oldestTimestamp = Infinity

    for (const [key, value] of this.cache.entries()) {
      if (value.timestamp < oldestTimestamp) {
        oldestTimestamp = value.timestamp
        oldestKey = key
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey)
      this.stats.evictions++
      logger.debug(`Evicted oldest cache entry: ${oldestKey}`)
    }
  }

  /**
   * 获取缓存统计信息
   * @returns {object} 统计信息
   */
  getStats() {
    return {
      ...this.stats,
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: this.stats.hits + this.stats.misses > 0
        ? (this.stats.hits / (this.stats.hits + this.stats.misses) * 100).toFixed(2) + '%'
        : '0%'
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
}

/**
 * 懒加载管理器
 */
class LazyLoader {
  constructor() {
    this.loaded = new Map()
    this.loaders = new Map()
  }

  /**
   * 注册加载器
   * @param {string} key - 键名
   * @param {function} loader - 加载函数
   */
  register(key, loader) {
    this.loaders.set(key, loader)
  }

  /**
   * 获取数据（懒加载）
   * @param {string} key - 键名
   * @returns {any} 数据
   */
  get(key) {
    if (this.loaded.has(key)) {
      return this.loaded.get(key)
    }

    const loader = this.loaders.get(key)
    if (!loader) {
      throw new Error(`No loader registered for key: ${key}`)
    }

    const data = loader()
    this.loaded.set(key, data)
    return data
  }

  /**
   * 预加载数据
   * @param {string} key - 键名
   */
  preload(key) {
    this.get(key)
  }

  /**
   * 清除已加载的数据
   * @param {string} key - 键名（可选，不提供则清除所有）
   */
  clear(key) {
    if (key) {
      this.loaded.delete(key)
    } else {
      this.loaded.clear()
    }
  }

  /**
   * 检查是否已加载
   * @param {string} key - 键名
   * @returns {boolean} 是否已加载
   */
  isLoaded(key) {
    return this.loaded.has(key)
  }
}

const metadataCache = new MetadataCache()
const lazyLoader = new LazyLoader()

module.exports = {
  MetadataCache,
  LazyLoader,
  metadataCache,
  lazyLoader
}
