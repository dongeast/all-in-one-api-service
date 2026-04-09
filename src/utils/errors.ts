/**
 * 统一错误处理体系
 */

/**
 * 错误码定义
 */
export enum ErrorCode {
  // 系统错误 (E001-E099)
  UNKNOWN_ERROR = 'E001',
  INTERNAL_ERROR = 'E002',
  NOT_IMPLEMENTED = 'E003',
  
  // 配置错误 (E100-E199)
  CONFIG_NOT_FOUND = 'E100',
  CONFIG_INVALID = 'E101',
  CONFIG_PARSE_ERROR = 'E102',
  API_KEY_MISSING = 'E103',
  
  // 参数错误 (E200-E299)
  PARAM_MISSING = 'E200',
  PARAM_INVALID = 'E201',
  PARAM_TYPE_ERROR = 'E202',
  PARAM_OUT_OF_RANGE = 'E203',
  PARAM_VALIDATION_FAILED = 'E204',
  PARAM_MUTUALLY_EXCLUSIVE = 'E205',
  PARAM_DEPENDENCY_NOT_MET = 'E206',
  
  // 网络错误 (E300-E399)
  NETWORK_ERROR = 'E300',
  TIMEOUT_ERROR = 'E301',
  CONNECTION_ERROR = 'E302',
  
  // API错误 (E400-E499)
  API_ERROR = 'E400',
  API_NOT_FOUND = 'E401',
  API_UNAUTHORIZED = 'E402',
  API_FORBIDDEN = 'E403',
  API_RATE_LIMIT = 'E404',
  API_SERVER_ERROR = 'E405',
  API_RESPONSE_ERROR = 'E406',
  
  // 任务错误 (E500-E599)
  TASK_NOT_FOUND = 'E500',
  TASK_FAILED = 'E501',
  TASK_TIMEOUT = 'E502',
  TASK_CANCELLED = 'E503',
  
  // 元数据错误 (E600-E699)
  METADATA_NOT_FOUND = 'E600',
  METADATA_INVALID = 'E601',
  FUNCTION_NOT_FOUND = 'E602',
  MODEL_NOT_FOUND = 'E603',
  PROVIDER_NOT_FOUND = 'E604'
}

/**
 * API 错误基类
 */
export class APIError extends Error {
  public readonly code: ErrorCode
  public readonly details?: any
  public readonly timestamp: number
  public readonly requestId?: string | undefined

  constructor(
    code: ErrorCode,
    message: string,
    details?: any,
    requestId?: string
  ) {
    super(message)
    this.name = 'APIError'
    this.code = code
    this.details = details
    this.timestamp = Date.now()
    this.requestId = requestId
    
    // 保持正确的堆栈跟踪
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError)
    }
  }

  /**
   * 转换为 JSON 格式
   */
  toJSON(): any {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      details: this.details,
      timestamp: this.timestamp,
      requestId: this.requestId,
      stack: this.stack
    }
  }

  /**
   * 创建用户友好的错误消息
   */
  toUserMessage(): string {
    return `[${this.code}] ${this.message}`
  }
}

/**
 * 配置错误
 */
export class ConfigError extends APIError {
  constructor(
    code: ErrorCode,
    message: string,
    details?: any
  ) {
    super(code, message, details)
    this.name = 'ConfigError'
  }
}

/**
 * 参数错误
 */
export class ParamError extends APIError {
  constructor(
    code: ErrorCode,
    message: string,
    details?: any
  ) {
    super(code, message, details)
    this.name = 'ParamError'
  }

  /**
   * 创建参数缺失错误
   */
  static missing(paramName: string): ParamError {
    return new ParamError(
      ErrorCode.PARAM_MISSING,
      `缺少必填参数: ${paramName}`,
      { paramName }
    )
  }

  /**
   * 创建参数无效错误
   */
  static invalid(paramName: string, reason: string): ParamError {
    return new ParamError(
      ErrorCode.PARAM_INVALID,
      `参数 ${paramName} 无效: ${reason}`,
      { paramName, reason }
    )
  }

