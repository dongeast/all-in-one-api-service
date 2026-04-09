/**
 * 浏览器环境日志工具
 * 在浏览器环境中，仅支持控制台输出
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  SILENT: 4
}

const DEFAULT_OPTIONS = {
  level: 'INFO',
  format: 'json'
}

/**
 * 浏览器环境日志类
 * 仅支持控制台输出
 */
class Logger {
  /**
   * 创建日志实例
   * @param {object} options - 日志配置选项
   */
  constructor(options = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options }
    this.level = LOG_LEVELS[this.options.level.toUpperCase()] ?? LOG_LEVELS.INFO
    this.format = this.options.format
  }

  /**
   * 格式化日志消息
   * @param {string} level - 日志级别
   * @param {string} message - 日志消息
   * @param {object} data - 附加数据
   * @returns {string} 格式化后的日志
   * @private
   */
  _formatMessage(level, message, data = null) {
    const timestamp = new Date().toISOString()

    if (this.format === 'json') {
      const logObj = {
        timestamp,
        level,
        message
      }
      if (data) {
        logObj.data = data
      }
      return JSON.stringify(logObj)
    }

    let formatted = `[${timestamp}] [${level}] ${message}`
    if (data) {
      formatted += ` ${typeof data === 'object' ? JSON.stringify(data) : data}`
    }
    return formatted
  }

  /**
   * 写入日志
   * @param {string} level - 日志级别
   * @param {string} message - 日志消息
   * @param {object} data - 附加数据
   * @private
   */
  _write(level, message, data) {
    const levelNum = LOG_LEVELS[level]
    if (levelNum < this.level) return

    const formatted = this._formatMessage(level, message, data)
    const consoleMethod = level.toLowerCase()
    console[consoleMethod](formatted)
  }

  /**
   * 记录调试日志
   * @param {string} message - 日志消息
   * @param {object} data - 附加数据
   */
  debug(message, data = null) {
    this._write('DEBUG', message, data)
  }

  /**
   * 记录信息日志
   * @param {string} message - 日志消息
   * @param {object} data - 附加数据
   */
  info(message, data = null) {
    this._write('INFO', message, data)
  }

  /**
   * 记录警告日志
   * @param {string} message - 日志消息
   * @param {object} data - 附加数据
   */
  warn(message, data = null) {
    this._write('WARN', message, data)
  }

  /**
   * 记录错误日志
   * @param {string} message - 日志消息
   * @param {Error|object} error - 错误对象
   */
  error(message, error = null) {
    const errorData = error ? this._formatError(error) : null
    this._write('ERROR', message, errorData)
  }

  /**
   * 格式化错误对象
   * @param {Error|object} error - 错误对象
   * @returns {object} 格式化后的错误信息
   * @private
   */
  _formatError(error) {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: error.stack
      }
    }
    return error
  }

  /**
   * 创建子日志器
   * @param {string} name - 子日志器名称
   * @returns {Logger} 子日志器实例
   */
  child(name) {
    const childLogger = new Logger(this.options)
    const originalWrite = childLogger._write.bind(childLogger)

    childLogger._write = (level, message, data) => {
      originalWrite(level, `[${name}] ${message}`, data)
    }

    return childLogger
  }

  /**
   * 关闭日志器（浏览器环境无需操作）
   */
  close() {
    // 浏览器环境无需操作
  }
}

/**
 * 创建日志实例
 * @param {object} options - 日志配置选项
 * @returns {Logger} 日志实例
 */
function createLogger(options = {}) {
  return new Logger(options)
}

/**
 * 从环境变量创建日志实例（浏览器环境）
 * @returns {Logger} 日志实例
 */
function createLoggerFromEnv() {
  let level = 'INFO'
  let format = 'json'

  if (typeof window !== 'undefined' && window.__AI_SERVICE_ENV__) {
    level = window.__AI_SERVICE_ENV__.AI_SERVICE_LOG_LEVEL || 'INFO'
    format = window.__AI_SERVICE_ENV__.AI_SERVICE_LOG_FORMAT || 'json'
  }

  return createLogger({
    level,
    format
  })
}

module.exports = {
  Logger,
  LOG_LEVELS,
  createLogger,
  createLoggerFromEnv
}
