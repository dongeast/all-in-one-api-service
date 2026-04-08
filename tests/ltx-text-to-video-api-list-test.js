/**
 * LTX 服务商 Text to Video API 列表查询测试
 * 模拟外部项目引用本框架进行查询操作
 */

const {
  QueryService,
  Constants,
  setLanguage
} = require('../index')

const { APITypes, Providers, MediaTypes, Series, SeriesMeta } = Constants

/**
 * 演示场景1: 查询指定服务商的指定类型API列表
 */
function demoQueryAPIsByProviderAndType() {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║  场景1: 查询 LTX 服务商的 Text to Video API 列表            ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const apis = QueryService.getAPIsByType(APITypes.TEXT_TO_VIDEO, {
    provider: Providers.LTX
  })

  if (apis.length === 0) {
    console.log('未找到匹配的 API')
    return
  }

  console.log(`查询成功，共找到 ${apis.length} 个 API:\n`)
  apis.forEach((api, index) => {
    console.log(`${index + 1}. ${api.displayName} (${api.name})`)
    console.log(`   描述: ${api.description}`)
    console.log(`   端点: ${api.endpoint}`)
    console.log(`   支持模型: ${api.models ? api.models.join(', ') : 'N/A'}`)
    console.log(`   标签: ${api.tags ? api.tags.join(', ') : 'N/A'}`)
    console.log()
  })
}

/**
 * 演示场景2: 获取服务商所有API类型统计
 */
function demoGetProviderAPIStats() {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║  场景2: 获取 LTX 服务商所有 API 类型统计                    ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const allAPIs = QueryService.getAPIsByProvider(Providers.LTX)

  const typeStats = {}
  allAPIs.forEach(api => {
    const types = Array.isArray(api.type) ? api.type : [api.type]
    types.forEach(type => {
      if (!typeStats[type]) {
        typeStats[type] = []
      }
      typeStats[type].push(api.name)
    })
  })

  console.log(`API 总数: ${allAPIs.length}\n`)
  Object.entries(typeStats).forEach(([type, apis]) => {
    console.log(`【${type}】 - ${apis.length} 个 API`)
    apis.forEach(api => console.log(`  - ${api}`))
  })
}

/**
 * 演示场景3: 获取API详细信息
 */
function demoGetAPIDetail() {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║  场景3: 获取 API 详细信息                                   ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const apiName = 'generate-video-from-text'
  const apiDetail = QueryService.getAPIDetail(apiName)

  if (!apiDetail) {
    console.log(`API "${apiName}" 不存在`)
    return
  }

  console.log(`API 名称: ${apiDetail.name}`)
  console.log(`显示名称: ${apiDetail.displayName}`)
  console.log(`描述: ${apiDetail.description}`)
  console.log(`类型: ${Array.isArray(apiDetail.type) ? apiDetail.type.join(', ') : apiDetail.type}`)
  console.log(`提供商: ${apiDetail.provider}`)
  console.log(`支持模型: ${apiDetail.models ? apiDetail.models.join(', ') : 'N/A'}`)
  console.log(`端点: ${apiDetail.endpoint || 'N/A'}`)
}

/**
 * 演示场景4: 根据模型查询支持的API
 */
function demoQueryAPIsByModel() {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║  场景4: 根据模型查询支持的 API                               ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const modelName = 'ltx-2-fast'
  const apis = QueryService.getAPIsByModel(modelName)

  console.log(`模型 "${modelName}" 支持的 API 数量: ${apis.length}\n`)
  apis.forEach(api => {
    console.log(`  - ${api.displayName} (${api.name})`)
  })
}

/**
 * 演示场景5: 获取最佳API
 */
function demoGetBestAPI() {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║  场景5: 获取最佳 API (按优先级)                             ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const bestAPI = QueryService.getBestAPI(
    APITypes.TEXT_TO_VIDEO,
    'ltx-2-pro',
    { provider: Providers.LTX }
  )

  if (bestAPI) {
    console.log(`最佳 API: ${bestAPI.displayName}`)
    console.log(`  名称: ${bestAPI.name}`)
    console.log(`  优先级: ${bestAPI.priority}`)
    console.log(`  端点: ${bestAPI.endpoint}`)
  }
}

/**
 * 演示场景6: 检查API是否存在
 */
function demoCheckAPIExists() {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║  场景6: 检查 API 是否存在                                   ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const existingAPI = 'generate-video-from-text'
  const nonExistingAPI = 'non-existing-api'

  console.log(`API "${existingAPI}" 存在: ${QueryService.hasAPI(existingAPI)}`)
  console.log(`API "${nonExistingAPI}" 存在: ${QueryService.hasAPI(nonExistingAPI)}`)
}

/**
 * 演示场景7: 获取系统统计信息
 */
