/**
 * Param基类
 * 参数模式定义和处理
 */

const { deepMerge, deepClone } = require('../utils/helpers')
const { validateParams, checkDependencies } = require('./validators')
const { transformParams } = require('./transformers')
const { extractOutput, extractSingleField } = require('./extractors')
const { ModelConstraintValidator } = require('./model-constraint-validator')

/**
 * Param基类
 */
class BaseParam {
  /**
   * 创建参数实例
   * @param {object} schema - 参数模式
   */
  constructor(schema = {}) {
    this.schema = {
      input: schema.input || {},
      output: schema.output || {}
    }
    this.modelCapabilities = schema.modelCapabilities || null
    this.compositeConstraints = schema.compositeConstraints || null
  }

  /**
   * 验证参数值
   * @param {object} params - 参数对象
   * @returns {{valid: boolean, errors: string[]}} 验证结果
   */
  validate(params) {
    const validationResult = validateParams(params, this.schema, {
      modelCapabilities: this.modelCapabilities,
      compositeConstraints: this.compositeConstraints
    })
    if (!validationResult.valid) {
      return validationResult
    }

    return checkDependencies(params, this.schema)
  }

  /**
   * 获取模型可用参数选项
   * @param {string} model - 模型名称
   * @param {object} context - 上下文参数
   * @returns {object|null} 可用选项
   */
  getAvailableOptions(model, context = {}) {
    if (!this.modelCapabilities || !this.modelCapabilities[model]) {
      return null
    }

    const validator = new ModelConstraintValidator()
    return validator.getAvailableOptions(model, this.modelCapabilities, context)
  }

  /**
   * 转换参数值
   * @param {object} params - 参数对象
   * @returns {object} 转换后的参数
   */
  transform(params) {
    return transformParams(params, this.schema)
  }

  /**
   * 获取参数模式
   * @returns {object} 参数模式
   */
  getSchema() {
    const schema = deepClone(this.schema)
    if (this.modelCapabilities) {
      schema.modelCapabilities = deepClone(this.modelCapabilities)
    }
    if (this.compositeConstraints) {
      schema.compositeConstraints = deepClone(this.compositeConstraints)
    }
    return schema
  }

  /**
   * 获取复合约束定义
   * @returns {Array|null} 复合约束定义
   */
  getCompositeConstraints() {
    return this.compositeConstraints ? deepClone(this.compositeConstraints) : null
  }

  /**
   * 获取输入参数模式
   * @returns {object} 输入参数模式
   */
  getInputSchema() {
    return deepClone(this.schema.input)
  }

  /**
   * 获取输出参数模式
   * @returns {object} 输出参数模式
   */
  getOutputSchema() {
    return deepClone(this.schema.output)
  }

  /**
   * 从原始响应提取标准化结果
   * @param {any} rawResponse - 原始响应
   * @returns {object} 提取的结果
   */
  extractOutput(rawResponse) {
    return extractOutput(rawResponse, this.schema)
  }

  /**
   * 提取单个字段
   * @param {any} rawResponse - 原始响应
   * @param {string} fieldName - 字段名
   * @returns {any} 提取的值
   */
  extractField(rawResponse, fieldName) {
    return extractSingleField(rawResponse, fieldName, this.schema)
  }

  /**
   * 获取输入参数信息列表
   * @returns {Array<{name: string, type: string, required: boolean, description: string, ...}>}
   */
  getInputInfo() {
    const info = []
    for (const [name, schema] of Object.entries(this.schema.input)) {
      info.push({
        name,
        type: schema.type,
        required: schema.required || false,
        default: schema.default,
        description: schema.description,
        options: schema.options,
        min: schema.min,
        max: schema.max,
        minLength: schema.minLength,
        maxLength: schema.maxLength
      })
    }
    return info
  }

  /**
   * 获取输出参数信息列表
   * @returns {Array<{name: string, type: string, description: string, ...}>}
   */
  getOutputInfo() {
    const info = []
    for (const [name, schema] of Object.entries(this.schema.output)) {
      info.push({
        name,
        type: schema.type,
        description: schema.description,
        path: schema.path,
        required: schema.required
      })
    }
    return info
  }

  /**
   * 获取单个参数详情
   * @param {string} paramName - 参数名
   * @returns {object|null} 参数详情
   */
  getParamDetail(paramName) {
    const inputSchema = this.schema.input[paramName]
    if (inputSchema) {
      return {
        name: paramName,
        ...inputSchema
      }
    }

    const outputSchema = this.schema.output[paramName]
    if (outputSchema) {
      return {
        name: paramName,
        ...outputSchema
      }
    }

    return null
  }

