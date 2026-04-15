// 调试翻译问题
console.log('=== Debugging Translation Issue ===\n')

const { apiRegistry } = require('./src/registry/index')
const { addTranslationsToParams, getParamLabel } = require('./src/utils/param-i18n')

const apiName = 'text-to-video-generation-task-submission'
const api = apiRegistry.get(apiName)

console.log('1. Testing getParamLabel directly:')
console.log('   skywork, prompt, zh:', getParamLabel('skywork', 'prompt', 'zh'))
console.log('   skyreels, prompt, zh:', getParamLabel('skyreels', 'prompt', 'zh'))

console.log('\n2. Testing addTranslationsToParams directly:')
const testParams = [
  { name: 'prompt', type: 'string', required: true },
  { name: 'duration', type: 'number', required: false }
]

console.log('   Before translation:', testParams)
const translated = addTranslationsToParams(testParams, 'skywork', 'zh')
console.log('   After translation:', translated)

console.log('\n3. Testing via APIDefinition:')
const { i18n } = require('./src/utils/i18n')
console.log('   i18n translations keys:', Array.from(i18n.translations.keys()))

const testKey = 'skyreels.prompt.label'
console.log(`   i18n.t('${testKey}', 'zh'):`, i18n.t(testKey, 'zh'))

console.log('\n=== Debug Complete ===')
