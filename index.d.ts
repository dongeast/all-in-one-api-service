/**
 * TypeScript 类型定义
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
  [key: string]: any
}

export interface APIResult<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  metadata?: {
    requestId: string
    timestamp: number
    duration?: number
    provider: string
    model?: string
    usage?: {
      promptTokens?: number
      completionTokens?: number
      totalTokens?: number
      inputTokens?: number
      outputTokens?: number
    }
  }
}

export interface StreamResult<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  metadata?: {
    requestId: string
    timestamp: number
    provider: string
    model?: string
    chunkIndex?: number
    isStream?: boolean
  }
}

export interface StreamChunk {
  content: string
  role?: string
  finishReason?: string | null
  done?: boolean
  usage?: {
    promptTokens?: number
    completionTokens?: number
    totalTokens?: number
  }
}

export interface SSEEvent {
  type: string
  data: string
  id?: string
  retry?: number
}

export interface ParamSchema {
  type: 'string' | 'number' | 'boolean' | 'enum' | 'array' | 'object'
  required?: boolean
  default?: any
  description?: string
  path?: string
  options?: any[]
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  integer?: boolean
  transform?: (value: any) => any
  customValidator?: (value: any) => ValidationResult
  dependsOn?: Record<string, any>
  [key: string]: any
}

export interface ParamInfo {
  name: string
  type: string
  required?: boolean
  default?: any
  description?: string
  options?: any[]
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  [key: string]: any
}

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export interface ConfigOptions {
  projectPath?: string
  globalPath?: string
  envPrefix?: string
  configDir?: string
}

export interface ProviderConfig {
  apiKey?: string
  apiToken?: string
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
  retryCount?: number
  retryDelay?: number
  models?: Record<string, any>
  [key: string]: any
}

export interface GlobalConfig {
  version?: string
  defaultProvider?: string
  providers?: Record<string, ProviderConfig>
  logging?: {
    level?: 'debug' | 'info' | 'warn' | 'error' | 'silent'
    format?: 'json' | 'text'
    output?: ('console' | 'file')[]
    file?: string
  }
  [key: string]: any
}

export interface LoggerOptions {
  level?: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'SILENT'
  format?: 'json' | 'text'
  output?: ('console' | 'file')[]
  file?: string
  maxSize?: number
  maxFiles?: number
}

export interface Logger {
  debug(message: string, data?: any): void
  info(message: string, data?: any): void
  warn(message: string, data?: any): void
  error(message: string, error?: any): void
  child(name: string): Logger
  close(): void
}

export class BaseService {
  constructor(config: ServiceConfig)
  initialize(): Promise<void>
  call(endpoint: string, params: any, options?: any): Promise<any>
  callStream(endpoint: string, params: any, options?: any): AsyncGenerator<any, void, unknown>
  healthCheck(): Promise<boolean>
  getProviderInfo(): { name: string; baseURL: string; initialized: boolean }
  getApiKey(): string | null
  getBaseURL(): string
  getHeaders(): Record<string, string>
}

export class BaseAPI<T = any> {
  constructor(service: BaseService, paramSchema?: Record<string, ParamSchema>)
  execute(params: Record<string, any>, options?: any): Promise<APIResult<T>>
  executeStream(params: Record<string, any>, options?: any): AsyncGenerator<StreamResult<T>, void, unknown>
  validateParams(params: Record<string, any>): ValidationResult
  getParamSchema(): Record<string, ParamSchema>
  getInputSchema(): Record<string, ParamSchema>
  getOutputSchema(): Record<string, ParamSchema>
  getInputInfo(): ParamInfo[]
  getOutputInfo(): ParamInfo[]
  getParamDetail(paramName: string): ParamInfo | null
  generateDocs(format?: 'markdown' | 'json' | 'html'): string
}

export class BaseParam {
  constructor(schema: { input?: Record<string, ParamSchema>; output?: Record<string, ParamSchema> })
  validate(params: any): ValidationResult
  transform(params: any): any
  getSchema(): { input: Record<string, ParamSchema>; output: Record<string, ParamSchema> }
  getInputSchema(): Record<string, ParamSchema>
  getOutputSchema(): Record<string, ParamSchema>
  extractOutput(rawResponse: any): Record<string, any>
  extractField(rawResponse: any, fieldName: string): any
  getInputInfo(): ParamInfo[]
  getOutputInfo(): ParamInfo[]
  getParamDetail(paramName: string): ParamInfo | null
  override(newConfig: any): BaseParam
  extend(newFields: any): BaseParam
  omit(fields: { input?: string[]; output?: string[] }): BaseParam
  pick(fields: { input?: string[]; output?: string[] }): BaseParam
  static create(schema: any): BaseParam
  static override(baseSchema: any, overrideConfig: any): any
  static extend(baseSchema: any, newFields: any): any
  static omit(baseSchema: any, fields: any): any
  static pick(baseSchema: any, fields: any): any
  static compose(...schemas: any[]): any
  static inherit(parentSchema: any, childConfig: any): any
  static fromTemplate(template: any): any
}

export class ConfigManager {
  constructor(options?: ConfigOptions)
  load(): Promise<GlobalConfig>
  getProviderConfig(provider: string): ProviderConfig
  getGlobalConfig(): GlobalConfig
  get(path: string, defaultValue?: any): any
  set(path: string, value: any): void
  merge(override: Partial<GlobalConfig>): GlobalConfig
  setCodeConfig(config: any): void
  validate(config: GlobalConfig): ValidationResult
  reset(): void
  export(format?: 'json' | 'env'): string
  getAvailableProviders(): string[]
  hasProviderConfig(provider: string): boolean
  clone(): GlobalConfig
}

export namespace Services {
  export class OpenAI extends BaseService {}
  export class Stability extends BaseService {}
  export class Replicate extends BaseService {}
  export class Gemini extends BaseService {}
  export class Anthropic extends BaseService {}
  export class Midjourney extends BaseService {}
  export class Custom extends BaseService {}
}

export namespace APIs {
  export namespace OpenAI {
    export namespace Image {
      export class DallE2 extends BaseAPI {}
      export class DallE3 extends BaseAPI {}
    }
    export namespace Text {
      export class GPT35Turbo extends BaseAPI {}
      export class GPT4 extends BaseAPI {}
      export class GPT4Turbo extends BaseAPI {}
    }
    export namespace Video {
      export class Sora extends BaseAPI {}
    }
    export namespace Audio {
      export class TTS1 extends BaseAPI {}
      export class Whisper1 extends BaseAPI {}
    }
  }

  export namespace Stability {
    export namespace Image {
      export class StableDiffusionXL extends BaseAPI {}
      export class StableImageCore extends BaseAPI {}
    }
  }

  export namespace Replicate {
    export namespace Image {
      export class Flux extends BaseAPI {}
    }
    export namespace Video {
      export class StableVideo extends BaseAPI {}
    }
  }

  export namespace Gemini {
    export namespace Text {
      export class GeminiPro extends BaseAPI {}
      export class GeminiUltra extends BaseAPI {}
    }
    export namespace Image {
      export class Imagen extends BaseAPI {}
    }
  }

  export namespace Anthropic {
    export namespace Text {
      export class Claude3Opus extends BaseAPI {}
      export class Claude3Sonnet extends BaseAPI {}
      export class Claude3Haiku extends BaseAPI {}
    }
  }

  export namespace Midjourney {
    export namespace Image {
      export class MidjourneyV6 extends BaseAPI {}
    }
  }
}

export namespace Params {
  export { BaseParam, ParamSchema, ParamInfo, ValidationResult }

  export namespace Templates {
    export const textPrompt: Record<string, ParamSchema>
    export const imageSize: Record<string, ParamSchema>
    export const seed: Record<string, ParamSchema>
    export const negativePrompt: Record<string, ParamSchema>
  }

  export namespace Common {
    export const baseSchemas: Record<string, ParamSchema>
    export const image: { input: Record<string, ParamSchema>; output: Record<string, ParamSchema> }
    export const video: { input: Record<string, ParamSchema>; output: Record<string, ParamSchema> }
    export const text: { input: Record<string, ParamSchema>; output: Record<string, ParamSchema> }
    export const audio: { input: Record<string, ParamSchema>; output: Record<string, ParamSchema> }
  }

  export namespace Schemas {
    export namespace OpenAI {
      export const image: any
      export const text: any
      export const video: any
      export const audio: any
    }
    export namespace Stability {
      export const image: any
    }
    export namespace Replicate {
      export const image: any
      export const video: any
    }
    export namespace Gemini {
      export const text: any
      export const image: any
    }
    export namespace Anthropic {
      export const text: any
    }
    export namespace Midjourney {
      export const image: any
    }
  }
}

export namespace Config {
  export { ConfigManager, ConfigOptions, ProviderConfig, GlobalConfig, ValidationResult }
}

export namespace Utils {
  export function parseEnv(prefix?: string): Record<string, any>
  export function deepMerge(target: any, source: any): any
  export function deepClone(obj: any): any
  export function getValueByPath(obj: any, path: string, defaultValue?: any): any
  export function setValueByPath(obj: any, path: string, value: any): void
  export function generateId(prefix?: string): string
  export function sleep(ms: number): Promise<void>
  export function retry(fn: () => Promise<any>, options?: { maxRetries?: number; delay?: number; backoff?: number }): Promise<any>
  export function isEmpty(value: any): boolean
  export function formatError(error: Error | string): { code: string; message: string; details?: any }
  export function createLogger(options?: LoggerOptions): Logger
  export function createLoggerFromEnv(): Logger
}
