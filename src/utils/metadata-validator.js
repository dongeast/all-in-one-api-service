/**
 * 元数据验证工具
 * 验证 Function 元数据的完整性和正确性
 */

/**
 * 验证结果
 */
class ValidationResult {
  constructor() {
    this.valid = true
    this.errors = []
    this.warnings = []
  }

  addError(message, context = {}) {
    this.valid = false
    this.errors.push({ message, context, type: 'error' })
  }

  addWarning(message, context = {}) {
    this.warnings.push({ message, context, type: 'warning' })
  }

  toObject() {
    return {
      valid: this.valid,
      errors: this.errors,
      warnings: this.warnings,
      errorCount: this.errors.length,
      warningCount: this.warnings.length
    }
  }
}

/**
 * 验证 Function 元数据
 * @param {string} functionName - Function 名称
 * @param {object} metadata - Function 元数据
 * @returns {ValidationResult} 验证结果
 */
function validateFunctionMetadata(functionName, metadata) {
  const result = new ValidationResult()

  if (!metadata) {
    result.addError('Metadata is null or undefined', { functionName })
    return result
  }

  if (!metadata.name) {
    result.addError('Missing required field: name', { functionName })
  } else if (metadata.name !== functionName) {
    result.addWarning(
      `Function name mismatch: expected "${functionName}", got "${metadata.name}"`,
      { functionName }
    )
  }

  if (!metadata.type) {
    result.addError('Missing required field: type', { functionName })
  } else if (!['sync', 'async'].includes(metadata.type)) {
    result.addError(
      `Invalid type: "${metadata.type}", must be "sync" or "async"`,
      { functionName, type: metadata.type }
    )
  }

  if (!metadata.provider) {
    result.addError('Missing required field: provider', { functionName })
  }

  if (!metadata.apis) {
    result.addError('Missing required field: apis', { functionName })
  } else {
    if (!metadata.apis.request) {
      result.addError('Missing required field: apis.request', { functionName })
    }

    if (metadata.type === 'async' && !metadata.apis.query) {
      result.addWarning(
        'Async function should have apis.query defined',
        { functionName, type: metadata.type }
      )
    }
  }

  if (!metadata.methods || Object.keys(metadata.methods).length === 0) {
    result.addError('Missing or empty methods definition', { functionName })
  } else {
    validateMethods(functionName, metadata, result)
  }

  if (!metadata.tags || !Array.isArray(metadata.tags)) {
    result.addWarning('Missing or invalid tags field', { functionName })
  }

  if (typeof metadata.priority !== 'number') {
    result.addWarning('Missing or invalid priority field', { functionName })
  }

  return result
}

/**
 * 验证方法定义
 * @param {string} functionName - Function 名称
 * @param {object} metadata - Function 元数据
 * @param {ValidationResult} result - 验证结果
 */
function validateMethods(functionName, metadata, result) {
  const { methods, type } = metadata

  if (!methods.request) {
    result.addError('Missing required method: request', { functionName })
  } else {
    validateMethodDefinition(functionName, 'request', methods.request, result)
  }

  if (!methods.execute) {
    result.addWarning('Missing recommended method: execute', { functionName })
  }

  if (type === 'async') {
    if (!methods.response) {
      result.addWarning('Async function should have response method', { functionName })
    }

    if (!methods.getStatus) {
      result.addWarning('Async function should have getStatus method', { functionName })
    }

    if (!methods.waitForCompletion) {
      result.addWarning('Async function should have waitForCompletion method', { functionName })
    }
  }

  for (const [methodName, methodDef] of Object.entries(methods)) {
    validateMethodDefinition(functionName, methodName, methodDef, result)
  }
}

/**
 * 验证方法定义
 * @param {string} functionName - Function 名称
 * @param {string} methodName - 方法名称
 * @param {object} methodDef - 方法定义
 * @param {ValidationResult} result - 验证结果
 */
function validateMethodDefinition(functionName, methodName, methodDef, result) {
  if (!methodDef.description) {
    result.addWarning(
      `Missing description for method: ${methodName}`,
      { functionName, methodName }
    )
  }

  if (!methodDef.input) {
    result.addError(
      `Missing input definition for method: ${methodName}`,
      { functionName, methodName }
    )
  }

  if (!methodDef.output) {
    result.addError(
      `Missing output definition for method: ${methodName}`,
      { functionName, methodName }
    )
  }
}

