/**
 * 参数转换器
 * 用于转换输入参数格式
 */

/**
 * 转换字符串
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @returns {string} 转换后的值
 */
function transformString(value, schema) {
  if (value === null || value === undefined) {
    return schema.default || ''
  }

  let result = String(value)

  if (schema.trim !== false) {
    result = result.trim()
  }

  if (schema.lowercase) {
    result = result.toLowerCase()
  }

  if (schema.uppercase) {
    result = result.toUpperCase()
  }

  return result
}

/**
 * 转换数字
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @returns {number} 转换后的值
 */
function transformNumber(value, schema) {
  if (value === null || value === undefined) {
    return schema.default || 0
  }

  let result = Number(value)

  if (isNaN(result)) {
    return schema.default || 0
  }

  if (schema.integer) {
    result = Math.floor(result)
  }

  if (schema.min !== undefined && result < schema.min) {
    result = schema.min
  }

  if (schema.max !== undefined && result > schema.max) {
    result = schema.max
  }

  return result
}

/**
 * 转换布尔值
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @returns {boolean} 转换后的值
 */
function transformBoolean(value, schema) {
  if (value === null || value === undefined) {
    return schema.default || false
  }

  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1'
  }

  return Boolean(value)
}

/**
 * 转换数组
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @returns {array} 转换后的值
 */
function transformArray(value, schema) {
  if (value === null || value === undefined) {
    return schema.default || []
  }

  if (!Array.isArray(value)) {
    if (typeof value === 'string') {
      return value.split(',').map(item => item.trim())
    }
    return [value]
  }

  let result = value

  if (schema.unique) {
    result = [...new Set(result)]
  }

  if (schema.itemSchema && schema.itemSchema.transform) {
    result = result.map(item => schema.itemSchema.transform(item))
  }

  return result
}

/**
 * 转换对象
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @returns {object} 转换后的值
 */
function transformObject(value, schema) {
  if (value === null || value === undefined) {
    return schema.default || {}
  }

  if (typeof value !== 'object') {
    return schema.default || {}
  }

  return value
}

/**
 * 转换参数值
 * @param {any} value - 值
 * @param {object} schema - 参数模式
 * @returns {any} 转换后的值
 */
function transform(value, schema) {
  if (!schema) {
    return value
  }

  if (value === undefined || value === null) {
    if (schema.default !== undefined) {
      return schema.default
    }
    return value
  }

  if (schema.transform) {
    return schema.transform(value)
  }

  const transformers = {
    string: transformString,
    number: transformNumber,
    boolean: transformBoolean,
    enum: transformString,
    array: transformArray,
    object: transformObject
  }

  const transformer = transformers[schema.type]
  if (!transformer) {
    return value
  }

  return transformer(value, schema)
}

/**
 * 转换参数对象
 * @param {object} params - 参数对象
 * @param {object} schema - 参数模式定义
 * @returns {object} 转换后的参数对象
 */
function transformParams(params, schema) {
  if (!schema || !schema.input) {
    return params
  }

  const result = {}
  const inputSchema = schema.input

  for (const [key, fieldSchema] of Object.entries(inputSchema)) {
    if (params[key] !== undefined) {
      result[key] = transform(params[key], fieldSchema)
    } else if (fieldSchema.default !== undefined) {
      result[key] = fieldSchema.default
    }
  }

  for (const [key, value] of Object.entries(params)) {
    if (result[key] === undefined) {
      result[key] = value
    }
  }

  return result
}

/**
 * 转换为API请求格式
 * @param {object} params - 参数对象
 * @param {object} schema - 参数模式
 * @param {object} mapping - 字段映射
 * @returns {object} API请求格式
 */
function toAPIFormat(params, schema, mapping = {}) {
  const transformed = transformParams(params, schema)
  const result = {}

  for (const [key, value] of Object.entries(transformed)) {
    const apiKey = mapping[key] || key
    result[apiKey] = value
  }

  return result
}

/**
 * 转换火山引擎3D生成任务参数
 * 将 subdivisionlevel 和 fileformat 转换为 content 数组中的 text 项
 * @param {object} params - 参数对象
 * @returns {object} 转换后的参数对象
 */
function transformVolcengine3DParams(params) {
  const { content, subdivisionlevel, fileformat, ...rest } = params
  
  if (!content || !Array.isArray(content)) {
    return params
  }
  
  const newContent = [...content]
  
  if (subdivisionlevel || fileformat) {
    const textParts = []
    
    if (subdivisionlevel) {
      textParts.push(`--subdivisionlevel ${subdivisionlevel}`)
    }
    
    if (fileformat) {
      textParts.push(`--fileformat ${fileformat}`)
    }
    
    if (textParts.length > 0) {
      newContent.push({
        type: 'text',
        text: textParts.join(' ')
      })
    }
  }
  
  return {
    ...rest,
    content: newContent
  }
}

module.exports = {
  transform,
  transformString,
  transformNumber,
  transformBoolean,
  transformArray,
  transformObject,
  transformParams,
  toAPIFormat,
  transformVolcengine3DParams
}
