/**
 * 流式响应错误处理测试
 */

const { Services, APIs } = require('../index')

async function testErrorHandling() {
  console.log('=== 测试: 错误处理 ===\n')

  try {
    const openai = new Services.OpenAI({
      apiKey: 'invalid-api-key'
    })

    const gpt4Stream = new APIs.OpenAI.Text.GPT4Stream(openai)

    let hasError = false

    for await (const chunk of gpt4Stream.executeStream({
      messages: [{ role: 'user', content: 'Hello' }]
    })) {
      if (!chunk.success) {
        hasError = true
        console.log('✅ 成功捕获错误:')
        console.log(`   错误码: ${chunk.error.code}`)
        console.log(`   错误消息: ${chunk.error.message}`)
        break
      }
    }

    if (hasError) {
      console.log('✅ 测试通过\n')
    } else {
      console.log('❌ 测试失败: 未捕获到预期的错误\n')
    }
  } catch (error) {
    console.error('❌ 测试失败:', error.message, '\n')
  }
}

if (require.main === module) {
  testErrorHandling().catch(console.error)
}

module.exports = { testErrorHandling }
