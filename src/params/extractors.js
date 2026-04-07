/**
 * 输出结果提取器
 * 用于从API响应中提取标准化结果
 */

const { getValueByPath } = require('../utils/helpers')

/**
 * 提取字段值
 * @param {any} response - 原始响应
 * @param {object} fieldSchema - 字段模式
 * @returns {any} 提取的值
 */
function extractField(response, fieldSchema) {
  if (!fieldSchema || !fieldSchema.path) {
    return null
  }

  let value = getValueByPath(response, fieldSchema.path, fieldSchema.default)

  if (value === undefined || value === null) {
    return fieldSchema.default
  }

  if (fieldSchema.transform && typeof fieldSchema.transform === 'function') {
    value = fieldSchema.transform(value)
  }

  return value
}

/**
 * 提取嵌套对象
 * @param {any} response - 原始响应
 * @param {object} fieldSchema - 字段模式
 * @returns {object} 提取的对象
 */
function extractNestedObject(response, fieldSchema) {
  if (!fieldSchema.fields) {
    return extractField(response, fieldSchema)
  }

  const result = {}

  for (const [subKey, subSchema] of Object.entries(fieldSchema.fields)) {
    result[subKey] = extractField(response, subSchema)
  }

  return result
}

/**
 * 提取数组字段
 * @param {any} response - 原始响应
 * @param {object} fieldSchema - 字段模式
 * @returns {array} 提取的数组
 */
function extractArrayField(response, fieldSchema) {
  const arrayPath = fieldSchema.path
  const itemSchema = fieldSchema.itemSchema

  let array = getValueByPath(response, arrayPath, [])

  if (!Array.isArray(array)) {
    array = [array]
  }

  if (itemSchema) {
    array = array.map((item, index) => {
      if (itemSchema.path) {
        return getValueByPath(item, itemSchema.path, itemSchema.default)
      }
      if (itemSchema.fields) {
        const result = {}
        for (const [subKey, subSchema] of Object.entries(itemSchema.fields)) {
          result[subKey] = getValueByPath(item, subSchema.path, subSchema.default)
        }
        return result
      }
      return item
    })
  }

  return array
}

/**
 * 提取输出结果
 * @param {any} response - 原始响应
 * @param {object} schema - 输出模式定义
 * @returns {object} 提取的结果
 */
function extractOutput(response, schema) {
  if (!schema || !schema.output) {
    return response
  }

  const result = {}
  const outputSchema = schema.output

  for (const [key, fieldSchema] of Object.entries(outputSchema)) {
    if (fieldSchema.type === 'array') {
      result[key] = extractArrayField(response, fieldSchema)
    } else if (fieldSchema.type === 'object' && fieldSchema.fields) {
      result[key] = extractNestedObject(response, fieldSchema)
    } else {
      result[key] = extractField(response, fieldSchema)
    }
  }

  return result
}

/**
 * 提取单个字段值
 * @param {any} response - 原始响应
 * @param {string} fieldName - 字段名
 * @param {object} schema - 输出模式定义
 * @returns {any} 提取的值
 */
function extractSingleField(response, fieldName, schema) {
  if (!schema || !schema.output || !schema.output[fieldName]) {
    return null
  }

  const fieldSchema = schema.output[fieldName]

  if (fieldSchema.type === 'array') {
    return extractArrayField(response, fieldSchema)
  } else if (fieldSchema.type === 'object' && fieldSchema.fields) {
    return extractNestedObject(response, fieldSchema)
  }

  return extractField(response, fieldSchema)
}

/**
 * 批量提取字段
 * @param {any} response - 原始响应
 * @param {string[]} fieldNames - 字段名列表
 * @param {object} schema - 输出模式定义
 * @returns {object} 提取的结果
 */
function extractFields(response, fieldNames, schema) {
  const result = {}

  for (const fieldName of fieldNames) {
    result[fieldName] = extractSingleField(response, fieldName, schema)
  }

  return result
}

module.exports = {
  extractField,
  extractNestedObject,
  extractArrayField,
  extractOutput,
  extractSingleField,
  extractFields
}
