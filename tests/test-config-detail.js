/**
 * 测试配置加载详细过程
 */

const path = require('path')
const ConfigLoader = require('../src/config/config-loader')
const ConfigMerger = require('../src/config/config-merger')

async function testConfigLoadingDetail() {
  console.log('=== 测试配置加载详细过程 ===\n')

  const configLoader = new ConfigLoader({
    projectPath: path.join(__dirname, '..')
  })

  console.log('1. 加载所有配置源:')
  const configs = await configLoader.loadAll()
  
  configs.forEach(({ source, config }) => {
    console.log(`\n   ${source}:`)
    if (config && config.providers && config.providers.mureka) {
      console.log('   - Mureka配置:', JSON.stringify(config.providers.mureka, null, 2))
    } else {
      console.log('   - 无Mureka配置')
    }
  })

  console.log('\n2. 合并配置:')
  const mergedConfig = ConfigMerger.mergeByPriority(configs)
  console.log('   - 合并后的配置:', JSON.stringify(mergedConfig, null, 2))

  console.log('\n3. 提取Mureka配置:')
  const murekaConfig = ConfigMerger.extractProviderConfig(mergedConfig, 'mureka')
  console.log('   - Mureka配置:', JSON.stringify(murekaConfig, null, 2))

  console.log('\n=== 测试完成 ===')
}

testConfigLoadingDetail().catch(error => {
  console.error('测试失败:', error)
  process.exit(1)
})
