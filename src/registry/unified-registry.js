/**
 * 统一注册中心
 * 协调管理所有注册中心，提供统一的初始化和查询接口
 */

const { APIRegistry } = require('./api-registry')
const { ModelRegistry } = require('./model-registry')
const { FunctionRegistry } = require('../functions/function-registry')
const { CreditRegistry } = require('../credits/credit-registry')
const { createLogger } = require('../utils/logger')

const logger = createLogger({ level: 'INFO' })

const apiRegistry = require('./api-registry')
const modelRegistry = require('./model-registry')
const functionRegistry = require('../functions/function-registry')
const { creditRegistry } = require('../credits/credit-registry')

class UnifiedRegistry {
  constructor() {
    this.apiRegistry = apiRegistry
    this.modelRegistry = modelRegistry
    this.functionRegistry = functionRegistry
    this.creditRegistry = creditRegistry
    this.serviceRegistry = null
    this.initialized = false
    this.providers = new Set()
  }

  /**
   * 设置服务注册中心
   * @param {object} serviceRegistry - 服务注册中心实例
   */
  setServiceRegistry(serviceRegistry) {
    this.serviceRegistry = serviceRegistry
  }

  /**
   * 初始化所有注册中心
   * @param {object} options - 初始化选项
   * @param {object} options.models - 模型元数据映射
   * @param {object} options.apis - API元数据映射
   * @param {object} options.functions - Function元数据映射
   * @param {object} options.credits - 积分配置映射
   * @param {object} options.services - 服务配置映射
   * @returns {Promise<void>}
   */
  async initialize(options = {}) {
    if (this.initialized) {
      logger.warn('UnifiedRegistry already initialized')
      return
    }

    const startTime = Date.now()
    logger.info('Initializing UnifiedRegistry...')

    try {
      if (options.models) {
        this.registerModels(options.models)
      }

      if (options.apis) {
        this.registerAPIs(options.apis)
      }

      if (options.functions) {
        this.registerFunctions(options.functions)
      }

      if (options.credits) {
        this.registerCredits(options.credits)
      }

      if (options.services) {
        this.registerServices(options.services)
      }

      this.initialized = true
      const duration = Date.now() - startTime
      logger.info(`UnifiedRegistry initialized in ${duration}ms`)
    } catch (error) {
      logger.error('Failed to initialize UnifiedRegistry:', error)
      throw error
    }
  }

  /**
   * 注册 provider 的所有元数据
   * @param {string} provider - Provider 名称
   * @param {object} metadata - 元数据对象
   * @param {object} metadata.models - 模型元数据
   * @param {object} metadata.apis - API元数据
   * @param {object} metadata.functions - Function元数据
   * @param {object} metadata.credits - 积分配置
   */
  registerProvider(provider, metadata) {
    if (!provider || !metadata) {
      logger.warn('Invalid provider or metadata')
      return
    }

    if (metadata.models) {
      this.modelRegistry.registerAll(metadata.models)
    }

    if (metadata.apis) {
      this.apiRegistry.registerAll(metadata.apis)
    }

    if (metadata.functions) {
      this.functionRegistry.registerAll(metadata.functions)
    }

    if (metadata.credits) {
      this.creditRegistry.register(provider, metadata.credits)
    }

    this.providers.add(provider)
    logger.debug(`Registered provider: ${provider}`)
  }

  /**
   * 批量注册模型元数据
   * @param {object} modelsMap - provider 到模型元数据的映射
   */
  registerModels(modelsMap) {
    Object.entries(modelsMap).forEach(([provider, models]) => {
      this.modelRegistry.registerAll(models)
      this.providers.add(provider)
    })
    logger.debug(`Registered models for ${Object.keys(modelsMap).length} providers`)
  }

  /**
   * 批量注册 API 元数据
   * @param {object} apisMap - provider 到 API 元数据的映射
   */
  registerAPIs(apisMap) {
    Object.entries(apisMap).forEach(([provider, apis]) => {
      this.apiRegistry.registerAll(apis)
      this.providers.add(provider)
    })
    logger.debug(`Registered APIs for ${Object.keys(apisMap).length} providers`)
  }

  /**
   * 批量注册 Function 元数据
   * @param {object} functionsMap - provider 到 Function 元数据的映射
   */
  registerFunctions(functionsMap) {
    Object.entries(functionsMap).forEach(([provider, functions]) => {
      this.functionRegistry.registerAll(functions)
      this.providers.add(provider)
    })
    logger.debug(`Registered functions for ${Object.keys(functionsMap).length} providers`)
  }

  /**
   * 批量注册积分配置
   * @param {object} creditsMap - provider 到积分配置的映射
   */
  registerCredits(creditsMap) {
    this.creditRegistry.registerAll(creditsMap)
    Object.keys(creditsMap).forEach(provider => {
      this.providers.add(provider)
    })
    logger.debug(`Registered credits for ${Object.keys(creditsMap).length} providers`)
  }

