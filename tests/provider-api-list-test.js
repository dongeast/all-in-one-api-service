/**
 * 根据提供商获取API列表测试
 */

const { APIs, Services } = require('../index')

/**
 * 获取所有提供商列表
 * @returns {Array<string>} 提供商名称列表
 */
function getAllProviders() {
  return Object.keys(APIs)
}

/**
 * 根据提供商获取所有API列表
 * @param {string} providerName - 提供商名称
 * @returns {object} API列表信息
 */
function getAPIsByProvider(providerName) {
  const providerAPIs = APIs[providerName]
  
  if (!providerAPIs) {
    return {
      success: false,
      error: `提供商 "${providerName}" 不存在`,
      availableProviders: getAllProviders()
    }
  }

  const apiList = []
  
  Object.entries(providerAPIs).forEach(([category, apis]) => {
    if (typeof apis === 'function') {
      apiList.push({
        name: category,
        type: 'class',
        className: apis.name
      })
    } else if (typeof apis === 'object') {
      Object.entries(apis).forEach(([apiName, APIClass]) => {
        apiList.push({
          category: category,
          name: apiName,
          type: 'class',
          className: APIClass.name
        })
      })
    }
  })

  return {
    success: true,
    provider: providerName,
    totalAPIs: apiList.length,
    apis: apiList
  }
}

/**
 * 获取所有提供商及其API列表
 * @returns {object} 所有提供商的API列表
 */
function getAllAPIs() {
  const providers = getAllProviders()
  const result = {}

  providers.forEach(provider => {
    result[provider] = getAPIsByProvider(provider)
  })

  return result
}

/**
 * 获取API详细信息
 * @param {string} providerName - 提供商名称
 * @param {string} category - API类别
 * @param {string} apiName - API名称
 * @returns {object} API详细信息
 */
function getAPIDetails(providerName, category, apiName) {
  try {
    const providerAPIs = APIs[providerName]
    if (!providerAPIs) {
      return { success: false, error: `提供商 "${providerName}" 不存在` }
    }

    const categoryAPIs = providerAPIs[category]
    if (!categoryAPIs) {
      return { success: false, error: `类别 "${category}" 不存在` }
    }

    const APIClass = categoryAPIs[apiName]
    if (!APIClass) {
      return { success: false, error: `API "${apiName}" 不存在` }
    }

    const ServiceClass = Services[providerName]
    if (!ServiceClass) {
      return { success: false, error: `服务类 "${providerName}" 不存在` }
    }

    const service = new ServiceClass({ apiKey: 'test-key' })
    const apiInstance = new APIClass(service)

    return {
      success: true,
      provider: providerName,
      category: category,
      apiName: apiName,
      className: APIClass.name,
      modelName: apiInstance.getModelName(),
      inputInfo: apiInstance.getInputInfo(),
      outputInfo: apiInstance.getOutputInfo()
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * 打印提供商API列表
 * @param {string} providerName - 提供商名称（可选，不提供则打印所有）
 */
function printAPIList(providerName = null) {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║                    API列表查询结果                          ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  if (providerName) {
    const result = getAPIsByProvider(providerName)
    
    if (!result.success) {
      console.log(`❌ ${result.error}`)
      console.log(`\n可用的提供商: ${result.availableProviders.join(', ')}`)
      return
    }

    console.log(`提供商: ${result.provider}`)
    console.log(`API总数: ${result.totalAPIs}\n`)
    
    console.log('API列表:')
    result.apis.forEach((api, index) => {
      if (api.category) {
        console.log(`  ${index + 1}. [${api.category}] ${api.name} (${api.className})`)
      } else {
        console.log(`  ${index + 1}. ${api.name} (${api.className})`)
      }
    })
  } else {
    const providers = getAllProviders()
    
    providers.forEach(provider => {
      const result = getAPIsByProvider(provider)
      
      if (result.success) {
        console.log(`\n【${provider}】 - 共 ${result.totalAPIs} 个API`)
        result.apis.forEach(api => {
          if (api.category) {
            console.log(`  - [${api.category}] ${api.name}`)
          } else {
            console.log(`  - ${api.name}`)
          }
        })
      }
    })
  }

  console.log('\n')
}

/**
 * 打印API详细信息
 * @param {string} providerName - 提供商名称
 * @param {string} category - API类别
 * @param {string} apiName - API名称
 */
function printAPIDetails(providerName, category, apiName) {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║                    API详细信息                              ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const details = getAPIDetails(providerName, category, apiName)

  if (!details.success) {
    console.log(`❌ ${details.error}`)
    return
  }

  console.log(`提供商: ${details.provider}`)
  console.log(`类别: ${details.category}`)
  console.log(`API名称: ${details.apiName}`)
  console.log(`类名: ${details.className}`)
  console.log(`模型名称: ${details.modelName}`)

  console.log('\n输入参数:')
  if (details.inputInfo && details.inputInfo.length > 0) {
    details.inputInfo.forEach(param => {
      console.log(`  - ${param.name} (${param.type})${param.required ? ' *必需' : ''}`)
      if (param.description) {
        console.log(`    描述: ${param.description}`)
      }
      if (param.default !== undefined) {
        console.log(`    默认值: ${param.default}`)
      }
    })
  } else {
    console.log('  无输入参数')
  }

  console.log('\n输出字段:')
  if (details.outputInfo && details.outputInfo.length > 0) {
    details.outputInfo.forEach(field => {
      console.log(`  - ${field.name} (${field.type})`)
      if (field.description) {
        console.log(`    描述: ${field.description}`)
      }
    })
  } else {
    console.log('  无输出字段')
  }

  console.log('\n')
}

/**
 * 主测试函数
 */
async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║          根据提供商获取API列表 - 测试                        ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  console.log('测试1: 获取所有提供商列表')
  console.log('─'.repeat(60))
  const providers = getAllProviders()
  console.log(`找到 ${providers.length} 个提供商:`)
  providers.forEach((provider, index) => {
    console.log(`  ${index + 1}. ${provider}`)
  })

  console.log('\n\n测试2: 根据提供商获取API列表 (OpenAI)')
  console.log('─'.repeat(60))
  printAPIList('OpenAI')

  console.log('测试3: 根据提供商获取API列表 (Skyreels)')
  console.log('─'.repeat(60))
  printAPIList('Skyreels')

  console.log('测试4: 获取不存在的提供商')
  console.log('─'.repeat(60))
  printAPIList('NotExistProvider')

  console.log('测试5: 获取API详细信息')
  console.log('─'.repeat(60))
  printAPIDetails('OpenAI', 'Image', 'DallE3')

  console.log('测试6: 获取所有提供商的API列表')
  console.log('─'.repeat(60))
  printAPIList()

  console.log('测试7: 获取API详细信息 (Skyreels)')
  console.log('─'.repeat(60))
  printAPIDetails('Skyreels', 'Video', 'TextToVideoGenerationTaskSubmission')

  console.log('\n✅ 所有测试完成\n')
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = {
  getAllProviders,
  getAPIsByProvider,
  getAllAPIs,
  getAPIDetails,
  printAPIList,
  printAPIDetails
}
