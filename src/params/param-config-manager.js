/**
 * 参数配置管理器
 * 统一管理参数配置和依赖关系
 */

/**
 * 参数配置管理器类
 */
class ParamConfigManager {
  /**
   * 获取参数配置
   * @param {object} schema - 参数模式
   * @param {object} context - 当前上下文
   * @param {object} modelCapabilities - 模型能力定义（可选）
   * @returns {object} 参数配置
   */
  getParamConfig(schema, context = {}, modelCapabilities = null) {
    const parameters = this.buildParameters(schema, context, modelCapabilities)
    const state = this.analyzeState(parameters, context)
    
    return {
      apiName: schema.apiName || 'Unknown',
      modelName: schema.modelName || 'unknown',
      parameters,
      state,
      hasModelCapabilities: !!modelCapabilities,
      modelCapabilities
    }
  }

  /**
   * 构建参数列表（包含依赖关系）
   * @param {object} schema - 参数模式
   * @param {object} context - 当前上下文
   * @param {object} modelCapabilities - 模型能力定义
   * @returns {Array} 参数列表
   */
  buildParameters(schema, context, modelCapabilities) {
    const params = []
    
    if (!schema || !schema.input) {
      return params
    }
    
    for (const [name, fieldSchema] of Object.entries(schema.input)) {
      const param = {
        name,
        type: fieldSchema.type,
        required: fieldSchema.required || false,
        description: fieldSchema.description || '',
        default: fieldSchema.default,
        dependencies: this.getDependencies(name, schema, modelCapabilities),
        affects: this.getAffectedParams(name, schema),
        visible: true,
        enabled: this.isEnabled(name, context, schema, modelCapabilities),
        constraintSource: this.getConstraintSource(name, schema, modelCapabilities)
      }
      
      // 检查所有依赖是否满足
      const allDependenciesMet = this.areDependenciesMet(name, context, schema, modelCapabilities)
      
      if (!allDependenciesMet) {
        // 如果依赖未满足，不设置约束值
        param.options = undefined
        param.min = undefined
        param.max = undefined
        param.step = undefined
      } else if (modelCapabilities && context.model) {
        // 依赖满足且有模型约束，尝试获取动态值
        const dynamicOptions = this.getDynamicOptions(name, context, modelCapabilities)
        const dynamicMin = this.getDynamicMin(name, context, modelCapabilities)
        const dynamicMax = this.getDynamicMax(name, context, modelCapabilities)
        const dynamicStep = this.getDynamicStep(name, context, modelCapabilities)
        
        // 只有在动态值存在时才设置，否则使用 schema 的值
        param.options = dynamicOptions !== null ? dynamicOptions : fieldSchema.options
        param.min = dynamicMin !== null ? dynamicMin : fieldSchema.min
        param.max = dynamicMax !== null ? dynamicMax : fieldSchema.max
        param.step = dynamicStep !== null ? dynamicStep : (fieldSchema.step || 1)
      } else {
        // 依赖满足但没有模型约束，使用 schema 的值
        param.options = fieldSchema.options
        param.min = fieldSchema.min
        param.max = fieldSchema.max
        param.step = fieldSchema.step || 1
      }
      
      params.push(param)
    }
    
    return params
  }

  /**
   * 分析参数状态
   * @param {Array} parameters - 参数列表
   * @param {object} context - 当前上下文
   * @returns {object} 状态信息
   */
  analyzeState(parameters, context) {
    const provided = Object.keys(context).filter(key => context[key] !== undefined && context[key] !== null)
    const missing = parameters.filter(p => p.required && !context[p.name])
    const enabled = parameters.filter(p => p.enabled)
    
    let nextParam = null
    for (const param of parameters) {
      if (param.required && !context[param.name] && param.enabled) {
        nextParam = param.name
        break
      }
    }
    
    const requiredParams = parameters.filter(p => p.required)
    const progress = requiredParams.length > 0 ? provided.length / requiredParams.length : 1
    
    return {
      complete: missing.length === 0,
      missingParams: missing.map(p => p.name),
      providedParams: provided,
      enabledParams: enabled.map(p => p.name),
      nextParam,
      progress: Math.min(progress, 1)
    }
  }

