# AI接口统一处理模块

一个统一的 AI 接口处理模块，支持多个服务商，实现零配置使用、统一接口调用、灵活参数配置。

## ✨ 核心特性

| 特性            | 说明                                                     |
| ------------- | ------------------------------------------------------ |
| 🚀 **零配置使用**  | 全局配置一次，所有项目自动加载                                        |
| 🔄 **多服务商支持** | OpenAI、Stability、Replicate、Gemini、Anthropic、Midjourney |
| 📐 **三层架构**   | Service层、API层、Param层分离设计                               |
| ✅ **参数验证**    | 自动验证输入参数类型、范围、必填项                                      |
| 📤 **结果标准化**  | 统一的输出结果格式，支持路径提取                                       |
| 🔧 **参数抽象**   | 支持增量重写、继承、组合等操作                                        |
| 📝 **动态表单**   | 提供获取入参/出参结构的接口，便于生成表单                                  |
| 📦 **按需导入**   | 支持 CommonJS、ES Module、Tree Shaking                     |
| 🌊 **流式响应**   | 支持SSE流式响应，实时输出AI生成内容                                   |

## 📦 安装

```bash
npm install all-in-one-api-service
```

或使用 yarn:

```bash
yarn add all-in-one-api-service
```

## 🧪 测试

### 📁 测试目录结构

```
tests/
├── run-tests.js           # 测试运行器
├── README.md              # 测试详细文档
│
├── 示例代码/
│   ├── basic-usage.js         # 基础使用示例
│   ├── config-management.js   # 配置管理示例
│   ├── custom-param.js        # 自定义参数示例
│   ├── dynamic-form.js        # 动态表单示例
│   ├── multi-provider.js      # 多服务商示例
│   └── stream-usage.js        # 流式响应示例
│
└── 功能测试/
    ├── stream-basic.js        # 流式响应基础测试
    ├── stream-error.js        # 流式响应错误处理测试
    ├── stream-validation.js   # 流式响应参数验证测试
    ├── stream-complete.js     # 流式响应完整收集测试
    └── stream-handler.js      # StreamHandler测试
```

### 🚀 快速开始

#### 1. 查看所有可用的测试

```bash
npm run test:list
```

#### 2. 运行所有测试

```bash
# 运行所有功能测试
npm test

# 运行所有示例
npm run test:examples

# 运行所有测试和示例
npm run test:all
```

### 🎯 单个测试执行

#### 方法一：使用测试运行器（推荐）

```bash
# 运行基础使用示例
node tests/run-tests.js basic-usage

# 运行流式响应基础测试
node tests/run-tests.js stream-basic

# 运行配置管理示例
node tests/run-tests.js config-management

# 运行StreamHandler测试
node tests/run-tests.js stream-handler
```

#### 方法二：直接运行测试文件

```bash
# 运行基础使用示例
node tests/basic-usage.js

# 运行流式响应基础测试
node tests/stream-basic.js

# 运行配置管理示例
node tests/config-management.js
```

#### 方法三：使用npm脚本

```bash
# 运行流式响应测试
npm run test:stream

# 列出所有测试
npm run test:list
```

### 📋 可用的测试案例

#### 示例代码

| 测试名 | 文件 | 说明 | 需要API Key |
|--------|------|------|-------------|
| `basic-usage` | basic-usage.js | 演示如何使用OpenAI DALL-E 3生成图像 | ✅ |
| `config-management` | config-management.js | 演示如何管理配置文件和环境变量 | ❌ |
| `custom-param` | custom-param.js | 演示如何自定义参数模式 | ✅ |
| `dynamic-form` | dynamic-form.js | 演示如何根据参数定义生成动态表单 | ❌ |
| `multi-provider` | multi-provider.js | 演示如何使用多个AI服务商 | ✅ |
| `stream-usage` | stream-usage.js | 演示如何使用流式响应功能 | ✅ |

#### 功能测试

| 测试名 | 文件 | 说明 | 需要API Key |
|--------|------|------|-------------|
| `stream-basic` | stream-basic.js | 测试基础流式响应功能 | ✅ |
| `stream-error` | stream-error.js | 测试流式响应错误处理 | ❌ |
| `stream-validation` | stream-validation.js | 测试流式响应参数验证 | ❌ |
| `stream-complete` | stream-complete.js | 测试收集完整流式响应 | ✅ |
| `stream-handler` | stream-handler.js | 测试SSE解析功能 | ❌ |

### 🔑 设置API Key

部分测试需要 OpenAI API Key。请通过以下方式设置：

**Windows PowerShell:**
```powershell
$env:OPENAI_API_KEY="sk-your-openai-api-key"
```

**Windows CMD:**
```cmd
set OPENAI_API_KEY=sk-your-openai-api-key
```

**Linux/macOS:**
```bash
export OPENAI_API_KEY=sk-your-openai-api-key
```

