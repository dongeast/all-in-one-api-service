/**
 * 测试运行脚本
 * 提供便捷的测试运行命令
 */

const { execSync } = require('child_process')
const path = require('path')

const TEST_DIR = __dirname

const commands = {
  all: 'npm test',
  coverage: 'npm run test:coverage',
  watch: 'npm run test:watch',
  i18n: 'npx jest --testPathPattern=i18n-manager',
  credits: 'npx jest --testPathPattern=credit-registry',
  registry: 'npx jest --testPathPattern=registry',
  query: 'npx jest --testPathPattern=metadata-query',
  services: 'npx jest --testPathPattern=service-registry',
  integration: 'npx jest --testPathPattern=integration'
}

function runTest(command) {
  const cmd = commands[command]
  
  if (!cmd) {
    console.error(`Unknown command: ${command}`)
    console.log('Available commands:', Object.keys(commands).join(', '))
    process.exit(1)
  }
  
  console.log(`Running: ${cmd}`)
  console.log('---')
  
  try {
    execSync(cmd, { 
      stdio: 'inherit',
      cwd: path.resolve(TEST_DIR, '..')
    })
  } catch (error) {
    console.error('Test failed')
    process.exit(1)
  }
}

const command = process.argv[2] || 'all'
runTest(command)
