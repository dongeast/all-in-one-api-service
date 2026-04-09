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

export interface FunctionMetadata {
  name: string
  displayName: string
  description: string
  provider: string
  apiName: string
  type: string
  inputSchema?: Record<string, ParamSchema>
  outputSchema?: Record<string, ParamSchema>
  models?: string[]
  tags?: string[]
  [key: string]: any
}

export interface APIMetadata {
  name: string
  displayName: string
  description: string
  provider: string
  type: string
  inputSchema?: Record<string, ParamSchema>
  outputSchema?: Record<string, ParamSchema>
  models?: string[]
  tags?: string[]
  [key: string]: any
}

export interface ModelMetadata {
  name: string
  displayName: string
  description: string
  provider: string
  series?: string
  type: string
  capabilities?: string[]
  tags?: string[]
  [key: string]: any
}

export interface ProviderMeta {
  name: string
  displayName: string
  description: string
  region: string
  website: string
  supportedTypes: string[]
}

export interface SeriesMeta {
  name: string
  displayName: string
  description: string
  provider: string
  mediaType: string
}

export const APITypes: {
  TEXT_TO_IMAGE: string
  IMAGE_TO_IMAGE: string
  IMAGE_EDITING: string
  IMAGE_UPSCALING: string
  TEXT_TO_VIDEO: string
  IMAGE_TO_VIDEO: string
  AUDIO_TO_VIDEO: string
  VIDEO_EDITING: string
  VIDEO_EXTENSION: string
  TEXT_TO_AUDIO: string
  TEXT_TO_SPEECH: string
  SPEECH_TO_TEXT: string
  AUDIO_GENERATION: string
  MUSIC_GENERATION: string
  SONG_GENERATION: string
  INSTRUMENTAL_GENERATION: string
  VOCAL_CLONING: string
  TEXT_GENERATION: string
  TEXT_EDITING: string
  IMAGE_TO_3D: string
  TEXT_TO_3D: string
  TASK_QUERY: string
  FILE_UPLOAD: string
  AVATAR_GENERATION: string
  LIP_SYNC: string
}

export const MediaTypes: {
  TEXT: string
  IMAGE: string
  VIDEO: string
  AUDIO: string
  AUDIO_3D: string
}

export const InputOutputTypes: Record<string, { input: string; output: string }>

export const ModelTags: Record<string, string>
export const APITags: Record<string, string>
export const ProviderTags: Record<string, string>

export const Providers: {
  LTX: string
  VOLCENGINE: string
  SKYREELS: string
  MUREKA: string
}

export const ProviderPriority: Record<string, number>

export const Languages: {
  ZH: string
  EN: string
}

export const DEFAULT_LANGUAGE: string

export const LanguageNames: Record<string, string>
export const LanguageAliases: Record<string, string[]>

export const Series: {
  LTX: string
  SKYREELS: string
  MUREKA: string
  SEEDANCE: string
  SEEDREAM: string
  SEED3D: string
}

export function getProviderPriority(provider: string): number
export function sortByProviderPriority(items: Array<{ provider: string }>): Array<{ provider: string }>
export function getHighestPriorityProvider(providers: string[]): string | null
export function normalizeLanguage(language: string): string

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

export class APIDefinition {
  constructor(options?: {
    name?: string
    endpoint?: string
    method?: string
    paramSchema?: Record<string, ParamSchema>
    modelName?: string
    isAsync?: boolean
    outputMapping?: any
  })
  getDefinition(): {
    name: string
    endpoint: string
    method: string
    modelName: string
    isAsync: boolean
    paramSchema: Record<string, ParamSchema>
    outputMapping: any
  }
  getParamSchema(): Record<string, ParamSchema>
  getInputSchema(): Record<string, ParamSchema>
  getOutputSchema(): Record<string, ParamSchema>
  getInputInfo(): ParamInfo[]
  getOutputInfo(): ParamInfo[]
  getParamDetail(paramName: string): ParamInfo | null
  validateParams(params: Record<string, any>): ValidationResult
  transformParams(params: Record<string, any>): Record<string, any>
  extractOutput(response: any): Record<string, any>
  prepareAPIParams(params: Record<string, any>): Record<string, any>
  getParamConfig(context?: Record<string, any>): any
  getModelParamOptions(model?: string): any | null
  getAvailableOptions(model: string, context?: Record<string, any>): any | null
}

