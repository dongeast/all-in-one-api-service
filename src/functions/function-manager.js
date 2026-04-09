/**
 * FunctionManager - 统一的 Function 管理器
 * 合并了 Function 和 QueryService 的功能
 */

const BaseFunction = require('./base-function')
const functionRegistry = require('./function-registry')
const { metadataManager } = require('../utils/metadata-manager')
const { createLogger } = require('../utils/logger')
const { APITypes, MediaTypes, InputOutputTypes } = require('../constants')

const logger = createLogger({ level: 'INFO' })

/**
 * FunctionManager 类
 * 统一的 Function 管理入口，合并了 Function 和 QueryService 的功能
 */
class FunctionManager {
  constructor() {
    this.initialized = false
    this.functionInstances = new Map()
    this.apiRegistry = null
    this.modelRegistry = null
  }

  /**
   * 初始化 FunctionManager
   */
  initialize() {
    if (this.initialized) {
      return
    }

    this.apiRegistry = require('../registry/api-registry')
    this.modelRegistry = require('../registry/model-registry')
    this.initialized = true
    logger.info('FunctionManager initialized')
  }

  /**
   * 确保已初始化
   */
  ensureInitialized() {
    if (!this.initialized) {
      this.initialize()
    }
  }

  /**
   * 获取 Function 实例
   * @param {string} name - Function 名称
   * @param {object} service - 服务实例（可选）
   * @returns {BaseFunction|null} Function 实例
   */
  get(name, service = null) {
    this.ensureInitialized()

    const metadata = functionRegistry.get(name)
    if (!metadata) {
      return null
    }

    if (!this.functionInstances.has(name)) {
      const func = new BaseFunction(service || this.getDefaultService(metadata.provider), metadata)
      this.functionInstances.set(name, func)
    }

    return this.functionInstances.get(name)
  }

  /**
   * 获取默认服务
   * @param {string} provider - 提供商名称
   * @returns {object} 服务实例
   */
  getDefaultService(provider) {
    const Services = require('../services')
    const providerServices = {
      mureka: Services.Mureka,
      ltx: Services.LTX,
      skyreels: Services.Skyreels,
      volcengine: Services.Volcengine
    }

    const ServiceClass = providerServices[provider]
    if (!ServiceClass) {
      throw new Error(`Unknown provider: ${provider}`)
    }

    return new ServiceClass()
  }

  /**
   * 执行 Function（统一入口）
   * @param {string} name - Function 名称
   * @param {object} params - 参数
   * @param {object} options - 选项
   * @returns {Promise<object>} 执行结果
   */
  async execute(name, params = {}, options = {}) {
    const func = this.get(name)
    if (!func) {
      throw new Error(`Function not found: ${name}`)
    }

    return await func.execute(params, options)
  }

  /**
   * 查询 Functions
   * @param {object} options - 查询选项
   * @param {string} language - 语言代码
   * @returns {Array} Function 列表
   */
  query(options = {}, language = 'zh') {
    return metadataManager.getFunctions(options, language)
  }

  /**
   * 获取 Function 详情
   * @param {string} name - Function 名称
   * @param {string} language - 语言代码
   * @returns {object|null} Function 详情
   */
  getDetail(name, language = 'zh') {
    return metadataManager.getFunction(name, language)
  }

  /**
   * 获取最佳 Function
   * @param {string} type - Function 类型
   * @param {string} model - 模型名称
   * @param {object} options - 查询选项
   * @param {string} language - 语言代码
   * @returns {object|null} 最佳 Function
   */
  getBest(type, model, options = {}, language = 'zh') {
    return metadataManager.getBestFunction(type, model, options, language)
  }

  /**
   * 根据 API 获取 Function
   * @param {string} apiName - API 名称
   * @param {string} language - 语言代码
   * @returns {object|null} Function 详情
   */
  getByAPI(apiName, language = 'zh') {
    return metadataManager.getFunctionByAPI(apiName, language)
  }

  /**
   * 获取关联的 APIs
   * @param {string} functionName - Function 名称
   * @returns {object|null} API 映射
   */
  getRelatedAPIs(functionName) {
    return metadataManager.getRelatedAPIs(functionName)
  }

