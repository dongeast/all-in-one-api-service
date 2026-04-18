/**
 * 服务注册中心
 * 管理各 provider 的服务实例
 */

const { createLogger } = require('../utils/logger')

const logger = createLogger({ level: 'INFO' })

/**
 * 服务注册中心类
 */
class ServiceRegistry {
  /**
   * 创建服务注册中心实例
   */
  constructor() {
    this.services = new Map()
    this.instances = new Map()
    this.providerToService = new Map()
  }

  /**
   * 注册服务
   * @param {string} provider - Provider 名称
   * @param {Function|object} ServiceClass - 服务类或服务对象
   */
  register(provider, ServiceClass) {
    if (!provider || !ServiceClass) {
      logger.warn('Invalid provider or service class')
      return
    }

    this.services.set(provider, ServiceClass)
    logger.debug(`Registered service for provider: ${provider}`)
  }

  /**
   * 批量注册服务
   * @param {object} servicesMap - provider 到服务的映射
   */
  registerAll(servicesMap) {
    Object.entries(servicesMap).forEach(([provider, ServiceClass]) => {
      this.register(provider, ServiceClass)
    })
  }

  /**
   * 获取服务实例
   * @param {string} provider - Provider 名称
   * @param {object} config - 服务配置
   * @returns {object|null} 服务实例
   */
  get(provider, config = {}) {
    const ServiceClass = this.services.get(provider)
    if (!ServiceClass) {
      logger.warn(`Service not found for provider: ${provider}`)
      return null
    }

    const cacheKey = this.getCacheKey(provider, config)
    if (this.instances.has(cacheKey)) {
      return this.instances.get(cacheKey)
    }

    let instance
    if (typeof ServiceClass === 'function') {
      instance = new ServiceClass(config)
    } else {
      instance = ServiceClass
    }

    this.instances.set(cacheKey, instance)
    return instance
  }

  /**
   * 根据 API 名称获取服务
   * @param {string} apiName - API 名称
   * @param {object} config - 服务配置
   * @returns {object|null} 服务实例
   */
  getByAPI(apiName, config = {}) {
    const apiRegistry = require('../registry/api-registry')
    const api = apiRegistry.get(apiName)
    if (!api) {
      logger.warn(`API not found: ${apiName}`)
      return null
    }

    return this.get(api.provider, config)
  }

  /**
   * 根据 Function 名称获取服务
   * @param {string} functionName - Function 名称
   * @param {object} config - 服务配置
   * @returns {object|null} 服务实例
   */
  getByFunction(functionName, config = {}) {
    const functionRegistry = require('../functions/function-registry')
    const func = functionRegistry.get(functionName)
    if (!func) {
      logger.warn(`Function not found: ${functionName}`)
      return null
    }

    return this.get(func.provider, config)
  }

  /**
   * 检查服务是否存在
   * @param {string} provider - Provider 名称
   * @returns {boolean} 是否存在
   */
  has(provider) {
    return this.services.has(provider)
  }

  /**
   * 获取所有已注册的 provider 列表
   * @returns {Array<string>} provider 列表
   */
  getProviders() {
    return Array.from(this.services.keys())
  }

  /**
   * 获取服务类
   * @param {string} provider - Provider 名称
   * @returns {Function|object|null} 服务类或服务对象
   */
  getServiceClass(provider) {
    return this.services.get(provider) || null
  }

  /**
   * 清除服务实例缓存
   * @param {string} provider - Provider 名称（可选，不传则清除所有）
   */
  clearInstances(provider) {
    if (provider) {
      const keysToDelete = []
      this.instances.forEach((_, key) => {
        if (key.startsWith(`${provider}:`)) {
          keysToDelete.push(key)
        }
      })
      keysToDelete.forEach(key => this.instances.delete(key))
    } else {
      this.instances.clear()
    }
  }

  /**
   * 清空注册中心
   */
  clear() {
    this.services.clear()
    this.instances.clear()
    this.providerToService.clear()
  }

  /**
   * 获取统计信息
   * @returns {object} 统计信息
   */
  getStats() {
    return {
      services: this.services.size,
      instances: this.instances.size,
      providers: this.getProviders()
    }
  }

  /**
   * 生成缓存键
   * @param {string} provider - Provider 名称
   * @param {object} config - 服务配置
   * @returns {string} 缓存键
   */
  getCacheKey(provider, config) {
    const configKey = Object.keys(config).length > 0 
      ? JSON.stringify(config) 
      : 'default'
    return `${provider}:${configKey}`
  }
}

const serviceRegistry = new ServiceRegistry()

module.exports = serviceRegistry
module.exports.ServiceRegistry = ServiceRegistry
