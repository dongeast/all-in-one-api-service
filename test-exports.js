/**
 * 外部项目引用测试
 * 模拟第三方项目使用本框架的所有导出功能
 */

const {
  // 命名空间
  Services,
  APIs,
  Params,
  Config,
  Utils,
  Functions,
  Constants,
  Registry,
  
  // 核心类
  BaseService,
  APIDefinition,
  BaseParam,
  BaseFunction,
  CacheManager,
  CacheItem,
  
  // 实例
  apiRegistry,
  modelRegistry,
  functionRegistry,
  cacheManager,
  metadataManager,
  functionManager,
  FunctionManager,
  
  // 工具函数
  setLanguage,
  getLanguage,
  t,
  
  // 常量
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
  SeriesMeta,
  
  // 元数据查询函数
  getFunction,
  getFunctions,
  getFunctionByAPI,
  getAPI,
  getAPIs,
  getModel,
  getModels,
  getBestFunction,
  getBestAPI,
  
  // 函数执行
  executeFunction,
  queryFunctions,
  getFunctionDetail,
  getBestFunctionInstance,
  
  // QueryService
  QueryService
} = require('./index.js')

console.log('========================================')
console.log('外部项目引用测试 - 全面导出验证')
console.log('========================================\n')

// 测试计数器
let totalTests = 0
let passedTests = 0
let failedTests = 0

function test(name, fn) {
  totalTests++
  try {
    fn()
    passedTests++
    console.log(`✅ ${name}`)
  } catch (error) {
    failedTests++
    console.log(`❌ ${name}`)
    console.log(`   错误: ${error.message}`)
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || '断言失败')
  }
}

// ========================================
// 1. 测试命名空间导出
// ========================================
console.log('1. 测试命名空间导出')
console.log('----------------------------------------')

test('Services 命名空间存在', () => {
  assert(Services !== undefined, 'Services 应该存在')
  assert(Services.BaseService !== undefined, 'Services.BaseService 应该存在')
  assert(Services.LTX !== undefined, 'Services.LTX 应该存在')
  assert(Services.Volcengine !== undefined, 'Services.Volcengine 应该存在')
  assert(Services.Skyreels !== undefined, 'Services.Skyreels 应该存在')
  assert(Services.Mureka !== undefined, 'Services.Mureka 应该存在')
  assert(Services.Custom !== undefined, 'Services.Custom 应该存在')
})

test('APIs 命名空间存在', () => {
  assert(APIs !== undefined, 'APIs 应该存在')
  assert(APIs.APIDefinition !== undefined, 'APIs.APIDefinition 应该存在')
})

test('Params 命名空间存在', () => {
  assert(Params !== undefined, 'Params 应该存在')
  assert(Params.BaseParam !== undefined, 'Params.BaseParam 应该存在')
  assert(Params.Templates !== undefined, 'Params.Templates 应该存在')
  assert(Params.Common !== undefined, 'Params.Common 应该存在')
})

test('Config 命名空间存在', () => {
  assert(Config !== undefined, 'Config 应该存在')
  assert(Config.ConfigManager !== undefined, 'Config.ConfigManager 应该存在')
})

test('Utils 命名空间存在', () => {
  assert(Utils !== undefined, 'Utils 应该存在')
  assert(typeof Utils.deepMerge === 'function', 'Utils.deepMerge 应该是函数')
  assert(typeof Utils.deepClone === 'function', 'Utils.deepClone 应该是函数')
  assert(typeof Utils.generateId === 'function', 'Utils.generateId 应该是函数')
  assert(typeof Utils.createLogger === 'function', 'Utils.createLogger 应该是函数')
})

test('Constants 命名空间存在', () => {
  assert(Constants !== undefined, 'Constants 应该存在')
  assert(Constants.APITypes !== undefined, 'Constants.APITypes 应该存在')
  assert(Constants.MediaTypes !== undefined, 'Constants.MediaTypes 应该存在')
  assert(Constants.Providers !== undefined, 'Constants.Providers 应该存在')
})

test('Functions 命名空间存在', () => {
  assert(Functions !== undefined, 'Functions 应该存在')
  assert(Functions.BaseFunction !== undefined, 'Functions.BaseFunction 应该存在')
  assert(Functions.FunctionManager !== undefined, 'Functions.FunctionManager 应该存在')
})

test('Registry 命名空间存在', () => {
  assert(Registry !== undefined, 'Registry 应该存在')
  assert(Registry.BaseRegistry !== undefined, 'Registry.BaseRegistry 应该存在')
  assert(Registry.APIRegistry !== undefined, 'Registry.APIRegistry 应该存在')
  assert(Registry.ModelRegistry !== undefined, 'Registry.ModelRegistry 应该存在')
  assert(Registry.FunctionRegistry !== undefined, 'Registry.FunctionRegistry 应该存在')
})

