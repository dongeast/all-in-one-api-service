/**
 * 测试MurekaService配置加载
 */

const MurekaService = require('../src/services/mureka-service')
const { getConfigManager } = require('../src/config')

async function testMurekaServiceConfig() {
  console.log('=== 测试MurekaService配置加载 ===\n')

  console.log('1. 测试不带skipConfigLoad（应该自动加载配置）:')
  const service1 = new MurekaService({})
  console.log('   - 初始化前apiKey:', service1.config.apiKey)

  try {
    await service1.initialize()
    console.log('   - 初始化后apiKey:', service1.config.apiKey)
    console.log('   - 初始化后baseURL:', service1.config.baseURL)
    console.log('   ✅ 配置加载成功')
  } catch (error) {
    console.log('   ❌ 初始化失败:', error.message)
  }

  console.log('\n2. 测试带skipConfigLoad:')
  const service2 = new MurekaService({
    apiKey: 'test-api-key',
    skipConfigLoad: true
  })
  console.log('   - apiKey:', service2.config.apiKey)
  console.log('   - baseURL:', service2.config.baseURL)

  console.log('\n3. 测试配置加载流程:')
  const configManager = getConfigManager()
  await configManager.load()
  console.log('   - ConfigManager已加载')

  const murekaConfig = configManager.getProviderConfig('mureka')
  console.log('   - Mureka配置:', JSON.stringify(murekaConfig, null, 2))

  console.log('\n=== 测试完成 ===')
}

testMurekaServiceConfig().catch(error => {
  console.error('测试失败:', error)
  process.exit(1)
})
