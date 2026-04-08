/**
 * 元数据多语言功能测试
 */

require('../src/locales')

const { 
  getTranslatedAPIMetadata, 
  getTranslatedModelMetadata,
  addTranslationsToAPIMetadata,
  addTranslationsToAPIs
} = require('../src/utils/metadata-i18n')
const { setLanguage } = require('../src/utils/i18n')
const { Providers } = require('../src/constants')

console.log('=== 元数据多语言功能测试 ===\n')

console.log('1. 测试API元数据翻译')
console.log('LTX - generate-video-from-text (英文):')
let metadata = getTranslatedAPIMetadata('ltx', 'generate-video-from-text', 'en')
console.log('  displayName:', metadata.displayName)
console.log('  description:', metadata.description)

console.log('LTX - generate-video-from-text (中文):')
metadata = getTranslatedAPIMetadata('ltx', 'generate-video-from-text', 'zh')
console.log('  displayName:', metadata.displayName)
console.log('  description:', metadata.description)
console.log('')

console.log('2. 测试模型元数据翻译')
console.log('Mureka - mureka-8 (英文):')
let modelMetadata = getTranslatedModelMetadata('mureka', 'mureka-8', 'en')
console.log('  displayName:', modelMetadata.displayName)
console.log('  description:', modelMetadata.description)

console.log('Mureka - mureka-8 (中文):')
modelMetadata = getTranslatedModelMetadata('mureka', 'mureka-8', 'zh')
console.log('  displayName:', modelMetadata.displayName)
console.log('  description:', modelMetadata.description)
console.log('')

console.log('3. 测试为API元数据添加翻译')
const originalMetadata = {
  name: 'generate-song',
  displayName: '生成歌曲',
  description: '根据歌词和风格生成歌曲',
  type: 'song_generation',
  provider: Providers.MUREKA
}

console.log('原始元数据:', originalMetadata)
console.log('添加翻译后(英文):', addTranslationsToAPIMetadata(originalMetadata, 'mureka', 'en'))
console.log('添加翻译后(中文):', addTranslationsToAPIMetadata(originalMetadata, 'mureka', 'zh'))
console.log('')

console.log('4. 测试批量添加翻译')
const apisMetadata = {
  'generate-video-from-text': {
    name: 'generate-video-from-text',
    displayName: '文本生成视频',
    description: '根据文本提示生成视频',
    type: 'text_to_video',
    provider: Providers.LTX
  },
  'generate-video-from-image': {
    name: 'generate-video-from-image',
    displayName: '图片生成视频',
    description: '根据图片生成视频',
    type: 'image_to_video',
    provider: Providers.LTX
  }
}

console.log('批量添加翻译(英文):')
const translatedAPIs = addTranslationsToAPIs(apisMetadata, 'ltx', 'en')
Object.entries(translatedAPIs).forEach(([name, meta]) => {
  console.log(`  ${name}: ${meta.displayName} - ${meta.description}`)
})
console.log('')

console.log('批量添加翻译(中文):')
const translatedAPIsZh = addTranslationsToAPIs(apisMetadata, 'ltx', 'zh')
Object.entries(translatedAPIsZh).forEach(([name, meta]) => {
  console.log(`  ${name}: ${meta.displayName} - ${meta.description}`)
})
console.log('')

console.log('5. 测试全局语言设置')
setLanguage('zh')
console.log('设置全局语言为中文后:')
metadata = getTranslatedAPIMetadata('skyreels', 'text-to-video-generation-task-submission')
console.log('  displayName:', metadata.displayName)
console.log('  description:', metadata.description)

setLanguage('en')
console.log('设置全局语言为英文后:')
metadata = getTranslatedAPIMetadata('skyreels', 'text-to-video-generation-task-submission')
console.log('  displayName:', metadata.displayName)
console.log('  description:', metadata.description)
console.log('')

console.log('6. 测试不同提供商的API')
const providers = [
  { name: 'ltx', api: 'extend-video-duration' },
  { name: 'mureka', api: 'vocal-cloning' },
  { name: 'skyreels', api: 'lip-sync-task-submit' },
  { name: 'volcengine', api: 'generate-image' }
]

console.log('各提供商API翻译(中文):')
providers.forEach(({ name, api }) => {
  const meta = getTranslatedAPIMetadata(name, api, 'zh')
  console.log(`  ${name}/${api}: ${meta.displayName}`)
})
console.log('')

console.log('=== 测试完成 ===')