**使用 .env 文件:**

在项目根目录创建 `.env` 文件：
```env
OPENAI_API_KEY=sk-your-openai-api-key
```

### 📊 测试输出示例

#### 单个测试输出

```
╔════════════════════════════════════════════════════════════╗
║  运行测试: 流式响应基础测试                                 ║
╚════════════════════════════════════════════════════════════╝

📝 描述: 测试基础流式响应功能
📁 文件: tests/stream-basic.js
🔑 需要API Key: 是

开始执行...

=== 测试: 基础流式响应 ===

开始流式输出:

JavaScript是一种高级的、解释型的编程语言...

✅ 流式输出完成
   完成原因: stop
   数据块数量: 15
   总字符数: 120
✅ 测试通过

✅ 测试执行完成
```

#### 批量测试输出

```
╔════════════════════════════════════════════════════════════╗
║                    测试结果汇总                            ║
╚════════════════════════════════════════════════════════════╝

总计: 5 个测试
✅ 通过: 5
❌ 失败: 0
```

### 🛠️ 高级用法

#### 在代码中运行测试

```javascript
const { runTest, runTests } = require('./tests/run-tests')

// 运行单个测试
runTest('stream-basic')

// 运行多个测试
runTests(['stream-basic', 'stream-error', 'stream-handler'])
```

#### 创建自定义测试

参考现有测试文件创建新的测试：

```javascript
/**
 * 自定义测试
 */
const { Services, APIs } = require('../index')

async function myTest() {
  console.log('=== 我的测试 ===\n')
  
  // 测试代码
  
  console.log('✅ 测试通过\n')
}

if (require.main === module) {
  myTest().catch(console.error)
}

module.exports = { myTest }
```

然后在 `tests/run-tests.js` 中添加测试配置：

```javascript
const TEST_CASES = {
  // ... 其他测试
  'my-test': {
    name: '我的测试',
    file: 'my-test.js',
    description: '自定义测试描述',
    requiresApiKey: false,
    category: 'tests'
  }
}
```

### ❓ 常见问题

**Q: 测试运行失败怎么办？**

A: 检查以下几点：
1. 是否正确设置了 `OPENAI_API_KEY`
2. Node.js 版本是否符合要求 (>=16.0.0)
3. 是否安装了所有依赖 (`npm install`)

**Q: 如何跳过需要API Key的测试？**

A: 只运行不需要API Key的测试：

```bash
node tests/run-tests.js stream-error
node tests/run-tests.js stream-validation
node tests/run-tests.js stream-handler
node tests/run-tests.js config-management
node tests/run-tests.js dynamic-form
```

**Q: 如何查看详细的测试输出？**

A: 直接运行测试文件可以看到更详细的输出：

```bash
node tests/stream-basic.js
```

### 📝 测试最佳实践

1. **环境隔离**: 使用 `.env` 文件管理测试环境
2. **API Key安全**: 不要将真实的API Key提交到代码仓库
3. **测试覆盖**: 确保测试覆盖所有关键功能
4. **错误处理**: 测试各种错误场景
5. **性能测试**: 可以添加性能相关的测试

详细说明请查看 [测试文档](tests/README.md)。

## 🚀 快速开始

### 方式一：零配置使用（推荐）

**1. 创建全局配置**

```powershell
# Windows PowerShell
mkdir -p $env:USERPROFILE\.ai-service

@"
{
  "version": "1.0",
  "providers": {
    "openai": {
      "apiKey": "sk-your-openai-api-key"
    }
  }
}
"@ | Out-File -FilePath "$env:USERPROFILE\.ai-service\config.local.json" -Encoding utf8
```

```bash
# Linux/macOS
mkdir -p ~/.ai-service

cat > ~/.ai-service/config.local.json << 'EOF'
{
  "version": "1.0",
  "providers": {
    "openai": {
      "apiKey": "sk-your-openai-api-key"
    }
  }
}
EOF
```

**2. 直接使用**

```javascript
const { Services, APIs } = require('all-in-one-api-service')

// 无需传入配置，自动从全局配置加载
const openai = new Services.OpenAI()
const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)

const result = await dalleAPI.execute({
  prompt: 'A beautiful sunset over the ocean'
})

console.log(result.data.imageUrl)
```

### 方式二：环境变量配置

创建 `.env` 文件：

```env
AI_SERVICE_OPENAI_API_KEY=sk-your-openai-api-key
AI_SERVICE_STABILITY_API_KEY=sk-your-stability-api-key
AI_SERVICE_REPLICATE_API_TOKEN=r8-your-replicate-token
```

### 方式三：代码传入配置

```javascript
const { Services, APIs } = require('all-in-one-api-service')

const openai = new Services.OpenAI({
  apiKey: 'sk-your-openai-api-key'
})

const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)
```

