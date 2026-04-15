// 测试翻译功能
console.log('=== Testing Translation Functionality ===\n')

// 设置工作目录到 all-in-one-api-service
const path = require('path')
const fs = require('fs')

// 1. 测试 i18n 初始化
console.log('1. Testing i18n initialization...')
const { i18n } = require('./src/utils/i18n')
console.log('   i18n instance created')
console.log('   i18n.translations keys:', Array.from(i18n.translations.keys()))

// 2. 测试翻译资源加载
console.log('\n2. Testing translation resources...')
const { initializeTranslations, loadLanguageResources } = require('./src/locales')

// 3. 测试 getParamLabel
console.log('\n3. Testing getParamLabel...')
const { getParamLabel } = require('./src/utils/param-i18n')

const testCases = [
  { provider: 'skywork', param: 'prompt', lang: 'zh', expected: '提示词' },
  { provider: 'skywork', param: 'prompt', lang: 'en', expected: 'Prompt' },
  { provider: 'skyreels', param: 'duration', lang: 'zh', expected: '时长' },
  { provider: 'skyreels', param: 'duration', lang: 'en', expected: 'Duration' },
]

testCases.forEach(tc => {
  const result = getParamLabel(tc.provider, tc.param, tc.lang)
  const status = result === tc.expected ? '✓' : '✗'
  console.log(`   ${status} ${tc.provider}.${tc.param} (${tc.lang}): "${result}" ${result === tc.expected ? '' : `(expected: ${tc.expected})`}`)
})

// 4. 测试 addTranslationsToParams
console.log('\n4. Testing addTranslationsToParams...')
const { addTranslationsToParams } = require('./src/utils/param-i18n')

const testParams = [
  { name: 'prompt', type: 'string', required: true },
  { name: 'duration', type: 'number', required: false },
  { name: 'aspect_ratio', type: 'enum', required: false }
]

const translatedParams = addTranslationsToParams(testParams, 'skywork', 'zh')
translatedParams.forEach(p => {
  console.log(`   ${p.name}: label="${p.label}", placeholder="${p.placeholder || ''}"`)
})

// 5. 测试 apiRegistry.getAPIParams
console.log('\n5. Testing apiRegistry.getAPIParams...')
const apiRegistry = require('./src/registry/api-registry')

const apiParams = apiRegistry.getAPIParams(
  'text-to-video-generation-task-submission',
  {},
  { provider: 'skywork', language: 'zh' }
)

if (apiParams && apiParams.parameters) {
  console.log(`   Found ${apiParams.parameters.length} parameters`)
  apiParams.parameters.slice(0, 3).forEach(p => {
    console.log(`   - ${p.name}: label="${p.label}", placeholder="${p.placeholder || ''}"`)
  })
} else {
  console.log('   ERROR: apiParams is null or has no parameters')
}

console.log('\n=== Test Complete ===')