  /**
   * 获取参数依赖
   * @param {string} paramName - 参数名
   * @param {object} schema - 参数模式
   * @param {object} modelCapabilities - 模型能力定义
   * @returns {Array} 依赖列表
   */
  getDependencies(paramName, schema, modelCapabilities) {
    const deps = []
    const fieldSchema = schema.input[paramName]
    
    if (fieldSchema && fieldSchema.dependsOn) {
      deps.push(...Object.keys(fieldSchema.dependsOn))
    }
    
    if (modelCapabilities && this.hasModelConstraints(paramName)) {
      if (paramName === 'resolution' && !deps.includes('model')) {
        deps.push('model')
      }
      if (paramName === 'fps') {
        if (!deps.includes('model')) deps.push('model')
        if (!deps.includes('resolution')) deps.push('resolution')
      }
      if (paramName === 'duration') {
        if (!deps.includes('model')) deps.push('model')
        if (!deps.includes('resolution')) deps.push('resolution')
        if (!deps.includes('fps')) deps.push('fps')
      }
    }
    
    return deps
  }

  /**
   * 获取受影响的参数
   * @param {string} paramName - 参数名
   * @param {object} schema - 参数模式
   * @returns {Array} 受影响的参数列表
   */
  getAffectedParams(paramName, schema) {
    const affected = []
    
    if (!schema || !schema.input) {
      return affected
    }
    
    for (const [name, fieldSchema] of Object.entries(schema.input)) {
      if (fieldSchema && fieldSchema.dependsOn && fieldSchema.dependsOn[paramName]) {
        affected.push(name)
      }
    }
    
    if (paramName === 'model') {
      if (schema.input.resolution) affected.push('resolution')
      if (schema.input.fps) affected.push('fps')
      if (schema.input.duration) affected.push('duration')
    }
    if (paramName === 'resolution') {
      if (schema.input.fps) affected.push('fps')
      if (schema.input.duration) affected.push('duration')
    }
    if (paramName === 'fps') {
      if (schema.input.duration) affected.push('duration')
    }
    
    return [...new Set(affected)]
  }

  /**
   * 判断参数是否启用
   * @param {string} paramName - 参数名
   * @param {object} context - 当前上下文
   * @param {object} schema - 参数模式
   * @param {object} modelCapabilities - 模型能力定义
   * @returns {boolean} 是否启用
   */
  isEnabled(paramName, context, schema, modelCapabilities) {
    const fieldSchema = schema.input[paramName]
    
    if (fieldSchema && fieldSchema.dependsOn) {
      for (const [depKey, depValue] of Object.entries(fieldSchema.dependsOn)) {
        if (context[depKey] !== depValue) {
          return false
        }
      }
    }
    
    if (modelCapabilities && this.hasModelConstraints(paramName)) {
      if (paramName === 'resolution' && !context.model) {
        return false
      }
      if (paramName === 'fps' && (!context.model || !context.resolution)) {
        return false
      }
      if (paramName === 'duration' && (!context.model || !context.resolution || context.fps === undefined)) {
        return false
      }
    }
    
    return true
  }

  /**
   * 获取约束来源
   * @param {string} paramName - 参数名
   * @param {object} schema - 参数模式
   * @param {object} modelCapabilities - 模型能力定义
   * @returns {string|null} 约束来源
   */
  getConstraintSource(paramName, schema, modelCapabilities) {
    if (!modelCapabilities || !this.hasModelConstraints(paramName)) {
      return null
    }
    
    const sources = []
    if (paramName === 'resolution') {
      sources.push('model')
    } else if (paramName === 'fps') {
      sources.push('model', 'resolution')
    } else if (paramName === 'duration') {
      sources.push('model', 'resolution', 'fps')
    }
    
    return sources.length > 0 ? sources.join(',') : null
  }

  /**
   * 判断参数是否有模型约束
   * @param {string} paramName - 参数名
   * @returns {boolean} 是否有模型约束
   */
  hasModelConstraints(paramName) {
    return ['resolution', 'fps', 'duration'].includes(paramName)
  }

  /**
   * 检查参数的所有依赖是否满足
   * @param {string} paramName - 参数名
   * @param {object} context - 当前上下文
   * @param {object} schema - 参数模式
   * @param {object} modelCapabilities - 模型能力定义
   * @returns {boolean} 是否满足所有依赖
   */
  areDependenciesMet(paramName, context, schema, modelCapabilities) {
    const dependencies = this.getDependencies(paramName, schema, modelCapabilities)
    
    for (const dep of dependencies) {
      if (context[dep] === undefined || context[dep] === null) {
        return false
      }
    }
    
    return true
  }

