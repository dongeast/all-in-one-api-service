/**
 * 浏览器环境工具模块入口
 */

const cacheManager = require('../../src/utils/cache-manager')
const { parseEnv, loadEnvFile, getProviderEnv } = require('./env-parser')
const errorCodes = require('../../src/utils/error-codes')
const { formatError, formatSuccess, delay } = require('../../src/utils/helpers')
const { i18n, setLanguage, getLanguage, t } = require('../../src/utils/i18n')
const { createLogger, createLoggerFromEnv, Logger, LOG_LEVELS } = require('./logger')

module.exports = {
  cacheManager,
  parseEnv,
  loadEnvFile,
  getProviderEnv,
  errorCodes,
  formatError,
  formatSuccess,
  delay,
  i18n,
  setLanguage,
  getLanguage,
  t,
  createLogger,
  createLoggerFromEnv,
  Logger,
  LOG_LEVELS
}
