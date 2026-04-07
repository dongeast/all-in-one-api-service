/**
 * Multi-Actor Avatar API 测试用例
 */

const { Services, APIs } = require('../src/index')
const { createLogger } = require('../src/utils/logger')
const { getConfigManager } = require('../src/config')

/**
 * 主测试函数
 */
async function main() {
  try {
    // 方式 1: 使用配置文件自动加载（推荐）
    const configManager = getConfigManager()
    await configManager.load()
    
    const debugLogger = createLogger({ 
      level: 'DEBUG',
      format: 'json'
    })

    // 创建服务实例（无需传入参数，自动从配置文件加载）
    // const skyreels = new Services.Skyreels({ logger: debugLogger })
    const skyreels = new Services.Skyreels()
    
    await skyreels.initialize()

    // 创建 Multi-Actor Avatar 任务提交 API 实例
    const submitAPI = new APIs.Skyreels.Avatar.MultiActorAvatarTaskSubmission(skyreels)

    // 创建 Multi-Actor Avatar 任务查询 API 实例
    const queryAPI = new APIs.Skyreels.Avatar.MultiActorAvatarTaskQuery(skyreels)

    // 获取参数定义并动态构建参数
    const inputSchema = submitAPI.param.getInputSchema()
    const inputInfo = submitAPI.param.getInputInfo()

    // 根据参数定义动态构建参数对象
    const testParams = {}
    
    // 遍历参数定义，根据定义动态构建参数
    for (const paramDef of inputInfo) {
      const { name, type, required, default: defaultValue, options, description } = paramDef
      
      // 根据参数名和类型动态赋值
      switch (name) {
        case 'prompt':
          // 字符串类型参数
          testParams[name] = '两个人在公园里愉快地交谈，阳光明媚'
          break
          
        case 'first_frame_image':
          // URI 格式参数
          testParams[name] = 'https://example.com/images/two-people.jpg'
          break
          
        case 'audios':
          // 数组类型参数
          testParams[name] = [
            'https://example.com/audio/person1.mp3',
            'https://example.com/audio/person2.mp3'
          ]
          break
          
        case 'bboxes':
          // 多维数组参数
          testParams[name] = [
            [100, 150, 300, 400],
            [350, 150, 550, 400]
          ]
          break
          
        case 'bboxes_type':
          // 枚举类型参数，从可选值中选择
          if (options && options.length > 0) {
            testParams[name] = options[0] // 使用第一个选项 'face'
          }
          break
          
        case 'mode':
          // 枚举类型参数，从可选值中选择
          if (options && options.length > 0) {
            testParams[name] = defaultValue || options[0] // 使用默认值或第一个选项
          }
          break
          
        default:
          // 其他参数使用默认值
          if (defaultValue !== undefined) {
            testParams[name] = defaultValue
          }
      }
    }

    // 提交任务
    const submitResult = await submitAPI.execute(testParams)

    if (submitResult.success) {
      const taskId = submitResult.data.task_id

      // 查询任务状态
      const queryResult = await queryAPI.execute({
        task_id: taskId
      })

      // 等待任务完成（可选）
      try {
        const finalResult = await skyreels.waitForTask(
          '/video/audio2video/multi/task/{task_id}',
          taskId,
          {
            interval: 3000,
            maxAttempts: 100
          }
        )
      } catch (waitError) {
        // 处理等待错误
      }
    }

    // 测试参数验证
    await testParameterValidation(submitAPI)

  } catch (error) {
    console.error('测试失败:', error.message)
  }
}

/**
 * 测试参数验证
 * @param {object} api - API实例
 */
