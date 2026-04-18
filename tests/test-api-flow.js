/**
 * 测试完整的 API 调用流程
 */

const path = require('path')

// 设置模块路径
process.env.NODE_PATH = path.join(__dirname, '../src')
require('module').Module._initPaths()

console.log('=== 测试完整的 API 调用流程 ===\n')

// 1. 加载 unifiedRegistry
const unifiedRegistry = require('../src/registry/unified-registry')

// 2. 加载 metadata
const viduMetadata = require('../src/metadata/params/vidu/image/reference-to-image')

// 3. 注册 API
const apiMetadata = {
  name: 'vidu-ent-v2-reference2image',
  endpoint: '/vidu/reference-to-image',
  method: 'POST',
  provider: 'vidu',
  paramSchema: viduMetadata,
  models: ['viduq2', 'viduq1']
}

unifiedRegistry.apiRegistry.register(apiMetadata)

console.log('测试 1: 获取参数配置 (model = viduq1)')
console.log('-----------------------------------')
const context1 = { model: 'viduq1' }
const paramConfig1 = unifiedRegistry.getParamConfig(
  'vidu-ent-v2-reference2image',
  context1,
  { provider: 'vidu', language: 'en' }
)

if (paramConfig1) {
  console.log('API 名称:', paramConfig1.apiName)
  console.log('模型名称:', paramConfig1.modelName)
  
  const modelParam1 = paramConfig1.parameters.find(p => p.name === 'model')
  console.log('\nmodel 参数:')
  console.log('  - affects:', modelParam1?.affects || 'undefined')
  console.log('  - 预期: ["aspect_ratio", "resolution"]')
  
  const aspectRatioParam1 = paramConfig1.parameters.find(p => p.name === 'aspect_ratio')
  console.log('\naspect_ratio 参数:')
  console.log('  - options:', aspectRatioParam1?.options?.map(o => o.value) || 'undefined')
  console.log('  - 预期: ["16:9", "9:16", "1:1", "3:4", "4:3", "auto"]')
  
  const resolutionParam1 = paramConfig1.parameters.find(p => p.name === 'resolution')
  console.log('\nresolution 参数:')
  console.log('  - options:', resolutionParam1?.options?.map(o => o.value) || 'undefined')
  console.log('  - 预期: ["1080p"]')
} else {
  console.log('错误: 无法获取参数配置')
}

console.log('\n测试 2: 获取参数配置 (model = viduq2)')
console.log('-----------------------------------')
const context2 = { model: 'viduq2' }
const paramConfig2 = unifiedRegistry.getParamConfig(
  'vidu-ent-v2-reference2image',
  context2,
  { provider: 'vidu', language: 'en' }
)

if (paramConfig2) {
  const modelParam2 = paramConfig2.parameters.find(p => p.name === 'model')
  console.log('model 参数:')
  console.log('  - affects:', modelParam2?.affects || 'undefined')
  console.log('  - 预期: ["aspect_ratio", "resolution"]')
  
  const aspectRatioParam2 = paramConfig2.parameters.find(p => p.name === 'aspect_ratio')
  console.log('\naspect_ratio 参数:')
  console.log('  - options:', aspectRatioParam2?.options?.map(o => o.value) || 'undefined')
  console.log('  - 预期: ["16:9", "9:16", "1:1", "3:4", "4:3", "21:9", "2:3", "3:2", "auto"]')
  
  const resolutionParam2 = paramConfig2.parameters.find(p => p.name === 'resolution')
  console.log('\nresolution 参数:')
  console.log('  - options:', resolutionParam2?.options?.map(o => o.value) || 'undefined')
  console.log('  - 预期: ["1080p", "2K", "4K"]')
} else {
  console.log('错误: 无法获取参数配置')
}

console.log('\n=== 测试完成 ===')
