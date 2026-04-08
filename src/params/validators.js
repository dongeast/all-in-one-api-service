/**
 * 参数验证器
 * 用于验证输入参数
 */

const { ModelConstraintValidator } = require('./model-constraint-validator')
const ConstraintEngine = require('./constraint-engine')

/**
 * 验证结果类
 */
class ValidationResult {
  /**
   * 创建验证结果
   * @param {boolean} valid - 是否有效
   * @param {string[]} errors - 错误列表
   */
  constructor(valid, errors = []) {
    this.valid = valid
    this.errors = errors
  }
}

/**
 * 验证字符串类型
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @returns {ValidationResult} 验证结果
 */
function validateString(value, schema) {
  const errors = []

  if (typeof value !== 'string') {
    errors.push(`Expected string, got ${typeof value}`)
    return new ValidationResult(false, errors)
  }

  if (schema.minLength !== undefined && value.length < schema.minLength) {
    errors.push(`String length must be at least ${schema.minLength}`)
  }

  if (schema.maxLength !== undefined && value.length > schema.maxLength) {
    errors.push(`String length must be at most ${schema.maxLength}`)
  }

  if (schema.pattern && !schema.pattern.test(value)) {
    errors.push(`String does not match pattern ${schema.pattern}`)
  }

  return new ValidationResult(errors.length === 0, errors)
}

/**
 * 验证数字类型
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @returns {ValidationResult} 验证结果
 */
function validateNumber(value, schema) {
  const errors = []

  if (typeof value !== 'number' || isNaN(value)) {
    errors.push(`Expected number, got ${typeof value}`)
    return new ValidationResult(false, errors)
  }

  if (schema.min !== undefined && value < schema.min) {
    errors.push(`Number must be at least ${schema.min}`)
  }

  if (schema.max !== undefined && value > schema.max) {
    errors.push(`Number must be at most ${schema.max}`)
  }

  if (schema.integer && !Number.isInteger(value)) {
    errors.push('Number must be an integer')
  }

  // 验证步长
  if (schema.step !== undefined && schema.step > 0 && schema.min !== undefined) {
    const offset = (value - schema.min) % schema.step
    if (offset !== 0) {
      const lowerValue = value - offset
      const upperValue = lowerValue + schema.step
      
      errors.push(
        `Number does not match step requirement (step: ${schema.step}). ` +
        `Closest valid values: ${lowerValue >= schema.min ? lowerValue : ''}${lowerValue >= schema.min && upperValue <= (schema.max || Infinity) ? ', ' : ''}${upperValue <= (schema.max || Infinity) ? upperValue : ''}`
      )
    }
  }

  return new ValidationResult(errors.length === 0, errors)
}

/**
 * 验证布尔类型
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @returns {ValidationResult} 验证结果
 */
function validateBoolean(value, schema) {
  const errors = []

  if (typeof value !== 'boolean') {
    errors.push(`Expected boolean, got ${typeof value}`)
    return new ValidationResult(false, errors)
  }

  return new ValidationResult(true, errors)
}

/**
 * 验证枚举类型
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @returns {ValidationResult} 验证结果
 */
function validateEnum(value, schema) {
  const errors = []

  if (!schema.options || !Array.isArray(schema.options)) {
    errors.push('Enum schema must have options array')
    return new ValidationResult(false, errors)
  }

  if (!schema.options.includes(value)) {
    errors.push(`Value must be one of: ${schema.options.join(', ')}`)
    return new ValidationResult(false, errors)
  }

  return new ValidationResult(true, errors)
}

/**
 * 验证数组类型
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @returns {ValidationResult} 验证结果
 */
function validateArray(value, schema) {
  const errors = []

  if (!Array.isArray(value)) {
    errors.push(`Expected array, got ${typeof value}`)
    return new ValidationResult(false, errors)
  }

  if (schema.minItems !== undefined && value.length < schema.minItems) {
    errors.push(`Array must have at least ${schema.minItems} items`)
  }

  if (schema.maxItems !== undefined && value.length > schema.maxItems) {
    errors.push(`Array must have at most ${schema.maxItems} items`)
  }

  if (schema.itemSchema) {
    for (let i = 0; i < value.length; i++) {
      const itemResult = validate(value[i], schema.itemSchema)
      if (!itemResult.valid) {
        errors.push(`Item ${i}: ${itemResult.errors.join(', ')}`)
      }
    }
  }

  return new ValidationResult(errors.length === 0, errors)
}