## 📖 使用示例

### 图像生成

```javascript
const { Services, APIs } = require('all-in-one-api-service')

// OpenAI DALL-E 3
const openai = new Services.OpenAI()
const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)

const result = await dalleAPI.execute({
  prompt: 'A beautiful sunset over the ocean',
  size: '1024x1024',
  quality: 'hd'
})

console.log(result.data.imageUrl)
console.log(result.data.revisedPrompt)

// Stability AI
const stability = new Services.Stability()
const sdAPI = new APIs.Stability.Image.StableDiffusionXL(stability)

const result2 = await sdAPI.execute({
  prompt: 'A cyberpunk city',
  width: 1024,
  height: 1024,
  steps: 30
})

console.log(result2.data.artifacts)
```

### 文本生成

```javascript
const { Services, APIs } = require('all-in-one-api-service')

// OpenAI GPT-4
const openai = new Services.OpenAI()
const gptAPI = new APIs.OpenAI.Text.GPT4(openai)

const result = await gptAPI.execute({
  prompt: 'Explain quantum computing in simple terms',
  maxTokens: 500,
  temperature: 0.7
})

console.log(result.data.text)
console.log(result.data.usage)

// Anthropic Claude
const anthropic = new Services.Anthropic()
const claudeAPI = new APIs.Anthropic.Text.Claude3Sonnet(anthropic)

const result2 = await claudeAPI.execute({
  prompt: 'What is the meaning of life?',
  maxTokens: 1000
})

console.log(result2.data.text)
```

### 流式响应

```javascript
const { Services, APIs } = require('all-in-one-api-service')

// OpenAI GPT-4 流式输出
const openai = new Services.OpenAI()
const gpt4Stream = new APIs.OpenAI.Text.GPT4Stream(openai)

// 流式输出文本
for await (const chunk of gpt4Stream.executeStream({
  messages: [
    { role: 'user', content: '请介绍一下人工智能的发展历程' }
  ],
  maxTokens: 500
})) {
  if (!chunk.success) {
    console.error('错误:', chunk.error)
    break
  }

  if (chunk.data.content) {
    process.stdout.write(chunk.data.content)
  }

  if (chunk.data.done) {
    console.log('\n\n[流式输出完成]')
  }
}

// 收集完整响应
const result = await gpt4Stream.chatComplete({
  messages: [
    { role: 'user', content: '什么是机器学习?' }
  ]
})

if (result.success) {
  console.log('完整响应:', result.data.content)
  console.log('Token使用:', result.data.usage)
}
```

### 视频生成

```javascript
const { Services, APIs } = require('all-in-one-api-service')

// OpenAI Sora
const openai = new Services.OpenAI()
const soraAPI = new APIs.OpenAI.Video.Sora(openai)

const result = await soraAPI.execute({
  prompt: 'A cat playing piano',
  duration: 5
})

console.log(result.data.videoUrl)

// Replicate Stable Video
const replicate = new Services.Replicate()
const videoAPI = new APIs.Replicate.Video.StableVideo(replicate)

const result2 = await videoAPI.execute({
  prompt: 'A time-lapse of a flower blooming'
})

console.log(result2.data.videoUrl)
```

### 音频处理

```javascript
const { Services, APIs } = require('all-in-one-api-service')

// 文本转语音
const openai = new Services.OpenAI()
const ttsAPI = new APIs.OpenAI.Audio.TTS1(openai)

const result = await ttsAPI.execute({
  prompt: 'Hello, this is a test.',
  voice: 'alloy'
})

console.log(result.data.audioUrl)

// 语音转文本
const whisperAPI = new APIs.OpenAI.Audio.Whisper1(openai)

const result2 = await whisperAPI.execute({
  file: '/path/to/audio.mp3'
})

console.log(result2.data.transcript)
```

### 流式响应

```javascript
const { Services, APIs } = require('all-in-one-api-service')

// GPT-4 流式输出
const openai = new Services.OpenAI()
const gpt4Stream = new APIs.OpenAI.Text.GPT4Stream(openai)

// 实时输出AI生成内容
for await (const chunk of gpt4Stream.executeStream({
  messages: [
    { role: 'user', content: '请介绍一下人工智能的发展历程' }
  ],
  maxTokens: 500
})) {
  if (!chunk.success) {
    console.error('错误:', chunk.error)
    break
  }

  if (chunk.data.content) {
    process.stdout.write(chunk.data.content)
  }

  if (chunk.data.done) {
    console.log('\n\n[流式输出完成]')
    console.log('完成原因:', chunk.data.finishReason)
  }
}

// 收集完整响应
const result = await gpt4Stream.chatComplete({
  messages: [
    { role: 'user', content: '什么是机器学习?' }
  ]
})

if (result.success) {
  console.log('完整响应:', result.data.content)
  console.log('Token使用:', result.data.usage)
}
```

