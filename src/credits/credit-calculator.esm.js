/**
 * 积分计算引擎
 * 负责计算任务预估积分和实际消耗积分
 */

import { 
  CreditCalculationType, 
  DefaultBaseCredits,
  ModelCreditMultipliers,
  ResolutionCreditMultipliers,
  DurationCreditFactor
} from '../constants/credits.js'
import { createLogger } from '../utils/logger.js'

const logger = createLogger({ level: 'INFO' })

let apiRegistry = null

async function getApiRegistry() {
  if (!apiRegistry) {
    const module = await import('../registry/api-registry.js')
    apiRegistry = module.default || module.apiRegistry
  }
  return apiRegistry
}

/**
 * 积分计算器类
 */
class CreditCalculator {
  /**
   * 创建积分计算器实例
   */
  constructor() {
    this.cache = new Map()
  }

  /**
   * 计算任务预估积分
   * @param {string} provider - 提供商
   * @param {string} apiName - API名称
   * @param {object} params - 任务参数
   * @returns {object} 预估积分信息
   */
  async calculateEstimatedCredits(provider, apiName, params) {
    try {
      const registry = await getApiRegistry()
      const apiMetadata = registry.get(apiName)
      
      if (!apiMetadata) {
        logger.warn(`API metadata not found: ${apiName}`)
        return this.getDefaultCredits(provider, apiName, params)
      }

      const creditConfig = apiMetadata.credits
      if (!creditConfig) {
        return this.getDefaultCredits(provider, apiName, params)
      }

      const result = this.calculateByType(creditConfig, params, provider)
      
      return {
        estimated: result.cost,
        breakdown: result.breakdown,
        config: creditConfig
      }
    } catch (error) {
      logger.error('Failed to calculate estimated credits:', error)
      return {
        estimated: this.getDefaultCredits(provider, apiName, params).estimated,
        breakdown: {},
        error: error.message
      }
    }
  }

  /**
   * 计算实际消耗积分
   * @param {string} provider - 提供商
   * @param {string} apiName - API名称
   * @param {object} params - 任务参数
   * @param {object} result - 任务结果
   * @returns {object} 实际积分信息
   */
  async calculateActualCredits(provider, apiName, params, result) {
    try {
      const estimated = await this.calculateEstimatedCredits(provider, apiName, params)
      
      if (result && result.metadata) {
        const actualDuration = result.metadata.duration || params.duration
        const actualFrames = result.metadata.frames
        
        if (actualDuration && actualDuration !== params.duration) {
          const adjustedParams = { ...params, duration: actualDuration }
          const adjusted = await this.calculateEstimatedCredits(provider, apiName, adjustedParams)
          
          return {
            estimated: estimated.estimated,
            actual: adjusted.estimated,
            breakdown: adjusted.breakdown,
            adjustment: {
              reason: 'duration_adjustment',
              original: params.duration,
              actual: actualDuration
            }
          }
        }
      }
      
      return {
        estimated: estimated.estimated,
        actual: estimated.estimated,
        breakdown: estimated.breakdown
      }
    } catch (error) {
      logger.error('Failed to calculate actual credits:', error)
      return {
        estimated: 0,
        actual: 0,
        error: error.message
      }
    }
  }

  /**
   * 根据配置类型计算积分
   * @param {object} creditConfig - 积分配置
   * @param {object} params - 参数
   * @param {string} provider - 提供商
   * @returns {object} 计算结果
   */
  calculateByType(creditConfig, params, provider) {
    switch (creditConfig.type) {
      case CreditCalculationType.FIXED:
        return this.calculateFixed(creditConfig, params)
      
      case CreditCalculationType.FORMULA:
        return this.calculateFormula(creditConfig, params, provider)
      
      case CreditCalculationType.TIERED:
        return this.calculateTiered(creditConfig, params)
      
      case CreditCalculationType.DYNAMIC:
        return this.calculateDynamic(creditConfig, params, provider)
      
      default:
        return { cost: creditConfig.baseCost || 5, breakdown: {} }
    }
  }

  /**
   * 计算固定积分
   * @param {object} config - 配置
   * @param {object} params - 参数
   * @returns {object} 计算结果
   */
  calculateFixed(config, params) {
    return {
      cost: config.baseCost,
      breakdown: {
        type: 'fixed',
        baseCost: config.baseCost
      }
    }
  }

