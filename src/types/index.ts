/**
 * 基础类型定义
 */

/**
 * API 结果类型
 */
export interface APIResult<T = any> {
  success: boolean
  data?: T
  error?: APIError
  metadata?: ResultMetadata
}

/**
 * API 错误类型
 */
export interface APIError {
  code: string
  message: string
  details?: any
}

/**
 * 结果元数据
 */
export interface ResultMetadata {
  requestId: string
  timestamp: number
  duration: number
  provider: string
  model: string
  usage?: Usage
}

/**
 * Token 使用情况
 */
export interface Usage {
  promptTokens: number
  completionTokens: number
  totalTokens: number
}

/**
 * 流式结果类型
 */
export interface StreamResult<T = any> {
  success: boolean
  data?: T
  error?: APIError
  metadata?: StreamMetadata
}

/**
 * 流式元数据
 */
export interface StreamMetadata {
  requestId: string
  timestamp: number
  provider: string
  model?: string
  chunkIndex?: number
  isStream?: boolean
}

/**
 * 参数模式
 */
export interface ParamSchema {
  input?: Record<string, InputParam>
  output?: Record<string, OutputParam>
  modelCapabilities?: Record<string, any>
}

/**
 * 输入参数定义
 */
export interface InputParam {
  type: ParamType
  required?: boolean
  description?: string
  default?: any
  options?: any[]
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  pattern?: string
  integer?: boolean
  itemSchema?: ParamSchema
  properties?: Record<string, ParamSchema>
}

/**
 * 输出参数定义
 */
export interface OutputParam {
  type: ParamType
  description?: string
  path?: string
  required?: boolean
}

/**
 * 参数类型枚举
 */
export type ParamType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'enum'
  | 'array'
  | 'object'
  | 'file'
  | 'any'

/**
 * 验证结果
 */
export interface ValidationResult {
  valid: boolean
  errors: string[]
}

/**
 * 服务配置
 */
export interface ServiceConfig {
  apiKey?: string
  apiToken?: string
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
  retryCount?: number
  retryDelay?: number
  logger?: Logger
}

/**
 * 日志接口
 */
export interface Logger {
  debug(message: string, data?: any): void
  info(message: string, data?: any): void
  warn(message: string, data?: any): void
  error(message: string, error?: Error | any): void
}

/**
 * API 定义
 */
export interface APIDefinition {
  name: string
  endpoint: string
  method?: string
  modelName: string
  isAsync?: boolean
  paramSchema?: ParamSchema
  outputMapping?: Record<string, string>
}

/**
 * Function 元数据
 */
export interface FunctionMetadata {
  name: string
  displayName: string
  description: string
  type: 'sync' | 'async'
  provider: string
  models?: string[]
  category?: string
  priority?: number
  tags?: string[]
  apis?: {
    request?: string
    query?: string
  }
  methods?: Record<string, MethodDefinition>
  inputSchema?: Record<string, InputParam>
  outputSchema?: Record<string, OutputParam>
}

/**
 * 方法定义
 */
export interface MethodDefinition {
  description?: string
  input?: Record<string, InputParam>
  output?: Record<string, OutputParam>
}

/**
 * 模型元数据
 */
export interface ModelMetadata {
  name: string
  displayName: string
  description?: string
  provider: string
  type?: string
  mediaType?: string
  series?: string
  priority?: number
  tags?: string[]
  capabilities?: Record<string, any>
}

/**
 * 配置对象
 */
export interface Config {
  version?: string
  providers?: Record<string, ProviderConfig>
  logLevel?: string
  logFormat?: string
  logFile?: string
}

/**
 * 服务商配置
 */
export interface ProviderConfig {
  apiKey?: string
  apiToken?: string
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
  retryCount?: number
  retryDelay?: number
}

/**
 * 参数配置
 */
export interface ParamConfig {
  apiName: string
  modelName: string
  parameters: ParameterInfo[]
  state: ParamState
  hasModelCapabilities: boolean
  modelCapabilities?: Record<string, any>
}

/**
 * 参数信息
 */
export interface ParameterInfo {
  name: string
  type: string
  required: boolean
  description: string
  default?: any
  dependencies: string[]
  affects: string[]
  visible: boolean
  enabled: boolean
  constraintSource: string | null
  options?: any[]
  min?: number
  max?: number
  step?: number
  minLength?: number
  maxLength?: number
}

/**
 * 参数状态
 */
export interface ParamState {
  complete: boolean
  missingParams: string[]
  providedParams: string[]
  enabledParams: string[]
  nextParam: string | null
  progress: number
}

/**
 * 带上下文的验证结果
 */
export interface ValidationWithContextResult {
  valid: boolean
  errors: Array<{
    message: string
    suggestions: Record<string, any>
  }>
  state: ParamState
}
