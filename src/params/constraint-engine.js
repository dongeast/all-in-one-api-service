/**
 * 约束表达式引擎
 * 用于计算和验证复合约束
 */

const { createLogger } = require('../utils/logger')

const logger = createLogger({ level: 'INFO' })

/**
 * 约束表达式引擎类
 */
class ConstraintEngine {
  /**
   * 创建约束引擎实例
   */
  constructor() {
    this.allowedFunctions = {
      Math: {
        min: Math.min,
        max: Math.max,
        floor: Math.floor,
        ceil: Math.ceil,
        round: Math.round,
        abs: Math.abs,
        sqrt: Math.sqrt,
        pow: Math.pow
      }
    }
  }

  /**
   * 计算表达式值
   * @param {string} expression - 表达式
   * @param {object} context - 上下文变量
   * @returns {number} 计算结果
   */
  evaluate(expression, context) {
    try {
      const safeContext = this.createSafeContext(context)
      const paramNames = Object.keys(safeContext)
      const paramValues = Object.values(safeContext)
      
      const func = new Function(...paramNames, `"use strict"; return (${expression})`)
      const result = func(...paramValues)
      
      logger.debug('Expression evaluated', {
        expression,
        context,
        result
      })
      
      return result
    } catch (error) {
      logger.error('Failed to evaluate expression', {
        expression,
        context,
        error: error.message
      })
      throw new Error(`Failed to evaluate expression "${expression}": ${error.message}`)
    }
  }

  /**
   * 创建安全的上下文环境
   * @param {object} context - 原始上下文
   * @returns {object} 安全上下文
   */
  createSafeContext(context) {
    const safeContext = { ...context }
    
    Object.keys(this.allowedFunctions).forEach(key => {
      safeContext[key] = this.allowedFunctions[key]
    })
    
    return safeContext
  }

  /**
   * 验证复合约束
   * @param {object} params - 参数对象
   * @param {object} constraint - 约束定义
   * @returns {{valid: boolean, errors: string[], value: number|null}} 验证结果
   */
  validateConstraint(params, constraint) {
    const errors = []
    
    const missingParams = constraint.params.filter(p => 
      params[p] === undefined || params[p] === null
    )
    
    if (missingParams.length > 0) {
      return {
        valid: true,
        errors: [],
        value: null,
        skipped: true,
        reason: `Missing parameters: ${missingParams.join(', ')}`
      }
    }
    
    const value = this.evaluate(constraint.expression, params)
    
    if (constraint.validate) {
      if (constraint.validate.min !== undefined && value < constraint.validate.min) {
        const message = constraint.message
          ? constraint.message
            .replace('{min}', constraint.validate.min)
            .replace('{max}', constraint.validate.max || '')
            .replace('{value}', value)
          : `约束 "${constraint.name}" 验证失败: 值 ${value} 小于最小值 ${constraint.validate.min}`
        errors.push(message)
      }
      
      if (constraint.validate.max !== undefined && value > constraint.validate.max) {
        const message = constraint.message
          ? constraint.message
            .replace('{min}', constraint.validate.min || '')
            .replace('{max}', constraint.validate.max)
            .replace('{value}', value)
          : `约束 "${constraint.name}" 验证失败: 值 ${value} 大于最大值 ${constraint.validate.max}`
        errors.push(message)
      }
    }
    
    return {
      valid: errors.length === 0,
      errors,
      value,
      skipped: false
    }
  }

