/**
 * 浏览器环境配置加载器
 * 在浏览器环境中，文件系统操作不可用，提供空实现
 */

const presetConfigs = {
  skyreels: require('../../src/config/presets/skyreels'),
  ltx: require('../../src/config/presets/ltx'),
  volcengine: require('../../src/config/presets/volcengine'),
  mureka: require('../../src/config/presets/mureka')
}

/**
 * 浏览器环境配置加载器类
 * 在浏览器环境中，文件系统操作不可用，仅提供预设配置和环境变量支持
 */
class ConfigLoader {
  /**
   * 创建配置加载器实例
   * @param {object} options - 加载选项
   */
  constructor(options = {}) {
    this.envPrefix = options.envPrefix || 'AI_SERVICE_'
  }

  /**
   * 加载所有配置源
   * @returns {Promise<object>} 合并后的配置
   */
  async loadAll() {
    const configs = []

    const presetConfig = this.loadPresets()
    if (presetConfig) {
      configs.push({ source: 'presets', config: presetConfig })
    }

    const envConfig = this.loadEnvConfig()
    if (envConfig && Object.keys(envConfig).length > 0) {
      configs.push({ source: 'env', config: envConfig })
    }

    return configs
  }

  /**
   * 加载预设配置
   * @returns {object|null} 预设配置
   */
  loadPresets() {
    try {
      return {
        version: '1.0',
        defaultProvider: 'ltx',
        providers: presetConfigs,
        logging: {
          level: 'info',
          format: 'json'
        }
      }
    } catch (error) {
      return null
    }
  }

  /**
   * 加载环境变量配置
   * @returns {object} 环境变量配置
   */
  loadEnvConfig() {
    const config = {}
    const prefix = this.envPrefix

    if (typeof window !== 'undefined' && window.__AI_SERVICE_CONFIG__) {
      return window.__AI_SERVICE_CONFIG__
    }

    return config
  }

  /**
   * 加载配置文件（浏览器环境不支持）
   * @param {string} filePath - 配置文件路径
   * @returns {object|null} 配置对象
   */
  loadConfigFile(filePath) {
    console.warn('ConfigLoader.loadConfigFile is not supported in browser environment')
    return null
  }

  /**
   * 检查配置文件是否存在（浏览器环境不支持）
   * @param {string} type - 配置类型
   * @returns {boolean} 是否存在
   */
  hasConfig(type) {
    return false
  }
}

module.exports = ConfigLoader
