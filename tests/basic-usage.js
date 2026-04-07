/**
 * 基础使用示例
 */

const { Services, APIs } = require('./index')

async function main() {
  // 初始化OpenAI服务
  const openai = new Services.OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  // 创建DALL-E 3 API实例
  const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)

  // 执行图像生成
  const result = await dalleAPI.execute({
    prompt: 'A beautiful sunset over the ocean',
    size: '1024x1024',
    quality: 'hd'
  })

  if (result.success) {
    console.log('生成的图像URL:', result.data.imageUrl)
    console.log('优化后的提示词:', result.data.revisedPrompt)
  } else {
    console.error('生成失败:', result.error)
  }
}

main().catch(console.error)
