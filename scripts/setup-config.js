/**
 * 配置设置脚本
 * 用于创建全局配置文件
 */

const fs = require('fs')
const path = require('path')
const os = require('os')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

async function setupConfig() {
  console.log('\n🚀 AI Service 配置向导\n')
  console.log('此脚本将帮助您创建全局配置文件，实现零配置使用。\n')

  const configDir = path.join(os.homedir(), '.ai-service')
  const configPath = path.join(configDir, 'config.local.json')

  if (fs.existsSync(configPath)) {
    const overwrite = await question('配置文件已存在，是否覆盖？(y/N): ')
    if (overwrite.toLowerCase() !== 'y') {
      console.log('\n已取消配置。')
      rl.close()
      return
    }
  }

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true })
  }

  const config = {
    version: '1.0',
    defaultProvider: 'openai',
    providers: {},
    logging: {
      level: 'info',
      format: 'json'
    }
  }

  console.log('\n请输入各服务商的 API 密钥（留空跳过）：\n')

  const openaiKey = await question('OpenAI API Key: ')
  if (openaiKey.trim()) {
    config.providers.openai = {
      apiKey: openaiKey.trim(),
      baseURL: 'https://api.openai.com/v1',
      timeout: 30000
    }
  }

  const stabilityKey = await question('Stability AI API Key: ')
  if (stabilityKey.trim()) {
    config.providers.stability = {
      apiKey: stabilityKey.trim(),
      baseURL: 'https://api.stability.ai/v1',
      timeout: 60000
    }
  }

  const replicateToken = await question('Replicate API Token: ')
  if (replicateToken.trim()) {
    config.providers.replicate = {
      apiToken: replicateToken.trim(),
      baseURL: 'https://api.replicate.com/v1',
      timeout: 120000
    }
  }

  const geminiKey = await question('Google Gemini API Key: ')
  if (geminiKey.trim()) {
    config.providers.gemini = {
      apiKey: geminiKey.trim(),
      baseURL: 'https://generativelanguage.googleapis.com/v1',
      timeout: 30000
    }
  }

  const anthropicKey = await question('Anthropic API Key: ')
  if (anthropicKey.trim()) {
    config.providers.anthropic = {
      apiKey: anthropicKey.trim(),
      baseURL: 'https://api.anthropic.com/v1',
      timeout: 60000
    }
  }

  const midjourneyKey = await question('Midjourney API Key: ')
  if (midjourneyKey.trim()) {
    config.providers.midjourney = {
      apiKey: midjourneyKey.trim(),
      baseURL: 'https://api.midjourney.com/v1',
      timeout: 120000
    }
  }

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8')

  console.log(`\n✅ 配置文件已创建: ${configPath}`)
  console.log('\n现在您可以在任何项目中零配置使用 AI Service：')
  console.log(`
  const { Services, APIs } = require('all-in-one-api-service')
  
  const openai = new Services.OpenAI()
  const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)
  
  const result = await dalleAPI.execute({
    prompt: 'A beautiful sunset'
  })
`)

  rl.close()
}

setupConfig().catch(console.error)
