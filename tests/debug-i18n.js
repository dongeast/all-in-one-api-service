/**
 * 调试翻译资源加载
 */

const { i18n } = require('../src/utils/i18n')
const { Languages } = require('../src/constants')

console.log('=== 调试翻译资源加载 ===\n')

console.log('1. 检查翻译资源是否加载')
console.log('支持的语言:', i18n.getSupportedLanguages())
console.log('')

console.log('2. 检查英文翻译资源')
const enTranslations = i18n.translations.get('en')
console.log('英文翻译资源键:', enTranslations ? Object.keys(enTranslations) : 'undefined')
if (enTranslations) {
  console.log('validation 对象:', enTranslations.validation)
  console.log('api 对象:', enTranslations.api)
}
console.log('')

console.log('3. 检查中文翻译资源')
const zhTranslations = i18n.translations.get('zh')
console.log('中文翻译资源键:', zhTranslations ? Object.keys(zhTranslations) : 'undefined')
if (zhTranslations) {
  console.log('validation 对象:', zhTranslations.validation)
  console.log('api 对象:', zhTranslations.api)
}
console.log('')

console.log('4. 测试嵌套值获取')
console.log('英文 validation.expectedString:', i18n.getNestedValue('validation.expectedString', 'en'))
console.log('中文 validation.expectedString:', i18n.getNestedValue('validation.expectedString', 'zh'))
console.log('英文 api.serviceNotInitialized:', i18n.getNestedValue('api.serviceNotInitialized', 'en'))
console.log('中文 api.serviceNotInitialized:', i18n.getNestedValue('api.serviceNotInitialized', 'zh'))
console.log('')

console.log('5. 测试翻译功能')
console.log('翻译 validation.expectedString (英文):', i18n.t('validation.expectedString', 'en', { type: 'number' }))
console.log('翻译 validation.expectedString (中文):', i18n.t('validation.expectedString', 'zh', { type: 'number' }))
console.log('')
