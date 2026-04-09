# AI接口统一处理模块

一个统一的 AI 接口处理模块，支持多个服务商，实现零配置使用、统一接口调用、灵活参数配置。

## ✨ 核心特性

| 特性            | 说明                                                     |
| ------------- | ------------------------------------------------------ |
| 🚀 **零配置使用**  | 全局配置一次，所有项目自动加载                                        |
| 🔄 **多服务商支持** | OpenAI、Stability、Replicate、Gemini、Anthropic、Midjourney、LTX、SkyReels、Mureka、Volcengine |
| 📐 **三层架构**   | Service层、API层、Param层分离设计                               |
| ✅ **参数验证**    | 自动验证输入参数类型、范围、必填项                                      |
| 📤 **结果标准化**  | 统一的输出结果格式，支持路径提取                                       |
| 🔧 **参数抽象**   | 支持增量重写、继承、组合等操作                                        |
| 📝 **动态表单**   | 提供获取入参/出参结构的接口，便于生成表单                                  |
| 📦 **按需导入**   | 支持 CommonJS、ES Module、Tree Shaking                     |
| 🌊 **流式响应**   | 支持SSE流式响应，实时输出AI生成内容                                   |
| 🎯 **模型约束**   | 支持模型能力定义，动态参数约束和依赖关系管理                                  |
| 🔗 **参数联动**   | 参数间智能联动，根据上下文动态更新可选值和约束范围                               |

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

### 音乐生成 (Mureka)

```javascript
const { Services, APIs } = require('all-in-one-api-service')

// 创建Mureka服务
const mureka = new Services.Mureka()

// 生成歌词
const lyricsAPI = new APIs.Mureka.Lyrics.GenerateLyrics(mureka)
const lyricsResult = await lyricsAPI.execute({
  prompt: 'A song about summer love',
  style: 'pop'
})
console.log(lyricsResult.data.lyrics)

// 生成歌曲
const songAPI = new APIs.Mureka.Song.GenerateSong(mureka)
const songResult = await songAPI.execute({
  lyrics: lyricsResult.data.lyrics,
  style: 'pop',
  duration: 180
})
console.log(songResult.data.audioUrl)

// 人声克隆
const vocalAPI = new APIs.Mureka.Vocal.VocalCloning(mureka)
const vocalResult = await vocalAPI.execute({
  audioFile: '/path/to/voice.mp3',
  lyrics: 'Custom lyrics here'
})
console.log(vocalResult.data.audioUrl)

// 生成伴奏
const instrumentalAPI = new APIs.Mureka.Instrumental.GenerateInstrumental(mureka)
const instrumentalResult = await instrumentalAPI.execute({
  prompt: 'Upbeat electronic dance music',
  duration: 120
})
console.log(instrumentalResult.data.audioUrl)

// 文本转语音
const speechAPI = new APIs.Mureka.TTS.CreateSpeech(mureka)
const speechResult = await speechAPI.execute({
  text: 'Hello, welcome to our service',
  voice: 'default'
})
console.log(speechResult.data.audioUrl)
```

### 图像与3D生成 (Volcengine)

```javascript
const { Services, APIs } = require('all-in-one-api-service')

// 创建火山引擎服务
const volcengine = new Services.Volcengine()

// 图像生成
const imageAPI = new APIs.Volcengine.Image.GenerateImage(volcengine)
const imageResult = await imageAPI.execute({
  model: 'doubao-seedream-5.0-lite',
  prompt: 'A beautiful sunset over mountains',
  size: '2048x2048'
})
console.log(imageResult.data.imageUrl)

// 视频生成
const videoAPI = new APIs.Volcengine.Video.CreateVideoGenerationTask(volcengine)
const videoResult = await videoAPI.execute({
  model: 'doubao-seedream-5.0-lite',
  prompt: 'A cat playing in a garden',
  duration: 5
})
console.log(videoResult.data.taskId)

// 查询视频任务
const queryAPI = new APIs.Volcengine.Video.QueryVideoGenerationTask(volcengine)
const queryResult = await queryAPI.execute({
  taskId: videoResult.data.taskId
})
console.log(queryResult.data.status)
console.log(queryResult.data.videoUrl)

// 3D生成
const threeDAPI = new APIs.Volcengine.ThreeD.Create3DGenerationTask(volcengine)
const threeDResult = await threeDAPI.execute({
  model: 'doubao-3d-v1',
  prompt: 'A modern chair design',
  format: 'obj'
})
console.log(threeDResult.data.taskId)
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

### 参数类型枚举 (ParamType & ElementType)

本模块提供了参数类型和UI组件类型的枚举定义，方便外部项目使用。

#### 引入方式

```javascript
const { ParamType, ElementType } = require('all-in-one-api-service')
```

#### ParamType - 值的数据类型

用于定义参数值的数据类型：

| 枚举值 | 说明 |
|--------|------|
| `ParamType.STRING` | 字符串类型 |
| `ParamType.NUMBER` | 数字类型 |
| `ParamType.BOOLEAN` | 布尔类型 |
| `ParamType.ENUM` | 枚举类型 |
| `ParamType.ARRAY` | 数组类型 |
| `ParamType.OBJECT` | 对象类型 |
| `ParamType.FILE` | 文件类型 |

#### ElementType - UI组件类型

用于定义参数对应的UI组件类型：

| 枚举值 | 说明 |
|--------|------|
| `ElementType.INPUT` | 输入框 |
| `ElementType.TEXTAREA` | 文本域 |
| `ElementType.SELECT` | 下拉选择 |
| `ElementType.CHECKBOX` | 复选框 |
| `ElementType.RADIO` | 单选框 |
| `ElementType.SLIDER` | 滑块 |
| `ElementType.UPLOAD` | 上传组件 |
| `ElementType.COLOR_PICKER` | 颜色选择器 |
| `ElementType.DATE_PICKER` | 日期选择器 |
| `ElementType.SWITCH` | 开关 |

#### 使用示例

```javascript
const { ParamType, ElementType } = require('all-in-one-api-service')

