/**
 * 流式响应使用示例
 */

const { Services, APIs } = require('../index')

/**
 * 示例1: 基础流式调用
 */
async function basicStreamExample() {
  console.log('=== 基础流式调用示例 ===\n')

  const openai = new Services.OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const gpt4Stream = new APIs.OpenAI.Text.GPT4Stream(openai)

  console.log('开始流式输出:\n')

  for await (const chunk of gpt4Stream.executeStream({
    messages: [
      { role: 'system', content: '你是一个有帮助的助手。' },
      { role: 'user', content: '请用100字介绍一下人工智能。' }
    ],
    temperature: 0.7,
    maxTokens: 200
  })) {
    if (!chunk.success) {
      console.error('错误:', chunk.error)
      break
    }

    if (chunk.data.content) {
      process.stdout.write(chunk.data.content)
    }

    if (chunk.data.done) {
      console.log('\n\n[流式输出完成]')
      console.log('完成原因:', chunk.data.finishReason)
    }
  }
}

/**
 * 示例2: 使用chat方法简化调用
 */
async function chatMethodExample() {
  console.log('\n=== 使用chat方法示例 ===\n')

  const openai = new Services.OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const gpt4Stream = new APIs.OpenAI.Text.GPT4Stream(openai)

  console.log('使用chat方法:\n')

  for await (const chunk of gpt4Stream.chat({
    messages: [
      { role: 'user', content: '请写一首关于春天的诗。' }
    ]
  })) {
    if (chunk.success && chunk.data.content) {
      process.stdout.write(chunk.data.content)
    }
  }
  console.log('\n')
}

/**
 * 示例3: 收集完整响应
 */
async function completeResponseExample() {
  console.log('\n=== 收集完整响应示例 ===\n')

  const openai = new Services.OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const gpt4Stream = new APIs.OpenAI.Text.GPT4Stream(openai)

  const result = await gpt4Stream.chatComplete({
    messages: [
      { role: 'user', content: '请用一句话解释什么是机器学习。' }
    ]
  })

  if (result.success) {
    console.log('完整响应:', result.data.content)
    console.log('Token使用:', result.data.usage)
    console.log('耗时:', result.metadata.duration, 'ms')
  } else {
    console.error('错误:', result.error)
  }
}

/**
 * 示例4: Next.js API路由集成
 */
function nextJSExample() {
  console.log('\n=== Next.js API路由示例 ===\n')

  const code = `
// app/api/chat/route.js
import { NextRequest } from 'next/server'
import { Services, APIs } from 'all-in-one-api-service'

export async function POST(request: NextRequest) {
  const { messages } = await request.json()

  const openai = new Services.OpenAI()
  const gpt4Stream = new APIs.OpenAI.Text.GPT4Stream(openai)

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of gpt4Stream.executeStream({ messages })) {
          if (!chunk.success) {
            controller.error(new Error(chunk.error.message))
            return
          }

          const data = JSON.stringify({
            content: chunk.data.content,
            done: chunk.data.done
          })
          
          controller.enqueue(encoder.encode(\`data: \${data}\\n\\n\`))
        }
        
        controller.close()
      } catch (error) {
        controller.error(error)
      }
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  })
}
  `

  console.log(code)
}

/**
 * 示例5: 错误处理
 */
async function errorHandlingExample() {
  console.log('\n=== 错误处理示例 ===\n')

  const openai = new Services.OpenAI({
    apiKey: 'invalid-key' // 故意使用错误的key
  })

  const gpt4Stream = new APIs.OpenAI.Text.GPT4Stream(openai)

  try {
    for await (const chunk of gpt4Stream.executeStream({
      messages: [{ role: 'user', content: 'Hello' }]
    })) {
      if (!chunk.success) {
        console.error('捕获到错误:')
        console.error('错误码:', chunk.error.code)
        console.error('错误消息:', chunk.error.message)
        console.error('错误详情:', chunk.error.details)
        break
      }
    }
  } catch (error) {
    console.error('未捕获的错误:', error.message)
  }
}

/**
 * 示例6: 流式进度跟踪
 */
async function progressTrackingExample() {
  console.log('\n=== 流式进度跟踪示例 ===\n')

  const openai = new Services.OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const gpt4Stream = new APIs.OpenAI.Text.GPT4Stream(openai)

  let chunkCount = 0
  let totalContent = ''
  const startTime = Date.now()

  console.log('开始处理...\n')

  for await (const chunk of gpt4Stream.executeStream({
    messages: [
      { role: 'user', content: '请详细解释量子计算的基本原理。' }
    ],
    maxTokens: 500
  })) {
    if (chunk.success) {
      chunkCount++
      totalContent += chunk.data.content || ''

      if (chunkCount % 10 === 0) {
        const elapsed = Date.now() - startTime
        console.log(`已接收 ${chunkCount} 个数据块, ${totalContent.length} 字符, 耗时 ${elapsed}ms`)
      }
    }
  }

  console.log(`\n完成! 总计 ${chunkCount} 个数据块, ${totalContent.length} 字符`)
  console.log(`总耗时: ${Date.now() - startTime}ms`)
}

/**
 * 示例7: 多轮对话流式
 */
async function multiTurnConversationExample() {
  console.log('\n=== 多轮对话流式示例 ===\n')

  const openai = new Services.OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const gpt4Stream = new APIs.OpenAI.Text.GPT4Stream(openai)

  const conversationHistory = [
    { role: 'system', content: '你是一个专业的编程助手。' }
  ]

  const questions = [
    '什么是JavaScript?',
    '它有哪些主要特点?',
    '请给我一个简单的例子。'
  ]

  for (const question of questions) {
    console.log(`\n用户: ${question}`)
    console.log('助手: ')

    conversationHistory.push({ role: 'user', content: question })

    let response = ''
    for await (const chunk of gpt4Stream.executeStream({
      messages: conversationHistory
    })) {
      if (chunk.success && chunk.data.content) {
        process.stdout.write(chunk.data.content)
        response += chunk.data.content
      }
    }

    conversationHistory.push({ role: 'assistant', content: response })
    console.log('\n')
  }
}

/**
 * 主函数
 */
async function main() {
  try {
    await basicStreamExample()
    await chatMethodExample()
    await completeResponseExample()
    nextJSExample()
    await errorHandlingExample()
    await progressTrackingExample()
    await multiTurnConversationExample()
  } catch (error) {
    console.error('示例执行失败:', error)
  }
}

if (require.main === module) {
  main()
}

module.exports = {
  basicStreamExample,
  chatMethodExample,
  completeResponseExample,
  nextJSExample,
  errorHandlingExample,
  progressTrackingExample,
  multiTurnConversationExample
}
