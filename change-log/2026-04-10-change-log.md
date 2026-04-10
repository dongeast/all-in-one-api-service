# APITypes 结构扩展变更日志

## 变更日期
2026-04-10

## 变更概述
将 `APITypes` 从简单的字符串枚举扩展为包含完整元数据的对象结构，同时扩展 `InputOutputTypes` 添加 `display_name` 属性。

---

## 变更详情

### 1. InputOutputTypes 扩展

**变更前：**
```javascript
const InputOutputTypes = {
  TEXT_TO_IMAGE: { input: MediaTypes.TEXT, output: MediaTypes.IMAGE },
  IMAGE_TO_VIDEO: { input: MediaTypes.IMAGE, output: MediaTypes.VIDEO },
  // ... 仅 8 个类型
}
```

**变更后：**
```javascript
const InputOutputTypes = {
  TEXT_TO_IMAGE: {
    input: MediaTypes.TEXT,
    output: MediaTypes.IMAGE,
    display_name: '文本生成图像'
  },
  // ... 全部 24 个类型，每个都包含 display_name
}
```

**新增类型映射：**
- `IMAGE_TO_IMAGE` - 图像转换
- `IMAGE_EDITING` - 图像编辑
- `IMAGE_UPSCALING` - 图像放大
- `VIDEO_EDITING` - 视频编辑
- `VIDEO_EXTENSION` - 视频延长
- `SPEECH_TO_TEXT` - 语音转文本
- `AUDIO_GENERATION` - 音频生成
- `MUSIC_GENERATION` - 音乐生成
- `SONG_GENERATION` - 歌曲生成
- `INSTRUMENTAL_GENERATION` - 伴奏生成
- `VOCAL_CLONING` - 声音克隆
- `TEXT_EDITING` - 文本编辑
- `TEXT_TO_3D` - 文本生成3D
- `TASK_QUERY` - 任务查询
- `FILE_UPLOAD` - 文件上传
- `AVATAR_GENERATION` - 数字人生成
- `LIP_SYNC` - 口型同步

### 2. MediaTypes 扩展

**新增类型：**
```javascript
FILE: 'file'
```

### 3. APITypes 结构重构

**变更前：**
```javascript
const APITypes = {
  TEXT_TO_IMAGE: 'text_to_image',
  TEXT_TO_VIDEO: 'text_to_video',
  // ... 简单字符串值
}
```

**变更后：**
```javascript
const APITypes = {
  TEXT_TO_IMAGE: {
    id: 'text_to_image',
    inputOutput: InputOutputTypes.TEXT_TO_IMAGE,
    description: '根据文本描述生成图像'
  },
  TEXT_TO_VIDEO: {
    id: 'text_to_video',
    inputOutput: InputOutputTypes.TEXT_TO_VIDEO,
    description: '根据文本描述生成视频'
  },
  // ... 完整元数据对象
}
```

---

## 迁移指南

### 破坏性变更

#### 1. 直接比较字符串值

**变更前：**
```javascript
if (type === APITypes.TEXT_TO_VIDEO) {
  // ...
}
```

**变更后：**
```javascript
if (type === APITypes.TEXT_TO_VIDEO.id) {
  // ...
}
```

#### 2. 获取类型字符串值

**变更前：**
```javascript
const typeValue = APITypes.TEXT_TO_VIDEO  // 'text_to_video'
```

**变更后：**
```javascript
const typeValue = APITypes.TEXT_TO_VIDEO.id  // 'text_to_video'
```

#### 3. 作为对象属性值

**变更前：**
```javascript
const config = {
  type: APITypes.TEXT_TO_VIDEO
}
```

**变更后：**
```javascript
const config = {
  type: APITypes.TEXT_TO_VIDEO.id
}
```

### 新增功能

#### 1. 获取输入输出类型

```javascript
const apiType = APITypes.TEXT_TO_VIDEO

console.log(apiType.inputOutput.input)   // 'text'
console.log(apiType.inputOutput.output)  // 'video'
```

#### 2. 获取显示名称