// 定义参数
const paramDefinition = {
  type: ParamType.STRING,
  elementType: ElementType.INPUT,
  required: true,
  description: '用户名',
  minLength: 1,
  maxLength: 50
}

// 定义带滑块的数字参数
const numberParam = {
  type: ParamType.NUMBER,
  elementType: ElementType.SLIDER,
  min: 0,
  max: 100,
  step: 1,
  default: 50
}

// 定义枚举参数
const enumParam = {
  type: ParamType.ENUM,
  elementType: ElementType.SELECT,
  options: ['option1', 'option2', 'option3'],
  default: 'option1'
}
```

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

## 🎯 模型自定义参数支持

### 概述

框架新增了对模型自定义参数的支持，允许定义模型的能力约束，实现参数间的智能联动和动态约束。这对于视频生成等需要复杂参数组合的场景特别有用。

### 核心功能

#### 1. 模型能力定义

定义每个模型支持的参数组合和约束：

```javascript
// src/params/providers/ltx/model-capabilities.js
module.exports = {
  'ltx-2-3-fast': {
    aspectRatios: ['16:9', '9:16'],
    resolutions: {
      '1080p': {
        landscape: '1920x1080',
        portrait: '1080x1920',
        fps: {
          24: { duration: { min: 6, max: 20, step: 2 } },
          25: { duration: { min: 6, max: 20, step: 2 } },
          48: { duration: { min: 6, max: 10, step: 2 } },
          50: { duration: { min: 6, max: 10, step: 2 } }
        }
      },
      '1440p': {
        landscape: '2560x1440',
        portrait: '1440x2560',
        fps: {
          24: { duration: { min: 6, max: 10, step: 2 } },
          25: { duration: { min: 6, max: 10, step: 2 } }
        }
      }
    },
    endpoints: ['text-to-video', 'image-to-video']
  }
}
```

#### 2. 参数依赖关系

系统自动管理参数间的依赖关系：

```javascript
const { Services, APIs } = require('all-in-one-api-service')

const ltxService = new Services.LTX()
const videoAPI = new APIs.LTX.Video.GenerateVideoFromText(ltxService)

// 获取参数配置
const config = videoAPI.getParamConfig({ model: 'ltx-2-3-fast' })

console.log(config.parameters)
// [
//   {
//     name: 'resolution',
//     dependencies: ['model'],
//     enabled: true,
//     options: ['1920x1080', '1080x1920', '2560x1440', ...],
//     constraintSource: 'model'
//   },
//   {
//     name: 'fps',
//     dependencies: ['model', 'resolution'],
//     enabled: false, // 等待选择 resolution
//     ...
//   }
// ]
```

#### 3. 动态参数约束

根据已选择的参数动态更新其他参数的约束：

```javascript
// 初始状态
const config0 = videoAPI.getParamConfig({})
const resolutionParam = config0.parameters.find(p => p.name === 'resolution')
console.log(resolutionParam.enabled) // false - 等待选择 model

// 选择模型后
const config1 = videoAPI.getParamConfig({ model: 'ltx-2-3-fast' })
const resolutionParam1 = config1.parameters.find(p => p.name === 'resolution')
console.log(resolutionParam1.enabled) // true
console.log(resolutionParam1.options) // ['1920x1080', '1080x1920', ...]

