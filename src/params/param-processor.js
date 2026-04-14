/**
 * 参数处理器
 * 统一处理参数验证、转换和输出提取
 */

const { validateParams, ValidationResult } = require('./validators')
const { transformParams } = require('./transformers')
const { extractOutput } = require('./extractors')
const { t } = require('../utils/i18n')

/**
 * 参数处理器类
 */
class ParamProcessor {
  /**
   * 创建参数处理器实例
   * @param {object} schema - 参数模式定义
   */
  constructor(schema = {}) {
    this.schema = schema
    this.hooks = {
      beforeValidate: [],
      afterValidate: [],
      beforeTransform: [],
      afterTransform: [],
      beforeExtract: [],
      afterExtract: []
    }
  }

  /**
   * 设置参数模式
   * @param {object} schema - 参数模式定义
   * @returns {ParamProcessor} 当前实例
   */
  setSchema(schema) {
    this.schema = schema
    return this
  }

  /**
   * 添加钩子
   * @param {string} event - 事件名称
   * @param {Function} handler - 处理函数
   * @returns {ParamProcessor} 当前实例
   */
  addHook(event, handler) {
    if (this.hooks[event]) {
      this.hooks[event].push(handler)
    }
    return this
  }

  /**
   * 执行钩子
   * @param {string} event - 事件名称
   * @param {any} data - 数据
   * @returns {any} 处理后的数据
   */
  async executeHooks(event, data) {
    let result = data
    const hooks = this.hooks[event] || []
    
    for (const hook of hooks) {
      result = await hook(result)
    }
    
    return result
  }

  /**
   * 验证参数
   * @param {object} params - 参数对象
   * @param {object} options - 验证选项
   * @returns {ValidationResult} 验证结果
   */
  async validate(params, options = {}) {
    const processedParams = await this.executeHooks('beforeValidate', params)
    
    const result = validateParams(processedParams, this.schema, {
      language: options.language,
      modelCapabilities: options.modelCapabilities,
      compositeConstraints: options.compositeConstraints,
      mutuallyExclusive: options.mutuallyExclusive,
      conditionalRequired: options.conditionalRequired
    })
    
    await this.executeHooks('afterValidate', { params: processedParams, result })
    
    return result
  }

  /**
   * 转换参数
   * @param {object} params - 参数对象
   * @param {string} model - 模型名称（可选）
   * @returns {object} 转换后的参数
   */
  async transform(params, model) {
    const processedParams = await this.executeHooks('beforeTransform', params)
    
    const result = transformParams(processedParams, this.schema, model)
    
    await this.executeHooks('afterTransform', result)
    
    return result
  }

  /**
   * 提取输出
   * @param {any} response - API响应
   * @returns {object} 提取的结果
   */
  async extract(response) {
    const processedResponse = await this.executeHooks('beforeExtract', response)
    
    const result = extractOutput(processedResponse, this.schema)
    
    await this.executeHooks('afterExtract', result)
    
    return result
  }

  /**
   * 完整处理流程：验证 -> 转换 -> 返回处理后的参数
   * @param {object} params - 参数对象
   * @param {object} options - 处理选项
   * @returns {object} 处理结果
   */
  async process(params, options = {}) {
    const validationResult = await this.validate(params, options)
    
    if (!validationResult.valid) {
      return {
        success: false,
        valid: false,
        errors: validationResult.errors,
        data: null
      }
    }
    
    const transformedParams = await this.transform(params, params.model)
    
    return {
      success: true,
      valid: true,
      errors: [],
      data: transformedParams
    }
  }

  /**
   * 完整处理流程：验证 -> 转换 -> 提取
   * @param {object} params - 参数对象
   * @param {any} response - API响应
   * @param {object} options - 处理选项
   * @returns {object} 处理结果
   */
  async processFull(params, response, options = {}) {
    const processResult = await this.process(params, options)
    
    if (!processResult.success) {
      return processResult
    }
    
    const extractedOutput = await this.extract(response)
    
    return {
      success: true,
      valid: true,
      errors: [],
      data: extractedOutput,
      transformedParams: processResult.data
    }
  }

  /**
   * 链式验证
   * @param {object} params - 参数对象
   * @param {Array<Function>} validators - 验证函数列表
   * @returns {ValidationResult} 验证结果
   */
  chainValidate(params, validators = []) {
    const errors = []
    
    for (const validator of validators) {
      const result = validator(params, this.schema)
      if (!result.valid) {
        errors.push(...result.errors)
      }
    }
    
    return new ValidationResult(errors.length === 0, errors)
  }

  /**
   * 条件验证
   * @param {object} params - 参数对象
   * @param {Function} condition - 条件函数
   * @param {Function} validator - 验证函数
   * @returns {ValidationResult} 验证结果
   */
  conditionalValidate(params, condition, validator) {
    if (condition(params)) {
      return validator(params, this.schema)
    }
    return new ValidationResult(true, [])
  }

  /**
   * 获取参数模式
   * @returns {object} 参数模式
   */
  getSchema() {
    return this.schema
  }

  /**
   * 获取输入参数模式
   * @returns {object} 输入参数模式
   */
  getInputSchema() {
    return this.schema.input || {}
  }

  /**
   * 获取输出模式
   * @returns {object} 输出模式
   */
  getOutputSchema() {
    return this.schema.output || {}
  }

  /**
   * 获取参数信息列表
   * @param {string} language - 语言代码
   * @returns {Array} 参数信息列表
   */
  getInputInfo(language = 'zh') {
    const inputSchema = this.schema.input || {}
    const result = []
    
    for (const [name, schema] of Object.entries(inputSchema)) {
      result.push({
        name,
        type: schema.type || 'any',
        required: schema.required || false,
        default: schema.default,
        description: schema.description || t(`params.${name}`, { language }),
        options: schema.options,
        min: schema.min,
        max: schema.max
      })
    }
    
    return result
  }

  /**
   * 获取输出信息列表
   * @param {string} language - 语言代码
   * @returns {Array} 输出信息列表
   */
  getOutputInfo(language = 'zh') {
    const outputSchema = this.schema.output || {}
    const result = []
    
    for (const [name, schema] of Object.entries(outputSchema)) {
      result.push({
        name,
        type: schema.type || 'any',
        description: schema.description || t(`output.${name}`, { language }),
        path: schema.path
      })
    }
    
    return result
  }

  /**
   * 克隆处理器
   * @returns {ParamProcessor} 新的处理器实例
   */
  clone() {
    const processor = new ParamProcessor(JSON.parse(JSON.stringify(this.schema)))
    processor.hooks = {
      beforeValidate: [...this.hooks.beforeValidate],
      afterValidate: [...this.hooks.afterValidate],
      beforeTransform: [...this.hooks.beforeTransform],
      afterTransform: [...this.hooks.afterTransform],
      beforeExtract: [...this.hooks.beforeExtract],
      afterExtract: [...this.hooks.afterExtract]
    }
    return processor
  }

  /**
   * 合并模式
   * @param {object} extraSchema - 额外的模式定义
   * @returns {ParamProcessor} 当前实例
   */
  mergeSchema(extraSchema) {
    this.schema = {
      input: {
        ...this.schema.input,
        ...(extraSchema.input || {})
      },
      output: {
        ...this.schema.output,
        ...(extraSchema.output || {})
      }
    }
    return this
  }
}

/**
 * 创建参数处理器
 * @param {object} schema - 参数模式定义
 * @returns {ParamProcessor} 参数处理器实例
 */
function createParamProcessor(schema) {
  return new ParamProcessor(schema)
}

module.exports = {
  ParamProcessor,
  createParamProcessor
}
