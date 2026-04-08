/**
 * 查询服务
 * 提供统一的模型和接口查询接口
 */

const modelRegistry = require('../registry/model-registry')
const apiRegistry = require('../registry/api-registry')
const { APITypes, MediaTypes, InputOutputTypes } = require('../constants')

/**
 * 查询服务类
 */
class QueryService {
  /**
   * 根据类型获取模型列表
   * @param {string} type - API类型
   * @param {object} options - 查询选项
   * @returns {Array} 模型列表
   */
  getModelsByType(type, options = {}) {
    return modelRegistry.getByType(type, options)
  }

  /**
   * 根据类型获取接口列表
   * @param {string} type - API类型
   * @param {object} options - 查询选项
   * @returns {Array} 接口列表
   */
  getAPIsByType(type, options = {}) {
    return apiRegistry.getByType(type, options)
  }

  /**
   * 根据类型和模型获取最佳接口
   * @param {string} type - API类型
   * @param {string} model - 模型名称
   * @param {object} options - 查询选项
   * @returns {object|null} 最佳接口
   */
  getBestAPI(type, model, options = {}) {
    return apiRegistry.getBestAPI(type, model, options)
  }

  /**
   * 根据类型和模型获取所有可用接口（按优先级排序）
   * @param {string} type - API类型
   * @param {string} model - 模型名称
   * @param {object} options - 查询选项
   * @returns {Array} 接口列表
   */
  getAvailableAPIs(type, model, options = {}) {
    return apiRegistry.getByType(type, { ...options, model })
  }

  /**
   * 获取模型详情
   * @param {string} modelName - 模型名称
   * @returns {object|null} 模型详情
   */
  getModelDetail(modelName) {
    return modelRegistry.get(modelName)
  }

  /**
   * 获取接口详情
   * @param {string} apiName - 接口名称
   * @returns {object|null} 接口详情
   */
  getAPIDetail(apiName) {
    return apiRegistry.get(apiName)
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
    return modelRegistry.getByProvider(provider)
  }

  /**
   * 获取某个Provider的所有接口
   * @param {string} provider - Provider名称
   * @returns {Array} 接口列表
   */
  getAPIsByProvider(provider) {
    return apiRegistry.getByProvider(provider)
  }

  /**
   * 根据标签获取模型列表
   * @param {string|Array} tags - 标签
   * @param {object} options - 查询选项
   * @returns {Array} 模型列表
   */
  getModelsByTags(tags, options = {}) {
    return modelRegistry.getByTags(tags, options)
  }

  /**
   * 根据模型获取接口列表
   * @param {string} model - 模型名称
   * @param {object} options - 查询选项
   * @returns {Array} 接口列表
   */
  getAPIsByModel(model, options = {}) {
    return apiRegistry.getByModel(model, options)
  }

  /**
   * 智能查询：根据输入输出类型查找接口
   * @param {string} inputType - 输入类型
   * @param {string} outputType - 输出类型
   * @returns {Array} 接口列表
   */
  findByInputOutput(inputType, outputType) {
    const matchedTypes = Object.entries(InputOutputTypes)
      .filter(([_, io]) => io.input === inputType && io.output === outputType)
      .map(([type]) => type)

    const apis = []
    matchedTypes.forEach(type => {
      apis.push(...apiRegistry.getByType(type))
    })

    return apis.sort((a, b) => (b.priority || 0) - (a.priority || 0))
  }

  /**
   * 获取所有模型
   * @returns {Array} 模型列表
   */
  getAllModels() {
    return modelRegistry.getAll()
  }

  /**
   * 获取所有接口
   * @returns {Array} 接口列表
   */
  getAllAPIs() {
    return apiRegistry.getAll()
  }

  /**
   * 检查模型是否存在
   * @param {string} modelName - 模型名称
   * @returns {boolean} 是否存在
   */
  hasModel(modelName) {
    return modelRegistry.has(modelName)
  }

  /**
   * 检查接口是否存在
   * @param {string} apiName - 接口名称
   * @returns {boolean} 是否存在
   */
  hasAPI(apiName) {
    return apiRegistry.has(apiName)
  }

  /**
   * 获取统计信息
   * @returns {object} 统计信息
   */
  getStats() {
    return {
      totalModels: modelRegistry.size(),
      totalAPIs: apiRegistry.size(),
      providers: ['ltx', 'volcengine', 'skyreels', 'mureka'],
      supportedTypes: this.getSupportedTypes().length,
      supportedMediaTypes: this.getSupportedMediaTypes().length
    }
  }
}

const queryService = new QueryService()

module.exports = queryService
