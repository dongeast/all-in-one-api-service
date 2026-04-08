/**
 * 配置加载器
 * 用于从多个源加载配置
 */

const fs = require('fs')
const path = require('path')
const { parseEnv, loadEnvFile } = require('../utils/env-parser')

/**
 * 配置加载器类
 */
class ConfigLoader {
  /**
   * 创建配置加载器实例
   * @param {object} options - 加载选项
   */
  constructor(options = {}) {
    this.projectPath = options.projectPath || process.cwd()
    this.globalPath = options.globalPath || require('os').homedir()
    this.envPrefix = options.envPrefix || 'AI_SERVICE_'
    this.configDir = options.configDir || '.ai-service'
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

    const globalConfig = this.loadGlobalConfig()
    if (globalConfig) {
      configs.push({ source: 'global', config: globalConfig })
    }

    const globalLocalConfig = this.loadGlobalLocalConfig()
    if (globalLocalConfig) {
      configs.push({ source: 'global-local', config: globalLocalConfig })
    }

    const projectConfig = this.loadProjectConfig()
    if (projectConfig) {
      configs.push({ source: 'project', config: projectConfig })
    }

    const projectLocalConfig = this.loadProjectLocalConfig()
    if (projectLocalConfig) {
      configs.push({ source: 'project-local', config: projectLocalConfig })
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
      return require('./presets')
    } catch (error) {
      return null
    }
  }

  /**
   * 加载全局配置
   * @returns {object|null} 全局配置
   */
  loadGlobalConfig() {
    return this.loadConfigFile(
      path.join(this.globalPath, this.configDir, 'config.json')
    )
  }

  /**
   * 加载全局本地配置
   * @returns {object|null} 全局本地配置
   */
  loadGlobalLocalConfig() {
    return this.loadConfigFile(
      path.join(this.globalPath, this.configDir, 'config.local.json')
    )
  }

  /**
   * 加载项目配置
   * @returns {object|null} 项目配置
   */
  loadProjectConfig() {
    return this.loadConfigFile(
      path.join(this.projectPath, this.configDir, 'config.json')
    )
  }

  /**
   * 加载项目本地配置
   * @returns {object|null} 项目本地配置
   */
  loadProjectLocalConfig() {
    return this.loadConfigFile(
      path.join(this.projectPath, this.configDir, 'config.local.json')
    )
  }

  /**
   * 加载环境变量配置
   * @returns {object} 环境变量配置
   */
  loadEnvConfig() {
    this.loadDotEnv()
    return parseEnv(this.envPrefix)
  }

  /**
   * 加载.env文件
   */
  loadDotEnv() {
    const envPaths = [
      path.join(this.projectPath, '.env'),
      path.join(this.projectPath, '.env.local')
    ]

    envPaths.forEach(envPath => {
      if (fs.existsSync(envPath)) {
        const env = loadEnvFile(envPath)
        Object.keys(env).forEach(key => {
          if (!process.env[key]) {
            process.env[key] = env[key]
          }
        })
      }
    })
  }

  /**
   * 加载配置文件
   * @param {string} filePath - 配置文件路径
   * @returns {object|null} 配置对象
   */
  loadConfigFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8')
        return JSON.parse(content)
      }
    } catch (error) {
      console.warn(`Failed to load config file: ${filePath}`, error.message)
    }
    return null
  }

  /**
   * 检查配置文件是否存在
   * @param {string} type - 配置类型 (global/project)
   * @returns {boolean} 是否存在
   */
  hasConfig(type) {
    let configPath
    switch (type) {
      case 'global':
        configPath = path.join(this.globalPath, this.configDir, 'config.json')
        break
      case 'global-local':
        configPath = path.join(this.globalPath, this.configDir, 'config.local.json')
        break
      case 'project':
        configPath = path.join(this.projectPath, this.configDir, 'config.json')
        break
      case 'project-local':
        configPath = path.join(this.projectPath, this.configDir, 'config.local.json')
        break
      default:
        return false
    }
    return fs.existsSync(configPath)
  }
}

module.exports = ConfigLoader
