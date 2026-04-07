/**
 * 自定义服务模板
 */

const BaseService = require('./base-service')

/**
 * 自定义服务类
 */
class CustomService extends BaseService {
  /**
   * 创建自定义服务实例
   * @param {object} config - 服务配置
   */
  constructor(config = {}) {
    super(config)
    this.providerName = config.name || 'custom'
  }

  /**
   * 初始化服务
   * @returns {Promise<void>}
   */
  async initialize() {
    if (this.initialized) {
      return
    }

    if (!this.config.apiKey && !this.config.skipConfigLoad) {
      const configManager = require('../config').getConfigManager()
      const providerConfig = configManager.getProviderConfig(this.providerName)
      this.config = BaseService.mergeConfig(providerConfig, this.config)
    }

    await super.initialize()
  }
}

module.exports = CustomService
