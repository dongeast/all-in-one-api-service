/**
 * LTX Generate Video from Text API 测试用例
 */

const { Services, APIs } = require('../src/index')
const { createLogger } = require('../src/utils/logger')
const { getConfigManager } = require('../src/config')

/**
 * 主测试函数
 */
async function main() {
  try {
    const configManager = getConfigManager()
    await configManager.load()
    
    const debugLogger = createLogger({ 
      level: 'DEBUG',
      format: 'json'
    })

    const ltx = new Services.LTX()
    
    await ltx.initialize()

    const generateAPI = new APIs.LTX.Video.GenerateVideoFromText(ltx)

    const inputSchema = generateAPI.param.getInputSchema()
    const inputInfo = generateAPI.param.getInputInfo()

    const testParams = {}
    
    for (const paramDef of inputInfo) {
      const { name, type, required, default: defaultValue, options, description } = paramDef
      
      switch (name) {
        case 'prompt':
          testParams[name] = '一只可爱的橘猫在阳光明媚的花园里追逐蝴蝶，高清画质'
          break
          
        case 'model':
          if (options && options.length > 0) {
            testParams[name] = options[0]
          }
          break
          
        case 'duration':
          testParams[name] = defaultValue || 8
          break
          
        case 'resolution':
          if (options && options.length > 0) {
            testParams[name] = options[0]
          }
          break
          
        case 'fps':
          testParams[name] = defaultValue || 24
          break
          
        case 'generate_audio':
          testParams[name] = defaultValue !== undefined ? defaultValue : true
          break
          
        case 'camera_motion':
          if (options && options.length > 0) {
            testParams[name] = options[6]
          }
          break
          
        default:
          if (defaultValue !== undefined) {
            testParams[name] = defaultValue
          }
      }
    }

    const result = await generateAPI.execute(testParams)

    if (result.success) {
      console.log('视频生成成功!')
      console.log('内容类型:', result.data.contentType)
      console.log('视频数据大小:', result.data.video ? result.data.video.length : 0, 'bytes')
    }

    await testParameterValidation(generateAPI)

  } catch (error) {
    console.error('测试失败:', error.message)
    if (error.details) {
      console.error('错误详情:', error.details)
    }
  }
}

/**
 * 测试参数验证
 * @param {object} api - API实例
 */
async function testParameterValidation(api) {
  console.log('\n开始参数验证测试...')

  try {
    await api.execute({
      duration: 8
    })
  } catch (validationError) {
    console.log('✓ 缺少必填参数验证通过:', validationError.message)
  }

  try {
    await api.execute({
      prompt: '测试提示词',
      model: 'invalid-model',
      duration: 8,
      resolution: '1920x1080'
    })
  } catch (enumError) {
    console.log('✓ 无效枚举值验证通过:', enumError.message)
  }

  try {
    await api.execute({
      prompt: '测试提示词',
      model: 'ltx-2-fast',
      duration: 100,
      resolution: '1920x1080'
    })
  } catch (rangeError) {
    console.log('✓ 超出范围值验证通过:', rangeError.message)
  }

  try {
    await api.execute({
      prompt: '测试提示词',
      model: 'ltx-2-fast',
      duration: 8,
      resolution: '1920x1080',
      fps: 15
    })
  } catch (fpsError) {
    console.log('✓ FPS范围验证通过:', fpsError.message)
  }
}

/**
 * 模拟 API 响应的测试
 */
async function testWithMockResponse() {
  console.log('\n开始模拟响应测试...')

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
      debug: (msg, data) => console.log('[DEBUG]', msg, data || ''),
      error: (msg, data) => console.error('[ERROR]', msg, data || '')
    },
    call: async (endpoint, params, options) => {
      console.log('模拟调用端点:', endpoint)
      console.log('参数:', JSON.stringify(params, null, 2))
      
      return {
        video: Buffer.from('mock-video-binary-data'),
        contentType: 'video/mp4'
      }
    }
  }

  const generateAPI = new APIs.LTX.Video.GenerateVideoFromText(mockService)

  const result = await generateAPI.execute({
    prompt: '一只可爱的小狗在草地上奔跑',
    model: 'ltx-2-fast',
    duration: 8,
    resolution: '1920x1080',
    fps: 24,
    generate_audio: true,
    camera_motion: 'static'
  })

  console.log('✓ 模拟测试成功:', result.success)
  console.log('✓ 视频数据类型:', typeof result.data.video)
  console.log('✓ 内容类型:', result.data.contentType)
}

/**
 * 演示如何使用参数定义构建参数对象
 */
