/**
 * 参数配置管理器
 * 负责将参数 schema 转换为前端可用的配置格式
 * 
 * 支持的字段映射：
 * - name: 参数名称
 * - type: 数据类型 (string, number, boolean, enum, array, object, file)
 * - elementType: UI组件类型 (input, textarea, select, image-upload, etc.)
 * - label: 显示标签
 * - description: 描述信息
 * - required: 是否必填
 * - defaultValue: 默认值
 * - placeholder: 占位符
 * - group: 分组
 * - order: 排序
 * - options: 枚举选项
 * - min/max: 数值范围
 * - step: 步长
 * - unit: 单位
 * - validation: 验证规则
 * - condition: 显示条件
 * - capabilities: 模型能力
 */

const { addTranslationsToParams } = require('../utils/param-i18n')

/**
 * 参数配置管理器类
 */
class ParamConfigManager {
  /**
   * 创建参数配置管理器实例
   */
  constructor() {
    this.config = null
  }

  /**
   * 获取参数配置
   * @param {object} schema - 参数模式
   * @param {object} context - 上下文参数
   * @param {object} modelCapabilities - 模型能力
   * @param {object} extra - 额外信息
   * @param {object} options - 选项（包含 provider 和 language）
   * @returns {object} 参数配置
   */
  getParamConfig(schema, context = {}, modelCapabilities = null, extra = null, options = {}) {
    if (!schema || !schema.input) {
      return {
        apiName: schema?.apiName || 'unknown',
        modelName: schema?.modelName || 'unknown',
        parameters: []
      }
    }

    const schemaWithAffects = this.inferAffectsFields({ ...schema })

    const processedSchema = this.applyCases(schemaWithAffects, context)

    const parameters = this.convertSchemaToParams(processedSchema, context, modelCapabilities, options)

    return {
      apiName: schema.apiName || 'unknown',
      modelName: schema.modelName || 'unknown',
      parameters
    }
  }

  /**
   * 将 schema 转换为参数列表
   * @param {object} schema - 参数模式
   * @param {object} context - 上下文参数
   * @param {object} modelCapabilities - 模型能力
   * @param {object} options - 选项
   * @returns {Array} 参数列表
   */
  convertSchemaToParams(schema, context, modelCapabilities, options = {}) {
    const params = []

    if (!schema.input || typeof schema.input !== 'object') {
      return params
    }

    Object.entries(schema.input).forEach(([name, field]) => {
      const param = this.createParamConfig(name, field, context, modelCapabilities, options)
      params.push(param)
    })

    return params
  }

  /**
   * 创建单个参数配置
   * @param {string} name - 参数名
   * @param {object} field - 字段定义
   * @param {object} context - 上下文参数
   * @param {object} modelCapabilities - 模型能力
   * @param {object} options - 选项
   * @returns {object} 参数配置
   */
  createParamConfig(name, field, context, modelCapabilities, options = {}) {
    const param = {
      name,
      type: field.type || 'string',
      label: field.label || name,
      description: field.description || '',
      required: field.required || false,
      defaultValue: field.defaultValue,
      placeholder: field.placeholder || '',
      group: field.group || 'general',
      order: field.order || 100,
      elementType: field.elementType || field.element_type || undefined
    }

    if (field.enum || field.options) {
      param.options = this.processOptions(field.enum || field.options, field.optionLabels)
    }

    if (field.min !== undefined) {
      param.min = field.min
    }

    if (field.max !== undefined) {
      param.max = field.max
    }

    if (field.step !== undefined) {
      param.step = field.step
    }

    if (field.unit) {
      param.unit = field.unit
    }

    if (field.validation) {
      param.validation = field.validation
    }

    if (field.condition) {
      param.condition = field.condition
    }

    if (field.affects) {
      param.affects = field.affects
    }

    if (modelCapabilities && modelCapabilities[name]) {
      param.capabilities = modelCapabilities[name]
    }

    return param
  }

  /**
   * 处理选项列表
   * @param {Array} options - 选项数组
   * @param {object} labels - 选项标签映射
   * @returns {Array} 处理后的选项列表
   */
  processOptions(options, labels = {}) {
    if (!Array.isArray(options)) {
      return []
    }

    return options.map(option => {
      if (typeof option === 'object') {
        return option
      }

      return {
        value: option,
        label: labels[option] || String(option)
      }
    })
  }

