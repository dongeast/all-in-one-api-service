/**
 * Provider 常量定义
 */

const Providers = {
  LIGHTRICKS: 'lightricks',
  SKYWORK: 'skywork',
  VOLCENGINE: 'volcengine'
}

/**
 * Provider 优先级配置
 * 数值越大优先级越高
 * 当不同 Provider 提供相同 ID 的模型时，优先使用优先级高的 Provider
 */
const ProviderPriority = {
  [Providers.LIGHTRICKS]: 100,
  [Providers.SKYWORK]: 90,
  [Providers.VOLCENGINE]: 80
}

/**
 * Provider 元数据
 */
const ProviderMeta = {
  [Providers.LIGHTRICKS]: {
    name: 'lightricks',
    displayName: 'Lightricks',
    description: 'Lightricks - Creator of LTX Studio',
    region: 'global',
    website: 'https://ltx.video',
    supportedTypes: ['video'],
    logo: 'lightricks.svg'
  },
  [Providers.SKYWORK]: {
    name: 'skywork',
    displayName: 'Skywork AI',
    description: 'Skywork AI - Creator of Skyreels and Mureka',
    region: 'global',
    website: 'https://skyreels.ai',
    supportedTypes: ['video', 'audio', 'music'],
    logo: 'skywork.svg'
  },
  [Providers.VOLCENGINE]: {
    name: 'volcengine',
    displayName: 'Volcengine Seed AI',
    description: 'Bytedance Volcengine Seed AI',
    region: 'china',
    website: 'https://www.volcengine.com',
    supportedTypes: ['image', 'video', '3d'],
    logo: 'volcengine.svg'
  }
}

/**
 * 获取 Provider 优先级
 * @param {string} provider - Provider 名称
 * @returns {number} 优先级数值
 */
function getProviderPriority(provider) {
  return ProviderPriority[provider] || 0
}

/**
 * 根据 Provider 优先级排序
 * @param {Array} items - 包含 provider 字段的对象数组
 * @returns {Array} 排序后的数组
 */
function sortByProviderPriority(items) {
  return items.sort((a, b) => {
    const priorityA = getProviderPriority(a.provider)
    const priorityB = getProviderPriority(b.provider)
    return priorityB - priorityA
  })
}

/**
 * 获取最高优先级的 Provider
 * @param {Array} providers - Provider 名称数组
 * @returns {string} 最高优先级的 Provider
 */
function getHighestPriorityProvider(providers) {
  if (!providers || providers.length === 0) return null
  
  return providers.reduce((highest, current) => {
    const highestPriority = getProviderPriority(highest)
    const currentPriority = getProviderPriority(current)
    return currentPriority > highestPriority ? current : highest
  })
}

module.exports = {
  Providers,
  ProviderPriority,
  ProviderMeta,
  getProviderPriority,
  sortByProviderPriority,
  getHighestPriorityProvider
}