async function demonstrateParamDefinition() {
  console.log('\n演示参数定义使用...')

  const mockService = {
    getApiKey: () => 'demo-api-key',
    sanitizeParams: (params) => params,
    logger: {
      debug: (msg, data) => {},
      error: (msg, data) => {}
    },
    call: async (endpoint, params, options) => {
      return {
        video: Buffer.from('demo-video-data'),
        contentType: 'video/mp4'
      }
    }
  }

  const generateAPI = new APIs.LTX.Video.GenerateVideoFromText(mockService)

  const inputInfo = generateAPI.param.getInputInfo()
  console.log('\n可用参数列表:')
  inputInfo.forEach(param => {
    console.log(`- ${param.name}: ${param.description}`)
    if (param.options) {
      console.log(`  可选值: ${param.options.join(', ')}`)
    }
    console.log(`  必填: ${param.required ? '是' : '否'}`)
    if (param.default !== undefined) {
      console.log(`  默认值: ${param.default}`)
    }
  })

  const params = {
    prompt: '夕阳下的海滩，海浪轻拍沙滩',
    model: 'ltx-2-fast',
    duration: 8,
    resolution: '1920x1080',
    fps: 24,
    generate_audio: true,
    camera_motion: 'dolly_in'
  }

  const validationResult = generateAPI.param.validate(params)
  console.log('\n参数验证结果:', validationResult.valid ? '通过' : '失败')
  
  if (!validationResult.valid) {
    console.log('验证错误:', validationResult.errors)
  }

  const result = await generateAPI.execute(params)
  console.log('✓ 执行结果:', result.success)
}

/**
 * 测试不同模型和分辨率组合
 */
async function testDifferentConfigurations() {
  console.log('\n测试不同配置组合...')

  const mockService = {
    getApiKey: () => 'test-api-key',
    sanitizeParams: (params) => params,
    logger: {
      debug: () => {},
      error: () => {}
    },
    call: async (endpoint, params, options) => {
      return {
        video: Buffer.from('test-video'),
        contentType: 'video/mp4'
      }
    }
  }

  const generateAPI = new APIs.LTX.Video.GenerateVideoFromText(mockService)

  const configurations = [
    {
      name: '快速模型 - 横屏',
      params: {
        prompt: '城市夜景',
        model: 'ltx-2-fast',
        duration: 5,
        resolution: '1920x1080'
      }
    },
    {
      name: '专业模型 - 竖屏',
      params: {
        prompt: '森林中的小鹿',
        model: 'ltx-2-pro',
        duration: 10,
        resolution: '1080x1920'
      }
    },
    {
      name: '3D快速模型 - 4K',
      params: {
        prompt: '宇宙星空',
        model: 'ltx-2-3-fast',
        duration: 8,
        resolution: '3840x2160',
        camera_motion: 'dolly_out'
      }
    }
  ]

  for (const config of configurations) {
    try {
      console.log(`\n测试配置: ${config.name}`)
      const result = await generateAPI.execute(config.params)
      console.log(`✓ ${config.name} 测试成功`)
    } catch (error) {
      console.log(`✗ ${config.name} 测试失败:`, error.message)
    }
  }
}

/**
 * 测试镜头运动效果
 */
async function testCameraMotionEffects() {
  console.log('\n测试镜头运动效果...')

  const mockService = {
    getApiKey: () => 'test-api-key',
    sanitizeParams: (params) => params,
    logger: {
      debug: () => {},
      error: () => {}
    },
    call: async (endpoint, params, options) => {
      return {
        video: Buffer.from('test-video'),
        contentType: 'video/mp4'
      }
    }
  }

  const generateAPI = new APIs.LTX.Video.GenerateVideoFromText(mockService)
  const inputInfo = generateAPI.param.getInputInfo()
  
  const cameraMotionParam = inputInfo.find(p => p.name === 'camera_motion')
  
  if (cameraMotionParam && cameraMotionParam.options) {
    console.log('\n可用的镜头运动效果:')
    cameraMotionParam.options.forEach((motion, index) => {
      console.log(`${index + 1}. ${motion}`)
    })

    const baseParams = {
      prompt: '山间溪流',
      model: 'ltx-2-fast',
      duration: 8,
      resolution: '1920x1080'
    }

    for (const motion of cameraMotionParam.options.slice(0, 3)) {
      try {
        const result = await generateAPI.execute({
          ...baseParams,
          camera_motion: motion
        })
        console.log(`✓ 镜头运动 "${motion}" 测试成功`)
      } catch (error) {
        console.log(`✗ 镜头运动 "${motion}" 测试失败:`, error.message)
      }
    }
  }
}

// 运行测试
if (require.main === module) {
  main()
    .then(() => testWithMockResponse())
    .then(() => demonstrateParamDefinition())
    .then(() => testDifferentConfigurations())
    .then(() => testCameraMotionEffects())
    .then(() => console.log('\n所有测试完成!'))
    .catch(console.error)
}

module.exports = {
  main,
  testWithMockResponse,
  testParameterValidation,
  demonstrateParamDefinition,
  testDifferentConfigurations,
  testCameraMotionEffects
}