#### Next.js API路由集成

```javascript
// app/api/chat/route.js
import { NextRequest } from 'next/server'
import { Services, APIs } from 'all-in-one-api-service'

export async function POST(request: NextRequest) {
  const { messages } = await request.json()

  const openai = new Services.OpenAI()
  const gpt4Stream = new APIs.OpenAI.Text.GPT4Stream(openai)

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of gpt4Stream.executeStream({ messages })) {
          if (!chunk.success) {
            controller.error(new Error(chunk.error.message))
            return
          }

          const data = JSON.stringify({
            content: chunk.data.content,
            done: chunk.data.done
          })
          
          controller.enqueue(encoder.encode(`data: ${data}\n\n`))
        }
        
        controller.close()
      } catch (error) {
        controller.error(error)
      }
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  })
}
```

### 多服务商切换

```javascript
const { Services, APIs } = require('all-in-one-api-service')

// 统一接口，不同服务商
const providers = {
  openai: {
    service: new Services.OpenAI(),
    api: APIs.OpenAI.Image.DallE3
  },
  stability: {
    service: new Services.Stability(),
    api: APIs.Stability.Image.StableDiffusionXL
  },
  replicate: {
    service: new Services.Replicate(),
    api: APIs.Replicate.Image.Flux
  }
}

async function generateImage(providerName, prompt) {
  const { service, api } = providers[providerName]
  const apiInstance = new api(service)
  return await apiInstance.execute({ prompt })
}

// 使用不同服务商生成图像
const result1 = await generateImage('openai', 'a cat')
const result2 = await generateImage('stability', 'a dog')
const result3 = await generateImage('replicate', 'a bird')
```

## 📐 架构设计

```
┌─────────────────────────────────────────────────────────────┐
│                        应用层 (Application)                  │
│                    Next.js / 其他项目                        │
│              ┌─────────────────────────────┐               │
│              │  executeStream() 流式输出   │               │
│              └─────────────────────────────┘               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        API层 (API Layer)                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Image API  │  │  Video API  │  │  Text API   │         │
│  │  DALL-E 3   │  │    Sora     │  │   GPT-4     │         │
│  │  Stable Diff│  │ Stable Video│  │ GPT-4 Stream│         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Service层 (Service Layer)               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ OpenAI Svc  │  │Stability Svc│  │Replicate Svc│         │
│  │  API Key    │  │  API Key    │  │  API Token  │         │
│  │ callStream  │  │             │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Param层 (Param Layer)                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Validators │  │Transformers │  │  Extractors │         │
│  │   验证器    │  │   转换器    │  │   提取器    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    流式处理器 (StreamHandler)                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ SSE解析     │  │ 数据转换    │  │ 错误处理    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

### 层级职责

| 层级           | 职责      | 关键功能                |
| ------------ | ------- | ------------------- |
| **Service层** | 服务提供商管理 | API密钥解析、认证处理、统一调用接口 |
| **API层**     | 具体接口实现  | 按服务商组织、参数验证、响应标准化   |
| **Param层**   | 参数定义与处理 | 参数验证、参数转换、结果提取、模式抽象 |

## 📋 参数定义与UI生成

### 快速获取参数定义

当你在其他项目中通过npm引入本模块后，可以快速获取任意API的参数定义，用于生成UI表单。

#### 1. 获取输入参数列表

```javascript
const { Services, APIs } = require('all-in-one-api-service')

const openai = new Services.OpenAI()
const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)

