/**
 * 多提供商切换示例
 */

const { Services, APIs } = require('./index')

async function main() {
  // OpenAI提供商
  const openai = new Services.OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
  const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)

  // Stability提供商
  const stability = new Services.Stability({
    apiKey: process.env.STABILITY_API_KEY
  })
  const sdAPI = new APIs.Stability.Image.StableDiffusionXL(stability)

  // Anthropic提供商
  const anthropic = new Services.Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  })
  const claudeAPI = new APIs.Anthropic.Text.Claude3Sonnet(anthropic)

  // 统一接口调用
  const imageResult1 = await dalleAPI.execute({ prompt: 'a sunset' })
  console.log('OpenAI图像:', imageResult1.data.imageUrl)

  const imageResult2 = await sdAPI.execute({ prompt: 'a sunset' })
  console.log('Stability图像:', imageResult2.data.artifacts)

  const textResult = await claudeAPI.execute({
    prompt: 'Hello, how are you?',
    maxTokens: 100
  })
  console.log('Claude回复:', textResult.data.text)
}

main().catch(console.error)
