/**
 * 测试运行器
 * 支持运行所有测试或单个测试
 */

const path = require('path')
const fs = require('fs')

/**
 * 测试案例配置
 */
const TEST_CASES = {
  'basic-usage': {
    name: '基础使用示例',
    file: 'basic-usage.js',
    description: '演示如何使用OpenAI DALL-E 3生成图像',
    requiresApiKey: true,
    category: 'examples'
  },
  'config-management': {
    name: '配置管理示例',
    file: 'config-management.js',
    description: '演示如何管理配置文件和环境变量',
    requiresApiKey: false,
    category: 'examples'
  },
  'custom-param': {
    name: '自定义参数示例',
    file: 'custom-param.js',
    description: '演示如何自定义参数模式',
    requiresApiKey: true,
    category: 'examples'
  },
  'dynamic-form': {
    name: '动态表单示例',
    file: 'dynamic-form.js',
    description: '演示如何根据参数定义生成动态表单',
    requiresApiKey: false,
    category: 'examples'
  },
  'multi-provider': {
    name: '多服务商示例',
    file: 'multi-provider.js',
    description: '演示如何使用多个AI服务商',
    requiresApiKey: true,
    category: 'examples'
  },
  'stream-usage': {
    name: '流式响应示例',
    file: 'stream-usage.js',
    description: '演示如何使用流式响应功能',
    requiresApiKey: true,
    category: 'examples'
  },
  'stream-basic': {
    name: '流式响应基础测试',
    file: 'stream-basic.js',
    description: '测试基础流式响应功能',
    requiresApiKey: true,
    category: 'tests'
  },
  'stream-error': {
    name: '流式响应错误处理测试',
    file: 'stream-error.js',
    description: '测试流式响应错误处理',
    requiresApiKey: false,
    category: 'tests'
  },
  'stream-validation': {
    name: '流式响应参数验证测试',
    file: 'stream-validation.js',
    description: '测试流式响应参数验证',
    requiresApiKey: false,
    category: 'tests'
  },
  'stream-complete': {
    name: '流式响应完整收集测试',
    file: 'stream-complete.js',
    description: '测试收集完整流式响应',
    requiresApiKey: true,
    category: 'tests'
  },
  'stream-handler': {
    name: 'StreamHandler测试',
    file: 'stream-handler.js',
    description: '测试SSE解析功能',
    requiresApiKey: false,
    category: 'tests'
  }
}

/**
 * 显示所有可用的测试案例
 */
function listTests() {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║                    可用的测试案例                          ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const categories = {
    examples: '示例代码',
    tests: '功能测试'
  }

  Object.entries(categories).forEach(([category, categoryName]) => {
    console.log(`\n【${categoryName}】\n`)
    
    Object.entries(TEST_CASES)
      .filter(([_, config]) => config.category === category)
      .forEach(([key, config]) => {
        const apiKeyFlag = config.requiresApiKey ? '🔑' : '  '
        console.log(`  ${apiKeyFlag} ${key.padEnd(20)} - ${config.name}`)
        console.log(`     ${config.description}`)
      })
  })

  console.log('\n📝 说明:')
  console.log('  🔑 需要设置 OPENAI_API_KEY 环境变量')
  console.log('\n💡 使用方法:')
  console.log('  node tests/run-tests.js              # 运行所有测试')
  console.log('  node tests/run-tests.js <测试名>     # 运行指定测试')
  console.log('  node tests/run-tests.js --list       # 列出所有测试')
  console.log('  node tests/run-tests.js --help       # 显示帮助信息')
  console.log('')
}

/**
 * 显示帮助信息
 */
