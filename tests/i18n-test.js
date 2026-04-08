/**
 * 多语言功能测试
 */

require('../src/locales')

const { setLanguage, getLanguage, t, i18n } = require('../src/utils/i18n')
const { Languages, DEFAULT_LANGUAGE } = require('../src/constants')
const { validateString, validateNumber, validateParams } = require('../src/params/validators')
const { getErrorMessage, getError } = require('../src/utils/error-codes')

console.log('=== 多语言功能测试 ===\n')

console.log('1. 测试语言常量')
console.log('支持的语言:', Languages)
console.log('默认语言:', DEFAULT_LANGUAGE)
console.log('已加载的语言:', i18n.getSupportedLanguages())
console.log('')

console.log('2. 测试语言设置和获取')
console.log('当前语言:', getLanguage())
setLanguage('zh')
console.log('设置中文后:', getLanguage())
setLanguage('en')
console.log('设置英文后:', getLanguage())
console.log('')

console.log('3. 测试翻译功能')
console.log('英文 - 验证错误:', t('validation.expectedString', { language: 'en', type: 'number' }))
console.log('中文 - 验证错误:', t('validation.expectedString', { language: 'zh', type: 'number' }))
console.log('英文 - API错误:', t('api.serviceNotInitialized', { language: 'en' }))
console.log('中文 - API错误:', t('api.serviceNotInitialized', { language: 'zh' }))
console.log('')

console.log('4. 测试验证器多语言')
const schema = {
  type: 'string',
  minLength: 5,
  maxLength: 10
}

console.log('验证字符串类型错误(英文):')
let result = validateString(123, schema, 'en')
console.log('  错误:', result.errors)

console.log('验证字符串类型错误(中文):')
result = validateString(123, schema, 'zh')
console.log('  错误:', result.errors)

console.log('验证字符串长度错误(英文):')
result = validateString('abc', schema, 'en')
console.log('  错误:', result.errors)

console.log('验证字符串长度错误(中文):')
result = validateString('abc', schema, 'zh')
console.log('  错误:', result.errors)
console.log('')

console.log('5. 测试数字验证器多语言')
const numberSchema = {
  type: 'number',
  min: 0,
  max: 100,
  integer: true
}

console.log('验证数字类型错误(英文):')
result = validateNumber('abc', numberSchema, 'en')
console.log('  错误:', result.errors)

console.log('验证数字类型错误(中文):')
result = validateNumber('abc', numberSchema, 'zh')
console.log('  错误:', result.errors)

console.log('验证数字范围错误(英文):')
result = validateNumber(150, numberSchema, 'en')
console.log('  错误:', result.errors)

console.log('验证数字范围错误(中文):')
result = validateNumber(150, numberSchema, 'zh')
console.log('  错误:', result.errors)
console.log('')

console.log('6. 测试参数验证多语言')
const paramSchema = {
  input: {
    name: {
      type: 'string',
      required: true,
      minLength: 3
    },
    age: {
      type: 'number',
      required: false,
      min: 0,
      max: 150
    }
  }
}

console.log('验证必填参数缺失(英文):')
result = validateParams({}, paramSchema, { language: 'en' })
console.log('  错误:', result.errors)

console.log('验证必填参数缺失(中文):')
result = validateParams({}, paramSchema, { language: 'zh' })
console.log('  错误:', result.errors)
console.log('')

console.log('7. 测试错误码多语言')
console.log('错误码 E001(英文):', getErrorMessage('E001', 'en'))
console.log('错误码 E001(中文):', getErrorMessage('E001', 'zh'))
console.log('错误对象 E003(英文):', getError('E003', 'en'))
console.log('错误对象 E003(中文):', getError('E003', 'zh'))
console.log('')

console.log('8. 测试默认语言行为')
console.log('不传语言参数时使用默认语言(英文):')
result = validateString(123, schema)
console.log('  错误:', result.errors)
console.log('')

console.log('9. 测试语言切换')
setLanguage('zh')
console.log('全局设置中文后验证:')
result = validateString(123, schema)
console.log('  错误:', result.errors)

setLanguage('en')
console.log('全局设置英文后验证:')
result = validateString(123, schema)
console.log('  错误:', result.errors)
console.log('')

console.log('10. 测试参数描述翻译')
console.log('参数描述(英文):', t('common.prompt', { language: 'en' }))
console.log('参数描述(中文):', t('common.prompt', { language: 'zh' }))
console.log('Mureka参数(英文):', t('mureka.lyrics', { language: 'en' }))
console.log('Mureka参数(中文):', t('mureka.lyrics', { language: 'zh' }))
console.log('')

console.log('=== 测试完成 ===')
