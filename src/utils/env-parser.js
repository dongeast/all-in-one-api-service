/**
 * 环境变量解析器
 * 用于解析AI_SERVICE_前缀的环境变量
 */

const ENV_PREFIX = 'AI_SERVICE_'

/**
 * 解析环境变量为配置对象
 * @param {string} prefix - 环境变量前缀
 * @returns {object} 解析后的配置对象
 */
function parseEnv(prefix = ENV_PREFIX) {
  const config = {}
  const env = process.env

  Object.keys(env).forEach(key => {
    if (key.startsWith(prefix)) {
      const configPath = key.slice(prefix.length).toLowerCase()
      const value = parseValue(env[key])
      setNestedValue(config, configPath, value)
    }
  })

  return config
}

/**
 * 解析环境变量值
 * @param {string} value - 环境变量值
 * @returns {any} 解析后的值
 */
function parseValue(value) {
  if (value === 'true' || value === 'TRUE') return true
  if (value === 'false' || value === 'FALSE') return false
  if (value === 'null' || value === 'NULL') return null
  if (value === 'undefined' || value === 'UNDEFINED') return undefined

  if (/^\d+$/.test(value)) return parseInt(value, 10)
  if (/^\d+\.\d+$/.test(value)) return parseFloat(value)

  if (value.startsWith('[') || value.startsWith('{')) {
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }

  return value
}

/**
 * 设置嵌套对象的值
 * @param {object} obj - 目标对象
 * @param {string} path - 路径（用下划线分隔）
 * @param {any} value - 值
 */
function setNestedValue(obj, path, value) {
  const keys = path.split('_')
  let current = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!(key in current)) {
      current[key] = {}
    }
    current = current[key]
  }

  current[keys[keys.length - 1]] = value
}

/**
 * 从.env文件加载环境变量
 * @param {string} filePath - .env文件路径
 * @returns {object} 加载的环境变量
 */
function loadEnvFile(filePath) {
  const fs = require('fs')
  const path = require('path')

  if (!fs.existsSync(filePath)) {
    return {}
  }

  const content = fs.readFileSync(filePath, 'utf-8')
  const env = {}

  content.split('\n').forEach(line => {
    line = line.trim()
    if (!line || line.startsWith('#')) return

    const equalIndex = line.indexOf('=')
    if (equalIndex === -1) return

    const key = line.slice(0, equalIndex).trim()
    let value = line.slice(equalIndex + 1).trim()

    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    env[key] = value
  })

  return env
}

/**
 * 获取服务商配置的环境变量
 * @param {string} provider - 服务商名称
 * @param {string} key - 配置键名
 * @param {string} prefix - 环境变量前缀
 * @returns {string|undefined} 环境变量值
 */
function getProviderEnv(provider, key, prefix = ENV_PREFIX) {
  const envKey = `${prefix}${provider.toUpperCase()}_${key.toUpperCase()}`
  return process.env[envKey]
}

module.exports = {
  ENV_PREFIX,
  parseEnv,
  parseValue,
  setNestedValue,
  loadEnvFile,
  getProviderEnv
}
