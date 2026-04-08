# all-in-one-api-service 开发文档

## 📚 目录

- [快速开始](#快速开始)
- [框架架构](#框架架构)
- [Service 类](#service-类)
- [API 类](#api-类)
- [Param 类](#param-类)
- [API 调用指南](#api-调用指南)
- [参数处理](#参数处理)
- [日志与调试](#日志与调试)
- [最佳实践](#最佳实践)
- [GitHub 私有仓库集成](#github-私有仓库集成)
- [相关资源](#相关资源)

## 🚀 快速开始

### 安装

```bash
npm install all-in-one-api-service
```

### 基本使用

```javascript
const { Services, APIs } = require('all-in-one-api-service')

// 1. 创建服务实例
const openai = new Services.OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// 2. 创建 API 实例
const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)

// 3. 获取参数信息
const inputInfo = dalleAPI.getInputInfo()
console.log('输入参数:', inputInfo)

// 4. 调用 API
const result = await dalleAPI.execute({
  prompt: '一只可爱的猫咪',
  size: '1024x1024',
  quality: 'hd'
})

if (result.success) {
  console.log('图片URL:', result.data.imageUrl)
}
```

## 🏗️ 框架架构

框架采用三层架构：

```
┌─────────────────────────────────────────┐
│            Application Layer            │
│  (你的应用 - 网站后端、API服务等)           │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│              API Layer                  │
│  (API 类 - 具体的 AI 功能接口)            │
│  - 参数验证                              │
│  - 参数转换                              │
│  - 结果提取                              │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│           Service Layer                 │
│  (Service 类 - 管理服务商连接和认证)       │
│  - API 调用                             │
│  - 错误处理                              │
│  - 重试机制                              │
└─────────────────────────────────────────┘
```

### 核心模块

```javascript
const { 
  Services,  // 服务层 - 管理服务商连接
  APIs,      // API 层 - 具体的 AI 功能
  Params,    // 参数层 - 参数定义和处理
  Config,    // 配置管理
  Utils      // 工具函数
} = require('all-in-one-api-service')
```

## 📦 Service 类

Service 类负责管理服务商的连接、认证和 API 调用。

### 创建 Service 实例

```javascript
const { Services } = require('all-in-one-api-service')

// OpenAI 服务
const openai = new Services.OpenAI({
  apiKey: 'sk-xxxxx',           // API 密钥
  baseURL: 'https://api.openai.com/v1',  // 可选，自定义基础 URL
  timeout: 30000,               // 可选，超时时间（毫秒）
  retryCount: 3,                // 可选，重试次数
  retryDelay: 1000,             // 可选，重试延迟（毫秒）
  headers: {},                  // 可选，自定义请求头
  logger: customLogger          // 可选，自定义日志器
})

// Stability AI 服务
const stability = new Services.Stability({
  apiKey: 'sk-xxxxx'
})

// Volcengine 服务
const volcengine = new Services.Volcengine({
  apiKey: 'xxxxx'
})
```

### Service 类方法

#### 1. 初始化相关

```javascript
/**
 * 初始化服务（自动调用）
 * @returns {Promise<void>}
 */
await openai.initialize()

/**
 * 健康检查
 * @returns {Promise<boolean>} 是否健康
 */
const isHealthy = await openai.healthCheck()

/**
 * 获取提供商信息
 * @returns {object} 提供商信息
 */
const info = openai.getProviderInfo()
// 返回: { name: 'openai', baseURL: '...', initialized: true }
```

#### 2. API 调用相关

```javascript
/**
 * 调用 API 端点
 * @param {string} endpoint - API 端点
 * @param {object} params - 请求参数
 * @param {object} options - 请求选项
 * @returns {Promise<any>} 响应结果
 */
const response = await openai.call('/chat/completions', {
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello' }]
})

/**
 * 流式调用 API 端点
 * @param {string} endpoint - API 端点
 * @param {object} params - 请求参数
 * @param {object} options - 请求选项
 * @yields {object} 流式响应数据块
 */
for await (const chunk of openai.callStream('/chat/completions', {
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello' }],
  stream: true
})) {
  console.log(chunk)
}

/**
 * 上传文件
 * @param {string} endpoint - API 端点
 * @param {FormData|object} formData - 表单数据
 * @param {object} options - 请求选项
 * @returns {Promise<any>} 响应结果
 */
const result = await openai.uploadFile('/files', formData)
```

#### 3. 异步任务相关

```javascript
/**
 * 提交异步任务
 * @param {string} endpoint - API 端点
 * @param {object} params - 请求参数
 * @param {object} options - 请求选项
 * @returns {Promise<object>} 任务提交结果
 */
const task = await volcengine.submitTask('/video/generate', {
  model: 'Seedance-1.5-pro',
  prompt: '一只可爱的猫咪'
})
// 返回: { id: 'task_xxx', status: 'pending', ... }

/**
 * 查询任务状态
 * @param {string} endpoint - 查询端点（可包含 {task_id} 占位符）
 * @param {string} taskId - 任务 ID
 * @param {object} options - 请求选项
 * @returns {Promise<object>} 任务状态
 */
const status = await volcengine.queryTask('/video/tasks/{task_id}', 'task_xxx')
// 返回: { id: 'task_xxx', status: 'processing', progress: 50, ... }

/**
 * 等待任务完成
 * @param {string} endpoint - 查询端点
 * @param {string} taskId - 任务 ID
 * @param {object} options - 等待选项
 * @returns {Promise<object>} 任务结果
 */
const result = await volcengine.waitForTask(
  '/video/tasks/{task_id}',
  'task_xxx',
  {
    interval: 2000,        // 查询间隔（毫秒）
    maxAttempts: 300,      // 最大尝试次数
    successStatus: 'succeeded',  // 成功状态
    failedStatus: ['failed', 'timeouted', 'cancelled']  // 失败状态列表
  }
)
```

#### 4. 配置相关

```javascript
/**
 * 获取 API 密钥
 * @returns {string|null} API 密钥
 */
const apiKey = openai.getApiKey()

/**
 * 获取基础 URL
 * @returns {string} 基础 URL
 */
const baseURL = openai.getBaseURL()

/**
 * 获取请求头
 * @returns {object} 请求头
 */
const headers = openai.getHeaders()

/**
 * 构建完整 URL
 * @param {string} endpoint - API 端点
 * @returns {string} 完整 URL
 */
const url = openai.buildURL('/chat/completions')
// 返回: 'https://api.openai.com/v1/chat/completions'
```

#### 5. 工具方法

```javascript
/**
 * 清理敏感参数（用于日志）
 * @param {object} params - 参数对象
 * @returns {object} 清理后的参数
 */
const sanitized = openai.sanitizeParams({
  apiKey: 'secret',
  prompt: 'test'
})
// 返回: { apiKey: '***', prompt: 'test' }

/**
 * 生成请求 ID
 * @returns {string} 请求 ID
 */
const requestId = openai.generateRequestId()
// 返回: 'openai_xxxxx'
```

### 可用的 Service 类

```javascript
const { Services } = require('all-in-one-api-service')

// 获取所有可用的 Service 类
const serviceNames = Object.keys(Services)
console.log('可用的服务:', serviceNames)
// ['OpenAI', 'Stability', 'Replicate', 'Gemini', 'Anthropic', 
//  'Midjourney', 'Skyreels', 'LTX', 'Volcengine', 'Mureka']
```

## 🎯 API 类

API 类提供具体的 AI 功能接口，封装了参数验证、转换和结果提取。

### 创建 API 实例

```javascript
const { Services, APIs } = require('all-in-one-api-service')

// 创建服务实例
const openai = new Services.OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// 创建 API 实例
const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)
const gpt4API = new APIs.OpenAI.Text.GPT4(openai)
const whisperAPI = new APIs.OpenAI.Audio.Whisper1(openai)
```

### API 类方法

#### 1. 执行 API 调用

```javascript
/**
 * 执行 API 调用
 * @param {object} inputParams - 输入参数
 * @param {object} options - 执行选项
 * @returns {Promise<object>} API 结果
 */
const result = await dalleAPI.execute({
  prompt: '一只可爱的猫咪',
  size: '1024x1024',
  quality: 'hd'
})

// 返回格式:
{
  success: true,      // 是否成功
  data: {             // 成功时的数据
    imageUrl: 'https://...',
    revisedPrompt: '...'
  },
  metadata: {         // 元数据
    requestId: 'req_xxx',
    timestamp: 1234567890,
    duration: 2345,   // 执行时长（毫秒）
    provider: 'openai',
    model: 'dall-e-3'
  }
}
```

#### 2. 流式调用

```javascript
/**
 * 执行流式 API 调用
 * @param {object} inputParams - 输入参数
 * @param {object} options - 执行选项
 * @yields {object} 流式响应数据块
 */
for await (const chunk of gpt4API.executeStream({
  messages: [{ role: 'user', content: '讲个笑话' }]
})) {
  if (chunk.success) {
    process.stdout.write(chunk.data.content)
    if (chunk.data.done) {
      console.log('\n完成')
    }
  } else {
    console.error('错误:', chunk.error)
  }
}
```

#### 3. 参数验证

```javascript
/**
 * 验证参数
 * @param {object} params - 参数对象
 * @returns {{valid: boolean, errors: string[]}} 验证结果
 */
const validation = dalleAPI.validateParams({
  prompt: 'test',
  size: 'invalid-size'
})

console.log(validation)
// {
//   valid: false,
//   errors: ['size must be one of: 1024x1024, 1792x1024, 1024x1792']
// }
```

#### 4. 获取参数信息

```javascript
/**
 * 获取简化输入参数信息
 * @returns {Array} 参数信息列表
 */
const inputInfo = dalleAPI.getInputInfo()
console.log(inputInfo)
// [
//   {
//     name: 'prompt',
//     type: 'string',
//     required: true,
//     description: '图像生成提示词',
//     minLength: 1,
//     maxLength: 4000
//   },
//   {
//     name: 'size',
//     type: 'enum',
//     required: false,
//     description: '图像尺寸',
//     default: '1024x1024',
//     options: ['1024x1024', '1792x1024', '1024x1792']
//   },
//   ...
// ]

/**
 * 获取简化输出结果信息
 * @returns {Array} 输出信息列表
 */
const outputInfo = dalleAPI.getOutputInfo()
console.log(outputInfo)
// [
//   {
//     name: 'imageUrl',
//     type: 'string',
//     description: '生成的图像URL',
//     path: 'data.0.url',
//     required: true
//   },
//   ...
// ]

/**
 * 获取单个参数详情
 * @param {string} paramName - 参数名
 * @returns {object|null} 参数详情
 */
const promptDetail = dalleAPI.getParamDetail('prompt')
console.log(promptDetail)
// {
//   name: 'prompt',
//   type: 'string',
//   required: true,
//   description: '图像生成提示词',
//   minLength: 1,
//   maxLength: 4000
// }

/**
 * 获取完整参数模式
 * @returns {object} 参数模式
 */
const paramSchema = dalleAPI.getParamSchema()
console.log(paramSchema)
// {
//   input: { prompt: {...}, size: {...}, ... },
//   output: { imageUrl: {...}, ... }
// }

/**
 * 获取输入参数模式
 * @returns {object} 输入参数模式
 */
const inputSchema = dalleAPI.getInputSchema()

/**
 * 获取输出参数模式
 * @returns {object} 输出参数模式
 */
const outputSchema = dalleAPI.getOutputSchema()
```

#### 5. 动态参数配置

```javascript
/**
 * 获取参数配置（统一接口）
 * 根据当前上下文动态计算参数约束
 * @param {object} context - 当前参数上下文
 * @returns {object} 参数配置
 */
const config = dalleAPI.getParamConfig({
  model: 'dall-e-3'
})

console.log(config)
// {
//   apiName: 'DallE3',
//   modelName: 'dall-e-3',
//   parameters: [
//     {
//       name: 'prompt',
//       type: 'string',
//       required: true,
//       dependencies: [],      // 依赖的参数
//       affects: [],           // 影响的参数
//       enabled: true,         // 是否启用
//       ...
//     },
//     ...
//   ],
//   state: {
//     complete: false,         // 参数是否完整
//     missingParams: ['prompt'],  // 缺失的参数
//     providedParams: ['model'],  // 已提供的参数
//     nextParam: 'prompt',     // 下一个需要填写的参数
//     progress: 0              // 完成进度（0-1）
//   }
// }

/**
 * 验证参数并返回建议（统一接口）
 * @param {object} params - 参数对象
 * @returns {object} 验证结果
 */
const result = dalleAPI.validateParamsWithContext({
  prompt: '一只可爱的猫咪',
  size: '1024x1024'
})

console.log(result)
// {
//   valid: true,
//   errors: [],
//   state: { complete: true, ... }
// }
```

#### 6. 模型能力相关

```javascript
/**
 * 获取模型名称
 * @returns {string} 模型名称
 */
const modelName = dalleAPI.getModelName()
// 返回: 'dall-e-3'

/**
 * 获取模型参数选项
 * @param {string} model - 模型名称（可选）
 * @returns {object|null} 参数选项
 */
const options = videoAPI.getModelParamOptions('Seedance-1.5-pro')

/**
 * 获取可用的参数选项（根据上下文）
 * @param {string} model - 模型名称
 * @param {object} context - 上下文参数
 * @returns {object|null} 可用选项
 */
const availableOptions = videoAPI.getAvailableOptions('Seedance-1.5-pro', {
  resolution: '1080p'
})
```

#### 7. 文档生成

```javascript
/**
 * 生成参数文档
 * @param {string} format - 文档格式 (markdown, json, html)
 * @returns {string} 文档内容
 */
const markdownDoc = dalleAPI.generateDocs('markdown')
const jsonDoc = dalleAPI.generateDocs('json')
const htmlDoc = dalleAPI.generateDocs('html')
```

### 可用的 API 类

```javascript
const { APIs } = require('all-in-one-api-service')

// OpenAI APIs
const openaiAPIs = {
  Image: {
    DallE2: APIs.OpenAI.Image.DallE2,
    DallE3: APIs.OpenAI.Image.DallE3
  },
  Text: {
    GPT35Turbo: APIs.OpenAI.Text.GPT35Turbo,
    GPT4: APIs.OpenAI.Text.GPT4,
    GPT4Stream: APIs.OpenAI.Text.GPT4Stream,
    GPT4Turbo: APIs.OpenAI.Text.GPT4Turbo
  },
  Audio: {
    TTS1: APIs.OpenAI.Audio.TTS1,
    Whisper1: APIs.OpenAI.Audio.Whisper1
  }
}

// 其他服务商类似结构
```

## 📋 Param 类

Param 类负责参数的定义、验证、转换和提取。

### Param 实例方法

```javascript
const { Services, APIs } = require('all-in-one-api-service')

const openai = new Services.OpenAI({ apiKey: 'test-key' })
const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)

// 获取 Param 实例
const param = dalleAPI.param

/**
 * 验证参数
 * @param {object} params - 参数对象
 * @returns {{valid: boolean, errors: string[]}} 验证结果
 */
const validation = param.validate({ prompt: 'test' })

/**
 * 转换参数
 * @param {object} params - 参数对象
 * @returns {object} 转换后的参数
 */
const transformed = param.transform({ prompt: 'test' })

/**
 * 从原始响应提取标准化结果
 * @param {any} rawResponse - 原始响应
 * @returns {object} 提取的结果
 */
const result = param.extractOutput(rawResponse)

/**
 * 提取单个字段
 * @param {any} rawResponse - 原始响应
 * @param {string} fieldName - 字段名
 * @returns {any} 提取的值
 */
const imageUrl = param.extractField(rawResponse, 'imageUrl')

/**
 * 获取参数模式
 * @returns {object} 参数模式
 */
const schema = param.getSchema()

/**
 * 获取输入参数模式
 * @returns {object} 输入参数模式
 */
const inputSchema = param.getInputSchema()

/**
 * 获取输出参数模式
 * @returns {object} 输出参数模式
 */
const outputSchema = param.getOutputSchema()

/**
 * 获取输入参数信息列表
 * @returns {Array} 参数信息列表
 */
const inputInfo = param.getInputInfo()

/**
 * 获取输出参数信息列表
 * @returns {Array} 输出信息列表
 */
const outputInfo = param.getOutputInfo()

/**
 * 获取单个参数详情
 * @param {string} paramName - 参数名
 * @returns {object|null} 参数详情
 */
const detail = param.getParamDetail('prompt')

/**
 * 获取模型可用参数选项
 * @param {string} model - 模型名称
 * @param {object} context - 上下文参数
 * @returns {object|null} 可用选项
 */
const options = param.getAvailableOptions('Seedance-1.5-pro', {})
```

### Param 静态方法

```javascript
const { Params } = require('all-in-one-api-service')

/**
 * 创建参数实例
 * @param {object} schema - 参数模式
 * @returns {BaseParam} 参数实例
 */
const param = Params.BaseParam.create({
  input: {
    prompt: {
      type: 'string',
      required: true,
      description: '提示词'
    }
  },
  output: {
    result: {
      type: 'string',
      path: 'data.result'
    }
  }
})

/**
 * 静态重写方法
 * @param {object} baseSchema - 基础模式
 * @param {object} overrideConfig - 覆盖配置
 * @returns {object} 新的模式
 */
const newSchema = Params.BaseParam.override(baseSchema, {
  input: {
    size: { options: ['1024x1024'] }
  }
})

/**
 * 静态扩展方法
 * @param {object} baseSchema - 基础模式
 * @param {object} newFields - 新字段
 * @returns {object} 新的模式
 */
const extendedSchema = Params.BaseParam.extend(baseSchema, {
  input: {
    customParam: { type: 'string' }
  }
})

/**
 * 静态删除方法
 * @param {object} baseSchema - 基础模式
 * @param {object} fields - 要删除的字段
 * @returns {object} 新的模式
 */
const omittedSchema = Params.BaseParam.omit(baseSchema, {
  input: ['style']
})

/**
 * 静态选择方法
 * @param {object} baseSchema - 基础模式
 * @param {object} fields - 要保留的字段
 * @returns {object} 新的模式
 */
const pickedSchema = Params.BaseParam.pick(baseSchema, {
  input: ['prompt', 'size']
})

/**
 * 组合多个模式
 * @param {...object} schemas - 模式列表
 * @returns {object} 组合后的模式
 */
const composedSchema = Params.BaseParam.compose(schema1, schema2)

/**
 * 继承父模式
 * @param {object} parentSchema - 父模式
 * @param {object} childConfig - 子配置
 * @returns {object} 新的模式
 */
const childSchema = Params.BaseParam.inherit(parentSchema, childConfig)

/**
 * 从模板创建
 * @param {object} template - 模板对象
 * @returns {object} 新的模式
 */
const schemaFromTemplate = Params.BaseParam.fromTemplate(template)
```

### Param 实例方法（修改约束）

```javascript
const param = dalleAPI.param

/**
 * 增量重写参数
 * @param {object} newConfig - 新配置
 * @returns {BaseParam} 新的参数实例
 */
const newParam = param.override({
  input: {
    size: { options: ['1024x1024'] }
  }
})

/**
 * 扩展参数
 * @param {object} newFields - 新字段
 * @returns {BaseParam} 新的参数实例
 */
const extendedParam = param.extend({
  input: {
    customParam: { type: 'string' }
  }
})

/**
 * 删除参数
 * @param {object} fields - 要删除的字段 {input: [], output: []}
 * @returns {BaseParam} 新的参数实例
 */
const omittedParam = param.omit({
  input: ['style']
})

/**
 * 选择参数
 * @param {object} fields - 要保留的字段 {input: [], output: []}
 * @returns {BaseParam} 新的参数实例
 */
const pickedParam = param.pick({
  input: ['prompt', 'size']
})
```

## 🎯 API 调用指南

### 1. 获取所有服务商

```javascript
const { Services } = require('all-in-one-api-service')

const providers = Object.keys(Services)
console.log('所有服务商:', providers)
// ['OpenAI', 'Stability', 'Replicate', 'Gemini', 'Anthropic', 
//  'Midjourney', 'Skyreels', 'LTX', 'Volcengine', 'Mureka']
```

### 2. 获取指定服务商的所有 API

```javascript
const { APIs } = require('all-in-one-api-service')

/**
 * 获取指定服务商的所有 API 列表
 * @param {string} providerName - 服务商名称
 * @returns {Array} API 列表
 */
function getAPIsByProvider(providerName) {
  const providerAPIs = APIs[providerName]
  const apiList = []

  Object.entries(providerAPIs).forEach(([category, apis]) => {
    if (typeof apis === 'function') {
      // 直接是 API 类
      apiList.push({
        name: category,
        type: 'class',
        className: apis.name
      })
    } else if (typeof apis === 'object') {
      // 是分类对象，遍历分类下的 API
      Object.entries(apis).forEach(([apiName, APIClass]) => {
        apiList.push({
          category: category,
          name: apiName,
          type: 'class',
          className: APIClass.name
        })
      })
    }
  })

  return apiList
}

// 使用示例
const openaiAPIs = getAPIsByProvider('OpenAI')
console.log('OpenAI 的所有 API:', openaiAPIs)
// [
//   { category: 'Image', name: 'DallE2', type: 'class', className: 'DallE2' },
//   { category: 'Image', name: 'DallE3', type: 'class', className: 'DallE3' },
//   { category: 'Text', name: 'GPT4', type: 'class', className: 'GPT4' },
//   ...
// ]
```

### 3. 基础调用

```javascript
const { Services, APIs } = require('all-in-one-api-service')

// 创建服务实例
const openai = new Services.OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// 创建 API 实例
const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)

// 调用 API
const result = await dalleAPI.execute({
  prompt: '一只可爱的猫咪',
  size: '1024x1024',
  quality: 'hd'
})

if (result.success) {
  console.log('图片URL:', result.data.imageUrl)
  console.log('优化后的提示词:', result.data.revisedPrompt)
} else {
  console.error('错误:', result.error)
}
```

### 4. 流式调用

```javascript
const gpt4StreamAPI = new APIs.OpenAI.Text.GPT4Stream(openai)

// 流式调用
for await (const chunk of gpt4StreamAPI.executeStream({
  messages: [{ role: 'user', content: '讲个笑话' }]
})) {
  if (chunk.success) {
    process.stdout.write(chunk.data.content)
    if (chunk.data.done) {
      console.log('\n完成')
    }
  } else {
    console.error('错误:', chunk.error)
  }
}
```

### 5. 异步任务调用

```javascript
const volcengine = new Services.Volcengine({
  apiKey: process.env.VOLCENGINE_API_KEY
})

const videoAPI = new APIs.Volcengine.Video.CreateVideoGenerationTask(volcengine)

// 提交任务
const submitResult = await videoAPI.execute({
  model: 'Seedance-1.5-pro',
  content: [
    { type: 'text', text: '一只可爱的猫咪在草地上奔跑' }
  ],
  resolution: '1080p',
  duration: 5
})

if (submitResult.success) {
  const taskId = submitResult.data.id
  
  // 等待任务完成
  const taskResult = await volcengine.waitForTask(
    '/video/tasks/{task_id}',
    taskId,
    { interval: 5000, maxAttempts: 100 }
  )
  
  console.log('视频URL:', taskResult.result.video_url)
}
```

### 6. 动态参数约束调用

```javascript
const videoAPI = new APIs.Volcengine.Video.CreateVideoGenerationTask(volcengine)

// 获取初始参数配置
const initialConfig = videoAPI.getParamConfig({})
console.log('初始配置:', initialConfig)

// 根据用户选择更新参数配置
const config1 = videoAPI.getParamConfig({
  model: 'Seedance-1.5-pro'
})

// 获取分辨率选项
const resolutionParam = config1.parameters.find(p => p.name === 'resolution')
console.log('可用分辨率:', resolutionParam.options)

// 根据分辨率获取帧率选项
const config2 = videoAPI.getParamConfig({
  model: 'Seedance-1.5-pro',
  resolution: '1080p'
})

const fpsParam = config2.parameters.find(p => p.name === 'fps')
console.log('可用帧率:', fpsParam.options)

// 根据帧率获取时长范围
const config3 = videoAPI.getParamConfig({
  model: 'Seedance-1.5-pro',
  resolution: '1080p',
  fps: 24
})

const durationParam = config3.parameters.find(p => p.name === 'duration')
console.log('时长范围:', {
  min: durationParam.min,
  max: durationParam.max
})

// 调用 API
const result = await videoAPI.execute({
  model: 'Seedance-1.5-pro',
  resolution: '1080p',
  fps: 24,
  duration: 5,
  content: [
    { type: 'text', text: '一只可爱的猫咪在草地上奔跑' }
  ]
})
```

## 🔍 参数处理

### 1. 根据参数列表拼接 JSON

框架提供了完整的参数信息，你可以根据这些信息构建正确的 JSON 参数对象。

#### 1.1 获取参数信息

```javascript
const { Services, APIs } = require('all-in-one-api-service')

const openai = new Services.OpenAI({ apiKey: 'test-key' })
const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)

// 获取输入参数信息
const inputInfo = dalleAPI.getInputInfo()

console.log('参数信息:', inputInfo)
// [
//   {
//     name: 'prompt',
//     type: 'string',
//     required: true,
//     description: '图像生成提示词',
//     minLength: 1,
//     maxLength: 4000
//   },
//   {
//     name: 'size',
//     type: 'enum',
//     required: false,
//     description: '图像尺寸',
//     default: '1024x1024',
//     options: ['1024x1024', '1792x1024', '1024x1792']
//   },
//   ...
// ]
```

#### 1.2 根据参数类型构建 JSON

根据参数信息中的 `type` 字段，可以知道如何构建参数值：

```javascript
/**
 * 根据参数信息构建参数 JSON
 * @param {Array} inputInfo - 输入参数信息列表
 * @param {object} userValues - 用户提供的值
 * @returns {object} 构建的参数对象
 */
function buildParamsJSON(inputInfo, userValues = {}) {
  const params = {}

  inputInfo.forEach(param => {
    const { name, type, required, default: defaultValue, options } = param

    // 如果用户提供了值，使用用户的值
    if (userValues[name] !== undefined) {
      params[name] = userValues[name]
      return
    }

    // 如果有默认值，使用默认值
    if (defaultValue !== undefined) {
      params[name] = defaultValue
      return
    }

    // 如果是必填参数且没有值，提示用户
    if (required) {
      console.warn(`缺少必填参数: ${name} (${type})`)
    }
  })

  return params
}

// 使用示例
const params = buildParamsJSON(inputInfo, {
  prompt: '一只可爱的猫咪'
})

console.log('构建的参数:', params)
// { prompt: '一只可爱的猫咪', size: '1024x1024', quality: 'standard', style: 'vivid' }
```

#### 1.3 参数类型映射规则

根据参数的 `type` 字段，可以确定值的类型：

| type 值 | JSON 值类型 | 示例 | 说明 |
|---------|------------|------|------|
| `string` | 字符串 | `"一只可爱的猫咪"` | 注意 `minLength` 和 `maxLength` 限制 |
| `enum` | 字符串（枚举值） | `"1024x1024"` | 必须是 `options` 中的一个值 |
| `number` | 数字 | `5` | 注意 `min` 和 `max` 范围限制 |
| `boolean` | 布尔值 | `true` | 只能是 `true` 或 `false` |
| `array` | 数组 | `["item1", "item2"]` | 注意 `itemSchema` 定义 |
| `object` | 对象 | `{ "key": "value" }` | 注意 `fields` 定义 |

### 2. 一次性获取所有参数约束

对于动态参数约束（如视频生成），可以通过一次调用获取所有参数的约束信息。

```javascript
const { Services, APIs } = require('all-in-one-api-service')

const volcengine = new Services.Volcengine({ apiKey: 'test-key' })
const videoAPI = new APIs.Volcengine.Video.CreateVideoGenerationTask(volcengine)

/**
 * 一次性获取所有参数的约束信息
 * @param {object} apiInstance - API 实例
 * @param {object} context - 当前上下文（已知的参数值）
 * @returns {object} 完整的参数配置
 */
function getAllParamConstraints(apiInstance, context = {}) {
  // 获取参数配置
  const config = apiInstance.getParamConfig(context)
  
  return {
    apiName: config.apiName,
    modelName: config.modelName,
    parameters: config.parameters.map(param => ({
      name: param.name,
      type: param.type,
      required: param.required,
      description: param.description,
      default: param.default,
      
      // 枚举选项
      options: param.options || null,
      
      // 数字范围
      min: param.min !== undefined ? param.min : null,
      max: param.max !== undefined ? param.max : null,
      step: param.step || null,
      
      // 字符串长度
      minLength: param.minLength || null,
      maxLength: param.maxLength || null,
      
      // 依赖关系
      dependencies: param.dependencies || [],
      affects: param.affects || [],
      
      // 状态
      enabled: param.enabled,
      visible: param.visible,
      
      // 约束来源
      constraintSource: param.constraintSource || null
    })),
    
    // 整体状态
    state: config.state
  }
}

// 使用示例：获取初始配置
const initialConstraints = getAllParamConstraints(videoAPI, {})

console.log('初始参数约束:', JSON.stringify(initialConstraints, null, 2))
```

### 3. 参数验证

```javascript
const { Services, APIs } = require('all-in-one-api-service')

const openai = new Services.OpenAI({ apiKey: 'test-key' })
const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)

/**
 * 验证参数
 * @param {object} params - 参数对象
 * @returns {{valid: boolean, errors: string[]}} 验证结果
 */
const validation = dalleAPI.validateParams({
  prompt: 'test',
  size: 'invalid-size'
})

console.log(validation)
// {
//   valid: false,
//   errors: ['size must be one of: 1024x1024, 1792x1024, 1024x1792']
// }
```

### 4. 参数验证提前终止

框架在参数验证失败时会立即返回错误，**不会调用实际的 API**，避免浪费资源：

```javascript
// 参数验证失败
const result = await dalleAPI.execute({
  // 缺少必填参数 prompt
  size: 'invalid-size'  // 无效的尺寸值
})

// 返回结果（不会调用 OpenAI API）
{
  success: false,
  error: {
    code: 'E003',  // 参数验证失败错误码
    message: 'Parameter validation failed',
    details: {
      errors: [
        'prompt is required',
        'size must be one of: 1024x1024, 1792x1024, 1024x1792'
      ]
    }
  },
  metadata: {
    requestId: 'req_abc123',
    timestamp: 1234567890,
    provider: 'openai'
  }
}
```

### 5. Output 参数提取

框架会自动根据 output schema 从 API 响应中提取指定字段：

```javascript
// API 原始响应
const rawResponse = {
  created: 1234567890,
  data: [
    {
      url: 'https://example.com/image1.png',
      revised_prompt: 'A cute cat sitting on a windowsill...'
    }
  ]
}

// 框架自动提取后的结果
const result = await dalleAPI.execute({ prompt: '一只可爱的猫咪' })

// result.data 结构:
{
  imageUrl: 'https://example.com/image1.png',
  revisedPrompt: 'A cute cat sitting on a windowsill...'
}
```

### 6. 手动提取

```javascript
// 手动提取单个字段
const imageUrl = dalleAPI.param.extractField(rawResponse, 'imageUrl')

// 手动提取所有输出字段
const extractedData = dalleAPI.param.extractOutput(rawResponse)
```

## 🐛 日志与调试

### 1. 日志配置

```javascript
const { Services, APIs, Utils } = require('all-in-one-api-service')

// 方式 1: 通过环境变量配置
// .env 文件
AI_SERVICE_LOG_LEVEL=DEBUG          // 日志级别: DEBUG, INFO, WARN, ERROR, SILENT
AI_SERVICE_LOG_FORMAT=json          // 日志格式: json, text
AI_SERVICE_LOG_FILE=./logs/app.log  // 日志文件路径（可选）

// 方式 2: 创建 Service 时配置
const openai = new Services.OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  logger: Utils.createLogger({
    level: 'DEBUG',                 // 日志级别
    format: 'json',                 // 日志格式
    output: ['console', 'file'],    // 输出方式
    file: './logs/openai.log',      // 日志文件路径
    maxSize: 10 * 1024 * 1024,      // 最大文件大小（字节）
    maxFiles: 5                     // 最大文件数量
  })
})

// 方式 3: 使用默认日志器
const logger = Utils.createLoggerFromEnv()
```

### 2. 日志级别

```javascript
const { Utils } = require('all-in-one-api-service')

const logger = Utils.createLogger({ level: 'DEBUG' })

// DEBUG - 调试信息
logger.debug('调试信息', { param: 'value' })

// INFO - 一般信息
logger.info('API 调用成功', { duration: 1234 })

// WARN - 警告信息
logger.warn('API 限流，稍后重试', { retryCount: 3 })

// ERROR - 错误信息
logger.error('API 调用失败', error)

// SILENT - 静默模式，不输出日志
```

### 3. 日志输出格式

```javascript
// JSON 格式（默认）
logger.info('API 调用', { api: 'DallE3', duration: 1234 })
// 输出: {"timestamp":"2024-01-01T12:00:00.000Z","level":"INFO","message":"API 调用","data":{"api":"DallE3","duration":1234}}

// 文本格式
const logger = Utils.createLogger({ level: 'INFO', format: 'text' })
logger.info('API 调用', { api: 'DallE3', duration: 1234 })
// 输出: [2024-01-01T12:00:00.000Z] [INFO] API 调用 {"api":"DallE3","duration":1234}
```

### 4. 日志文件轮转

当日志文件达到 `maxSize` 时，会自动轮转：

```
logs/
├── app.log      # 当前日志文件
├── app.log.1    # 第一个备份
├── app.log.2    # 第二个备份
├── app.log.3    # 第三个备份
├── app.log.4    # 第四个备份
└── app.log.5    # 第五个备份（最旧）
```

### 5. 子日志器

```javascript
const { Utils } = require('all-in-one-api-service')

const logger = Utils.createLogger({ level: 'INFO' })

// 创建子日志器
const openaiLogger = logger.child('OpenAI')
const dalleLogger = openaiLogger.child('DallE3')

// 使用子日志器
dalleLogger.info('生成图片')
// 输出: [OpenAI] [DallE3] 生成图片
```

### 6. 调试技巧

#### 6.1 开启 DEBUG 日志

```javascript
const openai = new Services.OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  logger: Utils.createLogger({ level: 'DEBUG' })
})

const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)

// 调用 API 时会输出详细日志
const result = await dalleAPI.execute({
  prompt: '一只可爱的猫咪'
})

// 日志输出:
// [DEBUG] [req_xxx] Executing DallE3 {"params":{"prompt":"一只可爱的猫咪"}}
// [DEBUG] Calling openai API {"endpoint":"/images/generations","params":{"prompt":"一只可爱的猫咪",...}}
// [DEBUG] [req_xxx] API call succeeded {"duration":2345}
```

#### 6.2 查看参数验证过程

```javascript
const validation = dalleAPI.validateParams({
  prompt: 'test',
  size: 'invalid-size'
})

console.log('验证结果:', validation)
// {
//   valid: false,
//   errors: ['size must be one of: 1024x1024, 1792x1024, 1024x1792']
// }
```

#### 6.3 查看动态参数配置

```javascript
const config = dalleAPI.getParamConfig({
  model: 'dall-e-3'
})

console.log('参数配置:', JSON.stringify(config, null, 2))
```

#### 6.4 查看原始 API 响应

```javascript
// 如果需要查看原始响应，可以重写 callAPI 方法
class DebugAPI extends APIs.OpenAI.Image.DallE3 {
  async callAPI(params, options) {
    const response = await super.callAPI(params, options)
    console.log('原始响应:', JSON.stringify(response, null, 2))
    return response
  }
}

const debugAPI = new DebugAPI(openai)
const result = await debugAPI.execute({ prompt: 'test' })
```

## 💡 最佳实践

### 1. 服务实例管理

```javascript
// ❌ 不推荐：每次请求都创建新实例
async function generateImage(prompt) {
  const openai = new Services.OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)
  return await dalleAPI.execute({ prompt })
}

// ✅ 推荐：使用单例模式
let openaiService = null
let dalleAPI = null

function getDalleAPI() {
  if (!dalleAPI) {
    openaiService = new Services.OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    dalleAPI = new APIs.OpenAI.Image.DallE3(openaiService)
  }
  return dalleAPI
}

async function generateImage(prompt) {
  return await getDalleAPI().execute({ prompt })
}
```

### 2. 错误处理

```javascript
/**
 * 统一错误处理
 * @param {object} result - API 调用结果
 */
function handleAPIResult(result) {
  if (!result.success) {
    switch (result.error.code) {
      case 'E003':
        console.error('参数验证失败:', result.error.details.errors)
        break
      case 'E007':
        console.error('API 调用失败:', result.error.message)
        break
      default:
        console.error('未知错误:', result.error)
    }
    return null
  }
  
  return result.data
}

// 使用示例
const result = await dalleAPI.execute({ prompt: '一只可爱的猫咪' })
const data = handleAPIResult(result)
if (data) {
  console.log('图片URL:', data.imageUrl)
}
```

### 3. 参数预验证

```javascript
/**
 * 调用前验证参数
 */
async function safeExecute(api, params) {
  // 验证参数
  const validation = api.validateParams(params)
  if (!validation.valid) {
    return {
      success: false,
      error: {
        code: 'E003',
        message: 'Parameter validation failed',
        details: { errors: validation.errors }
      }
    }
  }
  
  // 调用 API
  return await api.execute(params)
}

// 使用示例
const result = await safeExecute(dalleAPI, {
  prompt: '一只可爱的猫咪',
  size: '1024x1024'
})
```

### 4. 流式响应处理

```javascript
/**
 * 流式响应处理器
 */
async function handleStream(api, params, callbacks) {
  const { onChunk, onComplete, onError } = callbacks
  
  try {
    for await (const chunk of api.executeStream(params)) {
      if (!chunk.success) {
        onError(chunk.error)
        break
      }
      
      onChunk(chunk.data)
      
      if (chunk.data.done) {
        onComplete()
        break
      }
    }
  } catch (error) {
    onError(error)
  }
}

// 使用示例
await handleStream(
  gpt4StreamAPI,
  { messages: [{ role: 'user', content: '讲个笑话' }] },
  {
    onChunk: (data) => process.stdout.write(data.content),
    onComplete: () => console.log('\n完成'),
    onError: (error) => console.error('错误:', error)
  }
)
```

### 5. 并发控制

```javascript
/**
 * 批量调用 API（限制并发数）
 */
async function batchExecute(api, paramsList, concurrency = 3) {
  const results = []
  
  for (let i = 0; i < paramsList.length; i += concurrency) {
    const batch = paramsList.slice(i, i + concurrency)
    const batchResults = await Promise.all(
      batch.map(params => api.execute(params))
    )
    results.push(...batchResults)
  }
  
  return results
}

// 使用示例
const prompts = ['猫', '狗', '鸟', '鱼', '虎', '狮']
const results = await batchExecute(
  dalleAPI,
  prompts.map(prompt => ({ prompt })),
  3  // 并发数
)
```

### 6. 类型安全（TypeScript）

```typescript
import { Services, APIs, APIResult } from 'all-in-one-api-service'

interface ImageGenerationResult {
  imageUrl: string
  revisedPrompt: string
}

const openai = new Services.OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)

const result: APIResult<ImageGenerationResult> = await dalleAPI.execute({
  prompt: '一只可爱的猫咪',
  size: '1024x1024'
})

if (result.success) {
  console.log('图片URL:', result.data.imageUrl)
}
```

## 📦 GitHub 私有仓库集成

如果你的项目托管在 GitHub 私有仓库，可以通过以下方式集成，无需发布到公共 npm 仓库。

### 1. 快速开始

#### 1.1 生成 GitHub Personal Access Token

1. 访问 GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 点击 "Generate new token (classic)"
3. 设置 Token 名称，如：`npm-package-access`
4. 勾选权限：`repo`（完整仓库访问权限）和 `read:packages`（读取包权限）
5. 点击 "Generate token" 并保存 Token（只显示一次）

#### 1.2 配置 .npmrc 文件

在项目根目录创建或编辑 `.npmrc` 文件：

```bash
# .npmrc
@dongeast:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

**注意**：将 `.npmrc` 添加到 `.gitignore`，避免泄露 Token

#### 1.3 配置 package.json

```json
{
  "dependencies": {
    "@dongeast/all-in-one-api-service": "github:dongeast/all-in-one-api-service#v1.0.0"
  }
}
```

或使用特定分支/提交：

```json
{
  "dependencies": {
    "@dongeast/all-in-one-api-service": "github:dongeast/all-in-one-api-service#main",
    "@dongeast/all-in-one-api-service": "github:dongeast/all-in-one-api-service#a1b2c3d"
  }
}
```

#### 1.4 安装依赖

```bash
npm install
```

### 2. 更新方法

```bash
# 更新到最新版本
npm update @dongeast/all-in-one-api-service

# 更新到特定版本
npm install @dongeast/all-in-one-api-service@github:dongeast/all-in-one-api-service#v1.1.0
```

### 3. CI/CD 配置

#### 3.1 GitHub Actions

在 `.github/workflows/ci.yml` 中配置：

```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@dongeast'
      
      - name: Install dependencies
        run: npm ci
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Run tests
        run: npm test
```

### 4. 安全最佳实践

#### 4.1 使用环境变量

```bash
# .npmrc
@dongeast:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

#### 4.2 使用 .gitignore

```gitignore
# .gitignore
.npmrc
.env
```

#### 4.3 使用 GitHub Actions Secrets

在 GitHub 仓库设置中添加 Secrets：

1. 访问仓库 Settings → Secrets and variables → Actions
2. 添加 `NPM_TOKEN` secret
3. 在 workflow 中使用：

```yaml
- name: Install dependencies
  run: npm ci
  env:
    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 5. 常见问题

#### Q1: 安装失败提示权限错误

**解决方案**：
1. 检查 GitHub Token 是否有 `repo` 权限
2. 检查 `.npmrc` 配置是否正确
3. 确认 Token 未过期

#### Q2: 如何查看当前安装的版本？

```bash
# 查看安装的版本
npm list @dongeast/all-in-one-api-service

# 查看详细信息
npm show @dongeast/all-in-one-api-service
```

#### Q3: 如何在 Docker 中使用？

```dockerfile
# Dockerfile
FROM node:18

WORKDIR /app

# 复制 .npmrc（包含 Token）
COPY .npmrc .npmrc

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

CMD ["npm", "start"]
```

**注意**：在 Docker 构建时，需要通过 build arg 传递 Token：

```bash
docker build --build-arg NPM_TOKEN=your_token -t your-app .
```

### 6. 推荐方案总结

| 场景 | 推荐方案 | 优点 |
|------|---------|------|
| **个人项目** | 直接安装 | 简单快速 |
| **团队项目** | GitHub Packages | 版本管理清晰 |
| **CI/CD 环境** | GitHub Actions + Secrets | 安全可靠 |

**最推荐方案**：直接安装 + GitHub Packages

**原因**：
1. ✅ 配置简单，易于维护
2. ✅ 版本管理清晰
3. ✅ 团队协作友好
4. ✅ CI/CD 集成方便
5. ✅ 安全性高（使用环境变量）

## 📚 相关资源

- [API 文档](./README.md)
- [配置管理指南](./.ai-service/README.md)
- [GitHub 仓库](https://github.com/dongeast/all-in-one-api-service)
- [GitHub Packages 文档](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件