```javascript
const apiType = APITypes.TEXT_TO_VIDEO

console.log(apiType.inputOutput.display_name)  // '文本生成视频'
```

#### 3. 获取功能描述

```javascript
const apiType = APITypes.TEXT_TO_VIDEO

console.log(apiType.description)  // '根据文本描述生成视频'
```

#### 4. 通过 InputOutputTypes 获取信息

```javascript
const { InputOutputTypes } = require('./constants')

const typeInfo = InputOutputTypes.TEXT_TO_VIDEO
console.log(typeInfo.input)         // 'text'
console.log(typeInfo.output)        // 'video'
console.log(typeInfo.display_name)  // '文本生成视频'
```

---

## 完整属性列表

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | string | 类型标识符，与原字符串值相同 |
| `inputOutput.input` | string | 输入媒体类型 |
| `inputOutput.output` | string | 输出媒体类型 |
| `inputOutput.display_name` | string | 显示名称（中文） |
| `description` | string | 功能描述 |

---

## 常见使用场景

### 场景1：类型判断

```javascript
// 推荐：使用 .id 属性
if (model.type === APITypes.TEXT_TO_VIDEO.id) {
  // 处理文本生成视频
}

// 或者使用解构
const { id: textToVideoId } = APITypes.TEXT_TO_VIDEO
if (model.type === textToVideoId) {
  // 处理文本生成视频
}
```

### 场景2：显示类型信息

```javascript
function displayApiTypeInfo(apiTypeKey) {
  const apiType = APITypes[apiTypeKey]
  console.log(`类型ID: ${apiType.id}`)
  console.log(`显示名称: ${apiType.inputOutput.display_name}`)
  console.log(`输入类型: ${apiType.inputOutput.input}`)
  console.log(`输出类型: ${apiType.inputOutput.output}`)
  console.log(`描述: ${apiType.description}`)
}
```

### 场景3：按输入输出类型筛选

```javascript
// 获取所有输出视频的 API 类型
const videoOutputTypes = Object.entries(APITypes)
  .filter(([key, value]) => value.inputOutput.output === MediaTypes.VIDEO)
  .map(([key, value]) => value.id)
```

### 场景4：多语言支持（未来扩展）

当前 `display_name` 为中文，后续可根据语言设置返回不同语言的显示名称：

```javascript
function getDisplayName(apiType, lang = 'zh') {
  // 未来可扩展多语言支持
  return apiType.inputOutput.display_name
}
```

---

## 注意事项

1. **向后兼容性**：此变更不向后兼容，需要更新所有直接使用 `APITypes.XXX` 作为字符串的地方

2. **模型元数据**：如果项目中的模型定义使用了 `APITypes.XXX` 作为 `type` 属性，需要更新为 `APITypes.XXX.id`

3. **API 请求参数**：发送到后端的类型参数应使用 `.id` 属性

4. **类型定义文件**：如果有 TypeScript 类型定义文件，需要同步更新

---

## 相关文件

- `src/constants/types.js` - 主要变更文件
- `tests/framework-integration.test.ts` - 测试文件更新示例

---

# API查询链路扩展变更日志

## 变更日期
2026-04-10

## 变更概述
扩展框架的查询能力，支持按 API类型 → 模型系列 → 模型 → 服务商/Function 的级联查询，满足前端同步展示多个选择器的需求。

---

## 变更详情

### 1. 新增查询方法

#### 1.1 ModelRegistry 扩展
**文件**: `src/registry/model-registry.js`

**新增方法：**
- `getBySeries(series)` - 根据系列获取模型列表
- `getSeriesByType(apiType)` - 根据API类型获取支持的系列列表
- `getByTypeAndSeries(apiType, series)` - 根据API类型和系列获取模型列表

**索引扩展：**
- 新增 `series` 索引字段，支持高效查询

```javascript
const modelRegistry = require('./src/registry/model-registry')

// 根据系列获取模型
const models = modelRegistry.getBySeries('ltx')

// 根据API类型获取系列
const series = modelRegistry.getSeriesByType(APITypes.TEXT_TO_VIDEO)

// 根据API类型+系列获取模型
const models = modelRegistry.getByTypeAndSeries(APITypes.TEXT_TO_VIDEO, 'ltx')
```

