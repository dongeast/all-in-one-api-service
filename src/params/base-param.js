/**
 * 参数基类
 * 提供参数验证、转换和输出提取功能
 */

class BaseParam {
  /**
   * 创建参数实例
   * @param {object} schema - 参数模式
   * @param {object} schema.input - 输入参数模式
   * @param {object} schema.output - 输出参数模式
   * @param {Array} schema.cases - 参数约束配置
   */
  constructor(schema = {}) {
    this.schema = {
      input: schema.input || {},
      output: schema.output || {},
      cases: schema.cases || null
    }
    this.modelCapabilities = schema.modelCapabilities || null
  }

  /**
   * 验证参数
   * @param {object} params - 参数对象
   * @returns {{valid: boolean, errors: string[]}} 验证结果
   */
  validate(params) {
    const errors = []
    
    if (!params || typeof params !== 'object') {
      return { valid: false, errors: ['Parameters must be an object'] }
    }

    Object.entries(this.schema.input).forEach(([key, field]) => {
      if (field.required && (params[key] === undefined || params[key] === null)) {
        errors.push(`Missing required parameter: ${key}`)
      }
      
      if (params[key] !== undefined && field.type) {
        const actualType = Array.isArray(params[key]) ? 'array' : typeof params[key]
        if (actualType !== field.type && !(field.type === 'number' && actualType === 'string')) {
          errors.push(`Parameter ${key} must be of type ${field.type}, got ${actualType}`)
        }
      }
    })

    return {
      valid: errors.length === 0,
      errors
    }
  }

  /**
   * 转换参数
   * @param {object} params - 参数对象
   * @param {string} model - 模型名称
   * @returns {object} 转换后的参数
   */
  transform(params, model) {
    const transformed = { ...params }
    
    Object.entries(this.schema.input).forEach(([key, field]) => {
      if (transformed[key] !== undefined && field.transform) {
        transformed[key] = field.transform(transformed[key])
      }
    })

    return transformed
  }

  /**
   * 获取完整参数模式
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
    return this.schema.input
  }

  /**
   * 获取输出参数模式
   * @returns {object} 输出参数模式
   */
  getOutputSchema() {
    return this.schema.output
  }

  /**
   * 提取输出
   * @param {object} rawResponse - 原始响应
   * @returns {object} 提取后的输出
   */
  extractOutput(rawResponse) {
    if (!rawResponse || typeof rawResponse !== 'object') {
      return {}
    }

    const output = {}
    Object.entries(this.schema.output).forEach(([key, field]) => {
      const value = this.extractField(rawResponse, field.path || key)
      if (value !== undefined) {
        output[key] = value
      }
    })

    return output
  }

  /**
   * 提取字段
   * @param {object} rawResponse - 原始响应
   * @param {string} fieldName - 字段名称
   * @returns {any} 字段值
   */
  extractField(rawResponse, fieldName) {
    if (!rawResponse || typeof rawResponse !== 'object') {
      return undefined
    }

    const paths = fieldName.split('.')
    let value = rawResponse
    
    for (const path of paths) {
      if (value && typeof value === 'object' && path in value) {
        value = value[path]
      } else {
        return undefined
      }
    }

    return value
  }

  /**
   * 获取输入参数信息列表
   * @returns {Array} 参数信息列表
   */
  getInputInfo() {
    return Object.entries(this.schema.input).map(([key, field]) => ({
      name: key,
      type: field.type || 'any',
      required: field.required || false,
      description: field.description || '',
      defaultValue: field.defaultValue
    }))
  }

  /**
   * 获取输出参数信息列表
   * @returns {Array} 输出信息列表
   */
  getOutputInfo() {
    return Object.entries(this.schema.output).map(([key, field]) => ({
      name: key,
      type: field.type || 'any',
      description: field.description || ''
    }))
  }

