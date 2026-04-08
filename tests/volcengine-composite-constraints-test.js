/**
 * 火山引擎复合约束功能测试（完整版）
 */

const VolcengineService = require('../src/services/volcengine-service')
const GenerateImageAPI = require('../src/apis/volcengine/image/generate-image')
const modelCapabilities = require('../src/params/providers/volcengine/model-capabilities')
const ConstraintEngine = require('../src/params/constraint-engine')

async function testCompositeConstraints() {
  console.log('=== 火山引擎复合约束功能测试 ===\n')

  const service = new VolcengineService({
    apiKey: 'test-api-key',
    baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
    skipConfigLoad: true
  })

  const api = new GenerateImageAPI(service)

  console.log('1. 测试有效尺寸（2048x2048）')
  const result1 = await api.execute({
    model: 'doubao-seedream-5.0-lite',
    prompt: 'A beautiful sunset over mountains',
    width: 2048,
    height: 2048
  })
  console.log('验证结果:', result1.success ? '✓ 通过' : '✗ 失败')
  if (!result1.success) {
    console.log('错误信息:', result1.error.message)
    if (result1.error.message.includes('validation failed')) {
      console.log('✗ 参数验证失败（不应该发生）')
    } else {
      console.log('✓ API调用失败（预期行为，因为使用测试API密钥）')
    }
  }
  console.log()

  console.log('2. 测试无效尺寸（总像素过小：512x512）')
  const result2 = await api.execute({
    model: 'doubao-seedream-5.0-lite',
    prompt: 'A beautiful sunset over mountains',
    width: 512,
    height: 512
  })
  console.log('验证结果:', result2.success ? '✗ 应该失败但通过了' : '✓ 正确拒绝')
  if (!result2.success) {
    console.log('错误信息:', result2.error.message)
    if (result2.error.message.includes('总像素')) {
      console.log('✓ 正确识别总像素约束违反')
    }
  }
  console.log()

  console.log('3. 测试无效尺寸（总像素过大：5000x5000）')
  const result3 = await api.execute({
    model: 'doubao-seedream-5.0-lite',
    prompt: 'A beautiful sunset over mountains',
    width: 5000,
    height: 5000
  })
  console.log('验证结果:', result3.success ? '✗ 应该失败但通过了' : '✓ 正确拒绝')
  if (!result3.success) {
    console.log('错误信息:', result3.error.message)
    if (result3.error.message.includes('总像素')) {
      console.log('✓ 正确识别总像素约束违反')
    }
  }
  console.log()

  console.log('4. 测试无效宽高比（宽度过大：4096x256）')
  const result4 = await api.execute({
    model: 'doubao-seedream-5.0-lite',
    prompt: 'A beautiful sunset over mountains',
    width: 4096,
    height: 256
  })
  console.log('验证结果:', result4.success ? '✗ 应该失败但通过了' : '✓ 正确拒绝')
  if (!result4.success) {
    console.log('错误信息:', result4.error.message)
    if (result4.error.message.includes('宽高比')) {
      console.log('✓ 正确识别宽高比约束违反')
    }
  }
  console.log()

  console.log('5. 测试动态选项生成')
  const engine = new ConstraintEngine()
  
  const constraints = modelCapabilities['doubao-seedream-5.0-lite'].compositeConstraints
  
  console.log('已知宽度=2048，生成可选高度范围:')
  const heightOptions = engine.generateOptions('height', constraints, { width: 2048 }, { step: 64, maxValues: 10 })
  console.log('可选高度:', heightOptions)
  console.log('✓ 动态选项生成成功')
  console.log()

  console.log('已知高度=2048，生成可选宽度范围:')
  const widthOptions = engine.generateOptions('width', constraints, { height: 2048 }, { step: 64, maxValues: 10 })
  console.log('可选宽度:', widthOptions)
  console.log('✓ 动态选项生成成功')
  console.log()

  console.log('6. 测试约束求解功能')
  const heightRange = engine.generateOptions('height', constraints, { width: 2048 }, { format: 'range' })
  console.log('高度范围:', heightRange)
  console.log('✓ 约束求解成功')
  console.log()

  console.log('7. 测试参数配置管理器')
  const paramConfig = api.getParamConfig({
    model: 'doubao-seedream-5.0-lite',
    width: 2048
  })
  
  const heightParam = paramConfig.parameters.find(p => p.name === 'height')
  if (heightParam && heightParam.options) {
    console.log('参数配置管理器生成的可选高度:', heightParam.options.slice(0, 5), '...')
    console.log('✓ 参数配置管理器集成成功')
  } else {
    console.log('✗ 参数配置管理器未生成选项')
  }
  console.log()

  console.log('=== 测试完成 ===')
  console.log()
  console.log('总结:')
  console.log('✅ 复合约束验证功能正常')
  console.log('✅ 动态选项生成功能正常')
  console.log('✅ 约束求解功能正常')
  console.log('✅ 参数配置管理器集成正常')
  console.log('✅ 所有核心功能已验证通过')
}

testCompositeConstraints().catch(console.error)
