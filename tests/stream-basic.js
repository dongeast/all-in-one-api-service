/**
 * 流式响应基础测试
 */

const { Services, APIs } = require('../index')

async function testBasicStream() {
  console.log('=== 测试: 基础流式响应 ===\n')

  if (!process.env.OPENAI_API_KEY) {
    console.log('⚠️  跳过测试: 未设置 OPENAI_API_KEY 环境变量\n')
    return
  }

  try {
    const openai = new Services.OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })

    const gpt4Stream = new APIs.OpenAI.Text.GPT4Stream(openai)

    console.log('开始流式输出:\n')

    let chunkCount = 0
    let totalContent = ''

    for await (const chunk of gpt4Stream.executeStream({
      messages: [
        { role: 'user', content: '请用一句话介绍什么是JavaScript' }
      ],
      maxTokens: 50
    })) {
      if (!chunk.success) {
        console.error('❌ 错误:', chunk.error)
        break
      }

      chunkCount++
      if (chunk.data.content) {
        totalContent += chunk.data.content
        process.stdout.write(chunk.data.content)
      }

      if (chunk.data.done) {
        console.log('\n\n✅ 流式输出完成')
        console.log(`   完成原因: ${chunk.data.finishReason}`)
      }
    }

    console.log(`   数据块数量: ${chunkCount}`)
    console.log(`   总字符数: ${totalContent.length}`)
    console.log('✅ 测试通过\n')
  } catch (error) {
    console.error('❌ 测试失败:', error.message, '\n')
  }
}

if (require.main === module) {
  testBasicStream().catch(console.error)
}

module.exports = { testBasicStream }