  /**
   * 获取动态选项
   * @param {string} paramName - 参数名
   * @param {object} context - 当前上下文
   * @param {object} modelCapabilities - 模型能力定义
   * @returns {Array|null} 动态选项
   */
  getDynamicOptions(paramName, context, modelCapabilities) {
    if (!context.model || !modelCapabilities[context.model]) {
      return null
    }
    
    const modelCaps = modelCapabilities[context.model]
    
    if (paramName === 'resolution') {
      const resolutions = []
      for (const [resName, resData] of Object.entries(modelCaps.resolutions)) {
        if (resData.landscape) resolutions.push(resData.landscape)
        if (resData.portrait) resolutions.push(resData.portrait)
      }
      return [...new Set(resolutions)]
    }
    
    if (paramName === 'fps' && context.resolution) {
      const resKey = this.getResolutionKey(context.resolution, modelCaps)
      if (resKey && modelCaps.resolutions[resKey] && modelCaps.resolutions[resKey].fps) {
        return Object.keys(modelCaps.resolutions[resKey].fps).map(Number)
      }
    }
    
    return null
  }

  /**
   * 获取动态最小值
   * @param {string} paramName - 参数名
   * @param {object} context - 当前上下文
   * @param {object} modelCapabilities - 模型能力定义
   * @returns {number|null} 动态最小值
   */
  getDynamicMin(paramName, context, modelCapabilities) {
    if (paramName === 'duration' && context.model && context.resolution && context.fps !== undefined) {
      const modelCaps = modelCapabilities[context.model]
      if (!modelCaps) return null
      
      const resKey = this.getResolutionKey(context.resolution, modelCaps)
      if (resKey && modelCaps.resolutions[resKey] && 
          modelCaps.resolutions[resKey].fps && 
          modelCaps.resolutions[resKey].fps[context.fps]) {
        return modelCaps.resolutions[resKey].fps[context.fps].duration.min
      }
    }
    return null
  }

  /**
   * 获取动态最大值
   * @param {string} paramName - 参数名
   * @param {object} context - 当前上下文
   * @param {object} modelCapabilities - 模型能力定义
   * @returns {number|null} 动态最大值
   */
  getDynamicMax(paramName, context, modelCapabilities) {
    if (paramName === 'duration' && context.model && context.resolution && context.fps !== undefined) {
      const modelCaps = modelCapabilities[context.model]
      if (!modelCaps) return null
      
      const resKey = this.getResolutionKey(context.resolution, modelCaps)
      if (resKey && modelCaps.resolutions[resKey] && 
          modelCaps.resolutions[resKey].fps && 
          modelCaps.resolutions[resKey].fps[context.fps]) {
        return modelCaps.resolutions[resKey].fps[context.fps].duration.max
      }
    }
    return null
  }

  /**
   * 获取动态步长
   * @param {string} paramName - 参数名
   * @param {object} context - 当前上下文
   * @param {object} modelCapabilities - 模型能力定义
   * @returns {number|null} 动态步长
   */
  getDynamicStep(paramName, context, modelCapabilities) {
    if (paramName === 'duration' && context.model && context.resolution && context.fps !== undefined) {
      const modelCaps = modelCapabilities[context.model]
      if (!modelCaps) return null
      
      const resKey = this.getResolutionKey(context.resolution, modelCaps)
      if (resKey && modelCaps.resolutions[resKey] && 
          modelCaps.resolutions[resKey].fps && 
          modelCaps.resolutions[resKey].fps[context.fps]) {
        return modelCaps.resolutions[resKey].fps[context.fps].duration.step || 1
      }
    }
    return null
  }

  /**
   * 获取分辨率键名
   * @param {string} resolution - 分辨率值或键名
   * @param {object} modelCaps - 模型能力定义
   * @returns {string|null} 分辨率键名
   */
  getResolutionKey(resolution, modelCaps) {
    if (modelCaps.resolutions[resolution]) {
      return resolution
    }
    
    for (const [resName, resData] of Object.entries(modelCaps.resolutions)) {
      if (resData.landscape === resolution || resData.portrait === resolution) {
        return resName
      }
    }
    return null
  }
}

module.exports = ParamConfigManager