#### 1.2 APIRegistry 扩展
**文件**: `src/registry/api-registry.js`

**新增方法：**
- `getByAPIType(apiType)` - 根据API类型获取API列表
- `getBestAPIByType(apiType, model)` - 根据API类型和模型获取最佳API

**索引扩展：**
- 新增 `apiType` 索引字段

```javascript
const apiRegistry = require('./src/registry/api-registry')

// 根据API类型获取API
const apis = apiRegistry.getByAPIType(APITypes.TEXT_TO_VIDEO)

// 获取最佳API
const bestAPI = apiRegistry.getBestAPIByType(APITypes.TEXT_TO_VIDEO, 'ltx-2-3-pro')
```

#### 1.3 FunctionManager 扩展
**文件**: `src/functions/function-manager.js`

**新增方法：**
- `getSeriesByAPIType(apiType)` - 根据API类型获取系列列表
- `getModelsByTypeAndSeries(apiType, series)` - 根据API类型和系列获取模型
- `getBestFunctionByTypeAndModel(apiType, model)` - 根据API类型和模型获取最佳Function
- `getFunctionParams(functionName)` - 获取Function的参数定义
- `getAvailableOptions(selected)` - **【核心方法】** 获取级联可选项列表

```javascript
const { functionManager } = require('./src/functions')

// 获取系列列表
const series = functionManager.getSeriesByAPIType(APITypes.TEXT_TO_VIDEO)

// 获取模型列表
const models = functionManager.getModelsByTypeAndSeries(APITypes.TEXT_TO_VIDEO, 'ltx')

// 获取最佳Function
const func = functionManager.getBestFunctionByTypeAndModel(APITypes.TEXT_TO_VIDEO, 'ltx-2-3-pro')

// 获取参数定义
const params = functionManager.getFunctionParams('generate-video-from-text')
// 返回: { input: {...}, output: {...} }
```

### 2. API元数据扩展
**文件**: `src/metadata/apis/*.js`

为所有API添加 `apiType` 字段，明确标识API的功能类型：
- `ltx.js` - 5个API
- `mureka.js` - 17个API
- `skyreels.js` - 20个API
- `volcengine.js` - 9个API

```javascript
// src/metadata/apis/ltx.js 示例
{
  name: 'generate-video-from-text',
  provider: 'ltx',
  apiType: APITypes.TEXT_TO_VIDEO,  // 新增字段
  category: 'video',
  endpoint: '/v1/text-to-video',
  // ...
}
```

---

## 核心功能：级联查询

### 方法：`getAvailableOptions(selected)`

**功能**: 根据已选择的参数，返回其他参数的可选项，高级别参数会限定低级别参数的值域。

**参数**:
```javascript
{
  apiType: APITypes.TEXT_TO_VIDEO,  // 可选
  series: 'ltx',                      // 可选
  model: 'ltx-2-3-pro',              // 可选
  provider: 'ltx'                     // 可选
}
```

**返回**:
```javascript
{
  apiTypes: [],   // 可选的API类型列表
  series: [],     // 可选的系列列表
  models: [],     // 可选的模型列表
  providers: [],  // 可选的提供商列表
  functions: []   // 可选的Function列表
}
```

---

## 使用示例

### 示例1：初始化获取所有可选项

```javascript
const { functionManager } = require('./src/functions')
const { APITypes, Series, Providers } = require('./src/constants')

// 初始化时获取所有可选项，更新所有选择器
const options = functionManager.getAvailableOptions({})

console.log('API类型:', options.apiTypes.length)       // 25
console.log('系列:', options.series.length)             // 6
console.log('模型:', options.models.length)             // 25
console.log('提供商:', options.providers.length)        // 4
console.log('Function:', options.functions.length)    // 38
```

### 示例2：用户选择API类型后