// 获取输入参数信息列表
const inputInfo = dalleAPI.getInputInfo()
console.log(inputInfo)
```

**返回示例：**

```javascript
[
  {
    name: 'prompt',
    type: 'string',
    required: true,
    description: '图像生成提示词',
    minLength: 1,
    maxLength: 4000
  },
  {
    name: 'size',
    type: 'enum',
    required: false,
    default: '1024x1024',
    description: '图像尺寸',
    options: ['1024x1024', '1792x1024', '1024x1792']
  },
  {
    name: 'quality',
    type: 'enum',
    required: false,
    default: 'standard',
    description: '图像质量',
    options: ['standard', 'hd']
  },
  {
    name: 'style',
    type: 'enum',
    required: false,
    default: 'vivid',
    description: '图像风格',
    options: ['vivid', 'natural']
  }
]
```

#### 2. 获取输出结果定义

```javascript
// 获取输出结果信息列表
const outputInfo = dalleAPI.getOutputInfo()
console.log(outputInfo)
```

**返回示例：**

```javascript
[
  {
    name: 'imageUrl',
    type: 'string',
    description: '生成的图像URL',
    required: true
  },
  {
    name: 'revisedPrompt',
    type: 'string',
    description: 'OpenAI优化后的提示词'
  }
]
```

#### 3. 获取完整参数模式

```javascript
// 获取完整的参数模式定义
const schema = dalleAPI.getParamSchema()
console.log(JSON.stringify(schema, null, 2))
```

**返回示例：**

```json
{
  "input": {
    "prompt": {
      "type": "string",
      "required": true,
      "description": "图像生成提示词",
      "minLength": 1,
      "maxLength": 4000
    },
    "size": {
      "type": "enum",
      "options": ["1024x1024", "1792x1024", "1024x1792"],
      "default": "1024x1024",
      "description": "图像尺寸"
    }
  },
  "output": {
    "imageUrl": {
      "type": "string",
      "description": "生成的图像URL",
      "path": "data[0].url",
      "required": true
    }
  }
}
```

#### 4. 获取单个参数详情

```javascript
// 获取特定参数的详细信息
const promptDetail = dalleAPI.getParamDetail('prompt')
console.log(promptDetail)
```

**返回示例：**

```javascript
{
  name: 'prompt',
  type: 'string',
  required: true,
  description: '图像生成提示词',
  minLength: 1,
  maxLength: 4000
}
```

### 参数类型定义

本模块支持以下参数类型：

| 类型 | 说明 | 字段属性 |
|------|------|----------|
| `string` | 字符串类型 | `minLength`, `maxLength`, `pattern` |
| `number` | 数字类型 | `min`, `max`, `integer` |
| `boolean` | 布尔类型 | - |
| `enum` | 枚举类型 | `options` (选项列表) |
| `array` | 数组类型 | `itemSchema`, `minItems`, `maxItems` |
| `object` | 对象类型 | `properties` |

### 动态表单生成示例

#### React表单生成

```javascript
import React from 'react'
import { Services, APIs } from 'all-in-one-api-service'

