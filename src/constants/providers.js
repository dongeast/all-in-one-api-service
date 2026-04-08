/**
 * Provider 常量定义
 */

const Providers = {
  LTX: 'ltx',
  VOLCENGINE: 'volcengine',
  SKYREELS: 'skyreels',
  MUREKA: 'mureka'
}

/**
 * Provider 优先级配置
 * 数值越大优先级越高
 * 当不同 Provider 提供相同 ID 的模型时，优先使用优先级高的 Provider
 */
const ProviderPriority = {
  [Providers.LTX]: 100,
  [Providers.VOLCENGINE]: 90,
  [Providers.SKYREELS]: 80,
  [Providers.MUREKA]: 70
}

/**
 * Provider 元数据
 */
const ProviderMeta = {
  [Providers.LTX]: {
    name: 'ltx',
    displayName: 'LTX',
    description: 'LTX 视频生成平台',
    region: 'global',
    website: 'https://ltx.video',
    supportedTypes: ['video']
  },
  [Providers.VOLCENGINE]: {
    name: 'volcengine',
    displayName: '火山引擎',
    description: '字节跳动火山引擎 AI 服务',
    region: 'china',
    website: 'https://www.volcengine.com',
    supportedTypes: ['image', 'video', '3d']
  },
  [Providers.SKYREELS]: {
    name: 'skyreels',
    displayName: 'Skyreels',
    description: 'Skyreels 视频生成平台',
    region: 'global',
    website: 'https://skyreels.ai',
    supportedTypes: ['video', 'avatar']
  },
  [Providers.MUREKA]: {
    name: 'mureka',
    displayName: 'Mureka',
    description: 'Mureka 音乐生成平台',
    region: 'global',
    website: 'https://mureka.ai',
    supportedTypes: ['audio', 'music']
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