/**
 * 验证对象类型
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @returns {ValidationResult} 验证结果
 */
function validateObject(value, schema) {
  const errors = []

  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    errors.push(`Expected object, got ${typeof value}`)
    return new ValidationResult(false, errors)
  }

  if (schema.properties) {
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      if (value[key] !== undefined) {
        const propResult = validate(value[key], propSchema)
        if (!propResult.valid) {
          errors.push(`Property "${key}": ${propResult.errors.join(', ')}`)
        }
      }
    }
  }

  return new ValidationResult(errors.length === 0, errors)
}

/**
 * 验证参数值
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @returns {ValidationResult} 验证结果
 */
function validate(value, schema) {
  if (!schema) {
    return new ValidationResult(true, [])
  }

  if (schema.customValidator) {
    return schema.customValidator(value)
  }

  const validators = {
    string: validateString,
    number: validateNumber,
    boolean: validateBoolean,
    enum: validateEnum,
    array: validateArray,
    object: validateObject
  }

  const validator = validators[schema.type]
  if (!validator) {
    return new ValidationResult(false, [`Unknown type: ${schema.type}`])
  }

  return validator(value, schema)
}

/**
 * 验证参数对象
 * @param {object} params - 参数对象
 * @param {object} schema - 参数模式定义
 * @param {object} options - 验证选项（可选）
 * @param {object} options.modelCapabilities - 模型能力定义
 * @param {Array} options.compositeConstraints - 复合约束定义
 * @returns {ValidationResult} 验证结果
 */
function validateParams(params, schema, options = {}) {
  const errors = []

  if (!schema || !schema.input) {
    return new ValidationResult(true, [])
  }

  const inputSchema = schema.input

  for (const [key, fieldSchema] of Object.entries(inputSchema)) {
    const value = params[key]

    if (value === undefined || value === null) {
      if (fieldSchema.required) {
        errors.push(`Required parameter "${key}" is missing`)
      }
      continue
    }

    const result = validate(value, fieldSchema)
    if (!result.valid) {
      errors.push(`Parameter "${key}": ${result.errors.join(', ')}`)
    }
  }

  if (options.modelCapabilities && params.model) {
    const constraintValidator = new ModelConstraintValidator()
    const constraintResult = constraintValidator.validate(
      params.model,
      params,
      options.modelCapabilities
    )
    if (!constraintResult.valid) {
      errors.push(...constraintResult.errors)
    }
  }

  if (options.compositeConstraints) {
    const engine = new ConstraintEngine()
    const compositeResult = engine.validateAll(params, options.compositeConstraints)
    if (!compositeResult.valid) {
      errors.push(...compositeResult.errors)
    }
  }

  if (schema.customValidator) {
    const customResult = schema.customValidator(params)
    if (!customResult.valid) {
      errors.push(...customResult.errors)
    }
  }

  return new ValidationResult(errors.length === 0, errors)
}

/**
 * 检查依赖条件
 * @param {object} params - 参数对象
 * @param {object} schema - 参数模式
 * @returns {ValidationResult} 验证结果
 */
function checkDependencies(params, schema) {
  const errors = []

  if (!schema || !schema.input) {
    return new ValidationResult(true, [])
  }

  for (const [key, fieldSchema] of Object.entries(schema.input)) {
    if (fieldSchema.dependsOn && params[key] !== undefined) {
      for (const [depKey, depValue] of Object.entries(fieldSchema.dependsOn)) {
        if (params[depKey] !== depValue) {
          errors.push(
            `Parameter "${key}" requires "${depKey}" to be "${depValue}"`
          )
        }
      }
    }
  }

  return new ValidationResult(errors.length === 0, errors)
}

module.exports = {
  ValidationResult,
  validate,
  validateString,
  validateNumber,
  validateBoolean,
  validateEnum,
  validateArray,
  validateObject,
  validateParams,
  checkDependencies
}