function DynamicForm({ apiInstance, onSubmit }) {
  const inputInfo = apiInstance.getInputInfo()

  const renderField = (param) => {
    const { name, type, required, description, options, min, max, minLength, maxLength } = param

    switch (type) {
      case 'string':
        return (
          <div key={name} className="form-group">
            <label>
              {name} {required && <span className="required">*</span>}
            </label>
            <input
              type="text"
              name={name}
              required={required}
              minLength={minLength}
              maxLength={maxLength}
              placeholder={description}
            />
            <small className="help-text">{description}</small>
          </div>
        )

      case 'number':
        return (
          <div key={name} className="form-group">
            <label>
              {name} {required && <span className="required">*</span>}
            </label>
            <input
              type="number"
              name={name}
              required={required}
              min={min}
              max={max}
              placeholder={description}
            />
            <small className="help-text">{description}</small>
          </div>
        )

      case 'enum':
        return (
          <div key={name} className="form-group">
            <label>
              {name} {required && <span className="required">*</span>}
            </label>
            <select name={name} required={required}>
              {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <small className="help-text">{description}</small>
          </div>
        )

      case 'boolean':
        return (
          <div key={name} className="form-group">
            <label>
              <input type="checkbox" name={name} />
              {name}
            </label>
            <small className="help-text">{description}</small>
          </div>
        )

      default:
        return (
          <div key={name} className="form-group">
            <label>{name}</label>
            <input type="text" name={name} />
          </div>
        )
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {inputInfo.map(renderField)}
      <button type="submit">提交</button>
    </form>
  )
}

// 使用示例
function App() {
  const openai = new Services.OpenAI()
  const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const params = Object.fromEntries(formData)
    
    const result = await dalleAPI.execute(params)
    console.log(result)
  }

  return <DynamicForm apiInstance={dalleAPI} onSubmit={handleSubmit} />
}
```

#### Vue表单生成

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div v-for="param in inputInfo" :key="param.name" class="form-group">
      <!-- 字符串类型 -->
      <template v-if="param.type === 'string'">
        <label>
          {{ param.name }}
          <span v-if="param.required" class="required">*</span>
        </label>
        <input
          v-model="formData[param.name]"
          type="text"
          :required="param.required"
          :minlength="param.minLength"
          :maxlength="param.maxLength"
          :placeholder="param.description"
        />
      </template>

      <!-- 数字类型 -->
      <template v-else-if="param.type === 'number'">
        <label>
          {{ param.name }}
          <span v-if="param.required" class="required">*</span>
        </label>
        <input
          v-model.number="formData[param.name]"
          type="number"
          :required="param.required"
          :min="param.min"
          :max="param.max"
          :placeholder="param.description"
        />
      </template>

      <!-- 枚举类型 -->
      <template v-else-if="param.type === 'enum'">
        <label>
          {{ param.name }}
          <span v-if="param.required" class="required">*</span>
        </label>
        <select v-model="formData[param.name]" :required="param.required">
          <option v-for="opt in param.options" :key="opt" :value="opt">
            {{ opt }}
          </option>
        </select>
      </template>

      <!-- 布尔类型 -->
      <template v-else-if="param.type === 'boolean'">
        <label>
          <input v-model="formData[param.name]" type="checkbox" />
          {{ param.name }}
        </label>
      </template>

      <small class="help-text">{{ param.description }}</small>
    </div>

    <button type="submit">提交</button>
  </form>
</template>

<script>
import { Services, APIs } from 'all-in-one-api-service'

export default {
  data() {
    return {
      inputInfo: [],
      formData: {}
    }
  },
  mounted() {
    const openai = new Services.OpenAI()
    const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)
    
    this.inputInfo = dalleAPI.getInputInfo()
    
    // 初始化默认值
    this.inputInfo.forEach(param => {
      if (param.default !== undefined) {
        this.$set(this.formData, param.name, param.default)
      }
    })
  },
  methods: {
    async handleSubmit() {
      const result = await this.apiInstance.execute(this.formData)
      console.log(result)
    }
  }
}
</script>
```

### 参数文档生成

```javascript
// 生成Markdown格式文档
const markdownDocs = dalleAPI.generateDocs('markdown')
console.log(markdownDocs)

// 生成JSON格式文档
const jsonDocs = dalleAPI.generateDocs('json')
console.log(jsonDocs)

// 生成HTML格式文档
const htmlDocs = dalleAPI.generateDocs('html')
console.log(htmlDocs)
```

**Markdown文档示例：**

```markdown
# DallE3

Model: dall-e-3

## Input Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| prompt | string | Yes | - | 图像生成提示词 |
| size | enum | No | 1024x1024 | 图像尺寸 |
| quality | enum | No | standard | 图像质量 |
| style | enum | No | vivid | 图像风格 |

## Output Fields

| Name | Type | Description |
|------|------|-------------|
| imageUrl | string | 生成的图像URL |
| revisedPrompt | string | OpenAI优化后的提示词 |
```

### TypeScript类型定义

本模块提供完整的TypeScript类型定义，方便在TypeScript项目中使用：

```typescript
import { 
  Services, 
  APIs, 
  ParamInfo, 
  ParamSchema,
  APIResult 
} from 'all-in-one-api-service'

const openai = new Services.OpenAI()
const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)

// 类型安全的参数信息
const inputInfo: ParamInfo[] = dalleAPI.getInputInfo()

// 类型安全的参数模式
const schema: ParamSchema = dalleAPI.getParamSchema()

// 类型安全的执行结果
const result: APIResult<{ imageUrl: string; revisedPrompt: string }> = 
  await dalleAPI.execute({ prompt: 'a cat' })
```

### 实际应用场景

#### 1. 自动化API测试工具

```javascript
// 根据参数定义自动生成测试用例
function generateTestCases(apiInstance) {
  const inputInfo = apiInstance.getInputInfo()
  const testCases = []

  // 生成边界测试用例
  inputInfo.forEach(param => {
    if (param.type === 'string') {
      testCases.push({
        name: `${param.name}_min_length`,
        params: { [param.name]: 'a'.repeat(param.minLength) }
      })
      testCases.push({
        name: `${param.name}_max_length`,
        params: { [param.name]: 'a'.repeat(param.maxLength) }
      })
    }
    
    if (param.type === 'number') {
      testCases.push({
        name: `${param.name}_min_value`,
        params: { [param.name]: param.min }
      })
      testCases.push({
        name: `${param.name}_max_value`,
        params: { [param.name]: param.max }
      })
    }
  })

  return testCases
}
```

#### 2. API文档自动生成

```javascript
// 自动生成API文档网站
function generateAPIDocumentation(apiInstance) {
  const inputInfo = apiInstance.getInputInfo()
  const outputInfo = apiInstance.getOutputInfo()

  return {
    title: apiInstance.apiName,
    model: apiInstance.getModelName(),
    inputs: inputInfo.map(param => ({
      field: param.name,
      type: param.type,
      required: param.required,
      defaultValue: param.default,
      description: param.description,
      constraints: {
        min: param.min,
        max: param.max,
        minLength: param.minLength,
        maxLength: param.maxLength,
        options: param.options
      }
    })),
    outputs: outputInfo.map(field => ({
      field: field.name,
      type: field.type,
      description: field.description
    }))
  }
}
```

#### 3. 参数验证UI提示

```javascript
// 实时参数验证
function validateParamInRealTime(apiInstance, paramName, value) {
  const paramDetail = apiInstance.getParamDetail(paramName)
  const errors = []

  if (paramDetail.required && !value) {
    errors.push(`${paramName} 是必填项`)
  }

  if (paramDetail.type === 'string') {
    if (paramDetail.minLength && value.length < paramDetail.minLength) {
      errors.push(`${paramName} 长度不能少于 ${paramDetail.minLength}`)
    }
    if (paramDetail.maxLength && value.length > paramDetail.maxLength) {
      errors.push(`${paramName} 长度不能超过 ${paramDetail.maxLength}`)
    }
  }

  if (paramDetail.type === 'enum') {
    if (!paramDetail.options.includes(value)) {
      errors.push(`${paramName} 必须是以下值之一: ${paramDetail.options.join(', ')}`)
    }
  }

  return errors
}
```

## 🔧 高级用法

### 自定义参数模式

```javascript
const { Services, APIs, Params } = require('all-in-one-api-service')

// 自定义参数模式 - 只允许正方形尺寸
const customSchema = Params.BaseParam.override(
  Params.Schemas.OpenAI.image.dalleE3,
  {
    input: {
      size: { options: ['1024x1024'] }
    }
  }
)

// 使用自定义参数
const openai = new Services.OpenAI()
const dalleAPI = new APIs.OpenAI.Image.DallE3(openai, customSchema.getSchema())
```

### 获取参数结构

```javascript
const { Services, APIs } = require('all-in-one-api-service')

const openai = new Services.OpenAI()
const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)

// 获取输入参数信息
const inputInfo = dalleAPI.getInputInfo()
console.log(inputInfo)
// [
//   { name: 'prompt', type: 'string', required: true, description: '...' },
//   { name: 'size', type: 'enum', options: [...], default: '1024x1024' },
//   { name: 'quality', type: 'enum', options: ['standard', 'hd'] },
//   { name: 'style', type: 'enum', options: ['vivid', 'natural'] }
// ]

// 获取输出结果信息
const outputInfo = dalleAPI.getOutputInfo()
console.log(outputInfo)
// [
//   { name: 'imageUrl', type: 'string', description: '生成的图像URL' },
//   { name: 'revisedPrompt', type: 'string', description: '优化后的提示词' }
// ]

// 生成参数文档
const docs = dalleAPI.generateDocs('markdown')
console.log(docs)
```

### 动态表单生成

```javascript
const { Services, APIs } = require('all-in-one-api-service')

const openai = new Services.OpenAI()
const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)
const inputInfo = dalleAPI.getInputInfo()

// 根据参数类型生成表单
function renderForm(inputInfo) {
  return inputInfo.map(param => {
    switch (param.type) {
      case 'string':
        return `<input type="text" name="${param.name}" ${param.required ? 'required' : ''} />`
      case 'enum':
        return `<select name="${param.name}">
          ${param.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
        </select>`
      case 'number':
        return `<input type="number" name="${param.name}" min="${param.min || ''}" max="${param.max || ''}" />`
      case 'boolean':
        return `<input type="checkbox" name="${param.name}" />`
      default:
        return `<input type="text" name="${param.name}" />`
    }
  }).join('\n')
}

console.log(renderForm(inputInfo))
```

## 📋 支持的服务商

| 服务商               | 图像                                     | 文本                           | 视频           | 音频               | 流式支持 |
| ----------------- | -------------------------------------- | ---------------------------- | ------------ | ---------------- | -------- |
| **OpenAI**        | DALL-E 2, DALL-E 3                     | GPT-3.5, GPT-4, GPT-4 Turbo  | Sora         | TTS-1, Whisper-1 | ✅ GPT-4 Stream |
| **Stability AI**  | Stable Diffusion XL, Stable Image Core | -                            | -            | -                | 🚧 计划中 |
| **Replicate**     | Flux                                   | -                            | Stable Video | -                | 🚧 计划中 |
| **Google Gemini** | Imagen                                 | Gemini Pro, Gemini Ultra     | -            | -                | 🚧 计划中 |
| **Anthropic**     | -                                      | Claude 3 Opus, Sonnet, Haiku | -            | -                | 🚧 计划中 |
| **Midjourney**    | Midjourney V6                          | -                            | -            | -                | 🚧 计划中 |

## ⚙️ 配置

详细配置说明请查看 [配置指南](docs/CONFIGURATION.md)。

### 流式响应

详细流式响应使用说明请查看 [流式响应指南](docs/STREAMING.md)。

### 配置优先级

```
代码传入 > 环境变量 > 项目本地配置 > 项目配置 > 全局本地配置 > 全局配置 > 预设配置
```

### 环境变量

```env
# OpenAI
AI_SERVICE_OPENAI_API_KEY=sk-xxx
AI_SERVICE_OPENAI_BASE_URL=https://api.openai.com/v1
AI_SERVICE_OPENAI_TIMEOUT=30000

# Stability AI
AI_SERVICE_STABILITY_API_KEY=sk-xxx

# Replicate
AI_SERVICE_REPLICATE_API_TOKEN=r8-xxx

# Google Gemini
AI_SERVICE_GEMINI_API_KEY=xxx

# Anthropic
AI_SERVICE_ANTHROPIC_API_KEY=sk-ant-xxx

# Midjourney
AI_SERVICE_MIDJOURNEY_API_KEY=xxx

# 日志配置
AI_SERVICE_LOG_LEVEL=info
AI_SERVICE_LOG_FORMAT=json
```

## 📁 项目结构

```
all-in-one-api-service/
├── src/
│   ├── apis/           # API层 - 各服务商API实现
│   │   ├── openai/     # OpenAI 服务商
│   │   ├── stability/  # Stability AI 服务商
│   │   ├── replicate/  # Replicate 服务商
│   │   ├── gemini/     # Google Gemini 服务商
│   │   ├── anthropic/  # Anthropic 服务商
│   │   └── midjourney/ # Midjourney 服务商
│   ├── services/       # Service层 - 服务提供商管理
│   ├── params/         # Param层 - 参数定义与处理
│   ├── config/         # 配置管理模块
│   └── utils/          # 工具函数
├── examples/           # 使用示例
├── docs/               # 文档
├── index.js            # CommonJS入口
├── index.esm.js        # ES Module入口
└── index.d.ts          # TypeScript类型定义
```

## 📚 API 文档

### APIResult

```typescript
interface APIResult<T = any> {
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
    duration: number
    provider: string
    model: string
    usage?: {
      promptTokens: number
      completionTokens: number
      totalTokens: number
    }
  }
}
```

### StreamResult

```typescript
interface StreamResult<T = any> {
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
```

### BaseAPI

```typescript
class BaseAPI<T = any> {
  constructor(service: BaseService, paramSchema?: ParamSchema)
  
  // 标准执行
  execute(params: Record<string, any>, options?: any): Promise<APIResult<T>>
  
  // 流式执行
  executeStream(params: Record<string, any>, options?: any): AsyncGenerator<StreamResult<T>, void, unknown>
  
  validateParams(params: Record<string, any>): ValidationResult
  
  getParamSchema(): ParamSchema
  getInputSchema(): InputSchema
  getOutputSchema(): OutputSchema
  
  getInputInfo(): ParamInfo[]
  getOutputInfo(): ParamInfo[]
  
  getParamDetail(paramName: string): ParamInfo | null
  generateDocs(format: 'markdown' | 'json' | 'html'): string
}
```

### BaseParam

```typescript
class BaseParam {
  constructor(schema: ParamSchema)
  
  validate(params: any): ValidationResult
  transform(params: any): any
  extractOutput(rawResponse: any): Record<string, any>
  
  override(newConfig: any): BaseParam
  extend(newFields: any): BaseParam
  omit(fields: { input?: string[], output?: string[] }): BaseParam
  pick(fields: { input?: string[], output?: string[] }): BaseParam
  
  static override(baseSchema: any, overrideConfig: any): any
  static extend(baseSchema: any, newFields: any): any
  static omit(baseSchema: any, fields: any): any
  static pick(baseSchema: any, fields: any): any
  static compose(...schemas: any[]): any
}
```

## 🔗 按需导入

```javascript
// 导入全部
const { Services, APIs, Params, Config, Utils } = require('all-in-one-api-service')

// 只导入Services层
const { Services } = require('all-in-one-api-service/services')

// 只导入特定服务商的API
const { OpenAI } = require('all-in-one-api-service/apis/openai')

// 只导入特定API
const DallE3 = require('all-in-one-api-service/apis/openai/image/dall-e-3')

// ES Module方式
import { Services, APIs } from 'all-in-one-api-service'
import { DallE3 } from 'all-in-one-api-service/apis/openai/image'
```

## 🛠️ 开发

```bash
# 安装依赖
npm install

# 运行配置向导
npm run setup

# 代码检查
npm run lint
```

## 📝 更新日志

### v1.1.0

- ✨ 新增流式响应功能
  - 支持SSE(Server-Sent Events)协议
  - 添加 `executeStream()` 方法用于流式API调用
  - 新增 `StreamHandler` 流式处理器
  - 实现 GPT-4 流式API (`GPT4Stream`)
  - 支持 Next.js API路由集成
  - 完善的错误处理和进度跟踪
  - 详细的文档和使用示例

### v1.0.0

- 初始版本发布
- 支持 OpenAI、Stability AI、Replicate、Gemini、Anthropic、Midjourney
- 实现三层架构设计
- 支持零配置使用
- 支持参数验证和结果标准化
- 支持动态表单生成

## 📄 许可证

[MIT](LICENSE)

## 📚 相关资源

- [配置指南](docs/CONFIGURATION.md) - 详细的配置说明
- [流式响应指南](docs/STREAMING.md) - 流式响应功能使用说明
- [流式响应设计文档](.trae/documents/stream-response-design.md) - 完整的设计方案
- [使用示例](examples/) - 各种使用场景的示例代码
- [API文档](docs/API.md) - 详细的API文档

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📮 联系方式

如有问题或建议，请提交 Issue。
