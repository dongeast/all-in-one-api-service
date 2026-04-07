/**
 * 动态表单生成示例
 */

const { Services, APIs } = require('./index')

async function main() {
  const openai = new Services.OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
  const dalleAPI = new APIs.OpenAI.Image.DallE3(openai)

  // 获取参数结构
  const inputInfo = dalleAPI.getInputInfo()

  console.log('输入参数信息:')
  inputInfo.forEach(param => {
    console.log(`- ${param.name} (${param.type})`)
    console.log(`  必填: ${param.required}`)
    console.log(`  描述: ${param.description}`)
    if (param.options) {
      console.log(`  选项: ${param.options.join(', ')}`)
    }
  })

  // 根据参数类型生成表单
  function renderForm(inputInfo) {
    return inputInfo.map(param => {
      switch (param.type) {
        case 'string':
          return `<input type="text" name="${param.name}" ${param.required ? 'required' : ''} placeholder="${param.description || ''}" />`
        case 'enum':
          return `<select name="${param.name}">
            ${param.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
          </select>`
        case 'number':
          return `<input type="number" name="${param.name}" min="${param.min || ''}" max="${param.max || ''}" />`
        case 'boolean':
          return `<input type="checkbox" name="${param.name}" />`
        default:
          return `<input type="text" name="${param.name}" />`
      }
    }).join('\n')
  }

  console.log('\n生成的表单:')
  console.log(renderForm(inputInfo))
}

main().catch(console.error)
