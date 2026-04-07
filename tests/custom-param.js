/**
 * 自定义参数模式示例
 */

const { Services, APIs, Params } = require('./index')

async function main() {
  const openai = new Services.OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  // 自定义参数模式 - 只允许正方形
  const customSchema = Params.BaseParam.override(
    Params.Schemas.OpenAI.image.dalleE3,
    {
      input: {
        size: { options: ['1024x1024'] }
      }
    }
  )

  // 使用自定义参数
  const dalleAPI = new APIs.OpenAI.Image.DallE3(openai, customSchema.getSchema())

  const result = await dalleAPI.execute({
    prompt: 'a cat',
    size: '1024x1024'
  })

  console.log(result)
}

main().catch(console.error)