  /**
   * 创建参数类型错误
   */
  static typeError(paramName: string, expectedType: string, actualType: string): ParamError {
    return new ParamError(
      ErrorCode.PARAM_TYPE_ERROR,
      `参数 ${paramName} 类型错误: 期望 ${expectedType}, 实际 ${actualType}`,
      { paramName, expectedType, actualType }
    )
  }

  /**
   * 创建参数超出范围错误
   */
  static outOfRange(paramName: string, min?: number, max?: number): ParamError {
    const range = min !== undefined && max !== undefined 
      ? ` (${min} - ${max})`
      : min !== undefined 
        ? ` (最小值: ${min})`
        : max !== undefined 
          ? ` (最大值: ${max})`
          : ''
    
    return new ParamError(
      ErrorCode.PARAM_OUT_OF_RANGE,
      `参数 ${paramName} 超出范围${range}`,
      { paramName, min, max }
    )
  }
}

/**
 * 网络错误
 */
export class NetworkError extends APIError {
  constructor(
    code: ErrorCode,
    message: string,
    details?: any
  ) {
    super(code, message, details)
    this.name = 'NetworkError'
  }

  /**
   * 创建超时错误
   */
  static timeout(timeout: number): NetworkError {
    return new NetworkError(
      ErrorCode.TIMEOUT_ERROR,
      `请求超时 (${timeout}ms)`,
      { timeout }
    )
  }

  /**
   * 创建连接错误
   */
  static connection(url: string, reason?: string): NetworkError {
    return new NetworkError(
      ErrorCode.CONNECTION_ERROR,
      `连接失败: ${url}${reason ? ` - ${reason}` : ''}`,
      { url, reason }
    )
  }
}

/**
 * API 调用错误
 */
export class APICallError extends APIError {
  public readonly statusCode?: number | undefined
  public readonly provider?: string | undefined

  constructor(
    code: ErrorCode,
    message: string,
    details?: any,
    statusCode?: number,
    provider?: string
  ) {
    super(code, message, details)
    this.name = 'APICallError'
    this.statusCode = statusCode
    this.provider = provider
  }

  /**
   * 创建未授权错误
   */
  static unauthorized(provider: string): APICallError {
    return new APICallError(
      ErrorCode.API_UNAUTHORIZED,
      `${provider} API 未授权`,
      { provider },
      401,
      provider
    )
  }

  /**
   * 创建限流错误
   */
  static rateLimit(provider: string, retryAfter?: number): APICallError {
    return new APICallError(
      ErrorCode.API_RATE_LIMIT,
      `${provider} API 请求限流${retryAfter ? `, 请在 ${retryAfter} 秒后重试` : ''}`,
      { provider, retryAfter },
      429,
      provider
    )
  }

  /**
   * 创建服务器错误
   */
  static serverError(provider: string, statusCode: number, message?: string): APICallError {
    return new APICallError(
      ErrorCode.API_SERVER_ERROR,
      `${provider} API 服务器错误 (${statusCode})${message ? `: ${message}` : ''}`,
      { provider, statusCode, message },
      statusCode,
      provider
    )
  }
}

/**
 * 任务错误
 */
export class TaskError extends APIError {
  public readonly taskId?: string | undefined

  constructor(
    code: ErrorCode,
    message: string,
    details?: any,
    taskId?: string
  ) {
    super(code, message, details)
    this.name = 'TaskError'
    this.taskId = taskId
  }

  /**
   * 创建任务失败错误
   */
  static failed(taskId: string, reason?: string): TaskError {
    return new TaskError(
      ErrorCode.TASK_FAILED,
      `任务 ${taskId} 失败${reason ? `: ${reason}` : ''}`,
      { taskId, reason },
      taskId
    )
  }

  /**
   * 创建任务超时错误
   */
  static timeout(taskId: string, timeout: number): TaskError {
    return new TaskError(
      ErrorCode.TASK_TIMEOUT,
      `任务 ${taskId} 超时 (${timeout}ms)`,
      { taskId, timeout },
      taskId
    )
  }
}

/**
 * 元数据错误
 */
export class MetadataError extends APIError {
  constructor(
    code: ErrorCode,
    message: string,
    details?: any
  ) {
    super(code, message, details)
    this.name = 'MetadataError'
  }

