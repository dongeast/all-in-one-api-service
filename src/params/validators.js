/**
 * 参数验证器
 * 用于验证输入参数
 * 支持多语言错误消息
 */

const { ModelConstraintValidator } = require('./model-constraint-validator')
const ConstraintEngine = require('./constraint-engine')
const { t } = require('../utils/i18n')

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
 * @param {string} language - 语言代码(可选)
 * @returns {ValidationResult} 验证结果
 */
function validateString(value, schema, language) {
  const errors = []

  if (typeof value !== 'string') {
    errors.push(t('validation.expectedString', { language, type: typeof value }))
    return new ValidationResult(false, errors)
  }

  if (schema.minLength !== undefined && value.length < schema.minLength) {
    errors.push(t('validation.stringMinLength', { language, min: schema.minLength }))
  }

  if (schema.maxLength !== undefined && value.length > schema.maxLength) {
    errors.push(t('validation.stringMaxLength', { language, max: schema.maxLength }))
  }

  if (schema.pattern && !schema.pattern.test(value)) {
    errors.push(t('validation.stringPattern', { language, pattern: schema.pattern }))
  }

  return new ValidationResult(errors.length === 0, errors)
}

/**
 * 验证数字类型
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @param {string} language - 语言代码(可选)
 * @returns {ValidationResult} 验证结果
 */
function validateNumber(value, schema, language) {
  const errors = []

  if (typeof value !== 'number' || isNaN(value)) {
    errors.push(t('validation.expectedNumber', { language, type: typeof value }))
    return new ValidationResult(false, errors)
  }

  if (schema.min !== undefined && value < schema.min) {
    errors.push(t('validation.numberMin', { language, min: schema.min }))
  }

  if (schema.max !== undefined && value > schema.max) {
    errors.push(t('validation.numberMax', { language, max: schema.max }))
  }

  if (schema.integer && !Number.isInteger(value)) {
    errors.push(t('validation.numberInteger', { language }))
  }

  if (schema.step !== undefined && schema.step > 0 && schema.min !== undefined) {
    const offset = (value - schema.min) % schema.step
    if (offset !== 0) {
      const lowerValue = value - offset
      const upperValue = lowerValue + schema.step
      const values = []
      
      if (lowerValue >= schema.min) {
        values.push(lowerValue)
      }
      if (upperValue <= (schema.max || Infinity)) {
        values.push(upperValue)
      }
      
      errors.push(t('validation.numberStep', { 
        language, 
        step: schema.step,
        values: values.join(', ')
      }))
    }
  }

  return new ValidationResult(errors.length === 0, errors)
}

/**
 * 验证布尔类型
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @param {string} language - 语言代码(可选)
 * @returns {ValidationResult} 验证结果
 */
function validateBoolean(value, schema, language) {
  const errors = []

  if (typeof value !== 'boolean') {
    errors.push(t('validation.expectedBoolean', { language, type: typeof value }))
    return new ValidationResult(false, errors)
  }

  return new ValidationResult(true, errors)
}

/**
 * 验证枚举类型
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @param {string} language - 语言代码(可选)
 * @returns {ValidationResult} 验证结果
 */
function validateEnum(value, schema, language) {
  const errors = []

  if (!schema.options || !Array.isArray(schema.options)) {
    errors.push(t('validation.enumSchema', { language }))
    return new ValidationResult(false, errors)
  }

  if (!schema.options.includes(value)) {
    errors.push(t('validation.enumInvalid', { language, options: schema.options.join(', ') }))
    return new ValidationResult(false, errors)
  }

  return new ValidationResult(true, errors)
}

/**
 * 验证联合类型数组项
 * @param {any} item - 数组项
 * @param {object} schema - items schema (包含 oneOf)
 * @param {string} language - 语言代码
 * @returns {ValidationResult} 验证结果
 */
function validateUnionArrayItem(item, schema, language) {
  const errors = []

  if (!schema.oneOf || !Array.isArray(schema.oneOf)) {
    return new ValidationResult(false, [t('validation.unionArraySchema', { language })])
  }

  const itemType = item?.type
  if (!itemType) {
    return new ValidationResult(false, [t('validation.unionArrayItemTypeMissing', { language })])
  }

  const matchedSchema = schema.oneOf.find(s => s.type === itemType)
  if (!matchedSchema) {
    const validTypes = schema.oneOf.map(s => s.type).join(', ')
    return new ValidationResult(false, [t('validation.unionArrayItemTypeInvalid', {
      language, type: itemType, validTypes
    })])
  }

  if (matchedSchema.fields) {
    for (const [fieldName, fieldDef] of Object.entries(matchedSchema.fields)) {
      const fieldValue = item[fieldName]
      if (fieldValue !== undefined) {
        const fieldResult = validate(fieldValue, fieldDef, language)
        if (!fieldResult.valid) {
          errors.push(...fieldResult.errors)
        }
      } else if (fieldDef.required) {
        errors.push(t('validation.requiredParamMissing', { language, param: fieldName }))
      }
    }
  }

  return new ValidationResult(errors.length === 0, errors)
}