async function testParameterValidation(api) {
  try {
    await api.execute({
      prompt: '测试提示词'
    })
  } catch (validationError) {
    // 预期会抛出验证错误
  }

  try {
    await api.execute({
      prompt: '测试提示词',
      first_frame_image: 'https://example.com/image.jpg',
      audios: 'not-an-array',
      bboxes: [[100, 150, 300, 400]]
    })
  } catch (typeError) {
    // 预期会抛出类型错误
  }

  try {
    await api.execute({
      prompt: '测试提示词',
      first_frame_image: 'https://example.com/image.jpg',
      audios: [
        'https://example.com/audio1.mp3',
        'https://example.com/audio2.mp3'
      ],
      bboxes: [
        [100, 150, 300, 400]
      ]
    })
  } catch (mismatchError) {
    // 预期会抛出数量不匹配错误
  }
}

/**
 * 模拟 API 响应的测试
 */
async function testWithMockResponse() {
  const mockService = {
    getApiKey: () => 'mock-api-key',
    sanitizeParams: (params) => {
      const sanitized = { ...params }
      const sensitiveKeys = ['apiKey', 'apiToken', 'password', 'secret']
      Object.keys(sanitized).forEach(key => {
        if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
          sanitized[key] = '[REDACTED]'
        }
      })
      return sanitized
    },
    logger: {
      debug: (msg, data) => {},
      error: (msg, data) => {}
    },
    call: async (endpoint, params, options) => {
      if (endpoint.includes('submit')) {
        return {
          task_id: 'mock-task-id-12345',
          status: 'submitted',
          msg: '任务提交成功',
          code: 200,
          trace_id: 'trace-12345'
        }
      } else if (endpoint.includes('task')) {
        return {
          task_id: 'mock-task-id-12345',
          status: 'succeeded',
          msg: '任务完成',
          code: 200,
          trace_id: 'trace-12345',
          data: {
            video_url: 'https://example.com/output/video.mp4',
            duration: 10,
            resolution: '1920x1080',
            cost_credits: 50
          }
        }
      }
    }
  }

  const submitAPI = new APIs.Skyreels.Avatar.MultiActorAvatarTaskSubmission(mockService)
  const queryAPI = new APIs.Skyreels.Avatar.MultiActorAvatarTaskQuery(mockService)

  const submitResult = await submitAPI.execute({
    prompt: '两个人在对话',
    first_frame_image: 'https://example.com/image.jpg',
    audios: ['https://example.com/audio1.mp3'],
    bboxes: [[100, 150, 300, 400]]
  })

  const queryResult = await queryAPI.execute({
    task_id: 'mock-task-id-12345'
  })
}

/**
 * 演示如何使用参数定义构建参数对象
 */
async function demonstrateParamDefinition() {
  const mockService = {
    getApiKey: () => 'mock-api-key',
    sanitizeParams: (params) => params,
    logger: {
      debug: (msg, data) => {},
      error: (msg, data) => {}
    },
    call: async (endpoint, params, options) => {
      return {
        task_id: 'demo-task-id',
        status: 'submitted',
        msg: '演示成功',
        code: 200
      }
    }
  }

  const submitAPI = new APIs.Skyreels.Avatar.MultiActorAvatarTaskSubmission(mockService)

  const inputInfo = submitAPI.param.getInputInfo()

  const params = {}
  const paramValues = {
    prompt: '两个人在公园里愉快地交谈',
    first_frame_image: 'https://example.com/image.jpg',
    audios: ['https://example.com/audio1.mp3', 'https://example.com/audio2.mp3'],
    bboxes: [[100, 150, 300, 400], [350, 150, 550, 400]],
    bboxes_type: 'face',
    mode: 'std'
  }

  for (const [paramName, value] of Object.entries(paramValues)) {
    const detail = submitAPI.param.getParamDetail(paramName)
    if (detail) {
      params[paramName] = value
    }
  }

  const validationResult = submitAPI.param.validate(params)
  
  const result = await submitAPI.execute(params)
}

// 运行测试
if (require.main === module) {
  main()
    .then(() => testWithMockResponse())
    .then(() => demonstrateParamDefinition())
    .catch(console.error)
}

module.exports = {
  main,
  testWithMockResponse,
  testParameterValidation,
  demonstrateParamDefinition
}
