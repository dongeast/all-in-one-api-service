/**
 * 积分配置注册中心
 * 统一管理各 provider 的积分配置
 */

const { createLogger } = require('../utils/logger')

const logger = createLogger({ level: 'INFO' })

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
 * 积分配置注册中心类
 */
class CreditRegistry {
  /**
   * 创建积分注册中心实例
   */
  constructor() {
    this.providerConfigs = new Map()
    this.apiCredits = new Map()
    this.modelMultipliers = new Map()
    this.defaults = { ...DefaultBaseCredits }
    this.initialized = false
  }

  /**
   * 注册 provider 的积分配置
   * @param {string} provider - 提供商名称
   * @param {object} config - 积分配置
   */
  register(provider, config) {
    if (!provider || !config) {
      logger.warn('Invalid provider or config for credit registration')
      return
    }

    this.providerConfigs.set(provider, config)

    if (config.modelMultipliers) {
      this.modelMultipliers.set(provider, config.modelMultipliers)
    }

    if (config.apiCredits) {
      for (const [apiName, creditConfig] of Object.entries(config.apiCredits)) {
        this.apiCredits.set(apiName, {
          ...creditConfig,
          provider
        })
      }
    }

    if (config.defaults) {
      Object.assign(this.defaults, config.defaults)
    }

    logger.debug(`Registered credit config for provider: ${provider}`)
  }

  /**
   * 批量注册积分配置
   * @param {object} configsMap - provider 到配置的映射
   */
  registerAll(configsMap) {
    Object.entries(configsMap).forEach(([provider, config]) => {
      this.register(provider, config)
    })
  }

  /**
   * 获取 API 的积分配置
   * @param {string} apiName - API 名称
   * @returns {object|null} 积分配置
   */
  getAPICredits(apiName) {
    return this.apiCredits.get(apiName) || null
  }

  /**
   * 获取模型倍率
   * @param {string} provider - 提供商名称
   * @param {string} model - 模型名称
   * @returns {number} 倍率值
   */
  getModelMultiplier(provider, model) {
    const multipliers = this.modelMultipliers.get(provider)
    if (!multipliers) {
      return 1.0
    }
    return multipliers[model] || 1.0
  }

  /**
   * 获取默认积分
   * @param {string} apiType - API 类型
   * @returns {number} 默认积分值
   */
  getDefaultCredits(apiType) {
    const typeMap = {
      'text_to_image': DefaultBaseCredits.TEXT_TO_IMAGE,
      'image_to_image': DefaultBaseCredits.IMAGE_TO_IMAGE,
      'text_to_video': DefaultBaseCredits.TEXT_TO_VIDEO,
      'image_to_video': DefaultBaseCredits.IMAGE_TO_VIDEO,
      'video_to_video': DefaultBaseCredits.VIDEO_TO_VIDEO,
      'text_to_audio': DefaultBaseCredits.TEXT_TO_AUDIO,
      'text_to_music': DefaultBaseCredits.TEXT_TO_MUSIC,
      'image_to_3d': DefaultBaseCredits.IMAGE_TO_3D
    }

    return typeMap[apiType] || 5
  }

  /**
   * 获取分辨率倍率
   * @param {string} resolution - 分辨率
   * @returns {number} 倍率值
   */
  getResolutionMultiplier(resolution) {
    return ResolutionCreditMultipliers[resolution] || 1.0
  }

  /**
   * 获取时长因子
   * @param {string} type - 类型（'VIDEO' 或 'AUDIO'）
   * @returns {number} 因子值
   */
  getDurationFactor(type) {
    return DurationCreditFactor[type] || 0.5
  }

  /**
   * 获取质量倍率
   * @param {string} quality - 质量等级
   * @returns {number} 倍率值
   */
  getQualityMultiplier(quality) {
    return QualityCreditMultipliers[quality] || 1.0
  }

  /**
   * 验证积分配置
   * @param {object} config - 积分配置
   * @returns {object} 验证结果
   */
  validateConfig(config) {
    const errors = []

    if (!config.type || !Object.values(CreditCalculationType).includes(config.type)) {
      errors.push('Invalid or missing credit calculation type')
    }

    if (config.type === CreditCalculationType.FIXED && typeof config.baseCost !== 'number') {
      errors.push('Fixed type requires baseCost to be a number')
    }

    if (config.type === CreditCalculationType.FORMULA) {
      if (typeof config.baseCost !== 'number') {
        errors.push('Formula type requires baseCost')
      }
      if (!Array.isArray(config.factors)) {
        errors.push('Formula type requires factors array')
      }
    }

    if (config.type === CreditCalculationType.TIERED) {
      if (!Array.isArray(config.tiers) || config.tiers.length === 0) {
        errors.push('Tiered type requires non-empty tiers array')
      }
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }

  /**
   * 获取所有 API 积分配置
   * @returns {Map} API 积分配置映射
   */
  getAllAPICredits() {
    return new Map(this.apiCredits)
  }

  /**
   * 获取所有模型倍率
   * @returns {Map} 模型倍率映射
   */
  getAllModelMultipliers() {
    return new Map(this.modelMultipliers)
  }

  /**
   * 获取统计信息
   * @returns {object} 统计信息
   */
  getStats() {
    return {
      providers: this.providerConfigs.size,
      apiCredits: this.apiCredits.size,
      modelMultipliers: this.modelMultipliers.size,
      initialized: this.initialized
    }
  }

  /**
   * 清空注册中心
   */
  clear() {
    this.providerConfigs.clear()
    this.apiCredits.clear()
    this.modelMultipliers.clear()
    this.defaults = { ...DefaultBaseCredits }
    this.initialized = false
    logger.debug('CreditRegistry cleared')
  }

  /**
   * 初始化注册中心
   * @param {object} configsMap - provider 到配置的映射
   */
  initialize(configsMap) {
    if (this.initialized) {
      return
    }

    this.registerAll(configsMap)
    this.initialized = true
    logger.info(`CreditRegistry initialized with ${this.providerConfigs.size} providers`)
  }
}

const creditRegistry = new CreditRegistry()

module.exports = {
  CreditRegistry,
  creditRegistry,
  CreditCalculationType,
  CreditFactors,
  DefaultBaseCredits,
  ResolutionCreditMultipliers,
  DurationCreditFactor,
  QualityCreditMultipliers
}
