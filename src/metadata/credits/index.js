/**
 * 积分配置入口
 * 统一管理所有 provider 的积分配置
 */

const { creditRegistry, CreditCalculationType, CreditFactors, DefaultBaseCredits } = require('../../credits/credit-registry')

const MurekaCredits = require('./mureka')
const LightricksCredits = require('./lightricks')
const SkyreelsCredits = require('./skyreels')
const VolcengineCredits = require('./volcengine')
const ViduCredits = require('./vidu')

/**
 * 初始化积分配置
 */
function initializeCredits() {
  creditRegistry.register('mureka', MurekaCredits)
  creditRegistry.register('lightricks', LightricksCredits)
  creditRegistry.register('skyreels', SkyreelsCredits)
  creditRegistry.register('volcengine', VolcengineCredits)
  creditRegistry.register('vidu', ViduCredits)
}

initializeCredits()

module.exports = {
  creditRegistry,
  CreditCalculationType,
  CreditFactors,
  CreditTier: {
    FREE: 'free',
    BASIC: 'basic',
    STANDARD: 'standard',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise'
  },
  DefaultBaseCredits,
  ModelCreditMultipliers: {
    mureka: MurekaCredits.modelMultipliers,
    lightricks: LightricksCredits.modelMultipliers,
    skyreels: SkyreelsCredits.modelMultipliers,
    volcengine: VolcengineCredits.modelMultipliers,
    vidu: ViduCredits.modelMultipliers
  },
  ResolutionCreditMultipliers: {
    '480p': 0.8,
    '720p': 1.0,
    '1080p': 1.5,
    '2K': 2.0,
    '4K': 3.0
  },
  DurationCreditFactor: {
    VIDEO: 0.5,
    AUDIO: 0.3
  },
  QualityCreditMultipliers: {
    low: 0.7,
    standard: 1.0,
    high: 1.3,
    premium: 1.6
  },
  MurekaCredits,
  LightricksCredits,
  SkyreelsCredits,
  VolcengineCredits,
  ViduCredits
}
