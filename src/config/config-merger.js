/**
 * 配置合并器
 * 用于合并多个配置源
 */

const { deepMerge, deepClone } = require('../utils/helpers')

/**
 * 配置合并器类
 */
class ConfigMerger {
  /**
   * 合并多个配置对象
   * @param {...object} configs - 配置对象列表
   * @returns {object} 合并后的配置
   */
  static merge(...configs) {
    return configs.reduce((result, config) => {
      if (!config) return result
      return deepMerge(result, config)
    }, {})
  }

  /**
   * 按优先级合并配置
   * @param {Array<{source: string, config: object}>} configList - 配置列表
   * @returns {object} 合并后的配置
   */
  static mergeByPriority(configList) {
    const sortedConfigs = configList.sort((a, b) => {
      const priority = {
        'presets': 0,
        'global': 1,
        'global-local': 2,
        'project': 3,
        'project-local': 4,
        'env': 5,
        'code': 6
      }
      return (priority[a.source] || 0) - (priority[b.source] || 0)
    })

    return ConfigMerger.merge(...sortedConfigs.map(item => item.config))
  }

  /**
   * 合并服务商配置
   * @param {object} baseConfig - 基础配置
   * @param {object} providerConfig - 服务商配置
   * @returns {object} 合并后的配置
   */
  static mergeProviderConfig(baseConfig, providerConfig) {
    if (!baseConfig.providers) {
      baseConfig.providers = {}
    }

    Object.keys(providerConfig).forEach(provider => {
      if (!baseConfig.providers[provider]) {
        baseConfig.providers[provider] = {}
      }
      baseConfig.providers[provider] = deepMerge(
        baseConfig.providers[provider],
        providerConfig[provider]
      )
    })

    return baseConfig
  }

  /**
   * 提取服务商配置
   * @param {object} config - 完整配置
   * @param {string} provider - 服务商名称
   * @returns {object} 服务商配置
   */
  static extractProviderConfig(config, provider) {
    if (!config || !config.providers || !config.providers[provider]) {
      return {}
    }
    return deepClone(config.providers[provider])
  }

  /**
   * 验证配置完整性
   * @param {object} config - 配置对象
   * @returns {{valid: boolean, errors: string[]}} 验证结果
   */
  static validate(config) {
    const errors = []

    if (!config) {
      errors.push('Config is null or undefined')
      return { valid: false, errors }
    }

    if (config.version && typeof config.version !== 'string') {
      errors.push('Config version must be a string')
    }

    if (config.providers) {
      if (typeof config.providers !== 'object') {
        errors.push('Providers must be an object')
      } else {
        Object.keys(config.providers).forEach(provider => {
          const providerConfig = config.providers[provider]
          if (typeof providerConfig !== 'object') {
            errors.push(`Provider ${provider} config must be an object`)
          }
        })
      }
    }

    if (config.logging) {
      if (config.logging.level) {
        const validLevels = ['debug', 'info', 'warn', 'error', 'silent']
        if (!validLevels.includes(config.logging.level.toLowerCase())) {
          errors.push(`Invalid log level: ${config.logging.level}`)
        }
      }
      if (config.logging.format) {
        const validFormats = ['json', 'text']
        if (!validFormats.includes(config.logging.format.toLowerCase())) {
          errors.push(`Invalid log format: ${config.logging.format}`)
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }

  /**
   * 导出配置为JSON格式
   * @param {object} config - 配置对象
   * @returns {string} JSON字符串
   */
  static exportJSON(config) {
    return JSON.stringify(config, null, 2)
  }

  /**
   * 导出配置为环境变量格式
   * @param {object} config - 配置对象
   * @param {string} prefix - 环境变量前缀
   * @returns {string} 环境变量格式字符串
   */
  static exportEnv(config, prefix = 'AI_SERVICE_') {
    const lines = []

    const flattenObject = (obj, currentPrefix = '') => {
      Object.keys(obj).forEach(key => {
        const value = obj[key]
        const envKey = currentPrefix + key.toUpperCase()

        if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
          flattenObject(value, envKey + '_')
        } else if (value !== undefined) {
          let envValue = value
          if (typeof value === 'object') {
            envValue = JSON.stringify(value)
          }
          lines.push(`${prefix}${envKey}=${envValue}`)
        }
      })
    }

    flattenObject(config)
    return lines.join('\n')
  }
}

module.exports = ConfigMerger
