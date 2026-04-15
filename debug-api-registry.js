// 调试 apiRegistry.getAPIParams 问题
console.log('=== Debugging apiRegistry.getAPIParams ===\n')

// 1. 初始化 registry（加载所有 API 元数据）
console.log('1. Initializing registry via index...')
const { apiRegistry } = require('./src/registry/index')
console.log('   apiRegistry initialized')

// 2. 检查 API 是否存在
console.log('\n2. Checking if API exists...')
const apiName = 'text-to-video-generation-task-submission'
const api = apiRegistry.get(apiName)
console.log(`   apiRegistry.get('${apiName}'):`, api ? 'found' : 'null')
if (api) {
  console.log('   API keys:', Object.keys(api))
  console.log('   API provider:', api.provider)
  console.log('   API models:', api.models)
}

// 3. 测试 getAPIParams
console.log('\n3. Testing getAPIParams...')
if (api) {
  const result = apiRegistry.getAPIParams(apiName, {}, { provider: api.provider, language: 'zh' })
  if (result && result.parameters) {
    console.log(`   Found ${result.parameters.length} parameters`)
    result.parameters.slice(0, 3).forEach(p => {
      console.log(`   - ${p.name}: label="${p.label}", placeholder="${p.placeholder || ''}"`)
    })
  } else {
    console.log('   ERROR: result is null or has no parameters')
  }
} else {
  console.log('   SKIP: API not found, cannot test getAPIParams')
}

console.log('\n=== Debug Complete ===')