  /**
   * 求解约束（反向计算）
   * @param {string} targetParam - 目标参数名
   * @param {object} constraint - 约束定义
   * @param {object} knownParams - 已知参数
   * @returns {Array<{min: number, max: number}>} 可选值范围
   */
  solve(targetParam, constraint, knownParams) {
    if (!constraint.validate) {
      return []
    }
    
    const { min: minVal, max: maxVal } = constraint.validate
    
    if (constraint.expression === 'width * height') {
      if (targetParam === 'height' && knownParams.width) {
        const min = Math.ceil(minVal / knownParams.width)
        const max = Math.floor(maxVal / knownParams.width)
        return [{ min, max }]
      }
      if (targetParam === 'width' && knownParams.height) {
        const min = Math.ceil(minVal / knownParams.height)
        const max = Math.floor(maxVal / knownParams.height)
        return [{ min, max }]
      }
    }
    
    if (constraint.expression === 'width / height') {
      if (targetParam === 'height' && knownParams.width) {
        const min = Math.ceil(knownParams.width / maxVal)
        const max = Math.floor(knownParams.width / minVal)
        return [{ min, max }]
      }
      if (targetParam === 'width' && knownParams.height) {
        const min = Math.ceil(knownParams.height * minVal)
        const max = Math.floor(knownParams.height * maxVal)
        return [{ min, max }]
      }
    }
    
    if (constraint.expression === 'height / width') {
      if (targetParam === 'width' && knownParams.height) {
        const min = Math.ceil(knownParams.height / maxVal)
        const max = Math.floor(knownParams.height / minVal)
        return [{ min, max }]
      }
      if (targetParam === 'height' && knownParams.width) {
        const min = Math.ceil(knownParams.width * minVal)
        const max = Math.floor(knownParams.width * maxVal)
        return [{ min, max }]
      }
    }
    
    return []
  }

  /**
   * 生成可选值列表
   * @param {string} targetParam - 目标参数名
   * @param {Array} constraints - 所有约束
   * @param {object} knownParams - 已知参数
   * @param {object} options - 生成选项
   * @returns {Array|object|null} 可选值列表或范围
   */
  generateOptions(targetParam, constraints, knownParams, options = {}) {
    const ranges = []
    
    for (const constraint of constraints) {
      if (constraint.params && constraint.params.includes(targetParam)) {
        const solved = this.solve(targetParam, constraint, knownParams)
        ranges.push(...solved)
      }
    }
    
    if (ranges.length === 0) {
      return null
    }
    
    const finalRange = this.intersectRanges(ranges)
    
    if (options.format === 'range') {
      return finalRange
    }
    
    if (finalRange.min > finalRange.max) {
      return []
    }
    
    const values = []
    const step = options.step || 64
    const maxValues = options.maxValues || 100
    
    for (let v = finalRange.min; v <= finalRange.max && values.length < maxValues; v += step) {
      values.push(v)
    }
    
    return values
  }

  /**
   * 计算范围交集
   * @param {Array<{min: number, max: number}>} ranges - 范围列表
   * @returns {{min: number, max: number}} 交集范围
   */
  intersectRanges(ranges) {
    if (ranges.length === 0) {
      return { min: 0, max: Infinity }
    }
    
    return ranges.reduce((acc, range) => ({
      min: Math.max(acc.min, range.min),
      max: Math.min(acc.max, range.max)
    }))
  }

  /**
   * 验证参数组合是否满足所有约束
   * @param {object} params - 参数对象
   * @param {Array} constraints - 约束列表
   * @returns {{valid: boolean, errors: string[], details: Array}} 验证结果
   */
  validateAll(params, constraints) {
    const errors = []
    const details = []
    
    for (const constraint of constraints) {
      const result = this.validateConstraint(params, constraint)
      details.push({
        name: constraint.name,
        ...result
      })
      
      if (!result.valid && !result.skipped) {
        errors.push(...result.errors)
      }
    }
    
    return {
      valid: errors.length === 0,
      errors,
      details
    }
  }

  /**
   * 获取参数的建议值
   * @param {string} targetParam - 目标参数名
   * @param {Array} constraints - 约束列表
   * @param {object} knownParams - 已知参数
   * @param {object} options - 选项
   * @returns {object|null} 建议信息
   */
  getSuggestions(targetParam, constraints, knownParams, options = {}) {
    const range = this.generateOptions(targetParam, constraints, knownParams, {
      format: 'range',
      ...options
    })
    
    if (!range) {
      return null
    }
    
    const suggestions = {
      param: targetParam,
      range,
      validValues: this.generateOptions(targetParam, constraints, knownParams, {
        step: options.step || 64,
        maxValues: 10,
        ...options
      })
    }
    
    if (range.min > range.max) {
      suggestions.conflict = true
      suggestions.message = `参数 "${targetParam}" 的约束条件冲突，无法找到有效值`
    }
    
    return suggestions
  }
}

module.exports = ConstraintEngine
