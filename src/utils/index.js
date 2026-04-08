/**
 * 工具模块入口
 */

const envParser = require('./env-parser')
const helpers = require('./helpers')
const logger = require('./logger')
const errorCodes = require('./error-codes')
const fetchPolyfill = require('./fetch-polyfill')
const streamHandler = require('./stream-handler')
const { setLanguage, getLanguage, t } = require('./i18n')
const metadataI18n = require('./metadata-i18n')

module.exports = {
  ...envParser,
  ...helpers,
  ...logger,
  errorCodes,
  ...fetchPolyfill,
  ...streamHandler,
  setLanguage,
  getLanguage,
  t,
  ...metadataI18n
}