  /**
   * 增量重写参数
   * @param {object} newConfig - 新配置
   * @returns {BaseParam} 新的参数实例
   */
  override(newConfig) {
    const newSchema = BaseParam.override(this.schema, newConfig)
    return new BaseParam(newSchema)
  }

  /**
   * 扩展参数
   * @param {object} newFields - 新字段
   * @returns {BaseParam} 新的参数实例
   */
  extend(newFields) {
    const newSchema = BaseParam.extend(this.schema, newFields)
    return new BaseParam(newSchema)
  }

  /**
   * 删除参数
   * @param {object} fields - 要删除的字段 {input: [], output: []}
   * @returns {BaseParam} 新的参数实例
   */
  omit(fields) {
    const newSchema = BaseParam.omit(this.schema, fields)
    return new BaseParam(newSchema)
  }

  /**
   * 选择参数
   * @param {object} fields - 要保留的字段 {input: [], output: []}
   * @returns {BaseParam} 新的参数实例
   */
  pick(fields) {
    const newSchema = BaseParam.pick(this.schema, fields)
    return new BaseParam(newSchema)
  }

  /**
   * 创建参数实例
   * @param {object} schema - 参数模式
   * @returns {BaseParam} 参数实例
   */
  static create(schema) {
    return new BaseParam(schema)
  }

  /**
   * 静态重写方法
   * @param {object} baseSchema - 基础模式
   * @param {object} overrideConfig - 覆盖配置
   * @returns {object} 新的模式
   */
  static override(baseSchema, overrideConfig) {
    const result = deepMerge(deepClone(baseSchema), overrideConfig)
    
    if (baseSchema.compositeConstraints && !overrideConfig.compositeConstraints) {
      result.compositeConstraints = deepClone(baseSchema.compositeConstraints)
    }
    
    return result
  }

  /**
   * 静态扩展方法
   * @param {object} baseSchema - 基础模式
   * @param {object} newFields - 新字段
   * @returns {object} 新的模式
   */
  static extend(baseSchema, newFields) {
    const result = deepClone(baseSchema)

    if (newFields.input) {
      result.input = {
        ...result.input,
        ...newFields.input
      }
    }

    if (newFields.output) {
      result.output = {
        ...result.output,
        ...newFields.output
      }
    }

    return result
  }

  /**
   * 静态删除方法
   * @param {object} baseSchema - 基础模式
   * @param {object} fields - 要删除的字段
   * @returns {object} 新的模式
   */
  static omit(baseSchema, fields) {
    const result = deepClone(baseSchema)

    if (fields.input && Array.isArray(fields.input)) {
      fields.input.forEach(key => {
        delete result.input[key]
      })
    }

    if (fields.output && Array.isArray(fields.output)) {
      fields.output.forEach(key => {
        delete result.output[key]
      })
    }

    return result
  }

  /**
   * 静态选择方法
   * @param {object} baseSchema - 基础模式
   * @param {object} fields - 要保留的字段
   * @returns {object} 新的模式
   */
  static pick(baseSchema, fields) {
    const result = {
      input: {},
      output: {}
    }

    if (fields.input && Array.isArray(fields.input)) {
      fields.input.forEach(key => {
        if (baseSchema.input && baseSchema.input[key]) {
          result.input[key] = baseSchema.input[key]
        }
      })
    }

    if (fields.output && Array.isArray(fields.output)) {
      fields.output.forEach(key => {
        if (baseSchema.output && baseSchema.output[key]) {
          result.output[key] = baseSchema.output[key]
        }
      })
    }

    return result
  }

  /**
   * 组合多个模式
   * @param {...object} schemas - 模式列表
   * @returns {object} 组合后的模式
   */
  static compose(...schemas) {
    return schemas.reduce((result, schema) => {
      return deepMerge(result, schema)
    }, { input: {}, output: {} })
  }

  /**
   * 继承父模式
   * @param {object} parentSchema - 父模式
   * @param {object} childConfig - 子配置
   * @returns {object} 新的模式
   */
  static inherit(parentSchema, childConfig) {
    return BaseParam.extend(parentSchema, childConfig)
  }

  /**
   * 从模板创建
   * @param {object} template - 模板对象
   * @returns {object} 新的模式
   */
  static fromTemplate(template) {
    return deepClone(template)
  }
}

module.exports = BaseParam
