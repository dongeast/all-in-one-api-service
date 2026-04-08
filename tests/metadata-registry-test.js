/**
 * 元数据翻译功能测试
 */

require('../src/locales')

const metadata = require('../src/metadata')

console.log('=== 元数据翻译功能测试 ===\n')

console.log('1. 测试获取翻译后的API元数据')
console.log('LTX API元数据(英文):')
const ltxAPIsEn = metadata.getAPIsMetadata('ltx', 'en')
Object.entries(ltxAPIsEn).slice(0, 2).forEach(([name, api]) => {
  console.log(`  ${name}: ${api.displayName} - ${api.description}`)
})
console.log('')

console.log('LTX API元数据(中文):')
const ltxAPIsZh = metadata.getAPIsMetadata('ltx', 'zh')
Object.entries(ltxAPIsZh).slice(0, 2).forEach(([name, api]) => {
  console.log(`  ${name}: ${api.displayName} - ${api.description}`)
})
console.log('')

console.log('2. 测试获取单个API元数据')
console.log('SkyReels text-to-video-generation-task-submission (英文):')
const apiEn = metadata.getAPIMetadata('skyreels', 'text-to-video-generation-task-submission', 'en')
console.log('  displayName:', apiEn.displayName)
console.log('  description:', apiEn.description)
console.log('')

console.log('SkyReels text-to-video-generation-task-submission (中文):')
const apiZh = metadata.getAPIMetadata('skyreels', 'text-to-video-generation-task-submission', 'zh')
console.log('  displayName:', apiZh.displayName)
console.log('  description:', apiZh.description)
console.log('')

console.log('3. 测试获取翻译后的模型元数据')
console.log('Mureka模型元数据(英文):')
const murekaModelsEn = metadata.getModelsMetadata('mureka', 'en')
Object.entries(murekaModelsEn).slice(0, 3).forEach(([name, model]) => {
  console.log(`  ${name}: ${model.displayName}`)
})
console.log('')

console.log('Mureka模型元数据(中文):')
const murekaModelsZh = metadata.getModelsMetadata('mureka', 'zh')
Object.entries(murekaModelsZh).slice(0, 3).forEach(([name, model]) => {
  console.log(`  ${name}: ${model.displayName}`)
})
console.log('')

console.log('4. 测试获取单个模型元数据')
console.log('Volcengine doubao-seedance-2-0 (英文):')
const modelEn = metadata.getModelMetadata('volcengine', 'doubao-seedance-2-0', 'en')
if (modelEn) {
  console.log('  displayName:', modelEn.displayName)
  console.log('  description:', modelEn.description)
} else {
  console.log('  模型不存在')
}
console.log('')

console.log('Volcengine doubao-seedance-2-0 (中文):')
const modelZh = metadata.getModelMetadata('volcengine', 'doubao-seedance-2-0', 'zh')
if (modelZh) {
  console.log('  displayName:', modelZh.displayName)
  console.log('  description:', modelZh.description)
} else {
  console.log('  模型不存在')
}
console.log('')

console.log('5. 测试不传语言参数(返回原始数据)')
console.log('LTX API元数据(原始):')
const ltxAPIsOriginal = metadata.getAPIsMetadata('ltx')
const firstAPI = Object.entries(ltxAPIsOriginal)[0]
console.log(`  ${firstAPI[0]}: ${firstAPI[1].displayName}`)
console.log('')

console.log('6. 测试获取所有API元数据')
console.log('所有API元数据(中文) - 提供商数量:', Object.keys(metadata.getAllAPIsMetadata('zh')).length)
console.log('')

console.log('7. 测试不同提供商的API')
const providers = ['ltx', 'mureka', 'skyreels', 'volcengine']
console.log('各提供商第一个API(中文):')
providers.forEach(provider => {
  const apis = metadata.getAPIsMetadata(provider, 'zh')
  const firstAPIName = Object.keys(apis)[0]
  if (firstAPIName) {
    console.log(`  ${provider}: ${apis[firstAPIName].displayName}`)
  }
})
console.log('')

console.log('8. 测试Volcengine模型(使用原始元数据)')
console.log('Volcengine模型元数据(英文):')
const volcengineModelsEn = metadata.getModelsMetadata('volcengine', 'en')
Object.entries(volcengineModelsEn).slice(0, 3).forEach(([name, model]) => {
  console.log(`  ${name}: ${model.displayName}`)
})
console.log('')

console.log('Volcengine模型元数据(中文):')
const volcengineModelsZh = metadata.getModelsMetadata('volcengine', 'zh')
Object.entries(volcengineModelsZh).slice(0, 3).forEach(([name, model]) => {
  console.log(`  ${name}: ${model.displayName}`)
})
console.log('')

console.log('=== 测试完成 ===')
