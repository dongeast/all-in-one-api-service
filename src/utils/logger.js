/**
 * 日志工具
 * 支持多日志级别和多输出方式
 */

const fs = require('fs')
const path = require('path')
const { formatError } = require('./helpers')

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  SILENT: 4
}

const DEFAULT_OPTIONS = {
  level: 'INFO',
  format: 'json',
  output: ['console'],
  file: null,
  maxSize: 10 * 1024 * 1024,
  maxFiles: 5
}

/**
 * 日志类
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
    this.outputs = Array.isArray(this.options.output)
      ? this.options.output
      : [this.options.output]
    this.file = this.options.file
    this.maxSize = this.options.maxSize
    this.maxFiles = this.options.maxFiles
    this.currentFileSize = 0
    this.fileStream = null

    if (this.file && this.outputs.includes('file')) {
      this._initFileStream()
    }
  }

  /**
   * 初始化文件流
   * @private
   */
  _initFileStream() {
    const dir = path.dirname(this.file)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    if (fs.existsSync(this.file)) {
      const stats = fs.statSync(this.file)
      this.currentFileSize = stats.size
    }

    this.fileStream = fs.createWriteStream(this.file, { flags: 'a' })
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

    if (this.outputs.includes('console')) {
      const consoleMethod = level.toLowerCase()
      console[consoleMethod](formatted)
    }

    if (this.outputs.includes('file') && this.fileStream) {
      this._writeToFile(formatted + '\n')
    }
  }

  /**
   * 写入文件
   * @param {string} content - 日志内容
   * @private
   */
  _writeToFile(content) {
    const contentSize = Buffer.byteLength(content)

    if (this.currentFileSize + contentSize > this.maxSize) {
      this._rotateFile()
    }

    this.fileStream.write(content)
    this.currentFileSize += contentSize
  }

  /**
   * 日志文件轮转
   * @private
   */
  _rotateFile() {
    if (this.fileStream) {
      this.fileStream.end()
    }

    for (let i = this.maxFiles - 1; i > 0; i--) {
      const oldFile = `${this.file}.${i}`
      const newFile = `${this.file}.${i + 1}`

      if (fs.existsSync(oldFile)) {
        if (i === this.maxFiles - 1) {
          fs.unlinkSync(oldFile)
        } else {
          fs.renameSync(oldFile, newFile)
        }
      }
    }

    if (fs.existsSync(this.file)) {
      fs.renameSync(this.file, `${this.file}.1`)
    }

    this.currentFileSize = 0
    this._initFileStream()
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
    const errorData = error ? formatError(error) : null
    this._write('ERROR', message, errorData)
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
   * 关闭日志器
   */
  close() {
    if (this.fileStream) {
      this.fileStream.end()
      this.fileStream = null
    }
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
 * 从环境变量创建日志实例
 * @returns {Logger} 日志实例
 */
function createLoggerFromEnv() {
  const level = process.env.AI_SERVICE_LOG_LEVEL || 'INFO'
  const format = process.env.AI_SERVICE_LOG_FORMAT || 'json'
  const file = process.env.AI_SERVICE_LOG_FILE || null

  return createLogger({
    level,
    format,
    output: file ? ['console', 'file'] : ['console'],
    file
  })
}

module.exports = {
  Logger,
  LOG_LEVELS,
  createLogger,
  createLoggerFromEnv
}