```javascript
// 用户选择了 TEXT_TO_VIDEO
const options = functionManager.getAvailableOptions({
  apiType: APITypes.TEXT_TO_VIDEO
})

console.log('可选系列:', options.series)    // ['ltx', 'seedance', 'skyreels']
console.log('可选模型:', options.models)    // 12个模型
console.log('可选提供商:', options.providers) // ['ltx', 'volcengine', 'skyreels']
console.log('可选Function:', options.functions) // ['generate-video-from-text', ...]
```

### 示例3：用户选择API类型 + 系列

```javascript
// 用户选择了 TEXT_TO_VIDEO + LTX
const options = functionManager.getAvailableOptions({
  apiType: APITypes.TEXT_TO_VIDEO,
  series: Series.LTX
})

console.log('可选系列:', options.series)    // ['ltx']
console.log('可选模型:', options.models)    // ['ltx-2-3-pro', 'ltx-2-3-fast', 'ltx-2-pro', 'ltx-2-fast']
console.log('可选Function:', options.functions) // ['generate-video-from-text']
```

### 示例4：用户选择API类型 + 系列 + 模型

```javascript
// 用户选择了 TEXT_TO_VIDEO + LTX + ltx-2-3-pro
const options = functionManager.getAvailableOptions({
  apiType: APITypes.TEXT_TO_VIDEO,
  series: Series.LTX,
  model: 'ltx-2-3-pro'
})

console.log('可选系列:', options.series)    // ['ltx']
console.log('可选模型:', options.models)    // ['ltx-2-3-pro']
console.log('可选提供商:', options.providers) // ['ltx']
console.log('可选Function:', options.functions) // ['generate-video-from-text']
```

### 示例5：只选择提供商

```javascript
// 用户只选择了 ltx 提供商
const options = functionManager.getAvailableOptions({
  provider: Providers.LTX
})

console.log('可选API类型:', options.apiTypes.length) // 25
console.log('可选系列:', options.series)    // ['ltx']
console.log('可选模型:', options.models)    // 4个模型
console.log('可选Function:', options.functions.length) // 38
```

### 示例6：链式查询（旧方式，仍可用）

```javascript
const { functionManager } = require('./src/functions')
const { APITypes, Series } = require('./src/constants')

// 步骤1: 获取支持的系列
const series = functionManager.getSeriesByAPIType(APITypes.TEXT_TO_VIDEO)
// 返回: [{name: 'ltx', displayName: 'LTX', ...}, ...]

// 步骤2: 获取系列支持的模型
const models = functionManager.getModelsByTypeAndSeries(
  APITypes.TEXT_TO_VIDEO,
  Series.LTX
)
// 返回: [{name: 'ltx-2-3-pro', ...}, ...]

// 步骤3: 获取最佳Function
const func = functionManager.getBestFunctionByTypeAndModel(
  APITypes.TEXT_TO_VIDEO,
  'ltx-2-3-pro'
)
// 返回: {name: 'generate-video-from-text', provider: 'ltx', ...}

// 步骤4: 获取参数定义
const params = functionManager.getFunctionParams('generate-video-from-text')
// 返回: {input: {...}, output: {...}}
```

### 示例7：前端集成建议