  /**
   * 获取统计信息
   * @returns {object} 统计信息
   */
  getStats() {
    this.ensureInitialized()
    return {
      totalModels: this.modelRegistry.size(),
      totalAPIs: this.apiRegistry.size(),
      totalFunctions: functionRegistry.size(),
      providers: ['ltx', 'volcengine', 'skyreels', 'mureka'],
      supportedTypes: this.getSupportedTypes().length,
      supportedMediaTypes: this.getSupportedMediaTypes().length
    }
  }

  /**
   * 获取所有可用的 Function 名称
   * @returns {Array<string>} Function 名称列表
   */
  list() {
    return Array.from(functionRegistry.items.keys())
  }

  /**
   * 检查 Function 是否存在
   * @param {string} name - Function 名称
   * @returns {boolean} 是否存在
   */
  has(name) {
    return functionRegistry.has(name)
  }

  /**
   * 清除缓存
   */
  clearCache() {
    this.functionInstances.clear()
    metadataManager.clearCache()
  }

  /**
   * 根据类型获取模型列表
   * @param {string} type - API类型
   * @param {object} options - 查询选项
   * @returns {Array} 模型列表
   */
  getModelsByType(type, options = {}) {
    this.ensureInitialized()
    return this.modelRegistry.getByType(type, options)
  }

  /**
   * 根据类型获取接口列表
   * @param {string} type - API类型
   * @param {object} options - 查询选项
   * @returns {Array} 接口列表
   */
  getAPIsByType(type, options = {}) {
    this.ensureInitialized()
    return this.apiRegistry.getByType(type, options)
  }

  /**
   * 根据类型和模型获取最佳接口
   * @param {string} type - API类型
   * @param {string} model - 模型名称
   * @param {object} options - 查询选项
   * @returns {object|null} 最佳接口
   */
  getBestAPI(type, model, options = {}) {
    this.ensureInitialized()
    return this.apiRegistry.getBestAPI(type, model, options)
  }

  /**
   * 根据类型和模型获取所有可用接口（按优先级排序）
   * @param {string} type - API类型
   * @param {string} model - 模型名称
   * @param {object} options - 查询选项
   * @returns {Array} 接口列表
   */
  getAvailableAPIs(type, model, options = {}) {
    this.ensureInitialized()
    return this.apiRegistry.getByType(type, { ...options, model })
  }

  /**
   * 获取模型详情
   * @param {string} modelName - 模型名称
   * @returns {object|null} 模型详情
   */
  getModelDetail(modelName) {
    this.ensureInitialized()
    return this.modelRegistry.get(modelName)
  }

  /**
   * 获取接口详情
   * @param {string} apiName - 接口名称
   * @returns {object|null} 接口详情
   */
  getAPIDetail(apiName) {
    this.ensureInitialized()
    return this.apiRegistry.get(apiName)
  }

  /**
   * 获取所有支持的类型
   * @returns {Array} 类型列表
   */
  getSupportedTypes() {
    return Object.values(APITypes)
  }

  /**
   * 获取所有支持的媒体类型
   * @returns {Array} 媒体类型列表
   */
  getSupportedMediaTypes() {
    return Object.values(MediaTypes)
  }

  /**
   * 获取某个Provider的所有模型
   * @param {string} provider - Provider名称
   * @returns {Array} 模型列表
   */
  getModelsByProvider(provider) {
    this.ensureInitialized()
    return this.modelRegistry.getByProvider(provider)
  }

  /**
   * 获取某个Provider的所有接口
   * @param {string} provider - Provider名称
   * @returns {Array} 接口列表
   */
  getAPIsByProvider(provider) {
    this.ensureInitialized()
    return this.apiRegistry.getByProvider(provider)
  }

  /**
   * 根据标签获取模型列表
   * @param {string|Array} tags - 标签
   * @param {object} options - 查询选项
   * @returns {Array} 模型列表
   */
  getModelsByTags(tags, options = {}) {
    this.ensureInitialized()
    return this.modelRegistry.getByTags(tags, options)
  }

  /**
   * 根据模型获取接口列表
   * @param {string} model - 模型名称
   * @param {object} options - 查询选项
   * @returns {Array} 接口列表
   */
  getAPIsByModel(model, options = {}) {
    this.ensureInitialized()
    return this.apiRegistry.getByModel(model, options)
  }

