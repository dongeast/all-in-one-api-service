/**
 * 配置管理器
 * 统一管理配置加载、合并、验证
 */

const ConfigLoader = require('./config-loader')
const ConfigMerger = require('./config-merger')
const { deepMerge, deepClone, getValueByPath, setValueByPath } = require('../utils/helpers')
const { createLogger } = require('../utils/logger')

/**
 * 配置管理器类
 */
class ConfigManager {
  /**
   * 创建配置管理器实例
   * @param {object} options - 配置选项
   */
  constructor(options = {}) {
    this.options = {
      projectPath: options.projectPath || process.cwd(),
      globalPath: options.globalPath || require('os').homedir(),
      envPrefix: options.envPrefix || 'AI_SERVICE_',
      configDir: options.configDir || '.ai-service'
    }

    this.loader = new ConfigLoader(this.options)
    this.logger = options.logger || createLogger({ level: 'INFO' })
    this.config = null
    this.codeConfig = null
  }

  /**
   * 加载所有配置
   * @returns {Promise<object>} 合并后的配置
   */
  async load() {
    const configs = await this.loader.loadAll()

    if (this.codeConfig) {
      configs.push({ source: 'code', config: this.codeConfig })
    }

    this.config = ConfigMerger.mergeByPriority(configs)

    const validation = this.validate(this.config)
    if (!validation.valid) {
      this.logger.warn('Config validation failed', { errors: validation.errors })
    }

    this.logger.debug('Config loaded', {
      sources: configs.map(c => c.source)
    })

    return this.config
  }

  /**
   * 获取服务商配置
   * @param {string} provider - 服务商名称
   * @returns {object} 服务商配置
   */
  async getProviderConfig(provider) {
    if (!this.config) {
      this.logger.debug('Config not loaded, loading now...')
      await this.load()
    }

    return ConfigMerger.extractProviderConfig(this.config, provider)
  }

  /**
   * 获取全局配置
   * @returns {object} 全局配置
   */
  getGlobalConfig() {
    if (!this.config) {
      this.logger.warn('Config not loaded, call load() first')
      return {}
    }

    const { providers: _providers, ...globalConfig } = this.config
    return globalConfig
  }

  /**
   * 设置配置（运行时）
   * @param {string} path - 配置路径
   * @param {any} value - 配置值
   */
  set(path, value) {
    if (!this.config) {
      this.config = {}
    }
    setValueByPath(this.config, path, value)
  }

  /**
   * 获取配置值
   * @param {string} path - 配置路径
   * @param {any} defaultValue - 默认值
   * @returns {any} 配置值
   */
  get(path, defaultValue = undefined) {
    if (!this.config) {
      return defaultValue
    }
    return getValueByPath(this.config, path, defaultValue)
  }

  /**
   * 合并配置
   * @param {object} override - 覆盖配置
   * @returns {object} 合并后的配置
   */
  merge(override) {
    if (!this.config) {
      this.config = override
    } else {
      this.config = deepMerge(this.config, override)
    }
    return this.config
  }

  /**
   * 设置代码级配置（最高优先级）
   * @param {object} config - 配置对象
   */
  setCodeConfig(config) {
    this.codeConfig = config
  }

  /**
   * 验证配置
   * @param {object} config - 配置对象
   * @returns {{valid: boolean, errors: string[]}} 验证结果
   */
  validate(config) {
    return ConfigMerger.validate(config)
  }

  /**
   * 重置为默认配置
   */
  reset() {
    this.config = null
    this.codeConfig = null
  }

  /**
   * 导出当前配置
   * @param {string} format - 导出格式 (json, env)
   * @returns {string} 导出的配置字符串
   */
  export(format = 'json') {
    if (!this.config) {
      return format === 'json' ? '{}' : ''
    }

    switch (format) {
    case 'json':
      return ConfigMerger.exportJSON(this.config)
    case 'env':
      return ConfigMerger.exportEnv(this.config, this.options.envPrefix)
    default:
      return ConfigMerger.exportJSON(this.config)
    }
  }

  /**
   * 获取所有可用的服务商列表
   * @returns {string[]} 服务商列表
   */
  getAvailableProviders() {
    if (!this.config || !this.config.providers) {
      return []
    }
    return Object.keys(this.config.providers)
  }

  /**
   * 检查服务商是否已配置
   * @param {string} provider - 服务商名称
   * @returns {boolean} 是否已配置
   */
  hasProviderConfig(provider) {
    if (!this.config || !this.config.providers) {
      return false
    }
    const providerConfig = this.config.providers[provider]
    if (!providerConfig) {
      return false
    }
    return !!(providerConfig.apiKey || providerConfig.apiToken)
  }

  /**
   * 克隆当前配置
   * @returns {object} 配置副本
   */
  clone() {
    return deepClone(this.config)
  }
}

let defaultInstance = null

/**
 * 获取默认配置管理器实例
 * @param {object} options - 配置选项
 * @returns {ConfigManager} 配置管理器实例
 */
function getConfigManager(options = {}) {
  if (!defaultInstance) {
    defaultInstance = new ConfigManager(options)
  }
  return defaultInstance
}

/**
 * 重置默认配置管理器
 */
function resetConfigManager() {
  if (defaultInstance) {
    defaultInstance.reset()
  }
  defaultInstance = null
}

module.exports = {
  ConfigManager,
  getConfigManager,
  resetConfigManager
}
