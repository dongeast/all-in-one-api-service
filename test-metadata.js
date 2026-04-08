/**
 * 功能验证测试脚本（包含 Provider 优先级）
 */

const {
  QueryService,
  Constants,
  Registry
} = require('./src')

const {
  APITypes,
  Providers,
  ProviderPriority,
  getProviderPriority,
  ModelTags
} = Constants

console.log('='.repeat(60))
console.log('模型和接口元数据扩展功能验证')
console.log('='.repeat(60))

console.log('\n1. 测试 Provider 常量')
console.log('-'.repeat(60))
console.log('Providers:', Object.values(Providers).join(', '))

console.log('\n2. 测试 Provider 优先级')
console.log('-'.repeat(60))
Object.values(Providers).forEach(provider => {
  const priority = getProviderPriority(provider)
  console.log(`  ${provider}: ${priority}`)
})

console.log('\n3. 测试统计信息')
console.log('-'.repeat(60))
const stats = QueryService.getStats()
console.log('统计信息:', JSON.stringify(stats, null, 2))

console.log('\n4. 测试根据类型获取模型列表（自动去重）')
console.log('-'.repeat(60))
const textToVideoModels = QueryService.getModelsByType(APITypes.TEXT_TO_VIDEO)
console.log('文生视频模型数量:', textToVideoModels.length)
textToVideoModels.forEach(model => {
  console.log(`  - ${model.displayName} (${model.name}) - Provider: ${model.provider}`)
})

console.log('\n5. 测试根据类型获取接口列表（自动去重）')
console.log('-'.repeat(60))
const textToVideoAPIs = QueryService.getAPIsByType(APITypes.TEXT_TO_VIDEO)
console.log('文生视频接口数量:', textToVideoAPIs.length)
textToVideoAPIs.forEach(api => {
  console.log(`  - ${api.displayName} (${api.name}) - Provider: ${api.provider}`)
})

console.log('\n6. 测试根据 Provider 获取模型列表')
console.log('-'.repeat(60))
const ltxModels = QueryService.getModelsByProvider(Providers.LTX)
console.log('LTX模型数量:', ltxModels.length)
ltxModels.forEach(model => {
  console.log(`  - ${model.displayName}: ${model.description}`)
})

console.log('\n7. 测试根据 Provider 获取接口列表')
console.log('-'.repeat(60))
const volcengineAPIs = QueryService.getAPIsByProvider(Providers.VOLCENGINE)
console.log('火山引擎接口数量:', volcengineAPIs.length)
volcengineAPIs.slice(0, 5).forEach(api => {
  console.log(`  - ${api.displayName}: ${api.description}`)
})

console.log('\n8. 测试获取模型详情')
console.log('-'.repeat(60))
const modelDetail = QueryService.getModelDetail('ltx-2-3-pro')
console.log('模型详情:', JSON.stringify(modelDetail, null, 2))

console.log('\n9. 测试获取接口详情')
console.log('-'.repeat(60))
const apiDetail = QueryService.getAPIDetail('generate-video-from-text')
console.log('接口详情:', JSON.stringify(apiDetail, null, 2))

console.log('\n10. 测试根据类型和模型获取最佳接口（支持优先级）')
console.log('-'.repeat(60))
const bestAPI = QueryService.getBestAPI(APITypes.TEXT_TO_VIDEO, 'ltx-2-3-pro')
console.log('最佳接口:', bestAPI ? `${bestAPI.displayName} (Provider: ${bestAPI.provider})` : '未找到')

console.log('\n11. 测试根据标签获取模型列表')
console.log('-'.repeat(60))
const fastModels = QueryService.getModelsByTags(ModelTags.FAST)
console.log('快速模型数量:', fastModels.length)
fastModels.forEach(model => {
  console.log(`  - ${model.displayName} (${model.provider})`)
})

console.log('\n12. 测试根据模型获取接口列表')
console.log('-'.repeat(60))
const modelAPIs = QueryService.getAPIsByModel('doubao-seedance-2-0')
console.log('doubao-seedance-2-0 支持的接口数量:', modelAPIs.length)
modelAPIs.forEach(api => {
  console.log(`  - ${api.displayName}`)
})

console.log('\n13. 测试动态注册自定义模型和接口')
console.log('-'.repeat(60))

// 注册自定义模型
const customModel = {
  name: 'test-model',
  displayName: '测试模型',
  description: '这是一个测试模型',
  logo: '',
  type: APITypes.TEXT_TO_VIDEO,
  mediaType: 'video',
  tags: [ModelTags.STABLE],
  priority: 50,
  provider: 'test-provider',
  capabilities: {}
}
Registry.modelRegistry.register(customModel)
console.log('注册自定义模型: test-model')

// 注册自定义接口
const customAPI = {
  name: 'test-api',
  displayName: '测试接口',
  description: '这是一个测试接口',
  type: APITypes.TEXT_TO_VIDEO,
  tags: ['async'],
  priority: 50,
  provider: 'test-provider',
  models: ['test-model'],
  apiClass: 'TestAPI',
  endpoint: '/test'
}
Registry.apiRegistry.register(customAPI)
console.log('注册自定义接口: test-api')

// 查询自定义模型
const customModels = QueryService.getModelsByProvider('test-provider')
console.log('自定义模型数量:', customModels.length)

console.log('\n14. 测试 Provider 优先级去重')
console.log('-'.repeat(60))

// 模拟两个 Provider 提供相同 ID 的模型
const model1 = {
  name: 'duplicate-model',
  displayName: '重复模型 (高优先级)',
  description: '来自高优先级 Provider',
  logo: '',
  type: APITypes.TEXT_TO_VIDEO,
  mediaType: 'video',
  tags: [],
  priority: 100,
  provider: Providers.LTX, // 优先级 100
  capabilities: {}
}

const model2 = {
  name: 'duplicate-model',
  displayName: '重复模型 (低优先级)',
  description: '来自低优先级 Provider',
  logo: '',
  type: APITypes.TEXT_TO_VIDEO,
  mediaType: 'video',
  tags: [],
  priority: 100,
  provider: Providers.MUREKA, // 优先级 70
  capabilities: {}
}

Registry.modelRegistry.register(model1)
Registry.modelRegistry.register(model2)

// 查询时应该只返回高优先级的模型
const duplicateModels = QueryService.getModelsByType(APITypes.TEXT_TO_VIDEO)
const foundModel = duplicateModels.find(m => m.name === 'duplicate-model')
console.log('去重后的模型:', foundModel ? foundModel.displayName : '未找到')
console.log('Provider:', foundModel ? foundModel.provider : 'N/A')
console.log('预期 Provider:', Providers.LTX, '(优先级最高)')

console.log('\n' + '='.repeat(60))
console.log('所有测试完成！')
console.log('='.repeat(60))
