/**
 * 外部项目使用示例
 * 展示如何在您的外部项目中使用 all-in-one-api-service 框架
 */

// ============================================
// 1. 引入框架
// ============================================
const {
  QueryService,
  Constants,
  Registry,
  Services,
  APIs
} = require('all-in-one-api-service')

const {
  APITypes,
  MediaTypes,
  Providers,
  ModelTags,
  APITags,
  ProviderPriority,
  getProviderPriority
} = Constants

// ============================================
// 2. 查询模型
// ============================================

// 2.1 根据类型获取模型列表
const textToVideoModels = QueryService.getModelsByType(APITypes.TEXT_TO_VIDEO)
console.log('文生视频模型:', textToVideoModels.map(m => m.displayName))

// 2.2 根据类型和标签获取模型
const fastModels = QueryService.getModelsByType(
  APITypes.TEXT_TO_VIDEO,
  { tags: ModelTags.FAST }
)
console.log('快速模型:', fastModels.map(m => m.displayName))

// 2.3 根据 Provider 获取模型
const ltxModels = QueryService.getModelsByProvider(Providers.LTX)
console.log('LTX 模型:', ltxModels.map(m => m.displayName))

// 2.4 获取模型详情
const modelDetail = QueryService.getModelDetail('ltx-2-3-pro')
console.log('模型详情:', modelDetail)

// ============================================
// 3. 查询接口
// ============================================

// 3.1 根据类型获取接口列表
const textToVideoAPIs = QueryService.getAPIsByType(APITypes.TEXT_TO_VIDEO)
console.log('文生视频接口:', textToVideoAPIs.map(a => a.displayName))

// 3.2 根据类型和 Provider 获取接口
const ltxAPIs = QueryService.getAPIsByType(
  APITypes.TEXT_TO_VIDEO,
  { provider: Providers.LTX }
)
console.log('LTX 接口:', ltxAPIs.map(a => a.displayName))

// 3.3 根据模型获取接口
const modelAPIs = QueryService.getAPIsByModel('doubao-seedance-2-0')
console.log('doubao-seedance-2-0 支持的接口:', modelAPIs.map(a => a.displayName))

// 3.4 获取接口详情
const apiDetail = QueryService.getAPIDetail('generate-video-from-text')
console.log('接口详情:', apiDetail)

// ============================================
// 4. 获取最佳接口（支持 Provider 优先级）
// ============================================

// 4.1 根据类型和模型获取最佳接口
// 当多个 Provider 提供相同 ID 的接口时，会自动选择优先级最高的
const bestAPI = QueryService.getBestAPI(
  APITypes.TEXT_TO_VIDEO,
  'ltx-2-3-pro'
)
console.log('最佳接口:', bestAPI)

// 4.2 获取所有可用接口（按优先级排序）
const availableAPIs = QueryService.getAvailableAPIs(
  APITypes.TEXT_TO_VIDEO,
  'ltx-2-3-pro'
)
console.log('可用接口:', availableAPIs.map(a => a.displayName))

// ============================================
// 5. 智能查询
// ============================================

// 5.1 根据输入输出类型查找接口
const textToVideoByIO = QueryService.findByInputOutput(
  MediaTypes.TEXT,
  MediaTypes.VIDEO
)
console.log('文本到视频的接口:', textToVideoByIO.map(a => a.displayName))

// ============================================
// 6. Provider 优先级
// ============================================

// 6.1 查看 Provider 优先级
console.log('LTX 优先级:', getProviderPriority(Providers.LTX))
console.log('火山引擎优先级:', getProviderPriority(Providers.VOLCENGINE))
console.log('Skyreels 优先级:', getProviderPriority(Providers.SKYREELS))
console.log('Mureka 优先级:', getProviderPriority(Providers.MUREKA))

// 6.2 Provider 优先级配置
console.log('Provider 优先级配置:', ProviderPriority)

// ============================================
// 7. 使用 API 进行调用
// ============================================

// 7.1 创建服务实例
const LTXService = Services.LTX
const config = {
  apiKey: 'your-api-key',
  baseURL: 'https://api.ltx.video',
  timeout: 300000
}
const ltxService = new LTXService(config)

// 7.2 创建 API 实例
const GenerateVideoFromText = APIs.LTX.Video.GenerateVideoFromText
const api = new GenerateVideoFromText(ltxService)

// 7.3 执行 API 调用
async function generateVideo() {
  const result = await api.execute({
    prompt: 'A cat playing piano',
    model: 'ltx-2-3-pro',
    duration: 10,
    resolution: '1920x1080'
  })
  
  console.log('生成结果:', result)
}

// ============================================
// 8. 统计信息
// ============================================

const stats = QueryService.getStats()
console.log('统计信息:', stats)

// ============================================
// 9. 检查模型/接口是否存在
// ============================================

const hasModel = QueryService.hasModel('ltx-2-3-pro')
console.log('模型是否存在:', hasModel)

const hasAPI = QueryService.hasAPI('generate-video-from-text')
console.log('接口是否存在:', hasAPI)

// ============================================
// 10. 获取所有支持的类型
// ============================================

const supportedTypes = QueryService.getSupportedTypes()
console.log('支持的类型:', supportedTypes)

const supportedMediaTypes = QueryService.getSupportedMediaTypes()
console.log('支持的媒体类型:', supportedMediaTypes)

// ============================================
// 11. 动态注册自定义模型/接口
// ============================================

// 11.1 注册自定义模型
const customModel = {
  name: 'custom-model-1',
  displayName: '自定义模型 1',
  description: '这是一个自定义模型',
  logo: '',
  type: APITypes.TEXT_TO_VIDEO,
  mediaType: MediaTypes.VIDEO,
  tags: [ModelTags.STABLE],
  priority: 50,
  provider: 'custom-provider',
  capabilities: {
    maxResolution: '1080p',
    maxDuration: 10
  }
}

Registry.modelRegistry.register(customModel)

// 11.2 注册自定义接口
const customAPI = {
  name: 'custom-api-1',
  displayName: '自定义接口 1',
  description: '这是一个自定义接口',
  type: APITypes.TEXT_TO_VIDEO,
  tags: [APITags.ASYNC],
  priority: 50,
  provider: 'custom-provider',
  models: ['custom-model-1'],
  apiClass: 'CustomAPI',
  endpoint: '/custom/generate'
}

Registry.apiRegistry.register(customAPI)

// 11.3 查询自定义模型
const customModels = QueryService.getModelsByProvider('custom-provider')
console.log('自定义模型:', customModels)
