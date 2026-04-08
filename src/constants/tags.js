/**
 * 模型标签枚举
 */
const ModelTags = {
  // 质量标签
  HIGH_QUALITY: 'high_quality',
  FAST: 'fast',
  PREMIUM: 'premium',
  LITE: 'lite',

  // 功能标签
  STREAMING: 'streaming',
  HD: 'hd',
  MULTI_MODAL: 'multi_modal',

  // 状态标签
  BETA: 'beta',
  DEPRECATED: 'deprecated',
  STABLE: 'stable',

  // 业务标签
  RECOMMENDED: 'recommended',
  POPULAR: 'popular'
}

/**
 * 接口标签枚举
 */
const APITags = {
  // 功能标签
  ASYNC: 'async',
  STREAMING: 'streaming',
  BATCH: 'batch',

  // 性能标签
  HIGH_THROUGHPUT: 'high_throughput',
  LOW_LATENCY: 'low_latency',

  // 状态标签
  STABLE: 'stable',
  BETA: 'beta',
  DEPRECATED: 'deprecated'
}

/**
 * Provider标签枚举
 */
const ProviderTags = {
  // 服务商特性
  OFFICIAL: 'official',
  THIRD_PARTY: 'third_party',
  CHINA_REGION: 'china_region',
  GLOBAL_REGION: 'global_region'
}

module.exports = {
  ModelTags,
  APITags,
  ProviderTags
}