export class BaseFunction {
  constructor(service: BaseService, metadata: FunctionMetadata)
  isAsync(): boolean
  getAPIDefinition(apiType: string): any | null
  request(params?: Record<string, any>, options?: any): Promise<any>
  response(taskId: string, options?: any): Promise<any>
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

export interface RegistryOptions {
  itemName?: string
  idField?: string
  indexFields?: string[]
}

export interface QueryOptions {
  provider?: string
  type?: string
  tags?: string | string[]
  model?: string
  category?: string
  asyncOnly?: boolean
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface StatsInfo {
  total: number
  byField: Record<string, Record<string, number>>
}

export class BaseRegistry {
  constructor(options?: RegistryOptions)
  register(itemMeta: any): void
  registerAll(items: Record<string, any>): void
  get(id: string): any | null
  getByField(field: string, value: string, options?: QueryOptions): any[]
  getByCriteria(criteria: Record<string, any>, options?: QueryOptions): any[]
  getAll(options?: QueryOptions): any[]
  has(id: string): boolean
  size(): number
  getIndexValues(field: string): string[]
  clear(): void
  getStats(groupByFields?: string[]): StatsInfo
}

export class APIRegistry extends BaseRegistry {
  constructor()
  getByType(type: string, options?: QueryOptions): any[]
  getByModel(model: string, options?: QueryOptions): any[]
  getByProvider(provider: string): any[]
  getByTags(tags: string | string[], options?: QueryOptions): any[]
  getByCategory(category: string, options?: QueryOptions): any[]
  getBestAPI(type: string, model?: string, options?: QueryOptions): any | null
  getEndpoint(apiName: string): string | null
  getMethod(apiName: string): string
  getType(apiName: string): string | null
  getParamSchema(apiName: string): Record<string, ParamSchema> | null
  getCallInfo(apiName: string): {
    name: string
    endpoint: string
    method: string
    type: string
    provider: string
    category: string
    paramSchema: Record<string, ParamSchema>
    models: string[]
    tags: string[]
    priority: number
  } | null
  validateAPI(apiName: string): boolean
  getAllEndpoints(): string[]
  getByEndpoint(endpoint: string): any | null
  getInputSchema(apiName: string): Record<string, ParamSchema>
  getOutputSchema(apiName: string): Record<string, ParamSchema>
  validateParams(apiName: string, params: Record<string, any>): ValidationResult
}

export class ModelRegistry extends BaseRegistry {
  constructor()
  getByType(type: string, options?: QueryOptions): any[]
  getByTags(tags: string | string[], options?: QueryOptions): any[]
  getByProvider(provider: string): any[]
}

export class FunctionRegistry extends BaseRegistry {
  constructor()
  getByType(type: string, options?: QueryOptions): any[]
  getByModel(model: string, options?: QueryOptions): any[]
  getByProvider(provider: string): any[]
  getByCategory(category: string, options?: QueryOptions): any[]
  getBestFunction(type: string, model?: string, options?: QueryOptions): any | null
  getByAPI(apiName: string): any | null
  getRelatedAPIs(functionName: string): { request: string | null; query: string | null } | null
  getSupportedTypes(): string[]
  getSupportedCategories(): string[]
  getStats(): StatsInfo & { asyncCount: number; syncCount: number }
}

export class CacheItem {
  constructor(data: any, ttl?: number)
  isExpired(): boolean
  access(): any
  timestamp: number
  ttl: number
  accessCount: number
}

export class CacheManager {
  constructor(options?: {
    defaultTTL?: number
    defaultMaxSize?: number
    enabled?: boolean
  })
  getOrCreateCache(name: string, options?: { maxSize?: number; ttl?: number }): any
  generateKey(namespace: string, key: string, suffix?: string): string
  get(namespace: string, key: string): any
  set(namespace: string, key: string, value: any, ttl?: number): void
  has(namespace: string, key: string): boolean
  delete(namespace: string, key: string): boolean
  clear(namespace?: string): void
  getStats(namespace?: string): any
  enable(): void
  disable(): void
}

export class ConfigManager {
  constructor(options?: ConfigOptions)
  load(): Promise<GlobalConfig>
  getProviderConfig(provider: string): Promise<ProviderConfig>
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
  export class LTX extends BaseService {}
  export class Volcengine extends BaseService {}
  export class Skyreels extends BaseService {}
  export class Mureka extends BaseService {}
  export class Custom extends BaseService {}
}

export namespace APIs {}

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
  export { CacheManager, CacheItem }
}

export const cacheManager: CacheManager

export namespace Constants {
  export {
    APITypes,
    MediaTypes,
    InputOutputTypes,
    ModelTags,
    APITags,
    ProviderTags,
    Providers,
    ProviderPriority,
    ProviderMeta,
    getProviderPriority,
    sortByProviderPriority,
    getHighestPriorityProvider,
    Languages,
    DEFAULT_LANGUAGE,
    LanguageNames,
    LanguageAliases,
    normalizeLanguage,
    Series,
    SeriesMeta
  }
}
export namespace Functions {
  export { BaseFunction, FunctionManager }
}

export namespace APIs {
  export { APIDefinition }
}

export namespace Registry {
  export {
    BaseRegistry,
    APIRegistry,
    ModelRegistry,
    FunctionRegistry,
    RegistryOptions,
    QueryOptions,
    StatsInfo
  }
}

export const apiRegistry: APIRegistry
export const modelRegistry: ModelRegistry
export const functionRegistry: FunctionRegistry

export function setLanguage(language: string): void
export function getLanguage(): string
export function t(key: string, params?: Record<string, any>): string

export function getFunction(name: string, language?: string): FunctionMetadata | null
export function getFunctions(options?: Record<string, any>, language?: string): FunctionMetadata[]
export function getFunctionByAPI(apiName: string, language?: string): FunctionMetadata | null
export function getAPI(name: string, language?: string): APIMetadata | null
export function getAPIs(options?: Record<string, any>, language?: string): APIMetadata[]
export function getModel(name: string, language?: string): ModelMetadata | null
export function getModels(options?: Record<string, any>, language?: string): ModelMetadata[]
export function getBestFunction(type: string, model?: string, options?: Record<string, any>, language?: string): FunctionMetadata | null
export function getBestAPI(type: string, model?: string, options?: Record<string, any>, language?: string): APIMetadata | null

export function executeFunction(name: string, params: Record<string, any>, options?: Record<string, any>): Promise<APIResult>
export function queryFunctions(options?: Record<string, any>, language?: string): FunctionMetadata[]
export function getFunctionDetail(name: string, language?: string): FunctionMetadata | null
export function getBestFunctionInstance(type: string, model?: string, options?: Record<string, any>, language?: string): BaseAPI | null

export const metadataManager: {
  getFunction(name: string, language?: string): FunctionMetadata | null
  getFunctions(options?: Record<string, any>, language?: string): FunctionMetadata[]
  getFunctionByAPI(apiName: string, language?: string): FunctionMetadata | null
  getAPI(name: string, language?: string): APIMetadata | null
  getAPIs(options?: Record<string, any>, language?: string): APIMetadata[]
  getModel(name: string, language?: string): ModelMetadata | null
  getModels(options?: Record<string, any>, language?: string): ModelMetadata[]
  getBestFunction(type: string, model?: string, options?: Record<string, any>, language?: string): FunctionMetadata | null
  getBestAPI(type: string, model?: string, options?: Record<string, any>, language?: string): APIMetadata | null
}

export const functionManager: {
  execute(name: string, params: Record<string, any>, options?: Record<string, any>): Promise<APIResult>
  query(options?: Record<string, any>, language?: string): FunctionMetadata[]
  getDetail(name: string, language?: string): FunctionMetadata | null
  getBest(type: string, model?: string, options?: Record<string, any>, language?: string): BaseAPI | null
}

export const QueryService: typeof functionManager