function showHelp() {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║                    测试运行器帮助                          ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  console.log('用法:')
  console.log('  node tests/run-tests.js [选项] [测试名]\n')

  console.log('选项:')
  console.log('  --list, -l      列出所有可用的测试案例')
  console.log('  --help, -h      显示帮助信息')
  console.log('  --all, -a       运行所有测试')
  console.log('  --examples, -e  运行所有示例')
  console.log('  --tests, -t     运行所有功能测试\n')

  console.log('示例:')
  console.log('  node tests/run-tests.js basic-usage        # 运行基础使用示例')
  console.log('  node tests/run-tests.js stream-basic       # 运行流式基础测试')
  console.log('  node tests/run-tests.js --examples         # 运行所有示例')
  console.log('  node tests/run-tests.js --tests            # 运行所有功能测试')
  console.log('  node tests/run-tests.js --all              # 运行所有测试\n')

  console.log('环境变量:')
  console.log('  OPENAI_API_KEY    OpenAI API密钥（部分测试需要）\n')
}

/**
 * 运行单个测试
 */
async function runTest(testKey) {
  const config = TEST_CASES[testKey]
  
  if (!config) {
    console.error(`❌ 错误: 未找到测试 "${testKey}"`)
    console.log('使用 --list 查看所有可用的测试案例')
    process.exit(1)
  }

  console.log(`\n╔════════════════════════════════════════════════════════════╗`)
  console.log(`║  运行测试: ${config.name.padEnd(46)} ║`)
  console.log(`╚════════════════════════════════════════════════════════════╝\n`)
  console.log(`📝 描述: ${config.description}`)
  console.log(`📁 文件: tests/${config.file}`)
  console.log(`🔑 需要API Key: ${config.requiresApiKey ? '是' : '否'}`)

  if (config.requiresApiKey && !process.env.OPENAI_API_KEY) {
    console.log('\n⚠️  警告: 此测试需要 OPENAI_API_KEY 环境变量')
    console.log('请设置环境变量后重试:')
    console.log('  Windows: $env:OPENAI_API_KEY="your-api-key"')
    console.log('  Linux/Mac: export OPENAI_API_KEY="your-api-key"\n')
    return false
  }

  console.log('\n开始执行...\n')

  try {
    const testPath = path.join(__dirname, config.file)
    
    if (!fs.existsSync(testPath)) {
      console.error(`❌ 错误: 测试文件不存在 ${testPath}`)
      return false
    }

    require(testPath)
    
    console.log('\n✅ 测试执行完成\n')
    return true
  } catch (error) {
    console.error('\n❌ 测试执行失败:')
    console.error(error.message)
    console.log('')
    return false
  }
}

/**
 * 运行多个测试
 */
async function runTests(testKeys) {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║                    批量测试运行                            ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const results = []
  let passed = 0
  let failed = 0

  for (const testKey of testKeys) {
    const result = await runTest(testKey)
    results.push({ key: testKey, success: result })
    
    if (result) {
      passed++
    } else {
      failed++
    }
  }

  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║                    测试结果汇总                            ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  console.log(`总计: ${testKeys.length} 个测试`)
  console.log(`✅ 通过: ${passed}`)
  console.log(`❌ 失败: ${failed}\n`)

  if (failed > 0) {
    console.log('失败的测试:')
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.key}`)
    })
    console.log('')
  }
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp()
    return
  }

  if (args.includes('--list') || args.includes('-l')) {
    listTests()
    return
  }

  if (args.includes('--all') || args.includes('-a')) {
    await runTests(Object.keys(TEST_CASES))
    return
  }

  if (args.includes('--examples') || args.includes('-e')) {
    const examples = Object.entries(TEST_CASES)
      .filter(([_, config]) => config.category === 'examples')
      .map(([key]) => key)
    await runTests(examples)
    return
  }

  if (args.includes('--tests') || args.includes('-t')) {
    const tests = Object.entries(TEST_CASES)
      .filter(([_, config]) => config.category === 'tests')
      .map(([key]) => key)
    await runTests(tests)
    return
  }

  const testKey = args[0]
  await runTest(testKey)
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = {
  listTests,
  runTest,
  runTests,
  TEST_CASES
}