  /**
   * 根据上下文过滤参数
   * @param {Array} params - 参数列表
   * @param {object} context - 上下文参数
   * @returns {Array} 过滤后的参数列表
   */
  filterParamsByContext(params, context) {
    return params.filter(param => {
      if (!param.condition) {
        return true
      }

      return this.evaluateCondition(param.condition, context)
    })
  }

  /**
   * 评估条件
   * @param {object} condition - 条件对象
   * @param {object} context - 上下文参数
   * @returns {boolean} 条件是否满足
   */
  evaluateCondition(condition, context) {
    if (!condition || typeof condition !== 'object') {
      return true
    }

    const { field, operator, value } = condition

    if (!field || !operator) {
      return true
    }

    const contextValue = context[field]

    switch (operator) {
    case 'eq':
      return contextValue === value
    case 'ne':
      return contextValue !== value
    case 'in':
      return Array.isArray(value) && value.includes(contextValue)
    case 'nin':
      return Array.isArray(value) && !value.includes(contextValue)
    case 'gt':
      return contextValue > value
    case 'gte':
      return contextValue >= value
    case 'lt':
      return contextValue < value
    case 'lte':
      return contextValue <= value
    default:
      return true
    }
  }

  /**
   * 合并参数配置
   * @param {object} baseConfig - 基础配置
   * @param {object} overrideConfig - 覆盖配置
   * @returns {object} 合并后的配置
   */
  mergeConfigs(baseConfig, overrideConfig) {
    if (!baseConfig) {
      return overrideConfig
    }

    if (!overrideConfig) {
      return baseConfig
    }

    return {
      ...baseConfig,
      ...overrideConfig,
      parameters: this.mergeParameters(
        baseConfig.parameters || [],
        overrideConfig.parameters || []
      )
    }
  }

  /**
   * 合并参数列表
   * @param {Array} baseParams - 基础参数列表
   * @param {Array} overrideParams - 覆盖参数列表
   * @returns {Array} 合并后的参数列表
   */
  mergeParameters(baseParams, overrideParams) {
    const paramMap = new Map()

    baseParams.forEach(param => {
      paramMap.set(param.name, param)
    })

    overrideParams.forEach(param => {
      paramMap.set(param.name, { ...paramMap.get(param.name), ...param })
    })

    return Array.from(paramMap.values())
  }

  /**
   * 应用 cases 约束
   * 根据 context 动态重写参数配置
   * @param {object} schema - 参数模式
   * @param {object} context - 上下文参数
   * @returns {object} 处理后的 schema
   */
  applyCases(schema, context = {}) {
    if (!schema.cases || !Array.isArray(schema.cases)) {
      return schema
    }

    const processedSchema = {
      input: { ...schema.input },
      output: schema.output ? { ...schema.output } : undefined,
      cases: schema.cases
    }

    for (const caseConfig of schema.cases) {
      const { dependsOn, value, ...paramOverrides } = caseConfig

      if (dependsOn && context[dependsOn] === value) {
        for (const [paramName, overrideConfig] of Object.entries(paramOverrides)) {
          if (processedSchema.input[paramName]) {
            processedSchema.input[paramName] = {
              ...processedSchema.input[paramName],
              ...overrideConfig
            }
          }
        }
      }
    }

    return processedSchema
  }

  /**
   * 推断参数的 affects 字段
   * 根据 cases 定义自动推断哪些参数会影响其他参数
   * @param {object} schema - 参数模式
   * @returns {object} 添加了 affects 字段的 schema
   */
  inferAffectsFields(schema) {
    if (!schema.cases || !Array.isArray(schema.cases)) {
      return schema
    }

    const affectsMap = new Map()

    for (const caseConfig of schema.cases) {
      const { dependsOn } = caseConfig
      
      if (dependsOn) {
        const affectedParams = Object.keys(caseConfig).filter(
          key => key !== 'dependsOn' && key !== 'value'
        )

        if (!affectsMap.has(dependsOn)) {
          affectsMap.set(dependsOn, new Set())
        }

        affectedParams.forEach(param => {
          affectsMap.get(dependsOn).add(param)
        })
      }
    }

    for (const [paramName, affectedParams] of affectsMap) {
      if (schema.input[paramName]) {
        schema.input[paramName].affects = Array.from(affectedParams)
      }
    }

    return schema
  }
}

module.exports = ParamConfigManager
