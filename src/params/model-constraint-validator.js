/**
 * 模型约束验证器
 * 根据模型能力定义验证参数组合
 */

/**
 * 验证结果类
 */
class ConstraintValidationResult {
  /**
   * 创建验证结果
   * @param {boolean} valid - 是否有效
   * @param {string[]} errors - 错误列表
   * @param {object} suggestions - 建议信息
   */
  constructor(valid, errors = [], suggestions = {}) {
    this.valid = valid
    this.errors = errors
    this.suggestions = suggestions
  }
}

/**
 * 模型约束验证器类
 */
class ModelConstraintValidator {
  /**
   * 验证参数是否符合模型约束
   * @param {string} model - 模型名称
   * @param {object} params - 参数对象
   * @param {object} capabilities - 模型能力定义
   * @returns {ConstraintValidationResult} 验证结果
   */
  validate(model, params, capabilities) {
    const errors = []
    const suggestions = {}

    const modelCaps = capabilities[model]
    if (!modelCaps) {
      return new ConstraintValidationResult(true, [], {})
    }

    if (params.resolution) {
      const resolutionResult = this.validateResolution(model, params.resolution, modelCaps)
      errors.push(...resolutionResult.errors)
      Object.assign(suggestions, resolutionResult.suggestions)
    }

    if (params.fps && params.resolution) {
      const fpsResult = this.validateFPS(model, params.resolution, params.fps, modelCaps)
      errors.push(...fpsResult.errors)
      Object.assign(suggestions, fpsResult.suggestions)
    }

    if (params.duration && params.resolution && params.fps) {
      const durationResult = this.validateDuration(
        model,
        params.resolution,
        params.fps,
        params.duration,
        modelCaps
      )
      errors.push(...durationResult.errors)
      Object.assign(suggestions, durationResult.suggestions)
    }

    return new ConstraintValidationResult(errors.length === 0, errors, suggestions)
  }

  /**
   * 验证分辨率
   * @param {string} model - 模型名称
   * @param {string} resolution - 分辨率
   * @param {object} modelCaps - 模型能力定义
   * @returns {object} 验证结果
   */
  validateResolution(model, resolution, modelCaps) {
    const errors = []
    const suggestions = {}

    const aspectRatio = this.detectAspectRatio(resolution)
    if (!aspectRatio) {
      errors.push(`无法识别分辨率 "${resolution}" 的长宽比`)
      return { errors, suggestions }
    }

    if (!modelCaps.aspectRatios.includes(aspectRatio)) {
      errors.push(
        `模型 "${model}" 不支持 ${aspectRatio} 长宽比（分辨率：${resolution}）`
      )
      suggestions.availableAspectRatios = modelCaps.aspectRatios

      const availableResolutions = []
      for (const [resName, resData] of Object.entries(modelCaps.resolutions)) {
        if (aspectRatio === '16:9' && resData.landscape) {
          availableResolutions.push(resData.landscape)
        } else if (aspectRatio === '9:16' && resData.portrait) {
          availableResolutions.push(resData.portrait)
        }
      }
      suggestions.availableResolutions = availableResolutions
    }

    return { errors, suggestions }
  }

  /**
   * 验证 FPS
   * @param {string} model - 模型名称
   * @param {string} resolution - 分辨率
   * @param {number} fps - 帧率
   * @param {object} modelCaps - 模型能力定义
   * @returns {object} 验证结果
   */
  validateFPS(model, resolution, fps, modelCaps) {
    const errors = []
    const suggestions = {}

    const resKey = this.getResolutionKey(resolution, modelCaps)
    if (!resKey) {
      errors.push(`模型 "${model}" 不支持分辨率 "${resolution}"`)
      return { errors, suggestions }
    }

    const resData = modelCaps.resolutions[resKey]
    if (!resData || !resData.fps) {
      errors.push(`模型 "${model}" 在分辨率 "${resolution}" 下没有可用的 FPS 选项`)
      return { errors, suggestions }
    }

    const availableFPS = Object.keys(resData.fps).map(Number)
    if (!availableFPS.includes(fps)) {
      errors.push(
        `模型 "${model}" 在分辨率 "${resolution}" 下不支持 FPS "${fps}"`
      )
      suggestions.availableFPS = availableFPS
    }

    return { errors, suggestions }
  }