  /**
   * 创建 Function 未找到错误
   */
  static functionNotFound(name: string): MetadataError {
    return new MetadataError(
      ErrorCode.FUNCTION_NOT_FOUND,
      `Function 未找到: ${name}`,
      { name }
    )
  }

  /**
   * 创建 Model 未找到错误
   */
  static modelNotFound(name: string): MetadataError {
    return new MetadataError(
      ErrorCode.MODEL_NOT_FOUND,
      `Model 未找到: ${name}`,
      { name }
    )
  }

  /**
   * 创建 Provider 未找到错误
   */
  static providerNotFound(name: string): MetadataError {
    return new MetadataError(
      ErrorCode.PROVIDER_NOT_FOUND,
      `Provider 未找到: ${name}`,
      { name }
    )
  }
}

/**
 * 错误工厂函数
 */
export class ErrorFactory {
  /**
   * 从原生错误创建 APIError
   */
  static fromError(error: Error | string | any): APIError {
    if (error instanceof APIError) {
      return error
    }

    if (typeof error === 'string') {
      return new APIError(ErrorCode.UNKNOWN_ERROR, error)
    }

    if (error instanceof Error) {
      const apiError = new APIError(
        (error as any).code || ErrorCode.UNKNOWN_ERROR,
        error.message,
        error.stack
      )
      return apiError
    }

    return new APIError(
      ErrorCode.UNKNOWN_ERROR,
      String(error),
      error
    )
  }

  /**
   * 从 HTTP 响应创建错误
   */
  static fromHTTPResponse(
    statusCode: number,
    responseBody: any,
    provider?: string
  ): APICallError {
    const message = responseBody?.message || responseBody?.error?.message || `HTTP ${statusCode}`
    
    switch (statusCode) {
      case 401:
        return APICallError.unauthorized(provider || 'Unknown')
      case 403:
        return new APICallError(
          ErrorCode.API_FORBIDDEN,
          `${provider || 'Unknown'} API 访问被禁止`,
          { provider, responseBody },
          statusCode,
          provider
        )
      case 404:
        return new APICallError(
          ErrorCode.API_NOT_FOUND,
          `${provider || 'Unknown'} API 未找到`,
          { provider, responseBody },
          statusCode,
          provider
        )
      case 429:
        return APICallError.rateLimit(
          provider || 'Unknown',
          responseBody?.retry_after
        )
      default:
        if (statusCode >= 500) {
          return APICallError.serverError(provider || 'Unknown', statusCode, message)
        }
        return new APICallError(
          ErrorCode.API_ERROR,
          message,
          { provider, statusCode, responseBody },
          statusCode,
          provider
        )
    }
  }
}

/**
 * 错误处理辅助函数
 */

/**
 * 判断是否为可重试错误
 */
export function isRetryableError(error: APIError): boolean {
  const retryableCodes = [
    ErrorCode.NETWORK_ERROR,
    ErrorCode.TIMEOUT_ERROR,
    ErrorCode.CONNECTION_ERROR,
    ErrorCode.API_RATE_LIMIT,
    ErrorCode.API_SERVER_ERROR
  ]
  
  return retryableCodes.includes(error.code)
}

/**
 * 判断是否为客户端错误
 */
export function isClientError(error: APIError): boolean {
  const clientErrorCodes = [
    ErrorCode.PARAM_MISSING,
    ErrorCode.PARAM_INVALID,
    ErrorCode.PARAM_TYPE_ERROR,
    ErrorCode.PARAM_OUT_OF_RANGE,
    ErrorCode.PARAM_VALIDATION_FAILED,
    ErrorCode.API_UNAUTHORIZED,
    ErrorCode.API_FORBIDDEN
  ]
  
  return clientErrorCodes.includes(error.code)
}

/**
 * 判断是否为服务端错误
 */
export function isServerError(error: APIError): boolean {
  const serverErrorCodes = [
    ErrorCode.INTERNAL_ERROR,
    ErrorCode.API_SERVER_ERROR,
    ErrorCode.NETWORK_ERROR,
    ErrorCode.TIMEOUT_ERROR
  ]
  
  return serverErrorCodes.includes(error.code)
}