/**
 * 验证数组类型
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @param {string} language - 语言代码(可选)
 * @returns {ValidationResult} 验证结果
 */
function validateArray(value, schema, language) {
  const errors = []

  if (!Array.isArray(value)) {
    errors.push(t('validation.expectedArray', { language, type: typeof value }))
    return new ValidationResult(false, errors)
  }

  if (schema.minItems !== undefined && value.length < schema.minItems) {
    errors.push(t('validation.arrayMinItems', { language, min: schema.minItems }))
  }

  if (schema.maxItems !== undefined && value.length > schema.maxItems) {
    errors.push(t('validation.arrayMaxItems', { language, max: schema.maxItems }))
  }

  if (schema.items) {
    if (schema.items.oneOf) {
      for (let i = 0; i < value.length; i++) {
        const itemResult = validateUnionArrayItem(value[i], schema.items, language)
        if (!itemResult.valid) {
          errors.push(t('validation.arrayItemInvalid', {
            language, index: i, error: itemResult.errors.join(', ')
          }))
        }
      }

      const requiredTypes = schema.items.oneOf
        .filter(s => s.required)
        .map(s => s.type)

      for (const requiredType of requiredTypes) {
        const hasRequired = value.some(item => item.type === requiredType)
        if (!hasRequired) {
          const typeConfig = schema.items.oneOf.find(s => s.type === requiredType)
          errors.push(t('validation.unionArrayRequiredTypeMissing', {
            language, type: typeConfig?.label || requiredType
          }))
        }
      }
    } else if (schema.itemSchema) {
      for (let i = 0; i < value.length; i++) {
        const itemResult = validate(value[i], schema.itemSchema, language)
        if (!itemResult.valid) {
          errors.push(t('validation.arrayItemInvalid', {
            language,
            index: i,
            error: itemResult.errors.join(', ')
          }))
        }
      }
    }
  }

  return new ValidationResult(errors.length === 0, errors)
}

/**
 * 验证对象类型
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @param {string} language - 语言代码(可选)
 * @returns {ValidationResult} 验证结果
 */
function validateObject(value, schema, language) {
  const errors = []

  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    errors.push(t('validation.expectedObject', { language, type: typeof value }))
    return new ValidationResult(false, errors)
  }

  if (schema.properties) {
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      if (value[key] !== undefined) {
        const propResult = validate(value[key], propSchema, language)
        if (!propResult.valid) {
          errors.push(t('validation.objectPropertyInvalid', { 
            language, 
            key, 
            error: propResult.errors.join(', ') 
          }))
        }
      }
    }
  }

  return new ValidationResult(errors.length === 0, errors)
}

/**
 * 验证文件类型
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @param {string} language - 语言代码(可选)
 * @returns {ValidationResult} 验证结果
 */
function validateFile(value, schema, language) {
  const errors = []

  if (!value) {
    errors.push(t('validation.fileRequired', { language }))
    return new ValidationResult(false, errors)
  }

  if (schema.constraints) {
    const { maxSize, formats } = schema.constraints

    if (maxSize && value.length && value.length > maxSize) {
      errors.push(t('validation.fileSizeMax', { language, max: maxSize }))
    }

    if (formats && value.name) {
      const ext = value.name.split('.').pop().toLowerCase()
      if (!formats.includes(ext)) {
        errors.push(t('validation.fileFormatInvalid', { language, formats: formats.join(', ') }))
      }
    }
  }

  return new ValidationResult(errors.length === 0, errors)
}

/**
 * 验证参数值
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @param {string} language - 语言代码(可选)
 * @returns {ValidationResult} 验证结果
 */
function validate(value, schema, language) {
  if (!schema) {
    return new ValidationResult(true, [])
  }

  if (schema.customValidator) {
    return schema.customValidator(value, language)
  }

  const validators = {
    string: validateString,
    number: validateNumber,
    boolean: validateBoolean,
    enum: validateEnum,
    array: validateArray,
    object: validateObject,
    file: validateFile
  }

  const validator = validators[schema.type]
  if (!validator) {
    return new ValidationResult(false, [t('validation.unknownType', { language, type: schema.type })])
  }

  return validator(value, schema, language)
}

/**
 * 验证参数对象
 * @param {object} params - 参数对象
 * @param {object} schema - 参数模式定义
 * @param {object} options - 验证选项（可选）
 * @param {object} options.modelCapabilities - 模型能力定义
 * @param {Array} options.compositeConstraints - 复合约束定义
 * @param {Array<Array<string>>} options.mutuallyExclusive - 互斥参数组列表
 * @param {object} options.conditionalRequired - 条件必填定义
 * @param {string} options.language - 语言代码
 * @returns {ValidationResult} 验证结果
 */
