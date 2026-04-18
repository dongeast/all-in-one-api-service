/**
 * 批量测试运行脚本
 * 逐个运行所有测试模块并汇总结果
 */

const { execSync } = require('child_process')

const testModules = [
  { name: 'I18nManager', pattern: 'i18n-manager' },
  { name: 'CreditRegistry', pattern: 'credit-registry' },
  { name: 'UnifiedRegistry', pattern: 'unified-registry' },
  { name: 'APIRegistry', pattern: 'api-registry' },
  { name: 'ModelRegistry', pattern: 'model-registry' },
  { name: 'FunctionRegistry', pattern: 'function-registry' },
  { name: 'MetadataQuery', pattern: 'metadata-query' },
  { name: 'ServiceRegistry', pattern: 'service-registry' },
  { name: 'Integration', pattern: 'integration' }
]

const results = []

console.log('========================================')
console.log('开始批量测试运行')
console.log('========================================\n')

testModules.forEach((module, index) => {
  console.log(`[${index + 1}/${testModules.length}] 运行 ${module.name} 测试...`)
  console.log('----------------------------------------')
  
  try {
    const output = execSync(`npx jest --testPathPattern=${module.pattern} --forceExit --silent`, {
      encoding: 'utf-8',
      cwd: process.cwd()
    })
    
    // 解析输出获取测试结果
    const match = output.match(/Tests:\s+(\d+)\s+passed,\s+(\d+)\s+total/)
    if (match) {
      const passed = parseInt(match[1])
      const total = parseInt(match[2])
      results.push({
        module: module.name,
        passed,
        failed: total - passed,
        total,
        status: 'passed'
      })
      console.log(`✓ ${module.name}: ${passed}/${total} 通过`)
    } else {
      results.push({
        module: module.name,
        passed: 0,
        failed: 0,
        total: 0,
        status: 'error'
      })
      console.log(`✗ ${module.name}: 无法解析结果`)
    }
  } catch (error) {
    results.push({
      module: module.name,
      passed: 0,
      failed: 0,
      total: 0,
      status: 'failed'
    })
    console.log(`✗ ${module.name}: 测试失败`)
  }
  
  console.log('')
})

console.log('========================================')
console.log('测试结果汇总')
console.log('========================================\n')

let totalPassed = 0
let totalFailed = 0
let totalTests = 0

results.forEach(result => {
  const status = result.status === 'passed' ? '✓' : '✗'
  console.log(`${status} ${result.module.padEnd(20)} ${result.passed}/${result.total} 通过`)
  totalPassed += result.passed
  totalFailed += result.failed
  totalTests += result.total
})

console.log('----------------------------------------')
console.log(`总计: ${totalPassed}/${totalTests} 通过, ${totalFailed} 失败`)
console.log('========================================\n')

// 返回退出码
process.exit(totalFailed > 0 ? 1 : 0)
