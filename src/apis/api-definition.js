/**
 * API定义基类
 * 纯数据定义层，只保存API调用的基本信息
 * 不包含任何执行逻辑
 */

const BaseParam = require('../params/base-param')

/**
 * API定义基类
 */
class APIDefinition {
  /**
   * 创建API定义实例
   * @param {object} options - API定义选项
   * @param {string} options.name - API名称
   * @param {string} options.endpoint - API端点
   * @param {string} options.method - HTTP方法（默认POST）
   * @param {object} options.paramSchema - 参数模式
   * @param {string} options.modelName - 模型名称
   * @param {boolean} options.isAsync - 是否异步API
   * @param {object} options.outputMapping - 输出映射规则
   */
  constructor(options = {}) {
    this.name = options.name || this.constructor.name
    this.endpoint = options.endpoint || ''
    this.method = options.method || 'POST'
    this.modelName = options.modelName || 'unknown'
    this.isAsync = options.isAsync || false
    this.outputMapping = options.outputMapping || null
    
    this.param = options.paramSchema ? new BaseParam(options.paramSchema) : new BaseParam()
  }

  /**
   * 获取API定义信息
   * @returns {object} API定义
   */
  getDefinition() {
    return {
      name: this.name,
      endpoint: this.endpoint,
      method: this.method,
      modelName: this.modelName,
      isAsync: this.isAsync,
      paramSchema: this.getParamSchema(),
      outputMapping: this.outputMapping
    }
  }

  /**
   * 获取完整参数模式
   * @returns {object} 参数模式
   */
  getParamSchema() {
    return this.param.getSchema()
  }

  /**
   * 获取输入参数结构
   * @returns {object} 输入参数模式
   */
  getInputSchema() {
    return this.param.getInputSchema()
  }

  /**
   * 获取输出结果结构
   * @returns {object} 输出结果模式
   */
  getOutputSchema() {
    return this.param.getOutputSchema()
  }

  /**
   * 获取简化输入参数信息
   * @returns {Array} 参数信息列表
   */
  getInputInfo() {
    return this.param.getInputInfo()
  }

  /**
   * 获取简化输出结果信息
   * @returns {Array} 输出信息列表
   */
  getOutputInfo() {
    return this.param.getOutputInfo()
  }

  /**
   * 获取单个参数详情
   * @param {string} paramName - 参数名
   * @returns {object|null} 参数详情
   */
  getParamDetail(paramName) {
    return this.param.getParamDetail(paramName)
  }

  /**
   * 验证参数
   * @param {object} params - 参数对象
   * @returns {{valid: boolean, errors: string[]}} 验证结果
   */
  validateParams(params) {
    return this.param.validate(params)
  }

  /**
   * 转换参数
   * @param {object} params - 参数对象
   * @returns {object} 转换后的参数
   */
  transformParams(params) {
    return this.param.transform(params, params.model)
  }

  /**
   * 提取输出
   * @param {object} response - API响应
   * @returns {object} 提取后的输出
   */
  extractOutput(response) {
    return this.param.extractOutput(response)
  }

  /**
   * 准备API调用参数（子类可重写）
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return params
  }

  /**
   * 获取参数配置（统一接口）
   * @param {object} context - 当前参数上下文
   * @param {object} options - 额外选项（包含 provider 和 language）
   * @returns {object} 参数配置
   */
  getParamConfig(context = {}, options = {}) {
    const ParamConfigManager = require('../params/param-config-manager')
    const configManager = new ParamConfigManager()
    const schema = this.getParamSchema()
    schema.apiName = this.name
    schema.modelName = this.modelName
    
    return configManager.getParamConfig(
      schema,
      context,
      this.param.modelCapabilities,
      null,
      options
    )
  }

  /**
   * 获取模型参数选项
   * @param {string} model - 模型名称（可选）
   * @returns {object|null} 参数选项
   */
  getModelParamOptions(model) {
    if (!this.param.modelCapabilities) {
      return null
    }

    if (model) {
      return this.param.modelCapabilities[model] || null
    }

    return this.param.modelCapabilities
  }

  /**
   * 获取可用的参数选项（根据上下文）
   * @param {string} model - 模型名称
   * @param {object} context - 上下文参数
   * @returns {object|null} 可用选项
   */
  getAvailableOptions(model, context = {}) {
    return this.param.getAvailableOptions(model, context)
  }
}

module.exports = APIDefinition
