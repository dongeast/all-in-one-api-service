// 完整调试脚本
console.log('=== Full Debug Script ===\n')

// 1. 先加载 locales 以初始化翻译资源
console.log('1. Loading locales to initialize translations...')
require('./src/locales')

const { i18n } = require('./src/utils/i18n')
console.log('   i18n.translations keys:', Array.from(i18n.translations.keys()))

// 2. 测试翻译
console.log('\n2. Testing translation:')
console.log('   skyreels.prompt.label:', i18n.t('skyreels.prompt.label', 'zh'))

// 3. 测试 getParamLabel
console.log('\n3. Testing getParamLabel:')
const { getParamLabel } = require('./src/utils/param-i18n')
console.log('   skywork, prompt, zh:', getParamLabel('skywork', 'prompt', 'zh'))

// 4. 测试完整的 apiRegistry.getAPIParams
console.log('\n4. Testing apiRegistry.getAPIParams:')
const { apiRegistry } = require('./src/registry/index')
const result = apiRegistry.getAPIParams(
  'text-to-video-generation-task-submission',
  {},
  { provider: 'skywork', language: 'zh' }
)

if (result && result.parameters) {
  console.log(`   Found ${result.parameters.length} parameters`)
  result.parameters.slice(0, 3).forEach(p => {
    console.log(`   - ${p.name}: label="${p.label}"`)
  })
} else {
  console.log('   ERROR: result is null or has no parameters')
}

console.log('\n=== Debug Complete ===')