  /**
   * 验证时长
   * @param {string} model - 模型名称
   * @param {string} resolution - 分辨率
   * @param {number} fps - 帧率
   * @param {number} duration - 时长
   * @param {object} modelCaps - 模型能力定义
   * @returns {object} 验证结果
   */
  validateDuration(model, resolution, fps, duration, modelCaps) {
    const errors = []
    const suggestions = {}

    const resKey = this.getResolutionKey(resolution, modelCaps)
    if (!resKey) {
      return { errors, suggestions }
    }

    const resData = modelCaps.resolutions[resKey]
    if (!resData || !resData.fps || !resData.fps[fps]) {
      return { errors, suggestions }
    }

    const durationRange = resData.fps[fps].duration
    const min = durationRange.min
    const max = durationRange.max
    const step = durationRange.step || 1

    // 验证范围
    if (duration < min || duration > max) {
      errors.push(
        `模型 "${model}" 在分辨率 "${resolution}" 和 FPS "${fps}" 下，` +
        `时长 "${duration}秒" 超出允许范围（${min}-${max}秒）`
      )
      suggestions.durationRange = { min, max, step }

      const betterFPS = []
      for (const [fpsValue, fpsData] of Object.entries(resData.fps)) {
        if (fpsData.duration.max > duration) {
          betterFPS.push(Number(fpsValue))
        }
      }
      if (betterFPS.length > 0) {
        suggestions.suggestedFPS = betterFPS
      }
    } else if (step > 1) {
      // 验证步长（仅在范围内时验证）
      const offset = (duration - min) % step
      if (offset !== 0) {
        // 计算最接近的有效值
        const lowerValue = duration - offset
        const upperValue = lowerValue + step
        
        errors.push(
          `模型 "${model}" 在分辨率 "${resolution}" 和 FPS "${fps}" 下，` +
          `时长 "${duration}秒" 不符合步长要求（步长为 ${step} 秒）`
        )
        
        suggestions.step = step
        suggestions.validDurations = []
        
        // 生成所有有效值
        for (let value = min; value <= max; value += step) {
          suggestions.validDurations.push(value)
        }
        
        // 提供最接近的有效值
        suggestions.closestValues = []
        if (lowerValue >= min) {
          suggestions.closestValues.push(lowerValue)
        }
        if (upperValue <= max) {
          suggestions.closestValues.push(upperValue)
        }
      }
    }

    return { errors, suggestions }
  }

  /**
   * 获取模型支持的参数选项（根据上下文）
   * @param {string} model - 模型名称
   * @param {object} capabilities - 模型能力定义
   * @param {object} context - 上下文参数
   * @returns {object} 可用选项
   */
  getAvailableOptions(model, capabilities, context = {}) {
    const modelCaps = capabilities[model]
    if (!modelCaps) {
      return null
    }

    const result = {
      aspectRatios: modelCaps.aspectRatios,
      resolutions: {},
      fps: [],
      duration: null
    }

    if (context.aspectRatio) {
      const ratio = context.aspectRatio
      for (const [resName, resData] of Object.entries(modelCaps.resolutions)) {
        if (ratio === '16:9' && resData.landscape) {
          result.resolutions[resName] = {
            value: resData.landscape,
            orientation: 'landscape'
          }
        } else if (ratio === '9:16' && resData.portrait) {
          result.resolutions[resName] = {
            value: resData.portrait,
            orientation: 'portrait'
          }
        }
      }
    } else {
      for (const [resName, resData] of Object.entries(modelCaps.resolutions)) {
        result.resolutions[resName] = {
          landscape: resData.landscape,
          portrait: resData.portrait
        }
      }
    }

    if (context.resolution) {
      const resKey = this.getResolutionKey(context.resolution, modelCaps)
      if (resKey) {
        const resData = modelCaps.resolutions[resKey]
        if (resData && resData.fps) {
          result.fps = Object.keys(resData.fps).map(Number)
        }
      }
    }

    if (context.resolution && context.fps) {
      const resKey = this.getResolutionKey(context.resolution, modelCaps)
      if (resKey) {
        const resData = modelCaps.resolutions[resKey]
        if (resData && resData.fps && resData.fps[context.fps]) {
          result.duration = resData.fps[context.fps].duration
        }
      }
    }

    return result
  }

  /**
   * 检测长宽比
   * @param {string} resolution - 分辨率（如：1920x1080）
   * @returns {string|null} 长宽比（16:9 或 9:16）
   */
  detectAspectRatio(resolution) {
    const parts = resolution.split('x')
    if (parts.length !== 2) {
      return null
    }

    const width = parseInt(parts[0])
    const height = parseInt(parts[1])

    if (width > height) {
      return '16:9'
    } else if (height > width) {
      return '9:16'
    }

    return null
  }

  /**
   * 获取分辨率键名
   * @param {string} resolution - 分辨率值或键名
   * @param {object} modelCaps - 模型能力定义
   * @returns {string|null} 分辨率键名（如：1080p）
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

module.exports = {
  ModelConstraintValidator,
  ConstraintValidationResult
}
