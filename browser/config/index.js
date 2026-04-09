/**
 * 浏览器环境配置模块入口
 */

const { ConfigManager, getConfigManager, resetConfigManager } = require('./config-manager')
const ConfigLoader = require('./config-loader')
const ConfigMerger = require('../../src/config/config-merger')

module.exports = {
  ConfigManager,
  ConfigLoader,
  ConfigMerger,
  getConfigManager,
  resetConfigManager
}
