/**
 * 流式响应完整收集测试
 */

const { Services, APIs } = require('../index')

async function testCompleteResponse() {
  console.log('=== 测试: 完整响应收集 ===\n')

  if (!process.env.OPENAI_API_KEY) {
    console.log('⚠️  跳过测试: 未设置 OPENAI_API_KEY 环境变量\n')
    return
  }

  try {
    const openai = new Services.OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })

    const gpt4Stream = new APIs.OpenAI.Text.GPT4Stream(openai)

    const result = await gpt4Stream.chatComplete({
      messages: [
        { role: 'user', content: '请说"Hello World"' }
      ],
      maxTokens: 20
    })

    if (result.success) {
      console.log('✅ 成功收集完整响应:')
      console.log(`   内容: ${result.data.content}`)
      console.log(`   角色: ${result.data.role}`)
      console.log(`   完成原因: ${result.data.finishReason}`)
      console.log(`   耗时: ${result.metadata.duration}ms`)
      console.log('✅ 测试通过\n')
    } else {
      console.log('❌ 测试失败:', result.error.message, '\n')
    }
  } catch (error) {
    console.error('❌ 测试失败:', error.message, '\n')
  }
}

if (require.main === module) {
  testCompleteResponse().catch(console.error)
}

module.exports = { testCompleteResponse }