  /**
   * 批量注册服务
   * @param {object} servicesMap - provider 到服务的映射
   */
  registerServices(servicesMap) {
    if (!this.serviceRegistry) {
      logger.warn('ServiceRegistry not set, skipping service registration')
      return
    }

    Object.entries(servicesMap).forEach(([provider, service]) => {
      this.serviceRegistry.register(provider, service)
      this.providers.add(provider)
    })
    logger.debug(`Registered services for ${Object.keys(servicesMap).length} providers`)
  }

  /**
   * 获取统计信息
   * @returns {object} 统计信息
   */
  getStats() {
    return {
      initialized: this.initialized,
      providers: Array.from(this.providers),
      models: this.modelRegistry.getStats(),
      apis: this.apiRegistry.getStats(),
      functions: this.functionRegistry.getStats(),
      credits: this.creditRegistry.getStats(),
      services: this.serviceRegistry ? this.serviceRegistry.getStats() : null
    }
  }

  /**
   * 智能获取参数配置
   * 自动识别输入是 Function 名称、API 名称还是 Model 名称
   * @param {string} input - 输入名称（可以是 Function 名称、API 名称或 Model 名称）
   * @param {object} context - 参数上下文
   * @param {object} options - 选项（包含 provider 和 language）
   * @returns {object|null} 参数配置
   */
  getParamConfig(input, context = {}, options = {}) {
    // 1. 尝试作为 API 名称
    const api = this.apiRegistry.get(input)
    if (api) {
      logger.debug(`getParamConfig: Found API by name "${input}"`)
      return this.apiRegistry.getAPIParams(input, context, options)
    }

    // 2. 尝试作为 Function 名称
    const func = this.functionRegistry.get(input)
    if (func && func.apis) {
      logger.debug(`getParamConfig: Found Function by name "${input}"`)
      const requestAPIName = func.apis.request || func.name
      if (requestAPIName) {
        logger.debug(`getParamConfig: Using request API "${requestAPIName}" for Function "${input}"`)
        return this.apiRegistry.getAPIParams(requestAPIName, context, options)
      }
    }

    // 3. 尝试作为 Model 名称
    const model = this.modelRegistry.get(input)
    if (model) {
      logger.debug(`getParamConfig: Found Model by name "${input}"`)
      // 根据 model 找到对应的 function
      const functions = this.functionRegistry.getAll()
        .filter(f => f.models && f.models.includes(input))
      
      if (functions && functions.length > 0) {
        // 优先选择匹配 provider 的 function
        let targetFunc = functions[0]
        if (options.provider) {
          const matchedFunc = functions.find(f => f.provider === options.provider)
          if (matchedFunc) {
            targetFunc = matchedFunc
          }
        }
        
        logger.debug(`getParamConfig: Using Function "${targetFunc.name}" for Model "${input}"`)
        return this.getParamConfig(targetFunc.name, context, options)
      }
    }

    logger.warn(`getParamConfig: Could not find "${input}" as API, Function, or Model`)
    return null
  }

  /**
   * 验证注册数据
   * @returns {object} 验证结果
   */
  validate() {
    const errors = []
    const warnings = []

    const modelCount = this.modelRegistry.size()
    const apiCount = this.apiRegistry.size()
    const functionCount = this.functionRegistry.size()

    if (modelCount === 0) {
      warnings.push('No models registered')
    }

    if (apiCount === 0) {
      warnings.push('No APIs registered')
    }

    if (functionCount === 0) {
      warnings.push('No functions registered')
    }

    this.apiRegistry.getAll().forEach(api => {
      if (api.models && api.models.length > 0) {
        api.models.forEach(modelName => {
          if (!this.modelRegistry.has(modelName)) {
            warnings.push(`API ${api.name} references unknown model: ${modelName}`)
          }
        })
      }
    })

    this.functionRegistry.getAll().forEach(func => {
      if (func.models && func.models.length > 0) {
        func.models.forEach(modelName => {
          if (!this.modelRegistry.has(modelName)) {
            warnings.push(`Function ${func.name} references unknown model: ${modelName}`)
          }
        })
      }

      if (func.apis) {
        const apis = func.apis
        if (apis.request && !this.apiRegistry.has(apis.request)) {
          errors.push(`Function ${func.name} references unknown request API: ${apis.request}`)
        }
        if (apis.query && !this.apiRegistry.has(apis.query)) {
          errors.push(`Function ${func.name} references unknown query API: ${apis.query}`)
        }
      }
    })

    return {
      valid: errors.length === 0,
      errors,
      warnings
    }
  }

  /**
   * 清空所有注册中心
   */
  clear() {
    this.apiRegistry.clear()
    this.modelRegistry.clear()
    this.functionRegistry.clear()
    this.creditRegistry.clear()
    if (this.serviceRegistry) {
      this.serviceRegistry.clear()
    }
    this.providers.clear()
    this.initialized = false
    logger.debug('UnifiedRegistry cleared')
  }

  /**
   * 检查是否已初始化
   * @returns {boolean} 是否已初始化
   */
  isInitialized() {
    return this.initialized
  }

  /**
   * 获取所有 provider 列表
   * @returns {Array<string>} provider 列表
   */
  getProviders() {
    return Array.from(this.providers)
  }
}

const unifiedRegistry = new UnifiedRegistry()

module.exports = unifiedRegistry
module.exports.UnifiedRegistry = UnifiedRegistry
