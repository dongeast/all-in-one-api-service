/**
 * 辅助函数工具集
 */

/**
 * 深度合并对象
 * @param target - 目标对象
 * @param source - 源对象
 * @returns 合并后的对象
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  if (!source) return target
  if (!target) return source as T

  const result = { ...target }

  Object.keys(source).forEach(key => {
    const sourceValue = source[key as keyof T]
    const targetValue = result[key as keyof T]
    
    if (sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue)) {
      result[key as keyof T] = deepMerge(
        targetValue as Record<string, any>,
        sourceValue as Record<string, any>
      ) as T[keyof T]
    } else {
      result[key as keyof T] = sourceValue as T[keyof T]
    }
  })

  return result
}

/**
 * 深度克隆对象
 * @param obj - 要克隆的对象
 * @returns 克隆后的对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T
  }

  const cloned = {} as T
  Object.keys(obj).forEach(key => {
    cloned[key as keyof T] = deepClone(obj[key as keyof T])
  })

  return cloned
}

/**
 * 根据路径获取对象值
 * @param obj - 目标对象
 * @param path - 路径(支持点号和数组索引)
 * @param defaultValue - 默认值
 * @returns 获取的值
 */
export function getValueByPath<T = any>(
  obj: Record<string, any>,
  path: string,
  defaultValue?: T
): T | undefined {
  if (!obj || !path) return defaultValue

  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  let current: any = obj

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
 * @param obj - 目标对象
 * @param path - 路径
 * @param value - 值
 */
export function setValueByPath(
  obj: Record<string, any>,
  path: string,
  value: any
): void {
  if (!obj || !path) return

  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  let current: any = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!key) continue
    
    if (!(key in current)) {
      const nextKey = keys[i + 1]
      current[key] = nextKey && /^\d+$/.test(nextKey) ? [] : {}
    }
    current = current[key]
  }

  const lastKey = keys[keys.length - 1]
  if (lastKey) {
    current[lastKey] = value
  }
}

/**
 * 生成唯一ID
 * @param prefix - ID前缀
 * @returns 唯一ID
 */
export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).slice(2, 8)
  return prefix ? `${prefix}_${timestamp}${random}` : `${timestamp}${random}`
}

/**
 * 延迟执行
 * @param ms - 延迟毫秒数
 * @returns Promise
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 重试选项
 */
export interface RetryOptions {
  maxRetries?: number
  delay?: number
  backoff?: number
  shouldRetry?: (error: Error) => boolean
}

/**
 * 重试函数
 * @param fn - 要重试的函数
 * @param options - 重试选项
 * @returns 函数执行结果
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    delay = 1000,
    backoff = 2,
    shouldRetry = () => true
  } = options

  let lastError: Error | undefined

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error: any) {
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
 * @param value - 要检查的值
 * @returns 是否为空
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * 格式化错误信息
 * @param error - 错误对象或消息
 * @returns 格式化后的错误对象
 */
export function formatError(error: Error | string | any): {
  code: string
  message: string
  details?: any
} {
  if (typeof error === 'string') {
    return {
      code: 'UNKNOWN_ERROR',
      message: error
    }
  }

  if (error instanceof Error) {
    return {
      code: (error as any).code || 'UNKNOWN_ERROR',
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
 * @param str - 字符串
 * @returns 驼峰命名字符串
 */
export function toCamelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
}

/**
 * 转换为短横线命名
 * @param str - 字符串
 * @returns 短横线命名字符串
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

/**
 * 转换为下划线命名
 * @param str - 字符串
 * @returns 下划线命名字符串
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toLowerCase()
}