/**
 * 验证翻译键是否存在
 * @param {object} translations - 翻译对象
 * @param {string} provider - 提供商名称
 * @param {string} functionName - Function 名称
 * @returns {ValidationResult} 验证结果
 */
function validateTranslations(translations, provider, functionName) {
  const result = new ValidationResult()

  if (!translations) {
    result.addError('Translations object is null or undefined', { provider, functionName })
    return result
  }

  const functionTranslations = translations.functions?.[provider]?.[functionName]

  if (!functionTranslations) {
    result.addError(
      `Missing translations for function: ${functionName}`,
      { provider, functionName }
    )
    return result
  }

  if (!functionTranslations.displayName) {
    result.addError(
      'Missing translation: displayName',
      { provider, functionName }
    )
  }

  if (!functionTranslations.description) {
    result.addError(
      'Missing translation: description',
      { provider, functionName }
    )
  }

  if (functionTranslations.methods) {
    const requiredMethods = ['request', 'execute']
    for (const methodName of requiredMethods) {
      if (!functionTranslations.methods[methodName]) {
        result.addWarning(
          `Missing translation for method: ${methodName}`,
          { provider, functionName, methodName }
        )
      } else if (!functionTranslations.methods[methodName].description) {
        result.addWarning(
          `Missing translation for method description: ${methodName}`,
          { provider, functionName, methodName }
        )
      }
    }
  }

  return result
}

/**
 * 验证所有 Function 元数据
 * @param {object} functionsMetadata - 所有 Function 元数据
 * @returns {object} 验证结果
 */
function validateAllFunctions(functionsMetadata) {
  const results = {
    valid: true,
    providers: {},
    summary: {
      totalFunctions: 0,
      validFunctions: 0,
      invalidFunctions: 0,
      totalErrors: 0,
      totalWarnings: 0
    }
  }

  for (const [provider, functions] of Object.entries(functionsMetadata)) {
    results.providers[provider] = {
      functions: {},
      summary: {
        total: 0,
        valid: 0,
        invalid: 0
      }
    }

    for (const [functionName, metadata] of Object.entries(functions)) {
      const validationResult = validateFunctionMetadata(functionName, metadata)
      
      results.providers[provider].functions[functionName] = validationResult.toObject()
      results.providers[provider].summary.total++
      results.summary.totalFunctions++

      if (validationResult.valid) {
        results.providers[provider].summary.valid++
        results.summary.validFunctions++
      } else {
        results.providers[provider].summary.invalid++
        results.summary.invalidFunctions++
        results.valid = false
      }

      results.summary.totalErrors += validationResult.errors.length
      results.summary.totalWarnings += validationResult.warnings.length
    }
  }

  return results
}

/**
 * 打印验证报告
 * @param {object} results - 验证结果
 */
function printValidationReport(results) {
  console.log('\n=== Function Metadata Validation Report ===\n')
  
  console.log(`Total Functions: ${results.summary.totalFunctions}`)
  console.log(`Valid: ${results.summary.validFunctions}`)
  console.log(`Invalid: ${results.summary.invalidFunctions}`)
  console.log(`Total Errors: ${results.summary.totalErrors}`)
  console.log(`Total Warnings: ${results.summary.totalWarnings}`)
  
  console.log('\n--- Details by Provider ---\n')
  
  for (const [provider, providerResults] of Object.entries(results.providers)) {
    console.log(`\n[${provider.toUpperCase()}]`)
    console.log(`  Total: ${providerResults.summary.total}`)
    console.log(`  Valid: ${providerResults.summary.valid}`)
    console.log(`  Invalid: ${providerResults.summary.invalid}`)
    
    for (const [functionName, functionResult] of Object.entries(providerResults.functions)) {
      if (!functionResult.valid) {
        console.log(`\n  ❌ ${functionName}:`)
        functionResult.errors.forEach(error => {
          console.log(`     ERROR: ${error.message}`)
        })
      }
      
      if (functionResult.warnings.length > 0) {
        console.log(`\n  ⚠️  ${functionName}:`)
        functionResult.warnings.forEach(warning => {
          console.log(`     WARNING: ${warning.message}`)
        })
      }
    }
  }
  
  console.log('\n=== End of Report ===\n')
}

module.exports = {
  ValidationResult,
  validateFunctionMetadata,
  validateTranslations,
  validateAllFunctions,
  printValidationReport
}
