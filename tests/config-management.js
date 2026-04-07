/**
 * 配置管理示例
 */

const { Config } = require('./index')

async function main() {
  // 创建配置管理器
  const configManager = new Config.ConfigManager({
    projectPath: process.cwd()
  })

  // 加载配置
  const config = await configManager.load()
  console.log('加载的配置:', config)

  // 获取服务商配置
  const openaiConfig = configManager.getProviderConfig('openai')
  console.log('OpenAI配置:', openaiConfig)

  // 检查服务商是否已配置
  const hasOpenAI = configManager.hasProviderConfig('openai')
  console.log('OpenAI已配置:', hasOpenAI)

  // 导出配置
  const jsonConfig = configManager.export('json')
  console.log('JSON格式配置:\n', jsonConfig)

  const envConfig = configManager.export('env')
  console.log('环境变量格式配置:\n', envConfig)
}

main().catch(console.error)