  /**
   * 计算公式积分
   * @param {object} config - 配置
   * @param {object} params - 参数
   * @param {string} provider - 提供商
   * @returns {object} 计算结果
   */
  calculateFormula(config, params, provider) {
    let cost = config.baseCost
    const breakdown = {
      type: 'formula',
      baseCost: config.baseCost,
      factors: {}
    }

    if (config.factors && Array.isArray(config.factors)) {
      for (const factor of config.factors) {
        const factorResult = this.applyFactor(factor, params, provider, cost)
        cost = factorResult.cost
        breakdown.factors[factor.name] = factorResult.detail
      }
    }

    if (config.minCost !== undefined) {
      cost = Math.max(cost, config.minCost)
    }
    if (config.maxCost !== undefined) {
      cost = Math.min(cost, config.maxCost)
    }

    breakdown.finalCost = cost
    return { cost, breakdown }
  }

  /**
   * 计算阶梯积分
   * @param {object} config - 配置
   * @param {object} params - 参数
   * @returns {object} 计算结果
   */
  calculateTiered(config, params) {
    const value = params.duration || params.frames || 1
    let cost = config.baseCost || 5
    const breakdown = {
      type: 'tiered',
      value,
      tiers: []
    }

    if (config.tiers && Array.isArray(config.tiers)) {
      for (const tier of config.tiers) {
        breakdown.tiers.push(tier)
        if (value <= tier.max) {
          cost = tier.cost * value
          breakdown.appliedTier = tier
          break
        }
      }
    }

    return { cost, breakdown }
  }

  /**
   * 计算动态积分
   * @param {object} config - 配置
   * @param {object} params - 参数
   * @param {string} provider - 提供商
   * @returns {object} 计算结果
   */
  calculateDynamic(config, params, provider) {
    return this.calculateFormula(config, params, provider)
  }

  /**
   * 应用积分因子
   * @param {object} factor - 因子配置
   * @param {object} params - 参数
   * @param {string} provider - 提供商
   * @param {number} currentCost - 当前积分
   * @returns {object} 应用结果
   */
  applyFactor(factor, params, provider, currentCost) {
    const value = params[factor.name]
    let cost = currentCost
    const detail = {
      name: factor.name,
      value
    }

    if (factor.multipliers && value !== undefined) {
      const multiplier = factor.multipliers[value] || 1.0
      cost = currentCost * multiplier
      detail.multiplier = multiplier
      detail.effect = `${currentCost} * ${multiplier} = ${cost}`
    }

    if (factor.formula && value !== undefined) {
      try {
        const formulaResult = this.evaluateFormula(factor.formula, params)
        cost = cost + formulaResult
        detail.formula = factor.formula
        detail.formulaResult = formulaResult
        detail.effect = `${currentCost} + ${formulaResult} = ${cost}`
      } catch (error) {
        logger.warn(`Failed to evaluate formula: ${factor.formula}`, error)
      }
    }

    return { cost, detail }
  }

  /**
   * 简单公式求值
   * @param {string} formula - 公式字符串
   * @param {object} params - 参数
   * @returns {number} 计算结果
   */
  evaluateFormula(formula, params) {
    let expression = formula
    
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === 'number') {
        expression = expression.replace(new RegExp(key, 'g'), String(value))
      }
    }
    
    try {
      const safeExpression = expression.replace(/[^0-9+\-*/().]/g, '')
      return eval(safeExpression)
    } catch (error) {
      logger.warn(`Failed to evaluate expression: ${expression}`, error)
      return 0
    }
  }

  /**
   * 获取默认积分
   * @param {string} provider - 提供商
   * @param {string} apiName - API名称
   * @param {object} params - 参数
   * @returns {object} 默认积分信息
   */
  getDefaultCredits(provider, apiName, params) {
    let baseCost = 5
    
    if (apiName.includes('video')) {
      baseCost = DefaultBaseCredits.TEXT_TO_VIDEO
    } else if (apiName.includes('image')) {
      baseCost = DefaultBaseCredits.TEXT_TO_IMAGE
    } else if (apiName.includes('audio')) {
      baseCost = DefaultBaseCredits.TEXT_TO_AUDIO
    } else if (apiName.includes('3d')) {
      baseCost = DefaultBaseCredits.IMAGE_TO_3D
    }

    if (params.model && ModelCreditMultipliers[provider]) {
      const multiplier = ModelCreditMultipliers[provider][params.model] || 1.0
      baseCost = baseCost * multiplier
    }

    if (params.duration) {
      baseCost = baseCost + params.duration * DurationCreditFactor.VIDEO
    }

    return {
      estimated: Math.ceil(baseCost),
      breakdown: {
        type: 'default',
        baseCost
      }
    }
  }

  /**
   * 清除缓存
   */
  clearCache() {
    this.cache.clear()
  }
}

const creditCalculator = new CreditCalculator()

export {
  CreditCalculator,
  creditCalculator
}

export default {
  CreditCalculator,
  creditCalculator
}