// 选择分辨率后
const config2 = videoAPI.getParamConfig({ 
  model: 'ltx-2-3-fast', 
  resolution: '1080x1920' 
})
const fpsParam = config2.parameters.find(p => p.name === 'fps')
console.log(fpsParam.options) // [24, 25, 48, 50]

const durationParam = config2.parameters.find(p => p.name === 'duration')
console.log(durationParam.enabled) // false - 等待选择 fps

// 选择帧率后
const config3 = videoAPI.getParamConfig({ 
  model: 'ltx-2-3-fast', 
  resolution: '1080x1920',
  fps: 24
})
const durationParam3 = config3.parameters.find(p => p.name === 'duration')
console.log(durationParam3.min) // 6
console.log(durationParam3.max) // 20
console.log(durationParam3.step) // 2
```

### 使用示例

#### 完整的视频生成流程

```javascript
const { Services, APIs } = require('all-in-one-api-service')

async function generateVideo() {
  const ltxService = new Services.LTX()
  const videoAPI = new APIs.LTX.Video.GenerateVideoFromText(ltxService)
  
  // 步骤1: 获取初始参数配置
  const initialConfig = videoAPI.getParamConfig({})
  console.log('下一步应该选择:', initialConfig.state.nextParam) // 'model'
  
  // 步骤2: 选择模型
  const model = 'ltx-2-3-fast'
  const modelConfig = videoAPI.getParamConfig({ model })
  console.log('可用分辨率:', modelConfig.parameters.find(p => p.name === 'resolution').options)
  
  // 步骤3: 选择分辨率
  const resolution = '1080x1920'
  const resolutionConfig = videoAPI.getParamConfig({ model, resolution })
  console.log('可用帧率:', resolutionConfig.parameters.find(p => p.name === 'fps').options)
  
  // 步骤4: 选择帧率
  const fps = 24
  const fpsConfig = videoAPI.getParamConfig({ model, resolution, fps })
  const durationParam = fpsConfig.parameters.find(p => p.name === 'duration')
  console.log(`时长范围: ${durationParam.min}-${durationParam.max}秒，步长: ${durationParam.step}秒`)
  
  // 步骤5: 执行视频生成
  const result = await videoAPI.execute({
    prompt: 'A cat playing piano',
    model,
    resolution,
    fps,
    duration: 10
  })
  
  console.log(result.data.videoUrl)
}
```

#### 参数验证与建议

```javascript
const { Services, APIs } = require('all-in-one-api-service')

const ltxService = new Services.LTX()
const videoAPI = new APIs.LTX.Video.GenerateVideoFromText(ltxService)

// 验证参数组合
const validationResult = videoAPI.validateParamsWithContext({
  model: 'ltx-2-3-fast',
  resolution: '1080x1920',
  fps: 24,
  duration: 30 // 超出范围
})

if (!validationResult.valid) {
  console.log('验证失败:', validationResult.errors)
  // [{
  //   message: '模型 "ltx-2-3-fast" 在分辨率 "1080x1920" 和 FPS "24" 下，时长 "30秒" 超出允许范围（6-20秒）',
  //   suggestions: {
  //     durationRange: { min: 6, max: 20 },
  //     suggestedFPS: [24, 25] // 支持更长时长的帧率
  //   }
  // }]
  
  console.log('参数状态:', validationResult.state)
  // {
  //   complete: false,
  //   missingParams: [],
  //   providedParams: ['model', 'resolution', 'fps', 'duration'],
  //   progress: 1
  // }
}
```

### 参数状态分析

系统自动分析参数状态并提供智能提示：

```javascript
const config = videoAPI.getParamConfig({ model: 'ltx-2-3-fast' })

console.log(config.state)
// {
//   complete: false,           // 是否所有必填参数都已提供
//   missingParams: ['prompt'], // 缺少的必填参数
//   providedParams: ['model'], // 已提供的参数
//   enabledParams: ['prompt', 'resolution'], // 当前启用的参数
//   nextParam: 'prompt',       // 建议下一个填写的参数
//   progress: 0.5              // 完成进度 (0-1)
// }
```

### 获取可用选项

根据上下文获取参数的可用选项：

```javascript
// 获取特定模型的分辨率选项
const options = videoAPI.getAvailableOptions('ltx-2-3-fast', {
  aspectRatio: '16:9'
})

