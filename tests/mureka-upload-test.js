/**
 * Mureka Upload API 测试
 */

const MurekaService = require('../src/services/mureka-service')
const { Upload } = require('../src/apis/mureka')

async function testUploadAPI() {
  console.log('=== 测试 Mureka Upload API ===\n')

  const service = new MurekaService({
    apiKey: 'test-api-key',
    skipConfigLoad: true
  })

  const upload = new Upload(service)

  console.log('1. 测试 Create Upload API:')
  console.log('   - 输入参数:', upload.create.getInputInfo())
  console.log('   - 输出参数:', upload.create.getOutputInfo())

  console.log('\n2. 测试 Add Upload Part API:')
  console.log('   - 输入参数:', upload.addPart.getInputInfo())
  console.log('   - 输出参数:', upload.addPart.getOutputInfo())

  console.log('\n3. 测试 Complete Upload API:')
  console.log('   - 输入参数:', upload.complete.getInputInfo())
  console.log('   - 输出参数:', upload.complete.getOutputInfo())

  console.log('\n4. 测试完整上传流程方法:')
  console.log('   - uploadFile(): 单文件上传')
  console.log('   - uploadLargeFile(): 大文件分块上传')

  console.log('\n=== 测试完成 ===')
}

testUploadAPI().catch(console.error)
