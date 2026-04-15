/**
 * 积分模块入口 (CommonJS)
 */

const { creditCalculator, CreditCalculator } = require('./credit-calculator')
const { CreditCalculationType, CreditFactors, CreditTier, DefaultBaseCredits, ModelCreditMultipliers } = require('../constants/credits')

module.exports = {
  CreditCalculator,
  creditCalculator,
  CreditCalculationType,
  CreditFactors,
  CreditTier,
  DefaultBaseCredits,
  ModelCreditMultipliers
}