// ========================================
// 2. 测试核心类导出
// ========================================
console.log('\n2. 测试核心类导出')
console.log('----------------------------------------')

test('BaseService 类可用', () => {
  assert(typeof BaseService === 'function', 'BaseService 应该是类')
  const service = new BaseService({ apiKey: 'test' })
  assert(service !== undefined, 'BaseService 实例化成功')
})

test('APIDefinition 类可用', () => {
  assert(typeof APIDefinition === 'function', 'APIDefinition 应该是类')
  const api = new APIDefinition({ name: 'test-api' })
  assert(api !== undefined, 'APIDefinition 实例化成功')
  assert(api.name === 'test-api', 'APIDefinition name 属性正确')
})

test('BaseParam 类可用', () => {
  assert(typeof BaseParam === 'function', 'BaseParam 应该是类')
  const param = new BaseParam({
    input: { prompt: { type: 'string', required: true } }
  })
  assert(param !== undefined, 'BaseParam 实例化成功')
  const schema = param.getInputSchema()
  assert(schema.prompt !== undefined, 'BaseParam getInputSchema 方法正常')
})

test('BaseFunction 类可用', () => {
  assert(typeof BaseFunction === 'function', 'BaseFunction 应该是类')
})

test('CacheManager 类可用', () => {
  assert(typeof CacheManager === 'function', 'CacheManager 应该是类')
  const cache = new CacheManager()
  assert(cache !== undefined, 'CacheManager 实例化成功')
  assert(typeof cache.get === 'function', 'CacheManager.get 方法存在')
  assert(typeof cache.set === 'function', 'CacheManager.set 方法存在')
})

test('CacheItem 类可用', () => {
  assert(typeof CacheItem === 'function', 'CacheItem 应该是类')
  const item = new CacheItem({ data: 'test' }, 1000)
  assert(item !== undefined, 'CacheItem 实例化成功')
  assert(typeof item.isExpired === 'function', 'CacheItem.isExpired 方法存在')
})

// ========================================
// 3. 测试实例导出
// ========================================
console.log('\n3. 测试实例导出')
console.log('----------------------------------------')

test('apiRegistry 实例可用', () => {
  assert(apiRegistry !== undefined, 'apiRegistry 应该存在')
  assert(typeof apiRegistry.get === 'function', 'apiRegistry.get 方法存在')
  assert(typeof apiRegistry.getByType === 'function', 'apiRegistry.getByType 方法存在')
  assert(typeof apiRegistry.getParamSchema === 'function', 'apiRegistry.getParamSchema 方法存在')
  
  const allAPIs = apiRegistry.getAll()
  console.log(`   - 已注册 API 数量: ${allAPIs.length}`)
  assert(allAPIs.length > 0, '应该有注册的 API')
})

test('modelRegistry 实例可用', () => {
  assert(modelRegistry !== undefined, 'modelRegistry 应该存在')
  assert(typeof modelRegistry.get === 'function', 'modelRegistry.get 方法存在')
  assert(typeof modelRegistry.getByType === 'function', 'modelRegistry.getByType 方法存在')
  
  const allModels = modelRegistry.getAll()
  console.log(`   - 已注册模型数量: ${allModels.length}`)
  assert(allModels.length > 0, '应该有注册的模型')
})

test('functionRegistry 实例可用', () => {
  assert(functionRegistry !== undefined, 'functionRegistry 应该存在')
  assert(typeof functionRegistry.get === 'function', 'functionRegistry.get 方法存在')
  assert(typeof functionRegistry.getByType === 'function', 'functionRegistry.getByType 方法存在')
  assert(typeof functionRegistry.getSupportedTypes === 'function', 'functionRegistry.getSupportedTypes 方法存在')
  
  const allFunctions = functionRegistry.getAll()
  console.log(`   - 已注册函数数量: ${allFunctions.length}`)
  assert(allFunctions.length > 0, '应该有注册的函数')
  
  const types = functionRegistry.getSupportedTypes()
  console.log(`   - 支持的类型: ${types.join(', ')}`)
})

test('cacheManager 实例可用', () => {
  assert(cacheManager !== undefined, 'cacheManager 应该存在')
  assert(typeof cacheManager.get === 'function', 'cacheManager.get 方法存在')
  assert(typeof cacheManager.set === 'function', 'cacheManager.set 方法存在')
})

test('metadataManager 实例可用', () => {
  assert(metadataManager !== undefined, 'metadataManager 应该存在')
  assert(typeof metadataManager.getFunction === 'function', 'metadataManager.getFunction 方法存在')
  assert(typeof metadataManager.getAPI === 'function', 'metadataManager.getAPI 方法存在')
  assert(typeof metadataManager.getModel === 'function', 'metadataManager.getModel 方法存在')
})