console.log(options)
// {
//   aspectRatios: ['16:9', '9:16'],
//   resolutions: {
//     '1080p': { value: '1920x1080', orientation: 'landscape' },
//     '1440p': { value: '2560x1440', orientation: 'landscape' }
//   },
//   fps: [],
//   duration: null
// }
```

### React 动态表单示例

```javascript
import React, { useState, useEffect } from 'react'
import { Services, APIs } from 'all-in-one-api-service'

function VideoGeneratorForm() {
  const [videoAPI] = useState(() => {
    const ltxService = new Services.LTX()
    return new APIs.LTX.Video.GenerateVideoFromText(ltxService)
  })
  
  const [config, setConfig] = useState(() => videoAPI.getParamConfig({}))
  const [formData, setFormData] = useState({})
  
  useEffect(() => {
    // 当表单数据变化时，更新参数配置
    setConfig(videoAPI.getParamConfig(formData))
  }, [formData, videoAPI])
  
  const handleChange = (paramName, value) => {
    setFormData(prev => {
      const newFormData = { ...prev, [paramName]: value }
      
      // 清除受影响参数的值
      const param = config.parameters.find(p => p.name === paramName)
      if (param && param.affects) {
        param.affects.forEach(affectedParam => {
          delete newFormData[affectedParam]
        })
      }
      
      return newFormData
    })
  }
  
  return (
    <form>
      {config.parameters.map(param => (
        <div key={param.name}>
          <label>
            {param.name}
            {param.required && <span>*</span>}
          </label>
          
          {!param.enabled ? (
            <div className="disabled">
              等待选择: {param.dependencies.join(', ')}
            </div>
          ) : param.type === 'enum' ? (
            <select
              value={formData[param.name] || ''}
              onChange={(e) => handleChange(param.name, e.target.value)}
            >
              <option value="">请选择</option>
              {param.options && param.options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : param.type === 'number' ? (
            <input
              type="number"
              value={formData[param.name] || ''}
              min={param.min}
              max={param.max}
              step={param.step}
              onChange={(e) => handleChange(param.name, Number(e.target.value))}
            />
          ) : (
            <input
              type="text"
              value={formData[param.name] || ''}
              onChange={(e) => handleChange(param.name, e.target.value)}
            />
          )}
          
          <small>{param.description}</small>
          {param.constraintSource && (
            <small className="constraint">
              约束来源: {param.constraintSource}
            </small>
          )}
        </div>
      ))}
      
      <div className="progress">
        完成进度: {(config.state.progress * 100).toFixed(0)}%
        {config.state.nextParam && (
          <span> - 下一步: {config.state.nextParam}</span>
        )}
      </div>
    </form>
  )
}
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

## 🔍 查询服务与国际化

本框架提供了强大的查询服务和国际化支持，方便外部项目快速查询 API、模型和服务商信息。

### 引入方式

```javascript
const {
  QueryService,
  Constants,
  setLanguage,
  getLanguage,
  t
} = require('all-in-one-api-service')
```

### 国际化 (i18n)

#### 设置语言

```javascript
const { setLanguage, getLanguage } = require('all-in-one-api-service')

// 设置为中文
setLanguage('zh-CN')

// 设置为英文
setLanguage('en-US')

// 获取当前语言
const currentLang = getLanguage()
console.log(currentLang) // 'zh-CN' 或 'en-US'
```

#### 翻译文本

```javascript
const { t, setLanguage } = require('all-in-one-api-service')

// 设置语言
setLanguage('zh-CN')

// 翻译文本
console.log(t('api.text_to_video')) // '文本生成视频'
console.log(t('provider.ltx')) // 'LTX'
console.log(t('model.ltx-2-fast')) // 'LTX 2 Fast'

// 切换语言
setLanguage('en-US')
console.log(t('api.text_to_video')) // 'Text to Video'
```

#### 支持的语言

| 语言代码 | 语言名称 |
|---------|---------|
| `zh-CN` | 简体中文 (默认) |
| `en-US` | English |

### QueryService 查询服务

QueryService 提供了丰富的查询方法，用于查询 API、模型、服务商等元数据信息。

#### 查询 API

##### 按类型查询 API

```javascript
const { QueryService, Constants } = require('all-in-one-api-service')
const { APITypes, Providers } = Constants

// 查询所有 Text to Video API
const allTextToVideoAPIs = QueryService.getAPIsByType(APITypes.TEXT_TO_VIDEO)

// 查询指定服务商的 Text to Video API
const ltxTextToVideoAPIs = QueryService.getAPIsByType(APITypes.TEXT_TO_VIDEO, {
  provider: Providers.LTX
})

console.log(`共找到 ${allTextToVideoAPIs.length} 个 Text to Video API`)
```

##### 按服务商查询 API

```javascript
const { QueryService, Constants } = require('all-in-one-api-service')
const { Providers } = Constants

// 获取 LTX 服务商的所有 API
const ltxAPIs = QueryService.getAPIsByProvider(Providers.LTX)

console.log(`LTX 服务商共有 ${ltxAPIs.length} 个 API`)
ltxAPIs.forEach(api => {
  console.log(`- ${api.displayName}: ${api.description}`)
})
```

##### 按模型查询 API

```javascript
const { QueryService } = require('all-in-one-api-service')

// 查询支持指定模型的 API
const apis = QueryService.getAPIsByModel('ltx-2-fast')

console.log(`模型 "ltx-2-fast" 支持 ${apis.length} 个 API`)
apis.forEach(api => {
  console.log(`- ${api.displayName}`)
})
```

##### 获取 API 详情

```javascript
const { QueryService } = require('all-in-one-api-service')

// 获取 API 详细信息
const apiDetail = QueryService.getAPIDetail('generate-video-from-text')

if (apiDetail) {
  console.log('API 名称:', apiDetail.name)
  console.log('显示名称:', apiDetail.displayName)
  console.log('描述:', apiDetail.description)
  console.log('端点:', apiDetail.endpoint)
  console.log('支持模型:', apiDetail.models?.join(', '))
  console.log('提供商:', apiDetail.provider)
  console.log('类型:', apiDetail.type)
  console.log('标签:', apiDetail.tags?.join(', '))
}
```

##### 检查 API 是否存在

```javascript
const { QueryService } = require('all-in-one-api-service')

// 检查 API 是否存在
const exists = QueryService.hasAPI('generate-video-from-text')
console.log('API 存在:', exists) // true 或 false
```

##### 获取最佳 API

```javascript
const { QueryService, Constants } = require('all-in-one-api-service')
const { APITypes, Providers } = Constants

// 根据条件获取最佳 API（按优先级排序）
const bestAPI = QueryService.getBestAPI(
  APITypes.TEXT_TO_VIDEO,
  'ltx-2-pro',
  { provider: Providers.LTX }
)

if (bestAPI) {
  console.log('最佳 API:', bestAPI.displayName)
  console.log('优先级:', bestAPI.priority)
}
```

##### 根据输入输出类型查找接口

```javascript
const { QueryService, Constants } = require('all-in-one-api-service')
const { MediaTypes } = Constants

// 查找输入为文本、输出为视频的 API
const textToVideoAPIs = QueryService.findByInputOutput(
  MediaTypes.TEXT,
  MediaTypes.VIDEO
)

console.log(`找到 ${textToVideoAPIs.length} 个文本转视频 API`)
textToVideoAPIs.forEach(api => {
  console.log(`- ${api.displayName} (提供商: ${api.provider})`)
})
```

#### 查询模型

##### 获取所有模型

```javascript
const { QueryService } = require('all-in-one-api-service')

// 获取所有模型列表
const allModels = QueryService.getAllModels()

console.log(`共有 ${allModels.length} 个模型`)
allModels.forEach(model => {
  console.log(`- ${model.displayName} (${model.name})`)
  console.log(`  系列: ${model.series || 'N/A'}`)
  console.log(`  提供商: ${model.provider}`)
})
```

##### 获取模型详情

```javascript
const { QueryService } = require('all-in-one-api-service')

// 获取模型详细信息
const modelDetail = QueryService.getModelDetail('ltx-2-fast')

if (modelDetail) {
  console.log('模型名称:', modelDetail.name)
  console.log('显示名称:', modelDetail.displayName)
  console.log('描述:', modelDetail.description)
  console.log('系列:', modelDetail.series)
  console.log('提供商:', modelDetail.provider)
  console.log('类型:', modelDetail.type)
  console.log('媒体类型:', modelDetail.mediaType)
  console.log('优先级:', modelDetail.priority)
  console.log('标签:', modelDetail.tags?.join(', '))
  console.log('能力:', modelDetail.capabilities)
}
```

##### 按服务商获取模型

```javascript
const { QueryService, Constants } = require('all-in-one-api-service')
const { Providers } = Constants

// 获取指定服务商的所有模型
const ltxModels = QueryService.getModelsByProvider(Providers.LTX)

console.log(`LTX 服务商共有 ${ltxModels.length} 个模型`)
```

##### 按系列获取模型

```javascript
const { QueryService, Constants } = require('all-in-one-api-service')
const { Series } = Constants

// 获取指定系列的所有模型
const seedanceModels = QueryService.getModelsBySeries(Series.SEEDANCE)

console.log(`Seedance 系列共有 ${seedanceModels.length} 个模型`)
```

##### 按类型获取模型

```javascript
const { QueryService, Constants } = require('all-in-one-api-service')
const { APITypes } = Constants

// 获取支持指定类型的所有模型
const textToVideoModels = QueryService.getModelsByType(APITypes.TEXT_TO_VIDEO)

console.log(`支持 Text to Video 的模型共有 ${textToVideoModels.length} 个`)
```

#### 查询服务商

##### 获取所有服务商

```javascript
const { QueryService } = require('all-in-one-api-service')

// 获取所有服务商列表
const providers = QueryService.getAllProviders()

console.log(`共有 ${providers.length} 个服务商`)
providers.forEach(provider => {
  console.log(`- ${provider}`)
})
```

#### 获取统计信息

```javascript
const { QueryService } = require('all-in-one-api-service')

// 获取系统统计信息
const stats = QueryService.getStats()

console.log('总模型数:', stats.totalModels)
console.log('总接口数:', stats.totalAPIs)
console.log('服务商:', stats.providers.join(', '))
console.log('支持的类型数:', stats.supportedTypes)
console.log('支持的媒体类型数:', stats.supportedMediaTypes)
```

#### 获取支持的类型

```javascript
const { QueryService } = require('all-in-one-api-service')

// 获取所有支持的 API 类型
const types = QueryService.getSupportedTypes()
console.log('支持的 API 类型:', types)

// 获取所有支持的媒体类型
const mediaTypes = QueryService.getSupportedMediaTypes()
console.log('支持的媒体类型:', mediaTypes)
```

### 常量定义

框架提供了丰富的常量定义，方便在代码中使用。

```javascript
const { Constants } = require('all-in-one-api-service')

const {
  APITypes,        // API 类型常量
  MediaTypes,      // 媒体类型常量
  Providers,       // 服务商常量
  Series,          // 模型系列常量
  SeriesMeta,      // 模型系列元数据
  ProviderMeta,    // 服务商元数据
  ProviderPriority // 服务商优先级
} = Constants
```

#### API 类型 (APITypes)

```javascript
const { APITypes } = Constants

console.log(APITypes.TEXT_TO_VIDEO)    // 'text_to_video'
console.log(APITypes.IMAGE_TO_VIDEO)   // 'image_to_video'
console.log(APITypes.AUDIO_TO_VIDEO)   // 'audio_to_video'
console.log(APITypes.TEXT_TO_IMAGE)    // 'text_to_image'
console.log(APITypes.TEXT_TO_SPEECH)   // 'text_to_speech'
// ... 更多类型
```

#### 媒体类型 (MediaTypes)

```javascript
const { MediaTypes } = Constants

console.log(MediaTypes.TEXT)   // 'text'
console.log(MediaTypes.IMAGE)  // 'image'
console.log(MediaTypes.VIDEO)  // 'video'
console.log(MediaTypes.AUDIO)  // 'audio'
console.log(MediaTypes.AUDIO_3D) // '3d'
```

#### 服务商 (Providers)

```javascript
const { Providers } = Constants

console.log(Providers.LTX)        // 'ltx'
console.log(Providers.SKYREELS)   // 'skyreels'
console.log(Providers.MUREKA)     // 'mureka'
console.log(Providers.VOLCENGINE) // 'volcengine'
// ... 更多服务商
```

#### 模型系列 (Series)

```javascript
const { Series, SeriesMeta } = Constants

console.log(Series.LTX)       // 'ltx'
console.log(Series.SKYREELS)  // 'skyreels'
console.log(Series.MUREKA)    // 'mureka'
console.log(Series.SEEDANCE)  // 'seedance'
console.log(Series.SEEDREAM)  // 'seedream'
console.log(Series.SEED3D)    // 'seed3d'

// 获取系列元数据
console.log(SeriesMeta[Series.SEEDANCE])
// {
//   name: 'seedance',
//   displayName: 'Seedance',
//   description: '火山引擎视频生成模型系列',
//   provider: 'volcengine',
//   mediaType: 'video'
// }
```

### 完整使用示例

```javascript
const {
  QueryService,
  Constants,
  setLanguage,
  t
} = require('all-in-one-api-service')

// 设置中文
setLanguage('zh-CN')

const { APITypes, Providers, Series, MediaTypes } = Constants

// 示例1: 查询 LTX 服务商的 Text to Video API
console.log('\n=== 查询 LTX Text to Video API ===')
const ltxAPIs = QueryService.getAPIsByType(APITypes.TEXT_TO_VIDEO, {
  provider: Providers.LTX
})
ltxAPIs.forEach(api => {
  console.log(`- ${api.displayName}: ${api.description}`)
})

// 示例2: 获取模型详情（包含系列信息）
console.log('\n=== 模型详情 ===')
const modelDetail = QueryService.getModelDetail('ltx-2-fast')
console.log(`模型: ${modelDetail.displayName}`)
console.log(`系列: ${modelDetail.series}`)
console.log(`提供商: ${modelDetail.provider}`)

// 示例3: 按系列查询模型
console.log('\n=== Seedance 系列模型 ===')
const seedanceModels = QueryService.getModelsBySeries(Series.SEEDANCE)
seedanceModels.forEach(model => {
  console.log(`- ${model.displayName}`)
})

// 示例4: 根据输入输出查找接口
console.log('\n=== 文本转视频接口 ===')
const textToVideoAPIs = QueryService.findByInputOutput(
  MediaTypes.TEXT,
  MediaTypes.VIDEO
)
console.log(`共找到 ${textToVideoAPIs.length} 个接口`)

// 示例5: 获取系统统计
console.log('\n=== 系统统计 ===')
const stats = QueryService.getStats()
console.log(`总模型数: ${stats.totalModels}`)
console.log(`总接口数: ${stats.totalAPIs}`)
console.log(`服务商: ${stats.providers.join(', ')}`)

// 示例6: 使用翻译
console.log('\n=== 翻译示例 ===')
console.log(t('api.text_to_video')) // 文本生成视频
console.log(t('provider.ltx'))      // LTX
```

### QueryService API 参考

| 方法 | 参数 | 返回值 | 说明 |
|-----|------|-------|------|
| `getAPIsByType(type, options?)` | type: API类型, options: { provider? } | API[] | 按类型查询 API |
| `getAPIsByProvider(provider)` | provider: 服务商名称 | API[] | 按服务商查询 API |
| `getAPIsByModel(modelName)` | modelName: 模型名称 | API[] | 按模型查询 API |
| `getAPIDetail(apiName)` | apiName: API名称 | API \| null | 获取 API 详情 |
| `hasAPI(apiName)` | apiName: API名称 | boolean | 检查 API 是否存在 |
| `getBestAPI(type, model?, options?)` | type: API类型, model: 模型名, options: { provider? } | API \| null | 获取最佳 API |
| `findByInputOutput(inputType, outputType)` | inputType: 输入类型, outputType: 输出类型 | API[] | 根据输入输出查找接口 |
| `getAllModels()` | - | Model[] | 获取所有模型 |
| `getModelDetail(modelName)` | modelName: 模型名称 | Model \| null | 获取模型详情 |
| `getModelsByProvider(provider)` | provider: 服务商名称 | Model[] | 按服务商获取模型 |
| `getModelsBySeries(series)` | series: 系列名称 | Model[] | 按系列获取模型 |
| `getModelsByType(type)` | type: API类型 | Model[] | 按类型获取模型 |
| `getAllProviders()` | - | string[] | 获取所有服务商 |
| `getStats()` | - | Stats | 获取统计信息 |
| `getSupportedTypes()` | - | string[] | 获取支持的 API 类型 |
| `getSupportedMediaTypes()` | - | string[] | 获取支持的媒体类型 |

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

| 服务商               | 图像                                     | 文本                           | 视频           | 音频               | 音乐               | 3D       | 流式支持 |
| ----------------- | -------------------------------------- | ---------------------------- | ------------ | ---------------- | ---------------- | -------- | -------- |
| **OpenAI**        | DALL-E 2, DALL-E 3                     | GPT-3.5, GPT-4, GPT-4 Turbo  | Sora         | TTS-1, Whisper-1 | -                | -        | ✅ GPT-4 Stream |
| **Stability AI**  | Stable Diffusion XL, Stable Image Core | -                            | -            | -                | -                | -        | 🚧 计划中 |
| **Replicate**     | Flux                                   | -                            | Stable Video | -                | -                | -        | 🚧 计划中 |
| **Google Gemini** | Imagen                                 | Gemini Pro, Gemini Ultra     | -            | -                | -                | -        | 🚧 计划中 |
| **Anthropic**     | -                                      | Claude 3 Opus, Sonnet, Haiku | -            | -                | -                | -        | 🚧 计划中 |
| **Midjourney**    | Midjourney V6                          | -                            | -            | -                | -                | -        | 🚧 计划中 |
| **LTX**           | -                                      | -                            | 文本生成视频, 图像生成视频, 音频生成视频, 视频扩展, 视频重拍 | - | - | - | 🚧 计划中 |
| **SkyReels**      | -                                      | -                            | 文本生成视频, 图像生成视频, 视频风格重绘, 口型同步, 多角色头像 | - | - | - | 🚧 计划中 |
| **Mureka**        | -                                      | -                            | -            | -                | 歌曲生成, 歌词生成, 人声克隆, 伴奏生成, TTS, 播客 | - | 🚧 计划中 |
| **Volcengine**    | 豆包 Seedream 系列                        | -                            | 视频生成        | -                | -                | 3D生成    | 🚧 计划中 |

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

# LTX
AI_SERVICE_LTX_API_KEY=xxx

# SkyReels
AI_SERVICE_SKYREELS_API_KEY=xxx

# Mureka
AI_SERVICE_MUREKA_API_KEY=xxx

# Volcengine (火山引擎)
AI_SERVICE_VOLCENGINE_API_KEY=xxx

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
│   │   ├── midjourney/ # Midjourney 服务商
│   │   ├── ltx/        # LTX 服务商
│   │   ├── skyreels/   # SkyReels 服务商
│   │   ├── mureka/     # Mureka 服务商
│   │   └── volcengine/ # 火山引擎 服务商
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
  
  // 新增：模型参数支持
  getParamConfig(context?: Record<string, any>): ParamConfig
  validateParamsWithContext(params: Record<string, any>): ValidationWithContextResult
  getModelParamOptions(model?: string): ModelCapabilities | null
  getAvailableOptions(model: string, context?: Record<string, any>): AvailableOptions | null
}

// 新增类型定义
interface ParamConfig {
  apiName: string
  modelName: string
  parameters: ParameterInfo[]
  state: ParamState
  hasModelCapabilities: boolean
  modelCapabilities?: ModelCapabilities
}

interface ParameterInfo {
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
}

interface ParamState {
  complete: boolean
  missingParams: string[]
  providedParams: string[]
  enabledParams: string[]
  nextParam: string | null
  progress: number
}

interface ValidationWithContextResult {
  valid: boolean
  errors: Array<{
    message: string
    suggestions: Record<string, any>
  }>
  state: ParamState
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

### v1.3.0

- 🎵 新增 Mureka 音乐生成服务商
  - 支持歌曲生成、歌曲扩展、歌曲识别、歌曲描述、音轨分离
  - 支持歌词生成、歌词扩展
  - 支持人声克隆
  - 支持伴奏生成
  - 支持文本转语音、播客生成
  - 支持文件上传功能
- 🎨 新增 Volcengine (火山引擎) 服务商
  - 支持图像生成 (豆包 Seedream 系列)
  - 支持视频生成及任务查询
  - 支持3D模型生成
- 🔒 增强参数互斥功能
  - 支持参数互斥验证
  - 自动检测冲突参数
  - 提供友好的错误提示
- 🎯 强化动态约束
  - 改进模型约束验证器
  - 优化参数配置管理
  - 增强参数依赖关系处理

### v1.2.0

- ✨ 新增模型自定义参数支持
  - 新增 `ModelConstraintValidator` 模型约束验证器
  - 新增 `ParamConfigManager` 参数配置管理器
  - 支持 `modelCapabilities` 模型能力定义
  - 实现参数依赖关系管理
  - 实现动态参数约束和联动
  - 新增 `getParamConfig()` 获取参数配置
  - 新增 `validateParamsWithContext()` 验证参数并返回建议
  - 新增 `getModelParamOptions()` 获取模型参数选项
  - 新增 `getAvailableOptions()` 获取可用参数选项
- 🎬 新增 LTX 视频生成服务商
  - 支持文本生成视频
  - 支持图像生成视频
  - 支持音频生成视频
  - 支持视频时长扩展
  - 支持视频片段重拍
- 🎭 新增 SkyReels 视频服务商
  - 支持文本生成视频
  - 支持图像生成视频
  - 支持视频风格重绘
  - 支持口型同步
  - 支持多角色头像生成
- 📝 完善参数状态分析
  - 自动识别缺少的参数
  - 自动提示下一步应该选择什么
  - 自动计算完成进度
  - 参数验证失败时提供修正建议

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
- [Mureka官方文档](api-document/official-mureka.md) - Mureka API官方文档
- [Volcengine官方文档](api-document/official-volcengine.md) - 火山引擎API官方文档
- [LTX官方文档](api-document/official-ltx.md) - LTX API官方文档
- [SkyReels官方文档](api-document/official-skyreels.md) - SkyReels API官方文档

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📮 联系方式

如有问题或建议，请提交 Issue。
