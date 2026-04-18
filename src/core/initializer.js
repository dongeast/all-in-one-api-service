/**
 * 框架初始化器
 * 统一管理所有元数据和服务注册中心的初始化
 */

const { unifiedRegistry, serviceRegistry } = require('../registry')
const { createLogger } = require('../utils/logger')

const logger = createLogger({ level: 'INFO' })

/**
 * 初始化器类
 */
class Initializer {
  /**
   * 创建初始化器实例
   * @param {object} options - 初始化选项
   */
  constructor(options = {}) {
    this.options = options
    this.initialized = false
    this.providers = new Set()
  }

  /**
   * 执行初始化
   * @param {object} options - 初始化选项（可选，覆盖构造函数中的选项）
   * @returns {Promise<void>}
   */
  async initialize(options = {}) {
    if (this.initialized) {
      logger.warn('Initializer already initialized')
      return
    }

    const mergedOptions = { ...this.options, ...options }
    const startTime = Date.now()

    logger.info('Starting framework initialization...')

    try {
      this.loadMetadata(mergedOptions)

      this.loadServices(mergedOptions)

      this.loadI18n(mergedOptions)

      unifiedRegistry.initialized = true

      const validationResult = unifiedRegistry.validate()
      if (!validationResult.valid) {
        throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`)
      }

      if (validationResult.warnings.length > 0) {
        validationResult.warnings.forEach(warning => {
          logger.warn(warning)
        })
      }

      this.initialized = true
      const duration = Date.now() - startTime

      logger.info(`Framework initialized successfully in ${duration}ms`)
      logger.info('Stats:', unifiedRegistry.getStats())

    } catch (error) {
      logger.error('Framework initialization failed:', error)
      throw error
    }
  }

  /**
   * 加载元数据
   * @param {object} options - 选项
   */
  loadMetadata(options) {
    logger.info('Loading metadata...')

    const models = this.loadModels()
    const apis = this.loadAPIs()
    const functions = this.loadFunctions()
    const credits = this.loadCredits()

    unifiedRegistry.registerModels(models)
    unifiedRegistry.registerAPIs(apis)
    unifiedRegistry.registerFunctions(functions)
    unifiedRegistry.registerCredits(credits)

    logger.info('Metadata loaded successfully')
  }

  /**
   * 加载模型元数据
   * @returns {object} 模型元数据映射
   */
  loadModels() {
    const { Providers } = require('../constants/providers')
    const models = {}

    try {
      const {
        LightricksModelsMeta,
        VolcengineModelsMeta,
        SkyreelsModelsMeta,
        MurekaModelsMeta,
        ViduModelsMeta
      } = require('../metadata/models')

      models.lightricks = this.addProviderField(LightricksModelsMeta, Providers.LIGHTRICKS)
      models.volcengine = this.addProviderField(VolcengineModelsMeta, Providers.VOLCENGINE)
      models.skyreels = this.addProviderField(SkyreelsModelsMeta, Providers.SKYREELS)
      models.mureka = this.addProviderField(MurekaModelsMeta, Providers.MUREKA)
      models.vidu = this.addProviderField(ViduModelsMeta, Providers.VIDU)

      Object.keys(models).forEach(provider => this.providers.add(provider))
    } catch (error) {
      logger.error('Failed to load models metadata:', error)
      throw error
    }

    return models
  }

  /**
   * 为 Model 元数据添加 provider 字段
   * @param {object} modelsMeta - Model 元数据对象
   * @param {string} provider - Provider 名称
   * @returns {object} 添加了 provider 字段的 Model 元数据
   */
  addProviderField(modelsMeta, provider) {
    const result = {}
    Object.entries(modelsMeta).forEach(([name, meta]) => {
      result[name] = {
        ...meta,
        provider
      }
    })
    return result
  }

  /**
   * 加载 API 元数据
   * @returns {object} API 元数据映射
   */
  loadAPIs() {
    const apis = {}

    try {
      const {
        LightricksAPIsMeta,
        VolcengineAPIsMeta,
        SkyreelsAPIsMeta,
        MurekaAPIsMeta,
        ViduAPIsMeta
      } = require('../metadata/apis')

      apis.lightricks = LightricksAPIsMeta
      apis.volcengine = VolcengineAPIsMeta
      apis.skyreels = SkyreelsAPIsMeta
      apis.mureka = MurekaAPIsMeta
      apis.vidu = ViduAPIsMeta

      Object.keys(apis).forEach(provider => this.providers.add(provider))
    } catch (error) {
      logger.error('Failed to load APIs metadata:', error)
      throw error
    }

    return apis
  }

  /**
   * 加载 Function 元数据
   * @returns {object} Function 元数据映射
   */
  loadFunctions() {
    const functions = {}

    try {
      const functionsMeta = require('../metadata/functions')

      Object.assign(functions, functionsMeta)

      Object.keys(functions).forEach(provider => this.providers.add(provider))
    } catch (error) {
      logger.error('Failed to load functions metadata:', error)
      throw error
    }

    return functions
  }

  /**
   * 加载积分配置
   * @returns {object} 积分配置映射
   */
  loadCredits() {
    const credits = {}

    try {
      const {
        MurekaCredits,
        LightricksCredits,
        SkyreelsCredits,
        VolcengineCredits
      } = require('../metadata/credits')

      credits.mureka = MurekaCredits
      credits.lightricks = LightricksCredits
      credits.skyreels = SkyreelsCredits
      credits.volcengine = VolcengineCredits

      Object.keys(credits).forEach(provider => this.providers.add(provider))
    } catch (error) {
      logger.error('Failed to load credits metadata:', error)
      throw error
    }

    return credits
  }

  /**
   * 加载服务
   * @param {object} options - 选项
   */
  loadServices(options) {
    logger.info('Loading services...')

    try {
      const {
        Skyreels,
        LTX,
        Volcengine,
        Mureka,
        Vidu,
        Custom
      } = require('../services')

      unifiedRegistry.setServiceRegistry(serviceRegistry)

      const services = {
        skyreels: Skyreels,
        lightricks: LTX,
        volcengine: Volcengine,
        mureka: Mureka,
        vidu: Vidu,
        custom: Custom
      }

      unifiedRegistry.registerServices(services)

      logger.info('Services loaded successfully')
    } catch (error) {
      logger.error('Failed to load services:', error)
      throw error
    }
  }

  /**
   * 加载多语言资源
   * @param {object} options - 选项
   */
  loadI18n(options) {
    logger.info('Loading i18n resources...')

    try {
      require('../locales')
      logger.info('I18n resources loaded successfully')
    } catch (error) {
      logger.warn('Failed to load i18n resources:', error.message)
    }
  }

  /**
   * 获取统计信息
   * @returns {object} 统计信息
   */
  getStats() {
    return {
      initialized: this.initialized,
      providers: Array.from(this.providers),
      registry: unifiedRegistry.getStats()
    }
  }

  /**
   * 重置初始化器
   */
  reset() {
    unifiedRegistry.clear()
    this.initialized = false
    this.providers.clear()
    logger.info('Initializer reset')
  }

  /**
   * 检查是否已初始化
   * @returns {boolean} 是否已初始化
   */
  isInitialized() {
    return this.initialized
  }
}

const initializer = new Initializer()

module.exports = initializer
module.exports.Initializer = Initializer
