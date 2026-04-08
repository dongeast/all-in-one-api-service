/**
 * 测试互斥参数验证
 */

const MurekaService = require('../src/services/mureka-service')
const MurekaAPI = require('../src/apis/mureka')

console.log('=== 测试互斥参数验证 ===\n')

const service = new MurekaService({
  apiKey: 'test-api-key',
  skipConfigLoad: true
})

const mureka = new MurekaAPI(service)

console.log('1. 检查参数schema:')
const schema = mureka.song.extend.getParamSchema()
console.log('   - mutuallyExclusive:', schema.mutuallyExclusive)

console.log('\n2. 测试参数验证:')
const extendValidation = mureka.song.extend.validateParams({
  song_id: 'song_123',
  upload_audio_id: 'upload_456',
  lyrics: 'test lyrics',
  extend_at: 10000
})
console.log('   - 验证结果:', extendValidation)