function validateParams(params, schema, options = {}) {
  const errors = []
  const language = options.language

  if (!schema || !schema.input) {
    return new ValidationResult(true, [])
  }

  const inputSchema = schema.input

  for (const [key, fieldSchema] of Object.entries(inputSchema)) {
    const value = params[key]

    if (value === undefined || value === null) {
      if (fieldSchema.required) {
        errors.push(t('validation.requiredParamMissing', { language, param: key }))
      }
      continue
    }

    const result = validate(value, fieldSchema, language)
    if (!result.valid) {
      errors.push(t('validation.paramValidationFailed', { 
        language, 
        param: key, 
        error: result.errors.join(', ') 
      }))
    }
  }

  if (options.modelCapabilities && params.model) {
    const constraintValidator = new ModelConstraintValidator()
    const constraintResult = constraintValidator.validate(
      params.model,
      params,
      options.modelCapabilities,
      language
    )
    if (!constraintResult.valid) {
      errors.push(...constraintResult.errors)
    }
  }

  if (options.compositeConstraints) {
    const engine = new ConstraintEngine()
    const compositeResult = engine.validateAll(params, options.compositeConstraints, language)
    if (!compositeResult.valid) {
      errors.push(...compositeResult.errors)
    }
  }

  if (options.mutuallyExclusive) {
    const mutexResult = validateMutuallyExclusive(params, options.mutuallyExclusive, language)
    if (!mutexResult.valid) {
      errors.push(...mutexResult.errors)
    }
  }

  if (options.conditionalRequired) {
    const condResult = validateConditionalRequired(params, options.conditionalRequired, language)
    if (!condResult.valid) {
      errors.push(...condResult.errors)
    }
  }

  if (schema.customValidator) {
    const customResult = schema.customValidator(params, language)
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
 * @param {string} language - 语言代码(可选)
 * @returns {ValidationResult} 验证结果
 */
function checkDependencies(params, schema, language) {
  const errors = []

  if (!schema || !schema.input) {
    return new ValidationResult(true, [])
  }

  for (const [key, fieldSchema] of Object.entries(schema.input)) {
    if (fieldSchema.dependsOn && params[key] !== undefined) {
      for (const [depKey, depValue] of Object.entries(fieldSchema.dependsOn)) {
        if (params[depKey] !== depValue) {
          errors.push(t('validation.dependencyFailed', { 
            language, 
            param: key, 
            dep: depKey, 
            value: depValue 
          }))
        }
      }
    }
  }

  return new ValidationResult(errors.length === 0, errors)
}

/**
 * 验证互斥参数
 * @param {object} params - 参数对象
 * @param {Array<Array<string>>} mutuallyExclusiveGroups - 互斥参数组列表
 * @param {string} language - 语言代码(可选)
 * @returns {ValidationResult} 验证结果
 */
function validateMutuallyExclusive(params, mutuallyExclusiveGroups = [], language) {
  const errors = []

  for (const group of mutuallyExclusiveGroups) {
    const provided = group.filter(name => params[name] !== undefined && params[name] !== null)
    
    if (provided.length > 1) {
      errors.push(t('validation.mutexParams', { 
        language, 
        params: provided.map(p => `"${p}"`).join(', ') 
      }))
    }
  }

  return new ValidationResult(errors.length === 0, errors)
}

/**
 * 验证条件必填参数
 * @param {object} params - 参数对象
 * @param {object} conditionalRequired - 条件必填定义
 * @param {string} language - 语言代码(可选)
 * @returns {ValidationResult} 验证结果
 */
function validateConditionalRequired(params, conditionalRequired = {}, language) {
  const errors = []

  for (const [paramName, conditions] of Object.entries(conditionalRequired)) {
    if (params[paramName] === undefined || params[paramName] === null) {
      for (const condition of conditions) {
        const { when, hasValue } = condition
        const paramValue = params[when]
        
        if (hasValue !== undefined) {
          if (Array.isArray(hasValue)) {
            if (hasValue.includes(paramValue)) {
              errors.push(t('validation.conditionalRequiredList', { 
                language, 
                param: paramName, 
                when, 
                values: hasValue.join(', ') 
              }))
            }
          } else {
            if (paramValue === hasValue) {
              errors.push(t('validation.conditionalRequired', { 
                language, 
                param: paramName, 
                when, 
                value: hasValue 
              }))
            }
          }
        } else if (paramValue !== undefined && paramValue !== null) {
          errors.push(t('validation.conditionalRequiredAny', { 
            language, 
            param: paramName, 
            when 
          }))
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
  validateUnionArrayItem,
  validateObject,
  validateParams,
  checkDependencies,
  validateMutuallyExclusive,
  validateConditionalRequired
}
