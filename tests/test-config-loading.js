/**
 * 测试配置加载
 */

const path = require('path')
const ConfigLoader = require('../src/config/config-loader')
const { getConfigManager } = require('../src/config')

async function testConfigLoading() {
  console.log('=== 测试配置加载 ===\n')

  const configLoader = new ConfigLoader({
    projectPath: path.join(__dirname, '..')
  })

  console.log('1. 测试配置文件加载:')
  const configs = await configLoader.loadAll()
  console.log('   - 加载的配置源数量:', configs.length)
  configs.forEach(({ source, config }) => {
    console.log(`   - ${source}:`, config ? '已加载' : '未加载')
  })

  console.log('\n2. 测试预设配置:')
  const presetConfig = configLoader.loadPresets()
  if (presetConfig && presetConfig.providers && presetConfig.providers.mureka) {
    console.log('   ✅ Mureka预设配置已加载')
    console.log('   - Mureka配置:', JSON.stringify(presetConfig.providers.mureka, null, 2))
  } else {
    console.log('   ❌ Mureka预设配置未加载')
  }

  console.log('\n3. 测试项目配置:')
  const projectConfig = configLoader.loadProjectConfig()
  if (projectConfig && projectConfig.providers && projectConfig.providers.mureka) {
    console.log('   ✅ Mureka项目配置已加载')
    console.log('   - Mureka配置:', JSON.stringify(projectConfig.providers.mureka, null, 2))
  } else {
    console.log('   ❌ Mureka项目配置未加载')
  }

  console.log('\n4. 测试ConfigManager:')
  const configManager = getConfigManager()
  const murekaConfig = configManager.getProviderConfig('mureka')
  if (murekaConfig && Object.keys(murekaConfig).length > 0) {
    console.log('   ✅ ConfigManager返回Mureka配置')
    console.log('   - 配置内容:', JSON.stringify(murekaConfig, null, 2))
  } else {
    console.log('   ❌ ConfigManager未返回Mureka配置')
  }

  console.log('\n5. 测试环境变量配置:')
  process.env.AI_SERVICE_MUREKA_API_KEY = 'test-api-key-from-env'
  process.env.AI_SERVICE_MUREKA_BASE_URL = 'https://test.mureka.ai/v1'
  process.env.AI_SERVICE_MUREKA_TIMEOUT = '60000'

  const envConfig = configLoader.loadEnvConfig()
  if (envConfig && envConfig.mureka) {
    console.log('   ✅ 环境变量配置已加载')
    console.log('   - Mureka环境变量配置:', JSON.stringify(envConfig.mureka, null, 2))
  } else {
    console.log('   ❌ 环境变量配置未加载')
  }

  console.log('\n=== 测试完成 ===')
}

testConfigLoading().catch(error => {
  console.error('测试失败:', error)
  process.exit(1)
})