test('functionManager 实例可用', () => {
  assert(functionManager !== undefined, 'functionManager 应该存在')
  assert(typeof functionManager.execute === 'function', 'functionManager.execute 方法存在')
  assert(typeof functionManager.query === 'function', 'functionManager.query 方法存在')
})

// ========================================
// 4. 测试工具函数导出
// ========================================
console.log('\n4. 测试工具函数导出')
console.log('----------------------------------------')

test('setLanguage 和 getLanguage 函数可用', () => {
  assert(typeof setLanguage === 'function', 'setLanguage 应该是函数')
  assert(typeof getLanguage === 'function', 'getLanguage 应该是函数')
  
  setLanguage('zh')
  const lang = getLanguage()
  assert(lang === 'zh', '语言设置应该为 zh')
})

test('t 翻译函数可用', () => {
  assert(typeof t === 'function', 't 应该是函数')
  const text = t('common.success')
  assert(typeof text === 'string', '翻译结果应该是字符串')
})

// ========================================
// 5. 测试常量导出
// ========================================
console.log('\n5. 测试常量导出')
console.log('----------------------------------------')

test('APITypes 常量可用', () => {
  assert(APITypes !== undefined, 'APITypes 应该存在')
  assert(APITypes.TEXT_TO_IMAGE !== undefined, 'APITypes.TEXT_TO_IMAGE 应该存在')
  assert(APITypes.TEXT_TO_VIDEO !== undefined, 'APITypes.TEXT_TO_VIDEO 应该存在')
  console.log(`   - TEXT_TO_IMAGE: ${APITypes.TEXT_TO_IMAGE}`)
  console.log(`   - TEXT_TO_VIDEO: ${APITypes.TEXT_TO_VIDEO}`)
})

test('MediaTypes 常量可用', () => {
  assert(MediaTypes !== undefined, 'MediaTypes 应该存在')
  assert(MediaTypes.TEXT !== undefined, 'MediaTypes.TEXT 应该存在')
  assert(MediaTypes.IMAGE !== undefined, 'MediaTypes.IMAGE 应该存在')
})

test('Providers 常量可用', () => {
  assert(Providers !== undefined, 'Providers 应该存在')
  assert(Providers.LTX !== undefined, 'Providers.LTX 应该存在')
  assert(Providers.VOLCENGINE !== undefined, 'Providers.VOLCENGINE 应该存在')
  console.log(`   - LTX: ${Providers.LTX}`)
  console.log(`   - VOLCENGINE: ${Providers.VOLCENGINE}`)
})

test('Series 常量可用', () => {
  assert(Series !== undefined, 'Series 应该存在')
  assert(Series.LTX !== undefined, 'Series.LTX 应该存在')
})

test('工具函数可用', () => {
  assert(typeof getProviderPriority === 'function', 'getProviderPriority 应该是函数')
  assert(typeof sortByProviderPriority === 'function', 'sortByProviderPriority 应该是函数')
  assert(typeof getHighestPriorityProvider === 'function', 'getHighestPriorityProvider 应该是函数')
  assert(typeof normalizeLanguage === 'function', 'normalizeLanguage 应该是函数')
})

// ========================================
// 6. 测试元数据查询函数
// ========================================
console.log('\n6. 测试元数据查询函数')
console.log('----------------------------------------')

test('getFunction 函数可用', () => {
  assert(typeof getFunction === 'function', 'getFunction 应该是函数')
  const func = getFunction('generate-song')
  if (func) {
    console.log(`   - 找到函数: ${func.name}`)
    console.log(`   - 显示名称: ${func.displayName}`)
    console.log(`   - 描述: ${func.description}`)
  }
})

test('getFunctions 函数可用', () => {
  assert(typeof getFunctions === 'function', 'getFunctions 应该是函数')
  const funcs = getFunctions({ type: 'async' })
  console.log(`   - 异步函数数量: ${funcs.length}`)
  assert(funcs.length > 0, '应该有异步函数')
})

test('getAPI 函数可用', () => {
  assert(typeof getAPI === 'function', 'getAPI 应该是函数')
  const apis = getAPIs()
  console.log(`   - API 数量: ${apis.length}`)
  assert(apis.length > 0, '应该有 API')
})

test('getModel 函数可用', () => {
  assert(typeof getModel === 'function', 'getModel 应该是函数')
  const models = getModels()
  console.log(`   - 模型数量: ${models.length}`)
  assert(models.length > 0, '应该有模型')
})

test('getBestFunction 函数可用', () => {
  assert(typeof getBestFunction === 'function', 'getBestFunction 应该是函数')
  const bestFunc = getBestFunction('text-to-video')
  if (bestFunc) {
    console.log(`   - 最佳函数: ${bestFunc.name}`)
  }
})