function demoGetSystemStats() {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║  场景7: 获取系统统计信息                                     ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const stats = QueryService.getStats()

  console.log(`总模型数: ${stats.totalModels}`)
  console.log(`总接口数: ${stats.totalAPIs}`)
  console.log(`服务商: ${stats.providers.join(', ')}`)
  console.log(`支持的类型数: ${stats.supportedTypes}`)
  console.log(`支持的媒体类型数: ${stats.supportedMediaTypes}`)
}

/**
 * 演示场景8: 根据输入输出类型查找接口
 */
function demoFindByInputOutput() {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║  场景8: 根据输入输出类型查找接口                             ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const apis = QueryService.findByInputOutput(MediaTypes.TEXT, MediaTypes.VIDEO)

  console.log(`输入 text 输出 video 的 API 数量: ${apis.length}\n`)
  apis.slice(0, 5).forEach(api => {
    console.log(`  - ${api.displayName} (提供商: ${api.provider})`)
  })
}

/**
 * 演示场景9: 对比不同服务商的API
 */
function demoCompareProviders() {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║  场景9: 对比不同服务商的 Text to Video API                  ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const allProviders = Object.values(Providers)
  for (const provider of allProviders) {
    const apis = QueryService.getAPIsByType(APITypes.TEXT_TO_VIDEO, { provider })
    if (apis.length > 0) {
      console.log(`【${provider}】 - ${apis.length} 个 Text to Video API`)
      apis.forEach(api => console.log(`  - ${api.displayName}`))
      console.log()
    }
  }
}

/**
 * 演示场景10: 获取模型详情（包含系列信息）
 */
function demoGetModelDetail() {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║  场景10: 获取模型详情（包含系列信息）                        ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const modelName = 'ltx-2-fast'
  const modelDetail = QueryService.getModelDetail(modelName)

  if (!modelDetail) {
    console.log(`模型 "${modelName}" 不存在`)
    return
  }

  console.log(`模型名称: ${modelDetail.name}`)
  console.log(`显示名称: ${modelDetail.displayName}`)
  console.log(`描述: ${modelDetail.description}`)
  console.log(`系列: ${modelDetail.series || 'N/A'}`)
  console.log(`提供商: ${modelDetail.provider}`)
  console.log(`类型: ${Array.isArray(modelDetail.type) ? modelDetail.type.join(', ') : modelDetail.type}`)
  console.log(`媒体类型: ${modelDetail.mediaType}`)
  console.log(`优先级: ${modelDetail.priority}`)
}

/**
 * 演示场景11: 按系列查询模型
 */
function demoQueryModelsBySeries() {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║  场景11: 按系列查询模型                                      ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const allModels = QueryService.getAllModels()
  const seriesStats = {}

  allModels.forEach(model => {
    const series = model.series || 'unknown'
    if (!seriesStats[series]) {
      seriesStats[series] = []
    }
    seriesStats[series].push(model.name)
  })

  console.log('各系列模型统计:\n')
  Object.entries(seriesStats).forEach(([series, models]) => {
    const meta = SeriesMeta[series]
    console.log(`【${meta ? meta.displayName : series}】 - ${models.length} 个模型`)
    models.forEach(model => console.log(`  - ${model}`))
    console.log()
  })
}

/**
 * 演示场景12: 获取所有支持的类型
 */
function demoGetSupportedTypes() {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║  场景12: 获取所有支持的类型                                  ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const types = QueryService.getSupportedTypes()
  const mediaTypes = QueryService.getSupportedMediaTypes()

  console.log(`支持的 API 类型 (${types.length} 个):`)
  console.log(`  ${types.join(', ')}\n`)

  console.log(`支持的媒体类型 (${mediaTypes.length} 个):`)
  console.log(`  ${mediaTypes.join(', ')}`)
}

/**
 * 主测试函数
 */
async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║     LTX 服务商 Text to Video API 列表查询测试               ║')
  console.log('║     模拟外部项目引用框架进行查询操作                         ║')
  console.log('╚════════════════════════════════════════════════════════════╝')

  setLanguage('zh-CN')

  demoQueryAPIsByProviderAndType()
  demoGetProviderAPIStats()
  demoGetAPIDetail()
  demoQueryAPIsByModel()
  demoGetBestAPI()
  demoCheckAPIExists()
  demoGetSystemStats()
  demoFindByInputOutput()
  demoCompareProviders()
  demoGetModelDetail()
  demoQueryModelsBySeries()
  demoGetSupportedTypes()

  console.log('\n✅ 所有测试完成\n')
}

module.exports = {
  main,
  demoQueryAPIsByProviderAndType,
  demoGetProviderAPIStats,
  demoGetAPIDetail,
  demoQueryAPIsByModel,
  demoGetBestAPI,
  demoCheckAPIExists,
  demoGetSystemStats,
  demoFindByInputOutput,
  demoCompareProviders,
  demoGetModelDetail,
  demoQueryModelsBySeries,
  demoGetSupportedTypes
}

if (require.main === module) {
  main().catch(console.error)
}
