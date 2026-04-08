/**
 * 错误码定义
 * 支持多语言错误消息
 */

const { t } = require('./i18n')

/**
 * 错误码映射到翻译键
 */
const ErrorCodeKeys = {
  E001: 'api.serviceNotInitialized',
  E002: 'api.invalidAPIKey',
  E003: 'api.validationFailed',
  E004: 'api.requiredParamMissing',
  E005: 'api.paramTypeError',
  E006: 'api.paramValueOutOfRange',
  E007: 'api.apiCallFailed',
  E008: 'api.networkTimeout',
  E009: 'api.responseParsingFailed',
  E010: 'api.serviceUnavailable',
  E011: 'api.configLoadFailed',
  E012: 'api.unsupportedAPIType',
  E013: 'api.taskTimeout',
  E014: 'api.taskFailed',
  E015: 'api.taskCanceled'
}

/**
 * 获取错误消息
 * @param {string} code - 错误码
 * @param {string} language - 语言代码(可选)
 * @returns {string} 错误消息
 */
function getErrorMessage(code, language) {
  const key = ErrorCodeKeys[code]
  if (!key) {
    return code
  }
  return t(key, { language })
}

/**
 * 获取错误对象
 * @param {string} code - 错误码
 * @param {string} language - 语言代码(可选)
 * @returns {object} 错误对象
 */
function getError(code, language) {
  return {
    code,
    message: getErrorMessage(code, language)
  }
}

/**
 * 错误码定义(向后兼容)
 * 保留原有的 message(中文) 和 description(英文) 字段
 */
const ErrorCodes = {
  E001: {
    code: 'E001',
    message: '服务未初始化',
    description: 'Service not initialized'
  },
  E002: {
    code: 'E002',
    message: 'API密钥无效',
    description: 'Invalid API key'
  },
  E003: {
    code: 'E003',
    message: '参数验证失败',
    description: 'Parameter validation failed'
  },
  E004: {
    code: 'E004',
    message: '必填参数缺失',
    description: 'Required parameter missing'
  },
  E005: {
    code: 'E005',
    message: '参数类型错误',
    description: 'Parameter type error'
  },
  E006: {
    code: 'E006',
    message: '参数值超出范围',
    description: 'Parameter value out of range'
  },
  E007: {
    code: 'E007',
    message: 'API调用失败',
    description: 'API call failed'
  },
  E008: {
    code: 'E008',
    message: '网络请求超时',
    description: 'Network request timeout'
  },
  E009: {
    code: 'E009',
    message: '响应解析失败',
    description: 'Response parsing failed'
  },
  E010: {
    code: 'E010',
    message: '服务不可用',
    description: 'Service unavailable'
  },
  E011: {
    code: 'E011',
    message: '配置加载失败',
    description: 'Configuration loading failed'
  },
  E012: {
    code: 'E012',
    message: '不支持的API类型',
    description: 'Unsupported API type'
  },
  E013: {
    code: 'E013',
    message: '任务执行超时',
    description: 'Task execution timeout'
  },
  E014: {
    code: 'E014',
    message: '任务执行失败',
    description: 'Task execution failed'
  },
  E015: {
    code: 'E015',
    message: '任务被取消',
    description: 'Task was canceled'
  }
}

module.exports = ErrorCodes
module.exports.getError = getError
module.exports.getErrorMessage = getErrorMessage
module.exports.ErrorCodeKeys = ErrorCodeKeys