```javascript
// 前端选择器组件示例
class SelectorController {
  constructor() {
    this.selectors = {
      apiType: null,
      series: null,
      model: null,
      provider: null
    }
    this.loadInitialOptions()
  }

  // 初始化加载所有选项
  loadInitialOptions() {
    const options = functionManager.getAvailableOptions({})
    this.updateAllSelectors(options)
  }

  // API类型变更
  onAPITypeChange(apiType) {
    this.selectors.apiType = apiType
    this.selectors.series = null
    this.selectors.model = null
    this.selectors.provider = null
    
    const options = functionManager.getAvailableOptions({
      apiType: apiType
    })
    this.updateAllSelectors(options)
  }

  // 系列变更
  onSeriesChange(series) {
    this.selectors.series = series
    this.selectors.model = null
    this.selectors.provider = null
    
    const options = functionManager.getAvailableOptions({
      apiType: this.selectors.apiType,
      series: series
    })
    this.updateModelAndProviderSelectors(options)
  }

  // 模型变更
  onModelChange(model) {
    this.selectors.model = model
    this.selectors.provider = null
    
    const options = functionManager.getAvailableOptions({
      apiType: this.selectors.apiType,
      series: this.selectors.series,
      model: model
    })
    this.updateProviderAndFunctionSelectors(options)
  }

  // 提供商变更
  onProviderChange(provider) {
    this.selectors.provider = provider
    
    const options = functionManager.getAvailableOptions({
      apiType: this.selectors.apiType,
      series: this.selectors.series,
      model: this.selectors.model,
      provider: provider
    })
    this.updateFunctionSelector(options)
  }

  updateAllSelectors(options) {
    this.updateAPITypeSelector(options.apiTypes)
    this.updateSeriesSelector(options.series)
    this.updateModelSelector(options.models)
    this.updateProviderSelector(options.providers)
    this.updateFunctionSelector(options.functions)
  }

  // ... 其他更新方法
}
```

---

## 完整API列表

### FunctionManager 查询方法

| 方法 | 说明 | 参数 | 返回 |
|------|------|------|------|
| `getAvailableOptions(selected)` | 级联查询，获取所有可选项 | `{apiType, series, model, provider}` | `{apiTypes, series, models, providers, functions}` |
| `getSeriesByAPIType(apiType)` | 根据API类型获取系列列表 | `apiType` | `SeriesMeta[]` |
| `getModelsByTypeAndSeries(apiType, series)` | 根据API类型和系列获取模型 | `apiType, series` | `Model[]` |
| `getBestFunctionByTypeAndModel(apiType, model)` | 获取最佳Function | `apiType, model` | `Function` |
| `getFunctionParams(functionName)` | 获取Function参数定义 | `functionName` | `{input, output}` |
| `getAPITypes()` | 获取所有API类型 | - | `APITypes[]` |
| `getAllSeries()` | 获取所有系列 | - | `SeriesMeta[]` |
| `getAllProviders()` | 获取所有提供商 | - | `ProviderMeta[]` |

### ModelRegistry 查询方法

| 方法 | 说明 | 参数 | 返回 |
|------|------|------|------|
| `getBySeries(series)` | 根据系列获取模型 | `series` | `Model[]` |
| `getSeriesByType(apiType)` | 根据API类型获取系列 | `apiType` | `SeriesMeta[]` |
| `getByTypeAndSeries(apiType, series)` | 根据API类型和系列获取模型 | `apiType, series` | `Model[]` |

### APIRegistry 查询方法

| 方法 | 说明 | 参数 | 返回 |
|------|------|------|------|
| `getByAPIType(apiType)` | 根据API类型获取API | `apiType` | `API[]` |
| `getBestAPIByType(apiType, model)` | 获取最佳API | `apiType, model` | `API` |

---

## 注意事项

1. **向后兼容性**：所有原有查询方法继续正常工作，不影响现有集成

2. **参数比较**：由于 `APITypes` 已扩展为对象，使用时可直接传入对象：
   ```javascript
   // 正确
   functionManager.getAvailableOptions({ apiType: APITypes.TEXT_TO_VIDEO })
   
   // 如果需要字符串比较
   functionManager.getAvailableOptions({ apiType: APITypes.TEXT_TO_VIDEO.id })
   ```

3. **性能优化**：级联查询使用索引字段，查询效率为 O(1)

4. **数据一致性**：所有查询结果自动保持关联关系，确保选择器之间的逻辑正确

---

## 相关文件

- `src/registry/model-registry.js` - ModelRegistry 扩展
- `src/registry/api-registry.js` - APIRegistry 扩展
- `src/functions/function-manager.js` - FunctionManager 扩展
- `src/metadata/apis/ltx.js` - API元数据
- `src/metadata/apis/mureka.js` - API元数据
- `src/metadata/apis/skyreels.js` - API元数据
- `src/metadata/apis/volcengine.js` - API元数据