  /**
   * 智能查询：根据输入输出类型查找接口
   * @param {string} inputType - 输入类型
   * @param {string} outputType - 输出类型
   * @returns {Array} 接口列表
   */
  findByInputOutput(inputType, outputType) {
    this.ensureInitialized()
    const matchedTypes = Object.entries(InputOutputTypes)
      .filter(([_, io]) => io.input === inputType && io.output === outputType)
      .map(([type]) => type)

    const apis = []
    matchedTypes.forEach(type => {
      apis.push(...this.apiRegistry.getByType(type))
    })

    return apis.sort((a, b) => (b.priority || 0) - (a.priority || 0))
  }

  /**
   * 获取所有模型
   * @returns {Array} 模型列表
   */
  getAllModels() {
    this.ensureInitialized()
    return this.modelRegistry.getAll()
  }

  /**
   * 获取所有接口
   * @returns {Array} 接口列表
   */
  getAllAPIs() {
    this.ensureInitialized()
    return this.apiRegistry.getAll()
  }

  /**
   * 检查模型是否存在
   * @param {string} modelName - 模型名称
   * @returns {boolean} 是否存在
   */
  hasModel(modelName) {
    this.ensureInitialized()
    return this.modelRegistry.has(modelName)
  }

  /**
   * 检查接口是否存在
   * @param {string} apiName - 接口名称
   * @returns {boolean} 是否存在
   */
  hasAPI(apiName) {
    this.ensureInitialized()
    return this.apiRegistry.has(apiName)
  }

  /**
   * 根据类型获取 Function 列表
   * @param {string} type - Function 类型
   * @param {object} options - 查询选项
   * @returns {Array} Function 列表
   */
  getFunctionsByType(type, options = {}) {
    return functionRegistry.getByType(type, options)
  }

  /**
   * 根据 Provider 获取 Function 列表
   * @param {string} provider - Provider 名称
   * @returns {Array} Function 列表
   */
  getFunctionsByProvider(provider) {
    return functionRegistry.getByProvider(provider)
  }

  /**
   * 根据模型获取 Function 列表
   * @param {string} model - 模型名称
   * @param {object} options - 查询选项
   * @returns {Array} Function 列表
   */
  getFunctionsByModel(model, options = {}) {
    return functionRegistry.getByModel(model, options)
  }

  /**
   * 根据分类获取 Function 列表
   * @param {string} category - 分类名称
   * @param {object} options - 查询选项
   * @returns {Array} Function 列表
   */
  getFunctionsByCategory(category, options = {}) {
    return functionRegistry.getByCategory(category, options)
  }

  /**
   * 获取 Function 详情
   * @param {string} functionName - Function 名称
   * @returns {object|null} Function 详情
   */
  getFunctionDetail(functionName) {
    return functionRegistry.get(functionName)
  }

  /**
   * 根据类型和模型获取最佳 Function
   * @param {string} type - Function 类型
   * @param {string} model - 模型名称
   * @param {object} options - 查询选项
   * @returns {object|null} 最佳 Function
   */
  getBestFunction(type, model, options = {}) {
    return functionRegistry.getBestFunction(type, model, options)
  }

  /**
   * 获取所有 Function
   * @returns {Array} Function 列表
   */
  getAllFunctions() {
    return functionRegistry.getAll()
  }

  /**
   * 检查 Function 是否存在
   * @param {string} functionName - Function 名称
   * @returns {boolean} 是否存在
   */
  hasFunction(functionName) {
    return functionRegistry.has(functionName)
  }

  /**
   * 根据 API 名称获取对应的 Function
   * @param {string} apiName - API 名称
   * @returns {object|null} Function 详情
   */
  getFunctionByAPI(apiName) {
    return functionRegistry.getByAPI(apiName)
  }

  /**
   * 获取 Function 关联的所有 API
   * @param {string} functionName - Function 名称
   * @returns {object|null} API 映射
   */
  getFunctionRelatedAPIs(functionName) {
    return functionRegistry.getRelatedAPIs(functionName)
  }

  /**
   * 获取所有支持的 Function 类型
   * @returns {Array} 类型列表
   */
  getSupportedFunctionTypes() {
    return functionRegistry.getSupportedTypes()
  }

  /**
   * 获取所有支持的 Function 分类
   * @returns {Array} 分类列表
   */
  getSupportedFunctionCategories() {
    return functionRegistry.getSupportedCategories()
  }

  /**
   * 获取 Function 统计信息
   * @returns {object} 统计信息
   */
  getFunctionStats() {
    return functionRegistry.getStats()
  }
}

const functionManager = new FunctionManager()

module.exports = {
  FunctionManager,
  functionManager
}
