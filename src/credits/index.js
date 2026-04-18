/**
 * 积分模块入口 (CommonJS)
 */

const { creditRegistry, CreditRegistry, CreditCalculationType, CreditFactors, DefaultBaseCredits } = require('./credit-registry')
const { CreditCalculator, creditCalculator } = require('./credit-calculator')

module.exports = {
  CreditRegistry,
  creditRegistry,
  CreditCalculator,
  creditCalculator,
  CreditCalculationType,
  CreditFactors,
  CreditTier: {
    FREE: 'free',
    BASIC: 'basic',
    STANDARD: 'standard',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise'
  },
  DefaultBaseCredits
}
