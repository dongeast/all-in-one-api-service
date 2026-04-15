/**
 * 积分计算相关常量定义
 */

/**
 * 积分计算类型
 */
const CreditCalculationType = {
  FIXED: 'fixed',
  FORMULA: 'formula',
  TIERED: 'tiered',
  DYNAMIC: 'dynamic'
}

/**
 * 积分因子类型
 */
const CreditFactors = {
  MODEL: 'model',
  DURATION: 'duration',
  RESOLUTION: 'resolution',
  FPS: 'fps',
  QUALITY: 'quality',
  SIZE: 'size',
  STEPS: 'steps',
  FRAMES: 'frames'
}

/**
 * 积分层级
 */
const CreditTier = {
  FREE: 'free',
  BASIC: 'basic',
  STANDARD: 'standard',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise'
}

/**
 * 默认基础积分消耗
 */
const DefaultBaseCredits = {
  TEXT_TO_IMAGE: 4,
  IMAGE_TO_IMAGE: 6,
  TEXT_TO_VIDEO: 6,
  IMAGE_TO_VIDEO: 8,
  VIDEO_TO_VIDEO: 10,
  TEXT_TO_AUDIO: 5,
  TEXT_TO_MUSIC: 10,
  IMAGE_TO_3D: 8
}

/**
 * 模型积分倍率
 */
const ModelCreditMultipliers = {
  volcengine: {
    'doubao-seedance-2-0-260128': 1.5,
    'doubao-seedance-2-0-fast-260128': 1.2,
    'doubao-seedance-1-5-pro-251215': 1.3,
    'doubao-seedance-1-0-pro-250528': 1.0,
    'doubao-seedance-1-0-pro-fast-251015': 0.8,
    'doubao-seedance-1-0-lite-t2v-250428': 0.6,
    'doubao-seedream-5-0-260128': 1.0,
    'doubao-seedream-4-5-251128': 1.2,
    'doubao-seedream-4-0-250828': 0.9,
    'doubao-seedream-3-0-t2i-250415': 0.7,
    'doubao-seed3d-1-0-250928': 1.5
  },
  ltx: {
    'ltx-video-1.0': 1.0
  },
  skyreels: {
    'skyreels-v4': 1.3,
    'skyreels-v3': 1.0,
    'skyreels-avatar': 1.5
  },
  mureka: {
    'mureka-song-v1': 1.0,
    'mureka-instrumental-v1': 0.8,
    'mureka-tts-v1': 0.5
  }
}

/**
 * 分辨率积分倍率
 */
const ResolutionCreditMultipliers = {
  '480p': 0.8,
  '720p': 1.0,
  '1080p': 1.5,
  '2K': 2.0,
  '4K': 3.0
}

/**
 * 时长积分因子（每秒积分）
 */
const DurationCreditFactor = {
  VIDEO: 0.5,
  AUDIO: 0.3
}

/**
 * 质量积分倍率
 */
const QualityCreditMultipliers = {
  low: 0.7,
  standard: 1.0,
  high: 1.3,
  premium: 1.6
}

/**
 * 积分计算配置示例
 */
const CreditConfigExamples = {
  fixed: {
    type: CreditCalculationType.FIXED,
    baseCost: 10,
    description: '固定积分消耗'
  },
  
  formula: {
    type: CreditCalculationType.FORMULA,
    baseCost: 5,
    factors: [
      {
        name: 'model',
        multipliers: ModelCreditMultipliers.volcengine
      },
      {
        name: 'resolution',
        multipliers: ResolutionCreditMultipliers
      },
      {
        name: 'duration',
        formula: 'duration * 0.5'
      }
    ],
    minCost: 3,
    maxCost: 50
  },
  
  tiered: {
    type: CreditCalculationType.TIERED,
    tiers: [
      { max: 10, cost: 5 },
      { max: 30, cost: 4 },
      { max: 60, cost: 3 },
      { max: Infinity, cost: 2 }
    ],
    description: '阶梯计费'
  }
}

module.exports = {
  CreditCalculationType,
  CreditFactors,
  CreditTier,
  DefaultBaseCredits,
  ModelCreditMultipliers,
  ResolutionCreditMultipliers,
  DurationCreditFactor,
  QualityCreditMultipliers,
  CreditConfigExamples
}
