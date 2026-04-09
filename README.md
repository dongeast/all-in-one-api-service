# All-in-One API Service

统一的 AI 接口处理模块，提供多平台 AI 服务的统一封装和管理。

## 目录

- [项目架构](#项目架构)
- [安装与配置](#安装与配置)
- [快速开始](#快速开始)
- [核心功能](#核心功能)
- [测试用例](#测试用例)
- [API 文档](#api-文档)

## 项目架构

本项目采用分层架构设计，各层次职责清晰，便于扩展和维护。

### 架构层次说明

```
┌─────────────────────────────────────────────────────────┐
│                    Application Layer                     │
│                   (应用层/入口层)                         │
│  - 统一对外暴露的 API 接口                                │
│  - FunctionManager: 统一的功能管理器                      │
│  - MetadataManager: 元数据管理器                         │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                    Function Layer                        │
│                     (功能层)                             │
│  - BaseFunction: 功能基类                                │
│  - FunctionRegistry: 功能注册中心                        │
│  - APIMapping: API 映射关系管理                          │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                      API Layer                           │
│                    (接口定义层)                           │
│  - APIDefinition: API 定义基类                           │
│  - 参数验证、转换、提取                                   │
│  - 输入输出结构定义                                       │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                    Service Layer                         │
│                     (服务层)                             │
│  - BaseService: 服务基类                                 │
│  - Provider 具体实现 (LTX, Volcengine, Skyreels, Mureka)│
│  - HTTP 请求封装、认证、重试机制                          │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                     Param Layer                          │
│                    (参数层)                              │
│  - BaseParam: 参数基类                                   │
│  - Validators: 参数验证器                                │
│  - Transformers: 参数转换器                              │
│  - Extractors: 输出提取器                                │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                   Infrastructure                         │
│                    (基础设施层)                           │
│  - Config: 配置管理                                      │
│  - Registry: 注册中心 (Model, API)                       │
│  - Constants: 常量定义                                   │
│  - Utils: 工具函数                                       │
│  - Locales: 国际化支持                                   │
└─────────────────────────────────────────────────────────┘
```

### 各层次主要职责

#### 1. 应用层 (Application Layer)

**文件**: `src/index.js`

**职责**:

- 作为整个框架的统一入口
- 导出所有公共 API 和模块
- 提供便捷的快捷方法

**核心组件**:

- `FunctionManager`: 统一的功能管理器，整合 Function 和 QueryService 的功能
- `MetadataManager`: 元数据管理器，提供 Function、API、Model 的查询和翻译功能

#### 2. 功能层 (Function Layer)

**文件**: `src/functions/`

**职责**:

- 定义和管理 AI 功能单元
- 提供功能注册和查询机制
- 管理 Function 与 API 的映射关系

**核心组件**:

- `BaseFunction`: 功能基类，封装执行逻辑
- `FunctionRegistry`: 功能注册中心，管理所有 Function 元数据
- `apiMapping`: API 映射关系管理

#### 3. 接口定义层 (API Layer)

**文件**: `src/apis/`

**职责**:

- 定义 API 的基本信息和参数结构
- 提供参数验证、转换、提取功能
- 管理输入输出数据结构

**核心组件**:

- `APIDefinition`: API 定义基类，纯数据定义层，不包含执行逻辑

#### 4. 服务层 (Service Layer)

**文件**: `src/services/`

**职责**:

- 封装不同 Provider 的 HTTP 请求逻辑
- 处理认证、重试、错误处理
- 提供统一的调用接口

**核心组件**:

- `BaseService`: 服务基类，提供通用功能
- `LTXService`: LTX 平台服务
- `VolcengineService`: 火山引擎服务
- `SkyreelsService`: Skyreels 服务
- `MurekaService`: Mureka 服务

#### 5. 参数层 (Param Layer)

**文件**: `src/params/`

**职责**:

- 定义参数验证规则
- 实现参数转换逻辑
- 提供输出提取功能
- 支持参数模板和复用

**核心组件**:

- `BaseParam`: 参数基类
- `validators`: 参数验证器
- `transformers`: 参数转换器
- `extractors`: 输出提取器
- `templates`: 参数模板

#### 6. 基础设施层 (Infrastructure Layer)

**文件**: `src/config/`, `src/registry/`, `src/constants/`, `src/utils/`, `src/locales/`

**职责**:

- 配置管理: 加载和管理配置文件
- 注册中心: 管理 Model 和 API 的注册和查询
- 常量定义: 定义 API 类型、媒体类型、Provider 等常量
- 工具函数: 提供通用工具方法
- 国际化: 支持多语言翻译

## 安装与配置

### 通过 GitHub 私有库安装

#### 方法一: 使用 npm 安装

1. **配置 .npmrc 文件**

在项目根目录创建或编辑 `.npmrc` 文件:

```bash
# 使用 GitHub Packages
@your-org:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN

# 或者使用 Git URL
all-in-one-api-service=git+https://github.com/your-org/all-in-one-api-service.git
```

1. **获取 GitHub Token**

访问 GitHub Settings → Developer settings → Personal access tokens → Generate new token (classic)

需要的权限:

- `read:packages`: 读取包
- `repo`: 访问私有仓库

1. **安装依赖**

```bash
npm install all-in-one-api-service
# 或
npm install @your-org/all-in-one-api-service
```

#### 方法二: 使用 package.json 直接引用

在 `package.json` 中添加:

```json
{
  "dependencies": {
    "all-in-one-api-service": "git+https://github.com/your-org/all-in-one-api-service.git#v1.0.0"
  }
}
```

或使用 SSH:

```json
{
  "dependencies": {
    "all-in-one-api-service": "git+ssh://git@github.com:your-org/all-in-one-api-service.git#v1.0.0"
  }
}
```

#### 方法三: 使用 pnpm 安装

```bash
# 配置 .npmrc
pnpm config set @your-org:registry https://npm.pkg.github.com
pnpm config set //npm.pkg.github.com/:_authToken YOUR_GITHUB_TOKEN

# 安装
pnpm add all-in-one-api-service
```

### 配置环境变量

创建 `.env` 文件:

```bash
# LTX 配置
LTX_API_KEY=your_ltx_api_key
LTX_BASE_URL=https://api.ltx.video

# Volcengine 配置
VOLCENGINE_API_KEY=your_volcengine_api_key
VOLCENGINE_BASE_URL=https://api.volcengine.com

# Skyreels 配置
SKYREELS_API_KEY=your_skyreels_api_key
SKYREELS_BASE_URL=https://api.skyreels.ai

# Mureka 配置
MUREKA_API_KEY=your_mureka_api_key
MUREKA_BASE_URL=https://api.mureka.ai

# 日志配置
LOG_LEVEL=info
LOG_FORMAT=json
```

## 快速开始

### 基础使用

```javascript
const AI = require('all-in-one-api-service')

// 设置语言
AI.setLanguage('zh')

// 获取所有 Function 列表
const functions = AI.queryFunctions()
console.log('可用功能:', functions.length)

// 获取指定 Function 详情
const funcDetail = AI.getFunctionDetail('generate-video-from-text')
console.log('功能详情:', funcDetail)

// 执行 Function
const result = await AI.executeFunction('generate-video-from-text', {
  prompt: '一只可爱的小猫在草地上奔跑',
  model: 'ltx-video'
})
console.log('执行结果:', result)
```

### 使用 Service 层

```javascript
const { Services } = require('all-in-one-api-service')

// 创建 LTX 服务实例
const ltxService = new Services.LTX({
  apiKey: process.env.LTX_API_KEY,
  baseURL: process.env.LTX_BASE_URL
})

// 调用 API
const result = await ltxService.call('/generate', {
  prompt: '生成视频',
  model: 'ltx-video'
})
```

### 使用 FunctionManager

```javascript
const { functionManager } = require('all-in-one-api-service')

// 查询 Functions
const functions = functionManager.query({ type: 'text_to_video' })

// 获取最佳 Function
const bestFunc = functionManager.getBest('text_to_video', 'ltx-video')

// 执行 Function
const result = await functionManager.execute('generate-video-from-text', {
  prompt: '测试视频生成'
})
```

## 导入示例

本章节详细介绍如何在第三方项目中引入和使用本框架的所有导出功能。

### 完整导入

```javascript
// CommonJS 方式
const AIService = require('all-in-one-api-service')

// ES Module 方式
import * as AIService from 'all-in-one-api-service'
```

### 按需导入

#### 1. 导入命名空间

```javascript
const {
  Services,      // 服务层
  APIs,          // API 定义层
  Params,        // 参数层
  Config,        // 配置管理
  Utils,         // 工具函数
  Functions,     // 函数层
  Constants,     // 常量定义
  Registry       // 注册中心
} = require('all-in-one-api-service')
```

#### 2. 导入核心类

```javascript
const {
  BaseService,       // 服务基类
  APIDefinition,     // API 定义基类
  BaseParam,         // 参数基类
  BaseFunction,      // 函数基类
  CacheManager,      // 缓存管理器
  CacheItem,         // 缓存项
  ConfigManager,     // 配置管理器
  FunctionManager    // 函数管理器
} = require('all-in-one-api-service')
```

#### 3. 导入注册中心实例

```javascript
const {
  apiRegistry,       // API 注册中心实例
  modelRegistry,     // 模型注册中心实例
  functionRegistry   // 函数注册中心实例
} = require('all-in-one-api-service')

// 使用示例
const allAPIs = apiRegistry.getAll()
const allModels = modelRegistry.getAll()
const allFunctions = functionRegistry.getAll()

// 获取 API 参数 Schema
const paramSchema = apiRegistry.getParamSchema('generate-video-from-text')
const inputSchema = apiRegistry.getInputSchema('generate-video-from-text')
const outputSchema = apiRegistry.getOutputSchema('generate-video-from-text')

// 验证参数
const validationResult = apiRegistry.validateParams('generate-video-from-text', {
  prompt: '测试视频'
})
```

#### 4. 导入管理器实例

```javascript
const {
  metadataManager,   // 元数据管理器
  functionManager,   // 函数管理器
  cacheManager       // 缓存管理器
} = require('all-in-one-api-service')

// 使用元数据管理器
const func = metadataManager.getFunction('generate-video-from-text', 'zh')
const api = metadataManager.getAPI('generate-video-from-text')
const model = metadataManager.getModel('ltx-video')

// 使用函数管理器
const functions = functionManager.query({ type: 'text_to_video' })
const bestFunc = functionManager.getBest('text_to_video', 'ltx-video')
const stats = functionManager.getStats()

// 使用缓存管理器
cacheManager.set('namespace', 'key', { data: 'value' }, 3600000)
const cached = cacheManager.get('namespace', 'key')
```

#### 5. 导入工具函数

```javascript
const {
  setLanguage,       // 设置语言
  getLanguage,       // 获取当前语言
  t,                 // 翻译函数
  generateId,        // 生成唯一 ID
  deepMerge,         // 深度合并对象
  deepClone,         // 深度克隆对象
  createLogger,      // 创建日志器
  sleep,             // 延迟函数
  retry              // 重试函数
} = require('all-in-one-api-service')

// 使用示例
setLanguage('zh')
console.log('当前语言:', getLanguage())
console.log('翻译:', t('common.success'))

const id = generateId('req')
console.log('生成的 ID:', id)

const logger = createLogger({ level: 'DEBUG' })
logger.info('这是一条日志')

await sleep(1000)
```

#### 6. 导入常量

```javascript
const {
  APITypes,              // API 类型常量
  MediaTypes,            // 媒体类型常量
  Providers,             // Provider 常量
  ProviderPriority,      // Provider 优先级
  ProviderMeta,          // Provider 元数据
  Series,                // Series 常量
  SeriesMeta,            // Series 元数据
  Languages,             // 语言常量
  DEFAULT_LANGUAGE,      // 默认语言
  getProviderPriority,   // 获取 Provider 优先级
  sortByProviderPriority,// 按 Provider 优先级排序
  normalizeLanguage      // 标准化语言代码
} = require('all-in-one-api-service')

// 使用示例
console.log('文本转视频类型:', APITypes.TEXT_TO_VIDEO)
console.log('LTX Provider:', Providers.LTX)
console.log('LTX 优先级:', getProviderPriority('ltx'))
```

#### 7. 导入快捷查询函数

```javascript
const {
  getFunction,          // 获取 Function 元数据
  getFunctions,         // 获取 Function 列表
  getFunctionByAPI,     // 根据 API 获取 Function
  getAPI,               // 获取 API 元数据
  getAPIs,              // 获取 API 列表
  getModel,             // 获取 Model 元数据
  getModels,            // 获取 Model 列表
  getBestFunction,      // 获取最佳 Function
  getBestAPI,           // 获取最佳 API
  executeFunction,      // 执行 Function
  queryFunctions,       // 查询 Functions
  getFunctionDetail,    // 获取 Function 详情
  getBestFunctionInstance // 获取最佳 Function 实例
} = require('all-in-one-api-service')

// 使用示例
const func = getFunction('generate-video-from-text', 'zh')
const apis = getAPIs({ type: 'text_to_video' })
const models = getModels({ provider: 'ltx' })
const bestFunc = getBestFunction('text_to_video', 'ltx-video')
```

#### 8. 导入服务类

```javascript
const { Services } = require('all-in-one-api-service')

// 导入特定服务
const { LTX, Volcengine, Skyreels, Mureka, Custom } = Services

// 创建服务实例
const ltxService = new LTX({
  apiKey: process.env.LTX_API_KEY,
  baseURL: process.env.LTX_BASE_URL
})

// 使用服务
const result = await ltxService.call('/v1/text-to-video', {
  prompt: '测试视频生成',
  model: 'ltx-2-fast'
})
```

#### 9. 导入参数模板

```javascript
const { Params } = require('all-in-one-api-service')

// 使用参数模板
const { Templates, Common } = Params

console.log('文本提示词模板:', Templates.textPrompt)
console.log('图像尺寸模板:', Templates.imageSize)
console.log('通用图像参数:', Common.image)
console.log('通用视频参数:', Common.video)
```

#### 10. 导入配置预设

```javascript
const { Config } = require('all-in-one-api-service')

// 创建配置管理器
const configManager = new Config.ConfigManager()

// 加载配置
const config = await configManager.load()

// 获取 Provider 配置
const ltxConfig = await configManager.getProviderConfig('ltx')

// 设置配置
configManager.set('providers.ltx.apiKey', 'your-api-key')
```

### TypeScript 支持

本框架提供完整的 TypeScript 类型定义。

```typescript
import {
  BaseService,
  APIDefinition,
  BaseParam,
  BaseFunction,
  CacheManager,
  APIRegistry,
  ModelRegistry,
  FunctionRegistry,
  ParamSchema,
  ValidationResult,
  APIResult,
  FunctionMetadata,
  APIMetadata,
  ModelMetadata
} from 'all-in-one-api-service'

// 使用类型定义
const paramSchema: Record<string, ParamSchema> = {
  prompt: {
    type: 'string',
    required: true,
    description: '文本提示词'
  }
}

const result: ValidationResult = apiRegistry.validateParams('api-name', {})
const apiResult: APIResult = await executeFunction('func-name', {})
```

### 完整使用示例

```javascript
const AIService = require('all-in-one-api-service')

async function completeExample() {
  // 1. 设置语言
  AIService.setLanguage('zh')
  
  // 2. 查询可用的视频生成模型
  const models = AIService.getModels({ type: 'text_to_video' })
  console.log('可用模型:', models.length)
  
  // 3. 选择第一个模型
  const selectedModel = models[0]
  
  // 4. 获取最佳 Function
  const bestFunc = AIService.getBestFunction('text_to_video', selectedModel.name)
  console.log('最佳 Function:', bestFunc.name)
  
  // 5. 获取 Function 实例
  const funcInstance = AIService.functionManager.get(bestFunc.name)
  
  // 6. 获取输入输出 Schema
  const inputSchema = funcInstance.getInputSchema()
  const outputSchema = funcInstance.getOutputSchema()
  console.log('输入参数:', Object.keys(inputSchema))
  console.log('输出参数:', Object.keys(outputSchema))
  
  // 7. 验证参数
  const params = {
    prompt: '一只可爱的小猫在草地上奔跑',
    model: selectedModel.name
  }
  const validation = funcInstance.validateParams(params)
  if (!validation.valid) {
    console.error('参数验证失败:', validation.errors)
    return
  }
  
  // 8. 获取 API 调用信息
  const callInfo = AIService.apiRegistry.getCallInfo(bestFunc.apis.request)
  console.log('API 端点:', callInfo.endpoint)
  console.log('HTTP 方法:', callInfo.method)
  
  // 9. 执行 Function (需要配置 API Key)
  // const result = await AIService.executeFunction(bestFunc.name, params)
  // console.log('执行结果:', result)
  
  // 10. 获取统计信息
  const stats = AIService.functionRegistry.getStats()
  console.log('统计信息:', stats)
}

completeExample().catch(console.error)
```

## 框架集成使用说明

本章节详细介绍如何在第三方项目中通过 npm 方式引入框架并使用各项功能。

### 引入框架

```javascript
const AIService = require('all-in-one-api-service')
```

### 1. 获取 Function 信息列表

#### 获取所有 Function 列表

```javascript
const functions = AIService.getFunctions()

console.log('Function 总数:', functions.length)
console.log('第一个 Function:', functions[0])
```

#### 根据类型筛选 Function

```javascript
const videoFunctions = AIService.getFunctions({ type: 'text_to_video' })

videoFunctions.forEach(func => {
  console.log(`Function: ${func.name}, Type: ${func.type}`)
})
```

#### 根据 Provider 筛选 Function

```javascript
const ltxFunctions = AIService.getFunctions({ provider: 'ltx' })

ltxFunctions.forEach(func => {
  console.log(`Function: ${func.name}, Provider: ${func.provider}`)
})
```

#### 多语言支持

```javascript
// 中文
const functionsZh = AIService.getFunctions({}, 'zh')

// 英文
const functionsEn = AIService.getFunctions({}, 'en')
```

### 2. 获取 Provider 信息列表

#### 获取所有 Provider 定义

```javascript
const { Providers, ProviderMeta } = AIService.Constants

console.log('所有 Provider:', Object.keys(Providers))
console.log('Provider 元数据:', ProviderMeta)
```

#### 查询特定 Provider

```javascript
const { Providers, ProviderMeta } = AIService.Constants

// LTX Provider
console.log('LTX Provider ID:', Providers.LTX)
console.log('LTX 显示名称:', ProviderMeta.ltx.displayName)
console.log('LTX 描述:', ProviderMeta.ltx.description)
console.log('LTX 支持的类型:', ProviderMeta.ltx.supportedTypes)

// 火山引擎 Provider
console.log('火山引擎 Provider ID:', Providers.VOLCENGINE)
console.log('火山引擎显示名称:', ProviderMeta.volcengine.displayName)
```

### 3. 获取 Model 信息列表

#### 获取所有 Model 列表

```javascript
const models = AIService.getModels()

console.log('Model 总数:', models.length)
models.forEach(model => {
  console.log(`Model: ${model.name}, Provider: ${model.provider}, Type: ${model.type}`)
})
```

#### 根据类型筛选 Model

```javascript
const videoModels = AIService.getModels({ type: 'text_to_video' })

videoModels.forEach(model => {
  console.log(`视频生成 Model: ${model.name}`)
})
```

#### 根据 Provider 筛选 Model

```javascript
const ltxModels = AIService.getModels({ provider: 'ltx' })

ltxModels.forEach(model => {
  console.log(`LTX Model: ${model.name}`)
})
```

#### 多语言支持

```javascript
const modelsZh = AIService.getModels({}, 'zh')
const modelsEn = AIService.getModels({}, 'en')
```

### 4. 获取 API 定义列表

#### 获取所有 API 列表

```javascript
const apis = AIService.getAPIs()

console.log('API 总数:', apis.length)
apis.forEach(api => {
  console.log(`API: ${api.name}, Endpoint: ${api.endpoint}`)
})
```

#### 根据类型筛选 API

```javascript
const videoAPIs = AIService.getAPIs({ type: 'text_to_video' })

videoAPIs.forEach(api => {
  console.log(`视频生成 API: ${api.name}`)
})
```

#### 根据 Provider 筛选 API

```javascript
const ltxAPIs = AIService.getAPIs({ provider: 'ltx' })

ltxAPIs.forEach(api => {
  console.log(`LTX API: ${api.name}`)
})
```

### 5. 根据 ID 获取指定资源定义

#### 获取指定 Function 定义

```javascript
// 获取存在的 Function
const func = AIService.getFunction('generate-video-from-text')

if (func) {
  console.log('Function 名称:', func.name)
  console.log('Function 类型:', func.type)
  console.log('Function Provider:', func.provider)
} else {
  console.log('Function 不存在')
}

// 支持多语言
const funcZh = AIService.getFunction('generate-video-from-text', 'zh')
const funcEn = AIService.getFunction('generate-video-from-text', 'en')
```

#### 获取指定 Model 定义

```javascript
const model = AIService.getModel('ltx-video')

if (model) {
  console.log('Model 名称:', model.name)
  console.log('Model Provider:', model.provider)
  console.log('Model 类型:', model.type)
} else {
  console.log('Model 不存在')
}
```

#### 获取指定 API 定义

```javascript
const api = AIService.getAPI('generate-video-from-text')

if (api) {
  console.log('API 名称:', api.name)
  console.log('API Provider:', api.provider)
  console.log('API 类型:', api.type)
  console.log('API Endpoint:', api.endpoint)
} else {
  console.log('API 不存在')
}
```

### 6. 获取最佳 Function

#### 根据场景类型和 Model 获取优先级最高的 Function

```javascript
// 获取 text_to_video 类型的最佳 Function
const models = AIService.getModels({ type: 'text_to_video' })

if (models.length > 0) {
  const firstModel = models[0]
  const bestFunction = AIService.getBestFunction('text_to_video', firstModel.name)
  
  if (bestFunction) {
    console.log('最佳 Function:', bestFunction.name)
    console.log('优先级:', bestFunction.priority)
    console.log('支持的 Models:', bestFunction.models)
  }
}
```

#### 处理无匹配的情况

```javascript
const bestFunction = AIService.getBestFunction('non_existent_type', 'non_existent_model')

if (bestFunction === null) {
  console.log('没有找到匹配的 Function')
}
```

### 7. Function 实例操作

#### 获取 Function 实例

```javascript
const functions = AIService.getFunctions()
const firstFunction = functions[0]

// 获取 Function 实例
const funcInstance = AIService.functionManager.get(firstFunction.name)

if (funcInstance) {
  console.log('Function 元数据:', funcInstance.metadata)
}
```

#### 获取输入输出 Schema

```javascript
const funcInstance = AIService.functionManager.get('generate-video-from-text')

if (funcInstance) {
  const inputSchema = funcInstance.getInputSchema()
  const outputSchema = funcInstance.getOutputSchema()
  
  console.log('输入 Schema:', inputSchema)
  console.log('输出 Schema:', outputSchema)
}
```

#### 获取参数配置

```javascript
const funcInstance = AIService.functionManager.get('generate-video-from-text')

if (funcInstance) {
  const paramConfig = funcInstance.getParamConfig({})
  console.log('参数配置:', paramConfig)
}
```

#### 验证参数

```javascript
const funcInstance = AIService.functionManager.get('generate-video-from-text')

if (funcInstance) {
  const validationResult = funcInstance.validateParams({
    prompt: '测试视频生成'
  })
  
  console.log('验证结果:', validationResult.valid)
  console.log('错误信息:', validationResult.errors)
}
```

### 8. 异步/同步 Function 识别

#### 获取异步 Function

```javascript
const asyncFunctions = AIService.getFunctions({ asyncOnly: true })

console.log('异步 Function 数量:', asyncFunctions.length)
asyncFunctions.forEach(func => {
  console.log(`异步 Function: ${func.name}, Type: ${func.type}`)
})
```

#### 获取同步 Function

```javascript
const syncFunctions = AIService.getFunctions({ asyncOnly: false })

console.log('同步 Function 数量:', syncFunctions.length)
syncFunctions.forEach(func => {
  console.log(`同步 Function: ${func.name}, Type: ${func.type}`)
})
```

### 9. API 参数信息获取

#### 获取 Function 关联的 API 列表

```javascript
const functions = AIService.getFunctions()
const firstFunction = functions[0]

const relatedAPIs = AIService.functionManager.getRelatedAPIs(firstFunction.name)

if (relatedAPIs) {
  console.log('关联的 API:', relatedAPIs)
}
```

#### 获取 API 的输入输出参数定义

```javascript
const apis = AIService.getAPIs()
const firstAPI = apis[0]

const api = AIService.getAPI(firstAPI.name)

if (api && api.paramSchema) {
  console.log('输入参数定义:', api.paramSchema.input)
  console.log('输出参数定义:', api.paramSchema.output)
}
```

#### 通过 Registry 获取参数 Schema

```javascript
const { apiRegistry } = AIService.Registry
const apis = apiRegistry.getAll()

if (apis.length > 0) {
  const firstAPI = apis[0]
  const inputSchema = apiRegistry.getInputSchema(firstAPI.name)
  const outputSchema = apiRegistry.getOutputSchema(firstAPI.name)
  
  console.log('输入 Schema:', inputSchema)
  console.log('输出 Schema:', outputSchema)
}
```

### 10. 动态参数调整

#### 根据上下文动态调整参数

```javascript
const functions = AIService.getFunctions()
const firstFunction = functions[0]

const funcInstance = AIService.functionManager.get(firstFunction.name)

if (funcInstance) {
  const context = { model: 'ltx-video' }
  const paramConfig = funcInstance.getParamConfig(context)
  
  console.log('动态参数配置:', paramConfig)
}
```

### 11. 常量使用

#### API 类型常量

```javascript
const { APITypes } = AIService.Constants

console.log('文本转视频:', APITypes.TEXT_TO_VIDEO)        // 'text_to_video'
console.log('文本转图像:', APITypes.TEXT_TO_IMAGE)        // 'text_to_image'
console.log('文本转音频:', APITypes.TEXT_TO_AUDIO)        // 'text_to_audio'
```

#### 媒体类型常量

```javascript
const { MediaTypes } = AIService.Constants

console.log('文本:', MediaTypes.TEXT)      // 'text'
console.log('图像:', MediaTypes.IMAGE)     // 'image'
console.log('视频:', MediaTypes.VIDEO)     // 'video'
console.log('音频:', MediaTypes.AUDIO)     // 'audio'
```

#### Provider 优先级

```javascript
const { ProviderPriority, getProviderPriority } = AIService.Constants

// 获取特定 Provider 的优先级
const ltxPriority = getProviderPriority('ltx')
console.log('LTX 优先级:', ltxPriority)

// Provider 优先级排序
const { sortByProviderPriority, getHighestPriorityProvider } = AIService.Constants

const items = [
  { provider: 'mureka' },
  { provider: 'ltx' },
  { provider: 'volcengine' }
]

const sorted = sortByProviderPriority(items)
console.log('排序后的第一项:', sorted[0].provider)  // 'ltx'

const highest = getHighestPriorityProvider(['mureka', 'ltx', 'volcengine'])
console.log('最高优先级 Provider:', highest)  // 'ltx'
```

#### 语言常量

```javascript
const { Languages, DEFAULT_LANGUAGE } = AIService.Constants

console.log('支持的语言:', Languages)
console.log('默认语言:', DEFAULT_LANGUAGE)
```

#### Series 常量

```javascript
const { Series, SeriesMeta } = AIService.Constants

console.log('所有 Series:', Series)
console.log('Series 元数据:', SeriesMeta)
```

### 12. 框架基础功能

#### 多语言设置

```javascript
// 设置为中文
AIService.setLanguage('zh')
console.log('当前语言:', AIService.getLanguage())  // 'zh'

// 设置为英文
AIService.setLanguage('en')
console.log('当前语言:', AIService.getLanguage())  // 'en'
```

#### 获取统计信息

```javascript
const stats = AIService.functionManager.getStats()

console.log('Model 总数:', stats.totalModels)
console.log('API 总数:', stats.totalAPIs)
console.log('Function 总数:', stats.totalFunctions)
```

#### 清除缓存

```javascript
AIService.functionManager.clearCache()
console.log('缓存已清除')
```

#### 检查模块导出

```javascript
console.log('Services 模块:', AIService.Services)
console.log('APIs 模块:', AIService.APIs)
console.log('Params 模块:', AIService.Params)
console.log('Config 模块:', AIService.Config)
console.log('Utils 模块:', AIService.Utils)
console.log('Functions 模块:', AIService.Functions)
console.log('Constants 模块:', AIService.Constants)
console.log('Registry 模块:', AIService.Registry)
```

### 13. 完整使用示例

#### 示例 1: 视频生成流程

```javascript
const AIService = require('all-in-one-api-service')

async function generateVideo() {
  // 1. 设置语言
  AIService.setLanguage('zh')
  
  // 2. 获取 text_to_video 类型的所有 Model
  const models = AIService.getModels({ type: 'text_to_video' })
  console.log('可用的视频生成 Model:', models.length)
  
  // 3. 选择第一个 Model
  const selectedModel = models[0]
  console.log('选择的 Model:', selectedModel.name)
  
  // 4. 获取最佳 Function
  const bestFunction = AIService.getBestFunction('text_to_video', selectedModel.name)
  console.log('最佳 Function:', bestFunction.name)
  
  // 5. 获取 Function 实例
  const funcInstance = AIService.functionManager.get(bestFunction.name)
  
  // 6. 验证参数
  const params = {
    prompt: '一只可爱的小猫在草地上奔跑',
    model: selectedModel.name
  }
  
  const validation = funcInstance.validateParams(params)
  if (!validation.valid) {
    console.error('参数验证失败:', validation.errors)
    return
  }
  
  // 7. 获取输入输出 Schema
  const inputSchema = funcInstance.getInputSchema()
  const outputSchema = funcInstance.getOutputSchema()
  console.log('输入 Schema:', inputSchema)
  console.log('输出 Schema:', outputSchema)
  
  // 8. 执行 Function (如果需要实际调用)
  // const result = await AIService.executeFunction(bestFunction.name, params)
  // console.log('执行结果:', result)
}

generateVideo().catch(console.error)
```

#### 示例 2: Provider 信息查询

```javascript
const AIService = require('all-in-one-api-service')

function queryProviderInfo() {
  const { Providers, ProviderMeta, getProviderPriority } = AIService.Constants
  
  // 获取所有 Provider
  const allProviders = Object.keys(Providers)
  console.log('所有 Provider:', allProviders)
  
  // 查询每个 Provider 的详细信息
  allProviders.forEach(providerKey => {
    const providerId = Providers[providerKey]
    const meta = ProviderMeta[providerId]
    
    if (meta) {
      console.log(`\nProvider: ${meta.displayName}`)
      console.log(`  ID: ${meta.name}`)
      console.log(`  描述: ${meta.description}`)
      console.log(`  支持的类型: ${meta.supportedTypes.join(', ')}`)
      console.log(`  优先级: ${getProviderPriority(providerId)}`)
    }
  })
}

queryProviderInfo()
```

#### 示例 3: API 参数分析

```javascript
const AIService = require('all-in-one-api-service')

function analyzeAPIParams() {
  // 获取所有 API
  const apis = AIService.getAPIs()
  
  apis.forEach(api => {
    console.log(`\nAPI: ${api.name}`)
    console.log(`  Provider: ${api.provider}`)
    console.log(`  Type: ${api.type}`)
    console.log(`  Endpoint: ${api.endpoint}`)
    
    // 获取参数定义
    if (api.paramSchema) {
      console.log(`  输入参数:`, api.paramSchema.input)
      console.log(`  输出参数:`, api.paramSchema.output)
    }
  })
}

analyzeAPIParams()
```

## 核心功能

### 支持的 Provider

| Provider   | 描述              | 支持类型             | 优先级 |
| ---------- | --------------- | ---------------- | --- |
| LTX        | LTX 视频生成平台      | video            | 100 |
| Volcengine | 字节跳动火山引擎        | image, video, 3d | 90  |
| Skyreels   | Skyreels 视频生成平台 | video, avatar    | 80  |
| Mureka     | Mureka 音乐生成平台   | audio, music     | 70  |

### 支持的 API 类型

- **图像生成**: `text_to_image`, `image_to_image`, `image_editing`, `image_upscaling`
- **视频生成**: `text_to_video`, `image_to_video`, `audio_to_video`, `video_editing`, `video_extension`
- **音频生成**: `text_to_audio`, `text_to_speech`, `speech_to_text`, `audio_generation`, `music_generation`, `song_generation`, `instrumental_generation`, `vocal_cloning`
- **文本生成**: `text_generation`, `text_editing`
- **3D 生成**: `image_to_3d`, `text_to_3d`
- **其他**: `task_query`, `file_upload`, `avatar_generation`, `lip_sync`

### 国际化支持

框架支持中文和英文两种语言:

```javascript
// 设置为中文
AI.setLanguage('zh')

// 设置为英文
AI.setLanguage('en')

// 获取当前语言
const lang = AI.getLanguage()

// 使用翻译函数
const text = AI.t('functions.generate-video-from-text.displayName')
```

## 测试用例

测试用例文件位于 `tests/` 目录下，包含以下测试场景:

### 1. 基础查询测试

```javascript
// tests/basic-queries.test.js

const AI = require('all-in-one-api-service')

describe('基础查询测试', () => {
  test('获取 Function 信息列表', () => {
    const functions = AI.queryFunctions()
    expect(Array.isArray(functions)).toBe(true)
    expect(functions.length).toBeGreaterThan(0)
  })

  test('获取 Provider 信息列表', () => {
    const { Constants } = require('all-in-one-api-service')
    const providers = Object.keys(Constants.ProviderMeta)
    expect(providers).toContain('ltx')
    expect(providers).toContain('volcengine')
  })

  test('获取 Model 信息列表', () => {
    const models = AI.getModels()
    expect(Array.isArray(models)).toBe(true)
  })

  test('获取 API 定义列表', () => {
    const apis = AI.getAPIs()
    expect(Array.isArray(apis)).toBe(true)
  })
})
```

### 2. 详情查询测试

```javascript
// tests/detail-queries.test.js

const AI = require('all-in-one-api-service')

describe('详情查询测试', () => {
  test('根据 ID 获取指定 Function 定义', () => {
    const func = AI.getFunction('generate-video-from-text')
    expect(func).toBeDefined()
    expect(func.name).toBe('generate-video-from-text')
  })

  test('根据 ID 获取指定 Provider 定义', () => {
    const { Constants } = require('all-in-one-api-service')
    const provider = Constants.ProviderMeta.ltx
    expect(provider).toBeDefined()
    expect(provider.name).toBe('ltx')
  })

  test('根据 ID 获取指定 Model 定义', () => {
    const model = AI.getModel('ltx-video')
    expect(model).toBeDefined()
    expect(model.name).toBe('ltx-video')
  })

  test('根据 ID 获取指定 API 定义', () => {
    const api = AI.getAPI('generate-video-from-text')
    expect(api).toBeDefined()
  })
})
```

### 3. 高级查询测试

```javascript
// tests/advanced-queries.test.js

const AI = require('all-in-one-api-service')

describe('高级查询测试', () => {
  test('根据场景类型获取 Model Series 列表', () => {
    const models = AI.getModels({ type: 'text_to_video' })
    expect(Array.isArray(models)).toBe(true)
    models.forEach(model => {
      expect(model.type).toBe('text_to_video')
    })
  })

  test('根据场景类型和 Model Series 获取优先级最高的 Function', () => {
    const bestFunc = AI.getBestFunction('text_to_video', 'ltx-video')
    expect(bestFunc).toBeDefined()
    expect(bestFunc.type).toBe('text_to_video')
  })
})
```

### 4. API 调用测试

```javascript
// tests/api-calls.test.js

const AI = require('all-in-one-api-service')

describe('API 调用测试', () => {
  test('根据 Function 获取请求接口定义', () => {
    const func = AI.getFunction('generate-video-from-text')
    expect(func.api).toBeDefined()
  })

  test('根据 Function 获取异步调用方法', async () => {
    const result = await AI.executeFunction('generate-video-from-text', {
      prompt: '测试视频',
      model: 'ltx-video'
    })
    expect(result).toBeDefined()
  })

  test('异步任务状态查询', async () => {
    // 先创建任务
    const createResult = await AI.executeFunction('generate-video-from-text', {
      prompt: '测试视频'
    })
    
    // 查询任务状态
    const queryResult = await AI.executeFunction('query-video-task', {
      taskId: createResult.taskId
    })
    expect(queryResult).toBeDefined()
  })
})
```

### 5. 参数管理测试

```javascript
// tests/params.test.js

const AI = require('all-in-one-api-service')

describe('参数管理测试', () => {
  test('根据 Function 获取 API 列表', () => {
    const func = AI.getFunction('generate-video-from-text')
    const apis = AI.getRelatedAPIs('generate-video-from-text')
    expect(apis).toBeDefined()
  })

  test('获取 API 入参出参信息', () => {
    const api = AI.getAPI('generate-video-from-text')
    const inputInfo = api.getInputInfo()
    const outputInfo = api.getOutputInfo()
    expect(Array.isArray(inputInfo)).toBe(true)
    expect(Array.isArray(outputInfo)).toBe(true)
  })

  test('动态获取参数信息列表', () => {
    const api = AI.getAPI('generate-video-from-text')
    const paramConfig = api.getParamConfig({
      model: 'ltx-video',
      currentParams: { prompt: '测试' }
    })
    expect(paramConfig).toBeDefined()
  })
})
```

### 6. 常量查询测试

```javascript
// tests/constants.test.js

const { Constants } = require('all-in-one-api-service')

describe('常量查询测试', () => {
  test('获取框架中的常量列表', () => {
    expect(Constants.APITypes).toBeDefined()
    expect(Constants.MediaTypes).toBeDefined()
    expect(Constants.Providers).toBeDefined()
    expect(Constants.Languages).toBeDefined()
  })

  test('API 类型常量', () => {
    expect(Constants.APITypes.TEXT_TO_VIDEO).toBe('text_to_video')
    expect(Constants.APITypes.IMAGE_TO_VIDEO).toBe('image_to_video')
  })

  test('Provider 常量', () => {
    expect(Constants.Providers.LTX).toBe('ltx')
    expect(Constants.ProviderPriority.ltx).toBe(100)
  })
})
```

## API 文档

### 主要 API

#### FunctionManager

```javascript
const { functionManager } = require('all-in-one-api-service')

// 查询 Functions
functionManager.query(options, language)

// 获取 Function 详情
functionManager.getDetail(name, language)

// 获取最佳 Function
functionManager.getBest(type, model, options, language)

// 执行 Function
functionManager.execute(name, params, options)

// 获取统计信息
functionManager.getStats()
```

#### MetadataManager

```javascript
const { metadataManager } = require('all-in-one-api-service')

// 获取 Function 元数据
metadataManager.getFunction(name, language)

// 获取 API 元数据
metadataManager.getAPI(name, language)

// 获取 Model 元数据
metadataManager.getModel(name, language)

// 批量获取
metadataManager.getFunctions(options, language)
metadataManager.getAPIs(options, language)
metadataManager.getModels(options, language)
```

#### 快捷方法

```javascript
const AI = require('all-in-one-api-service')

// Function 相关
AI.getFunction(name, language)
AI.getFunctions(options, language)
AI.getBestFunction(type, model, options, language)

// API 相关
AI.getAPI(name, language)
AI.getAPIs(options, language)

// Model 相关
AI.getModel(name, language)
AI.getModels(options, language)

// 执行
AI.executeFunction(name, params, options)
```

### 查询选项

```javascript
// Function 查询选项
{
  type: 'text_to_video',      // API 类型
  provider: 'ltx',            // Provider 名称
  category: 'video',          // 分类
  model: 'ltx-video',         // 模型名称
  asyncOnly: true             // 仅异步 Function
}

// API 查询选项
{
  type: 'text_to_video',      // API 类型
  provider: 'ltx',            // Provider 名称
  tags: ['video'],            // 标签
  model: 'ltx-video'          // 模型名称
}

// Model 查询选项
{
  type: 'text_to_video',      // API 类型
  provider: 'ltx',            // Provider 名称
  tags: ['video']             // 标签
}
```

## 开发指南

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/your-org/all-in-one-api-service.git

# 安装依赖
npm install

# 运行测试
npm test

# 代码检查
npm run lint

# 类型检查
npm run typecheck

# 构建
npm run build
```

### 发布流程

```bash
# 更新版本
npm version patch/minor/major

# 构建
npm run build

# 发布到 npm
npm publish

# 发布到 GitHub Packages
npm publish --registry=https://npm.pkg.github.com
```

### 基于 API 文档的开发流程

本章节详细介绍如何根据 `api-document` 目录下的官方 API 文档,完成框架代码的开发工作。

#### 开发流程概览

```
API 文档分析 → 参数定义 → API 元数据 → Function 元数据 → Model 元数据 → 国际化 → 测试验证
```

#### 步骤 1: 分析 API 文档

首先,阅读 `api-document/official-{provider}.md` 文件,提取以下关键信息:

**示例: LTX 文本生成视频 API**

从文档中提取:

- **API ID**: `generate_video_from_text_task`
- **Endpoint**: `/v1/text-to-video`
- **Method**: `POST`
- **类型**: 同步/异步 (LTX 所有接口为同步)
- **支持的模型**: `ltx-2-fast`, `ltx-2-pro`, `ltx-2-3-fast`, `ltx-2-3-pro`
- **请求参数**: prompt, model, duration, resolution, fps, generate\_audio, camera\_motion
- **响应参数**: 视频文件 (二进制) 或错误信息

#### 步骤 2: 创建参数定义文件

在 `src/params/providers/{provider}/{category}/` 目录下创建参数定义文件。

**文件路径**: `src/params/providers/ltx/video/generate-video-from-text.js`

```javascript
/**
 * Generate Video from Text 参数定义
 */

const ltxCommon = require('../ltx-common')

module.exports = {
  input: {
    prompt: ltxCommon.input.prompt,

    model: {
      ...ltxCommon.input.model,
      required: true,
      description: '使用的模型(支持:ltx-2-fast, ltx-2-pro, ltx-2-3-fast, ltx-2-3-pro)'
    },

    duration: {
      ...ltxCommon.input.duration,
      required: true,
      description: '视频时长(秒),根据模型不同有不同的可用时长选项'
    },

    resolution: {
      ...ltxCommon.input.resolution,
      required: true,
      description: '输出视频分辨率(如:1920x1080, 1080x1920, 2560x1440, 3840x2160)'
    },

    fps: {
      ...ltxCommon.input.fps,
      description: '帧率,根据模型和分辨率不同有不同的可用帧率'
    },

    generate_audio: {
      ...ltxCommon.input.generate_audio,
      description: '是否为视频生成音频,true时包含AI生成的音频,false时仅生成无声视频'
    },

    camera_motion: {
      ...ltxCommon.input.camera_motion,
      description: '对生成的视频应用镜头运动效果'
    }
  },

  output: {
    video: ltxCommon.output.video,
    contentType: ltxCommon.output.contentType,
    error: ltxCommon.output.error
  }
}
```

**参数定义规范**:

1. **复用通用参数**: 使用 `ltxCommon` 或其他通用参数定义
2. **明确必填项**: 设置 `required: true`
3. **提供描述**: 每个参数都要有清晰的 `description`
4. **定义输出结构**: 明确 `output` 的结构

#### 步骤 3: 创建 API 元数据定义

在 `src/metadata/apis/{provider}.js` 中添加 API 定义。

**文件路径**: `src/metadata/apis/ltx.js`

```javascript
module.exports = {
  'generate-video-from-text': {
    name: 'generate-video-from-text',
    provider: 'ltx',
    category: 'video',
    endpoint: '/v1/text-to-video',
    method: 'POST',
    type: 'sync',  // 同步或异步
    paramSchema: require('../../params/providers/ltx/video/generate-video-from-text'),
    models: ['ltx-2-fast', 'ltx-2-pro', 'ltx-2-3-fast', 'ltx-2-3-pro'],
    tags: ['video', 'generation', 'text-to-video'],
    priority: 100
  },
  
  // 其他 API 定义...
}
```

**API 元数据字段说明**:

| 字段          | 类型     | 说明        | 示例                         |
| ----------- | ------ | --------- | -------------------------- |
| name        | string | API 唯一标识符 | 'generate-video-from-text' |
| provider    | string | 服务提供商     | 'ltx', 'volcengine'        |
| category    | string | API 分类    | 'video', 'image', 'audio'  |
| endpoint    | string | API 端点路径  | '/v1/text-to-video'        |
| method      | string | HTTP 方法   | 'POST', 'GET', 'DELETE'    |
| type        | string | 调用类型      | 'sync'(同步), 'async'(异步)    |
| paramSchema | object | 参数定义引用    | require('...')             |
| models      | array  | 支持的模型列表   | \['ltx-2-fast', ...]       |
| tags        | array  | 标签列表      | \['video', 'generation']   |
| priority    | number | 优先级(越大越高) | 100                        |

#### 步骤 4: 创建 Function 元数据定义

在 `src/metadata/functions/{provider}.js` 中添加 Function 定义。

**文件路径**: `src/metadata/functions/ltx.js`

```javascript
module.exports = {
  'generate-video-from-text': {
    name: 'generate-video-from-text',
    type: 'sync',
    provider: 'ltx',
    category: 'video',
    
    apis: {
      request: 'generate-video-from-text'  // 引用 API 名称
    },
    
    models: ['ltx-2-fast', 'ltx-2-pro', 'ltx-2-3-fast', 'ltx-2-3-pro'],
    tags: ['video', 'generation', 'text-to-video'],
    priority: 100
  },
  
  // 其他 Function 定义...
}
```

**异步 Function 示例** (如火山引擎):

```javascript
'create-video-generation-task': {
  name: 'create-video-generation-task',
  type: 'async',
  provider: 'volcengine',
  category: 'video',
  
  apis: {
    request: 'create-video-generation-task',  // 创建任务
    query: 'query-video-generation-task'      // 查询任务状态
  },
  
  models: ['doubao-seedance-2-0', ...],
  tags: ['video', 'generation'],
  priority: 90
}
```

**Function 元数据字段说明**:

| 字段           | 类型     | 说明             | 示例                         |
| ------------ | ------ | -------------- | -------------------------- |
| name         | string | Function 唯一标识符 | 'generate-video-from-text' |
| type         | string | 调用类型           | 'sync', 'async'            |
| provider     | string | 服务提供商          | 'ltx'                      |
| category     | string | 分类             | 'video'                    |
| apis         | object | 关联的 API        | { request: 'api-name' }    |
| apis.request | string | 请求 API 名称      | 'generate-video-from-text' |
| apis.query   | string | 查询 API 名称(异步)  | 'query-video-task'         |
| models       | array  | 支持的模型          | \['ltx-2-fast', ...]       |
| tags         | array  | 标签             | \['video', 'generation']   |
| priority     | number | 优先级            | 100                        |

#### 步骤 5: 创建 Model 元数据定义

在 `src/metadata/models/{provider}.js` 中添加 Model 定义。

**文件路径**: `src/metadata/models/ltx.js`

```javascript
module.exports = {
  'ltx-2-fast': {
    name: 'ltx-2-fast',
    provider: 'ltx',
    type: 'text_to_video',  // API 类型
    category: 'video',
    displayName: 'LTX 2 Fast',
    description: 'LTX 2 快速模型,优化速度和成本',
    capabilities: {
      maxDuration: 20,
      resolutions: ['1920x1080', '2560x1440', '3840x2160'],
      fps: [25, 50]
    },
    tags: ['video', 'fast', 'cost-effective']
  },
  
  'ltx-2-pro': {
    name: 'ltx-2-pro',
    provider: 'ltx',
    type: 'text_to_video',
    category: 'video',
    displayName: 'LTX 2 Pro',
    description: 'LTX 2 专业模型,更高保真度',
    capabilities: {
      maxDuration: 10,
      resolutions: ['1920x1080', '2560x1440', '3840x2160'],
      fps: [25, 50]
    },
    tags: ['video', 'pro', 'high-quality']
  },
  
  // 其他 Model 定义...
}
```

**Model 元数据字段说明**:

| 字段           | 类型     | 说明          | 示例                  |
| ------------ | ------ | ----------- | ------------------- |
| name         | string | Model 唯一标识符 | 'ltx-2-fast'        |
| provider     | string | 服务提供商       | 'ltx'               |
| type         | string | API 类型      | 'text\_to\_video'   |
| category     | string | 分类          | 'video'             |
| displayName  | string | 显示名称        | 'LTX 2 Fast'        |
| description  | string | 描述          | '快速模型...'           |
| capabilities | object | 能力配置        | { maxDuration: 20 } |
| tags         | array  | 标签          | \['video', 'fast']  |

#### 步骤 6: 添加国际化翻译

在 `src/locales/{language}/` 目录下添加翻译。

**中文翻译**: `src/locales/zh/metadata.json`

```json
{
  "models": {
    "ltx-2-fast": {
      "displayName": "LTX 2 快速版",
      "description": "LTX 2 快速模型,优化速度和成本,适合快速原型和迭代"
    },
    "ltx-2-pro": {
      "displayName": "LTX 2 专业版",
      "description": "LTX 2 专业模型,更高保真度和视觉细节"
    }
  },
  
  "functions": {
    "generate-video-from-text": {
      "displayName": "文本生成视频",
      "description": "根据文本描述生成视频内容"
    }
  },
  
  "apis": {
    "generate-video-from-text": {
      "displayName": "文本生成视频 API",
      "description": "调用 LTX 文本生成视频接口"
    }
  }
}
```

**英文翻译**: `src/locales/en/metadata.json`

```json
{
  "models": {
    "ltx-2-fast": {
      "displayName": "LTX 2 Fast",
      "description": "LTX 2 fast model, optimized for speed and cost"
    },
    "ltx-2-pro": {
      "displayName": "LTX 2 Pro",
      "description": "LTX 2 pro model, higher fidelity and visual detail"
    }
  },
  
  "functions": {
    "generate-video-from-text": {
      "displayName": "Generate Video from Text",
      "description": "Generate video content from text description"
    }
  },
  
  "apis": {
    "generate-video-from-text": {
      "displayName": "Generate Video from Text API",
      "description": "Call LTX text-to-video API"
    }
  }
}
```

**参数翻译**: `src/locales/zh/params.json`

```json
{
  "prompt": {
    "displayName": "提示词",
    "description": "描述期望视频内容的文本提示"
  },
  
  "model": {
    "displayName": "模型",
    "description": "用于生成的模型"
  },
  
  "duration": {
    "displayName": "时长",
    "description": "视频时长(秒)"
  },
  
  "resolution": {
    "displayName": "分辨率",
    "description": "输出视频分辨率"
  }
}
```

#### 步骤 7: 编写测试用例

在 `tests/` 目录下创建测试文件。

**文件路径**: `tests/ltx-video-generation.test.js`

```javascript
const AIService = require('../index')

describe('LTX 视频生成测试', () => {
  describe('文本生成视频', () => {
    test('应该获取 generate-video-from-text API', () => {
      const api = AIService.getAPI('generate-video-from-text')
      
      expect(api).toBeDefined()
      expect(api.provider).toBe('ltx')
      expect(api.endpoint).toBe('/v1/text-to-video')
      expect(api.method).toBe('POST')
      expect(api.type).toBe('sync')
    })
    
    test('应该获取 generate-video-from-text Function', () => {
      const func = AIService.getFunction('generate-video-from-text')
      
      expect(func).toBeDefined()
      expect(func.type).toBe('sync')
      expect(func.models).toContain('ltx-2-fast')
    })
    
    test('应该验证参数', () => {
      const funcInstance = AIService.functionManager.get('generate-video-from-text')
      
      const validation = funcInstance.validateParams({
        prompt: '测试视频',
        model: 'ltx-2-fast',
        duration: 8,
        resolution: '1920x1080'
      })
      
      expect(validation.valid).toBe(true)
    })
    
    test('应该支持中文翻译', () => {
      const func = AIService.getFunction('generate-video-from-text', 'zh')
      
      expect(func.displayName).toBe('文本生成视频')
    })
    
    test('应该支持英文翻译', () => {
      const func = AIService.getFunction('generate-video-from-text', 'en')
      
      expect(func.displayName).toBe('Generate Video from Text')
    })
  })
})
```

#### 步骤 8: 运行测试验证

```bash
# 运行所有测试
npm test

# 运行特定测试文件
npm test tests/ltx-video-generation.test.js

# 运行测试并生成覆盖率报告
npm test -- --coverage
```

#### 完整开发示例: 添加新的 Provider

以下是一个完整的示例,展示如何添加一个新的 Provider (以 Skyreels 为例):

**1. 创建目录结构**

```
src/
├── params/providers/skyreels/
│   ├── video/
│   │   ├── text-to-video-generation-task-submit.js
│   │   ├── text-to-video-generation-task-query.js
│   │   └── index.js
│   ├── skyreels-common.js
│   └── index.js
├── metadata/
│   ├── apis/skyreels.js
│   ├── functions/skyreels.js
│   └── models/skyreels.js
└── locales/
    ├── zh/
    └── en/
```

**2. 定义通用参数**

`src/params/providers/skyreels/skyreels-common.js`:

```javascript
module.exports = {
  input: {
    prompt: {
      type: 'string',
      required: true,
      description: '文本提示词'
    },
    
    model: {
      type: 'string',
      required: true,
      description: '模型名称'
    }
  },
  
  output: {
    taskId: {
      type: 'string',
      description: '任务ID'
    },
    
    status: {
      type: 'string',
      description: '任务状态'
    }
  }
}
```

**3. 定义 API 参数**

`src/params/providers/skyreels/video/text-to-video-generation-task-submit.js`:

```javascript
const skyreelsCommon = require('../skyreels-common')

module.exports = {
  input: {
    prompt: skyreelsCommon.input.prompt,
    model: skyreelsCommon.input.model,
    
    duration: {
      type: 'number',
      required: false,
      description: '视频时长(秒)'
    }
  },
  
  output: {
    taskId: skyreelsCommon.output.taskId
  }
}
```

**4. 定义 API 元数据**

`src/metadata/apis/skyreels.js`:

```javascript
module.exports = {
  'text-to-video-generation-task-submit': {
    name: 'text-to-video-generation-task-submit',
    provider: 'skyreels',
    category: 'video',
    endpoint: '/v1/video/text-to-video/submit',
    method: 'POST',
    type: 'async',
    paramSchema: require('../../params/providers/skyreels/video/text-to-video-generation-task-submit'),
    models: ['skyreels-v1'],
    tags: ['video', 'generation', 'text-to-video'],
    priority: 80
  },
  
  'text-to-video-generation-task-query': {
    name: 'text-to-video-generation-task-query',
    provider: 'skyreels',
    category: 'video',
    endpoint: '/v1/video/text-to-video/query',
    method: 'GET',
    type: 'async',
    paramSchema: require('../../params/providers/skyreels/video/text-to-video-generation-task-query'),
    models: ['skyreels-v1'],
    tags: ['video', 'query'],
    priority: 80
  }
}
```

**5. 定义 Function 元数据**

`src/metadata/functions/skyreels.js`:

```javascript
module.exports = {
  'text-to-video-generation': {
    name: 'text-to-video-generation',
    type: 'async',
    provider: 'skyreels',
    category: 'video',
    
    apis: {
      request: 'text-to-video-generation-task-submit',
      query: 'text-to-video-generation-task-query'
    },
    
    models: ['skyreels-v1'],
    tags: ['video', 'generation', 'text-to-video'],
    priority: 80
  }
}
```

**6. 定义 Model 元数据**

`src/metadata/models/skyreels.js`:

```javascript
module.exports = {
  'skyreels-v1': {
    name: 'skyreels-v1',
    provider: 'skyreels',
    type: 'text_to_video',
    category: 'video',
    displayName: 'Skyreels V1',
    description: 'Skyreels 视频生成模型',
    capabilities: {
      maxDuration: 10,
      resolutions: ['1280x720', '1920x1080']
    },
    tags: ['video', 'generation']
  }
}
```

**7. 添加翻译**

`src/locales/zh/metadata.json`:

```json
{
  "models": {
    "skyreels-v1": {
      "displayName": "Skyreels V1",
      "description": "Skyreels 视频生成模型"
    }
  },
  
  "functions": {
    "text-to-video-generation": {
      "displayName": "文本生成视频",
      "description": "根据文本描述生成视频"
    }
  }
}
```

**8. 编写测试**

`tests/skyreels-video-generation.test.js`:

```javascript
const AIService = require('../index')

describe('Skyreels 视频生成测试', () => {
  test('应该获取 API 定义', () => {
    const api = AIService.getAPI('text-to-video-generation-task-submit')
    
    expect(api).toBeDefined()
    expect(api.provider).toBe('skyreels')
    expect(api.type).toBe('async')
  })
  
  test('应该获取 Function 定义', () => {
    const func = AIService.getFunction('text-to-video-generation')
    
    expect(func).toBeDefined()
    expect(func.type).toBe('async')
    expect(func.apis.request).toBe('text-to-video-generation-task-submit')
    expect(func.apis.query).toBe('text-to-video-generation-task-query')
  })
})
```

**9. 修改配置文件**

增加提供商的api-key等配置: 

```text
.ai-service\config.json
.ai-service\config.json.example
.env.example
```

#### 开发检查清单

完成开发后,请检查以下内容:

- [ ] 参数定义文件已创建并正确引用
- [ ] API 元数据已添加到 `metadata/apis/{provider}.js`
- [ ] Function 元数据已添加到 `metadata/functions/{provider}.js`
- [ ] Model 元数据已添加到 `metadata/models/{provider}.js`
- [ ] 中文翻译已添加到 `locales/zh/`
- [ ] 英文翻译已添加到 `locales/en/`
- [ ] 测试用例已编写并通过
- [ ] API 文档中的所有参数都已定义
- [ ] 参数的必填项和约束条件已正确设置
- [ ] 支持的模型列表已正确配置
- [ ] 优先级已合理设置
- [ ] 标签已正确添加

#### 常见问题

**Q: 如何处理异步 API?**

A: 异步 API 需要定义两个 API: 一个用于提交任务 (request),一个用于查询任务状态 (query)。在 Function 元数据中,通过 `apis.request` 和 `apis.query` 分别引用。

**Q: 如何复用通用参数?**

A: 在 `params/providers/{provider}/{provider}-common.js` 中定义通用参数,然后在具体 API 的参数定义中通过扩展运算符 `...` 复用。

**Q: 如何处理模型特定的约束?**

A: 在 Model 元数据的 `capabilities` 字段中定义模型能力,然后在参数验证逻辑中检查这些约束。

**Q: 如何支持新的 API 类型?**

A: 在 `src/constants/types.js` 中添加新的 API 类型常量,并更新相关文档。

**Q: 如何调试参数验证?**

A: 使用 `funcInstance.validateParams(params)` 方法验证参数,查看返回的 `errors` 数组了解具体的验证错误。

## 许可证

MIT License

## 联系方式

如有问题或建议，请提交 Issue 或 Pull Request。