test('getBestAPI 函数可用', () => {
  assert(typeof getBestAPI === 'function', 'getBestAPI 应该是函数')
  const bestAPI = getBestAPI('text-to-video')
  if (bestAPI) {
    console.log(`   - 最佳 API: ${bestAPI.name}`)
  }
})

// ========================================
// 7. 测试函数执行
// ========================================
console.log('\n7. 测试函数执行')
console.log('----------------------------------------')

test('executeFunction 函数可用', () => {
  assert(typeof executeFunction === 'function', 'executeFunction 应该是函数')
})

test('queryFunctions 函数可用', () => {
  assert(typeof queryFunctions === 'function', 'queryFunctions 应该是函数')
  const funcs = queryFunctions({ type: 'async' })
  console.log(`   - 查询到的异步函数: ${funcs.length}`)
})

test('getFunctionDetail 函数可用', () => {
  assert(typeof getFunctionDetail === 'function', 'getFunctionDetail 应该是函数')
  const detail = getFunctionDetail('generate-song')
  if (detail) {
    console.log(`   - 函数详情: ${detail.name}`)
  }
})

test('getBestFunctionInstance 函数可用', () => {
  assert(typeof getBestFunctionInstance === 'function', 'getBestFunctionInstance 应该是函数')
})

// ========================================
// 8. 测试 QueryService
// ========================================
console.log('\n8. 测试 QueryService')
console.log('----------------------------------------')

test('QueryService 可用', () => {
  assert(QueryService !== undefined, 'QueryService 应该存在')
  assert(typeof QueryService.execute === 'function', 'QueryService.execute 方法存在')
  assert(typeof QueryService.query === 'function', 'QueryService.query 方法存在')
})

// ========================================
// 9. 测试 APIRegistry 方法
// ========================================
console.log('\n9. 测试 APIRegistry 方法')
console.log('----------------------------------------')

test('APIRegistry.getParamSchema 方法', () => {
  const apis = apiRegistry.getAll()
  if (apis.length > 0) {
    const schema = apiRegistry.getParamSchema(apis[0].name)
    console.log(`   - 参数 Schema: ${schema ? '存在' : '不存在'}`)
  }
})

test('APIRegistry.getInputSchema 方法', () => {
  const apis = apiRegistry.getAll()
  if (apis.length > 0) {
    const inputSchema = apiRegistry.getInputSchema(apis[0].name)
    console.log(`   - 输入 Schema 字段数: ${Object.keys(inputSchema).length}`)
  }
})

test('APIRegistry.getOutputSchema 方法', () => {
  const apis = apiRegistry.getAll()
  if (apis.length > 0) {
    const outputSchema = apiRegistry.getOutputSchema(apis[0].name)
    console.log(`   - 输出 Schema 字段数: ${Object.keys(outputSchema).length}`)
  }
})

test('APIRegistry.getCallInfo 方法', () => {
  const apis = apiRegistry.getAll()
  if (apis.length > 0) {
    const callInfo = apiRegistry.getCallInfo(apis[0].name)
    if (callInfo) {
      console.log(`   - 调用信息: endpoint=${callInfo.endpoint}, method=${callInfo.method}`)
    }
  }
})

test('APIRegistry.validateParams 方法', () => {
  const apis = apiRegistry.getAll()
  if (apis.length > 0) {
    const result = apiRegistry.validateParams(apis[0].name, {})
    console.log(`   - 验证结果: ${result.valid ? '通过' : '失败'}`)
  }
})

// ========================================
// 10. 测试 FunctionRegistry 方法
// ========================================
console.log('\n10. 测试 FunctionRegistry 方法')
console.log('----------------------------------------')

test('FunctionRegistry.getStats 方法', () => {
  const stats = functionRegistry.getStats()
  console.log(`   - 总函数数: ${stats.total}`)
  console.log(`   - 异步函数数: ${stats.asyncCount}`)
  console.log(`   - 同步函数数: ${stats.syncCount}`)
  console.log(`   - 按 Provider 分布: ${JSON.stringify(stats.byField.provider)}`)
})

test('FunctionRegistry.getSupportedCategories 方法', () => {
  const categories = functionRegistry.getSupportedCategories()
  console.log(`   - 支持的分类: ${categories.join(', ')}`)
})

// ========================================
// 测试总结
// ========================================
console.log('\n========================================')
console.log('测试总结')
console.log('========================================')
console.log(`总测试数: ${totalTests}`)
console.log(`通过: ${passedTests}`)
console.log(`失败: ${failedTests}`)
console.log(`成功率: ${((passedTests / totalTests) * 100).toFixed(2)}%`)

if (failedTests === 0) {
  console.log('\n✅ 所有测试通过！框架导出功能正常。')
  process.exit(0)
} else {
  console.log('\n❌ 部分测试失败，请检查导出配置。')
  process.exit(1)
}