  /**
   * 获取参数详情
   * @param {string} paramName - 参数名
   * @returns {object|null} 参数详情
   */
  getParamDetail(paramName) {
    const inputField = this.schema.input[paramName]
    if (inputField) {
      return {
        name: paramName,
        type: inputField.type || 'any',
        required: inputField.required || false,
        description: inputField.description || '',
        defaultValue: inputField.defaultValue,
        ...inputField
      }
    }

    const outputField = this.schema.output[paramName]
    if (outputField) {
      return {
        name: paramName,
        type: outputField.type || 'any',
        description: outputField.description || '',
        ...outputField
      }
    }

    return null
  }

  /**
   * 获取可用选项
   * @param {string} model - 模型名称
   * @param {object} context - 上下文参数
   * @returns {object|null} 可用选项
   */
  getAvailableOptions(model, context = {}) {
    if (!this.modelCapabilities) {
      return null
    }

    if (model && this.modelCapabilities[model]) {
      return this.modelCapabilities[model]
    }

    return this.modelCapabilities
  }

  /**
   * 覆盖配置
   * @param {object} newConfig - 新配置
   * @returns {BaseParam} 新的参数实例
   */
  override(newConfig) {
    return BaseParam.override(this.schema, newConfig)
  }

  /**
   * 扩展字段
   * @param {object} newFields - 新字段
   * @returns {BaseParam} 新的参数实例
   */
  extend(newFields) {
    return BaseParam.extend(this.schema, newFields)
  }

  /**
   * 省略字段
   * @param {object} fields - 要省略的字段
   * @returns {BaseParam} 新的参数实例
   */
  omit(fields) {
    return BaseParam.omit(this.schema, fields)
  }

  /**
   * 选择字段
   * @param {object} fields - 要选择的字段
   * @returns {BaseParam} 新的参数实例
   */
  pick(fields) {
    return BaseParam.pick(this.schema, fields)
  }

  /**
   * 静态方法：创建参数实例
   * @param {object} schema - 参数模式
   * @returns {BaseParam} 参数实例
   */
  static create(schema) {
    return new BaseParam(schema)
  }

  /**
   * 静态方法：覆盖配置
   * @param {object} baseSchema - 基础模式
   * @param {object} overrideConfig - 覆盖配置
   * @returns {object} 新的参数模式
   */
  static override(baseSchema, overrideConfig) {
    return {
      input: { ...baseSchema.input, ...overrideConfig.input },
      output: { ...baseSchema.output, ...overrideConfig.output },
      modelCapabilities: overrideConfig.modelCapabilities || baseSchema.modelCapabilities
    }
  }

  /**
   * 静态方法：扩展字段
   * @param {object} baseSchema - 基础模式
   * @param {object} newFields - 新字段
   * @returns {object} 新的参数模式
   */
  static extend(baseSchema, newFields) {
    return {
      input: { ...baseSchema.input, ...(newFields.input || {}) },
      output: { ...baseSchema.output, ...(newFields.output || {}) },
      modelCapabilities: newFields.modelCapabilities || baseSchema.modelCapabilities
    }
  }

  /**
   * 静态方法：省略字段
   * @param {object} baseSchema - 基础模式
   * @param {object} fields - 要省略的字段
   * @returns {object} 新的参数模式
   */
  static omit(baseSchema, fields) {
    const newSchema = {
      input: { ...baseSchema.input },
      output: { ...baseSchema.output }
    }

    if (fields.input) {
      fields.input.forEach(field => {
        delete newSchema.input[field]
      })
    }

    if (fields.output) {
      fields.output.forEach(field => {
        delete newSchema.output[field]
      })
    }

    return newSchema
  }

  /**
   * 静态方法：选择字段
   * @param {object} baseSchema - 基础模式
   * @param {object} fields - 要选择的字段
   * @returns {object} 新的参数模式
   */
  static pick(baseSchema, fields) {
    const newSchema = {
      input: {},
      output: {}
    }

    if (fields.input) {
      fields.input.forEach(field => {
        if (baseSchema.input[field]) {
          newSchema.input[field] = baseSchema.input[field]
        }
      })
    }

    if (fields.output) {
      fields.output.forEach(field => {
        if (baseSchema.output[field]) {
          newSchema.output[field] = baseSchema.output[field]
        }
      })
    }

    return newSchema
  }
}

module.exports = BaseParam
