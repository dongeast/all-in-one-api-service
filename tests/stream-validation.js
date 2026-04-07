/**
 * 流式响应参数验证测试
 */

const { Services, APIs } = require('../index')

async function testParameterValidation() {
  console.log('=== 测试: 参数验证 ===\n')

  try {
    const openai = new Services.OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'test-key'
    })

    const gpt4Stream = new APIs.OpenAI.Text.GPT4Stream(openai)

    let hasValidationError = false

    for await (const chunk of gpt4Stream.executeStream({
      // 故意不提供必需的messages参数
    })) {
      if (!chunk.success && chunk.error.code === 'E003') {
        hasValidationError = true
        console.log('✅ 成功捕获参数验证错误:')
        console.log(`   错误码: ${chunk.error.code}`)
        console.log(`   错误消息: ${chunk.error.message}`)
        break
      }
    }

    if (hasValidationError) {
      console.log('✅ 测试通过\n')
    } else {
      console.log('❌ 测试失败: 未捕获到参数验证错误\n')
    }
  } catch (error) {
    console.error('❌ 测试失败:', error.message, '\n')
  }
}

if (require.main === module) {
  testParameterValidation().catch(console.error)
}

module.exports = { testParameterValidation }
