/**
 * 辅助函数工具集
 */

/**
 * 深度合并对象
 * @param {object} target - 目标对象
 * @param {object} source - 源对象
 * @returns {object} 合并后的对象
 */
function deepMerge(target, source) {
  if (!source) return target
  if (!target) return source

  const result = { ...target }

  Object.keys(source).forEach(key => {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key], source[key])
    } else {
      result[key] = source[key]
    }
  })

  return result
}

/**
 * 深度克隆对象
 * @param {any} obj - 要克隆的对象
 * @returns {any} 克隆后的对象
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item))
  }

  const cloned = {}
  Object.keys(obj).forEach(key => {
    cloned[key] = deepClone(obj[key])
  })

  return cloned
}

/**
 * 根据路径获取对象值
 * @param {object} obj - 目标对象
 * @param {string} path - 路径（支持点号和数组索引）
 * @param {any} defaultValue - 默认值
 * @returns {any} 获取的值
 */
function getValueByPath(obj, path, defaultValue = undefined) {
  if (!obj || !path) return defaultValue

  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  let current = obj

  for (const key of keys) {
    if (current === null || current === undefined) {
      return defaultValue
    }
    current = current[key]
  }

  return current === undefined ? defaultValue : current
}

/**
 * 根据路径设置对象值
 * @param {object} obj - 目标对象
 * @param {string} path - 路径
 * @param {any} value - 值
 */
function setValueByPath(obj, path, value) {
  if (!obj || !path) return

  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  let current = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!(key in current)) {
      current[key] = /^\d+$/.test(keys[i + 1]) ? [] : {}
    }
    current = current[key]
  }

  current[keys[keys.length - 1]] = value
}

/**
 * 生成唯一ID
 * @param {string} prefix - ID前缀
 * @returns {string} 唯一ID
 */
function generateId(prefix = '') {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).slice(2, 8)
  return prefix ? `${prefix}_${timestamp}${random}` : `${timestamp}${random}`
}

/**
 * 延迟执行
 * @param {number} ms - 延迟毫秒数
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 重试函数
 * @param {Function} fn - 要重试的函数
 * @param {object} options - 重试选项
 * @returns {Promise<any>} 函数执行结果
 */
async function retry(fn, options = {}) {
  const {
    maxRetries = 3,
    delay = 1000,
    backoff = 2,
    shouldRetry = () => true
  } = options

  let lastError

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error

      if (!shouldRetry(error) || attempt === maxRetries - 1) {
        throw error
      }

      const waitTime = delay * Math.pow(backoff, attempt)
      await sleep(waitTime)
    }
  }

  throw lastError
}

/**
 * 检查是否为空值
 * @param {any} value - 要检查的值
 * @returns {boolean} 是否为空
 */
function isEmpty(value) {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * 格式化错误信息
 * @param {Error|string} error - 错误对象或消息
 * @returns {object} 格式化后的错误对象
 */
function formatError(error) {
  if (typeof error === 'string') {
    return {
      code: 'UNKNOWN_ERROR',
      message: error
    }
  }

  if (error instanceof Error) {
    return {
      code: error.code || 'UNKNOWN_ERROR',
      message: error.message,
      details: error.stack
    }
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: String(error),
    details: error
  }
}

/**
 * 转换为驼峰命名
 * @param {string} str - 字符串
 * @returns {string} 驼峰命名字符串
 */
function toCamelCase(str) {
  return str
    .toLowerCase()
    .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
}

/**
 * 转换为短横线命名
 * @param {string} str - 字符串
 * @returns {string} 短横线命名字符串
 */
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

/**
 * 转换为下划线命名
 * @param {string} str - 字符串
 * @returns {string} 下划线命名字符串
 */
function toSnakeCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toUpperCase()
}

module.exports = {
  deepMerge,
  deepClone,
  getValueByPath,
  setValueByPath,
  generateId,
  sleep,
  retry,
  isEmpty,
  formatError,
  toCamelCase,
  toKebabCase,
  toSnakeCase
}
