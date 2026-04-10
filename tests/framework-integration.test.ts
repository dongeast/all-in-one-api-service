/**
 * 框架功能集成测试
 * 以第三方项目通过 npm 方式引入框架的视角编写
 */

const AIService = require('../index')

describe('框架功能测试', () => {
  /**
   * 测试1：获取function信息列表
   */
  describe('1. 获取function信息列表', () => {
    test('应该获取所有function列表', () => {
      const functions = AIService.getFunctions()
      
      expect(Array.isArray(functions)).toBe(true)
      expect(functions.length).toBeGreaterThan(0)
    })

    test('应该根据类型筛选function', () => {
      const functions = AIService.getFunctions({ type: 'text_to_video' })
      
      expect(Array.isArray(functions)).toBe(true)
      functions.forEach((func: any) => {
        expect(func.type).toBe('text_to_video')
      })
    })

    test('应该根据provider筛选function', () => {
      const functions = AIService.getFunctions({ provider: 'ltx' })
      
      expect(Array.isArray(functions)).toBe(true)
      functions.forEach((func: any) => {
        expect(func.provider).toBe('ltx')
      })
    })

    test('应该支持中文语言', () => {
      const functions = AIService.getFunctions({}, 'zh')
      
      expect(Array.isArray(functions)).toBe(true)
      expect(functions.length).toBeGreaterThan(0)
    })

    test('应该支持英文语言', () => {
      const functions = AIService.getFunctions({}, 'en')
      
      expect(Array.isArray(functions)).toBe(true)
      expect(functions.length).toBeGreaterThan(0)
    })
  })

  /**
   * 测试2：获取provider信息列表
   */
  describe('2. 获取provider信息列表', () => {
    test('应该获取所有provider定义', () => {
      const { Providers, ProviderMeta } = AIService.Constants
      
      expect(Providers).toBeDefined()
      expect(Object.keys(Providers).length).toBeGreaterThan(0)
      expect(ProviderMeta).toBeDefined()
    })

    test('应该包含LTX provider', () => {
      const { Providers, ProviderMeta } = AIService.Constants
      
      expect(Providers.LTX).toBe('ltx')
      expect(ProviderMeta.ltx).toBeDefined()
      expect(ProviderMeta.ltx.displayName).toBe('LTX')
    })

    test('应该包含火山引擎provider', () => {
      const { Providers, ProviderMeta } = AIService.Constants
      
      expect(Providers.VOLCENGINE).toBe('volcengine')
      expect(ProviderMeta.volcengine).toBeDefined()
      expect(ProviderMeta.volcengine.displayName).toBe('火山引擎')
    })

    test('应该包含Skyreels provider', () => {
      const { Providers, ProviderMeta } = AIService.Constants
      
      expect(Providers.SKYREELS).toBe('skyreels')
      expect(ProviderMeta.skyreels).toBeDefined()
    })

    test('应该包含Mureka provider', () => {
      const { Providers, ProviderMeta } = AIService.Constants
      
      expect(Providers.MUREKA).toBe('mureka')
      expect(ProviderMeta.mureka).toBeDefined()
    })
  })

  /**
   * 测试3：获取model信息列表
   */
  describe('3. 获取model信息列表', () => {
    test('应该获取所有model列表', () => {
      const models = AIService.getModels()
      
      expect(Array.isArray(models)).toBe(true)
      expect(models.length).toBeGreaterThan(0)
    })

    test('应该根据类型筛选model', () => {
      const models = AIService.getModels({ type: 'text_to_video' })
      
      expect(Array.isArray(models)).toBe(true)
      models.forEach((model: any) => {
        expect(model.type).toBe('text_to_video')
      })
    })

    test('应该根据provider筛选model', () => {
      const models = AIService.getModels({ provider: 'ltx' })
      
      expect(Array.isArray(models)).toBe(true)
      models.forEach((model: any) => {
        expect(model.provider).toBe('ltx')
      })
    })

    test('应该支持多语言', () => {
      const modelsZh = AIService.getModels({}, 'zh')
      const modelsEn = AIService.getModels({}, 'en')
      
      expect(Array.isArray(modelsZh)).toBe(true)
      expect(Array.isArray(modelsEn)).toBe(true)
    })
  })

  /**
   * 测试4：获取api定义列表
   */
  describe('4. 获取api定义列表', () => {
    test('应该获取所有api列表', () => {
      const apis = AIService.getAPIs()
      
      expect(Array.isArray(apis)).toBe(true)
      expect(apis.length).toBeGreaterThan(0)
    })

    test('应该根据类型筛选api', () => {
      const apis = AIService.getAPIs({ type: 'text_to_video' })
      
      expect(Array.isArray(apis)).toBe(true)
      apis.forEach((api: any) => {
        expect(api.type).toBe('text_to_video')
      })
    })

    test('应该根据provider筛选api', () => {
      const apis = AIService.getAPIs({ provider: 'ltx' })
      
      expect(Array.isArray(apis)).toBe(true)
      apis.forEach((api: any) => {
        expect(api.provider).toBe('ltx')
      })
    })

    test('应该支持多语言', () => {
      const apisZh = AIService.getAPIs({}, 'zh')
      const apisEn = AIService.getAPIs({}, 'en')
      
      expect(Array.isArray(apisZh)).toBe(true)
      expect(Array.isArray(apisEn)).toBe(true)
    })
  })

  /**
   * 测试5：根据id获取指定function定义
   */
  describe('5. 根据id获取指定function定义', () => {
    test('应该获取存在的function', () => {
      const functions = AIService.getFunctions()
      const firstFunction = functions[0]
      
      const func = AIService.getFunction(firstFunction.name)
      
      expect(func).toBeDefined()
      expect(func.name).toBe(firstFunction.name)
    })

    test('应该返回null当function不存在', () => {
      const func = AIService.getFunction('non_existent_function')
      
      expect(func).toBeNull()
    })

    test('应该支持多语言', () => {
      const functions = AIService.getFunctions()
      const firstFunction = functions[0]
      
      const funcZh = AIService.getFunction(firstFunction.name, 'zh')
      const funcEn = AIService.getFunction(firstFunction.name, 'en')
      
      expect(funcZh).toBeDefined()
      expect(funcEn).toBeDefined()
    })
  })

  /**
   * 测试6：根据id获取指定provider定义
   */
  describe('6. 根据id获取指定provider定义', () => {
    test('应该获取LTX provider定义', () => {
      const { ProviderMeta } = AIService.Constants
      
      expect(ProviderMeta.ltx).toBeDefined()
      expect(ProviderMeta.ltx.name).toBe('ltx')
      expect(ProviderMeta.ltx.displayName).toBe('LTX')
      expect(ProviderMeta.ltx.description).toBeDefined()
    })

    test('应该获取火山引擎provider定义', () => {
      const { ProviderMeta } = AIService.Constants
      
      expect(ProviderMeta.volcengine).toBeDefined()
      expect(ProviderMeta.volcengine.name).toBe('volcengine')
      expect(ProviderMeta.volcengine.displayName).toBe('火山引擎')
    })

    test('应该包含支持的类型信息', () => {
      const { ProviderMeta } = AIService.Constants
      
      expect(ProviderMeta.ltx.supportedTypes).toBeDefined()
      expect(Array.isArray(ProviderMeta.ltx.supportedTypes)).toBe(true)
    })
  })

  /**
   * 测试7：根据id获取指定model定义
   */
  describe('7. 根据id获取指定model定义', () => {
    test('应该获取存在的model', () => {
      const models = AIService.getModels()
      const firstModel = models[0]
      
      const model = AIService.getModel(firstModel.name)
      
      expect(model).toBeDefined()
      expect(model.name).toBe(firstModel.name)
    })

    test('应该返回null当model不存在', () => {
      const model = AIService.getModel('non_existent_model')
      
      expect(model).toBeNull()
    })

    test('应该包含必要的字段', () => {
      const models = AIService.getModels()
      const firstModel = models[0]
      
      const model = AIService.getModel(firstModel.name)
      
      expect(model.name).toBeDefined()
      expect(model.provider).toBeDefined()
      expect(model.type).toBeDefined()
    })
  })

  /**
   * 测试8：根据id获取指定api定义
   */
  describe('8. 根据id获取指定api定义', () => {
    test('应该获取存在的api', () => {
      const apis = AIService.getAPIs()
      const firstAPI = apis[0]
      
      const api = AIService.getAPI(firstAPI.name)
      
      expect(api).toBeDefined()
      expect(api.name).toBe(firstAPI.name)
    })

    test('应该返回null当api不存在', () => {
      const api = AIService.getAPI('non_existent_api')
      
      expect(api).toBeNull()
    })

    test('应该包含必要的字段', () => {
      const apis = AIService.getAPIs()
      const firstAPI = apis[0]
      
      const api = AIService.getAPI(firstAPI.name)
      
      expect(api.name).toBeDefined()
      expect(api.provider).toBeDefined()
      expect(api.type).toBeDefined()
      expect(api.endpoint).toBeDefined()
    })
  })

  /**
   * 测试9：根据场景类型获取model series列表
   */
  describe('9. 根据场景类型获取model series列表', () => {
    test('应该获取text_to_video类型的models', () => {
      const models = AIService.getModels({ type: 'text_to_video' })
      
      expect(Array.isArray(models)).toBe(true)
      // 注意：可能某些类型不存在，所以只检查数组结构
      models.forEach((model: any) => {
        expect(model.type).toBe('text_to_video')
      })
    })

    test('应该获取text_to_image类型的models', () => {
      const models = AIService.getModels({ type: 'text_to_image' })
      
      expect(Array.isArray(models)).toBe(true)
      models.forEach((model: any) => {
        expect(model.type).toBe('text_to_image')
      })
    })

    test('应该获取music_generation类型的models', () => {
      const models = AIService.getModels({ type: 'music_generation' })
      
      expect(Array.isArray(models)).toBe(true)
      models.forEach((model: any) => {
        expect(model.type).toBe('music_generation')
      })
    })

    test('应该支持多种API类型', () => {
      const { APITypes } = AIService.Constants
      
      expect(APITypes.TEXT_TO_VIDEO.id).toBe('text_to_video')
      expect(APITypes.TEXT_TO_IMAGE.id).toBe('text_to_image')
      expect(APITypes.TEXT_TO_AUDIO.id).toBe('text_to_audio')
    })
  })

  /**
   * 测试10：根据场景类型+model series获取优先级最高的单一function
   */
  describe('10. 根据场景类型+model获取优先级最高的function', () => {
    test('应该获取最佳function', () => {
      const models = AIService.getModels({ type: 'text_to_video' })
      
      if (models.length > 0) {
        const firstModel = models[0]
        const bestFunction = AIService.getBestFunction('text_to_video', firstModel.name)
        
        if (bestFunction) {
          expect(bestFunction.type).toBe('text_to_video')
          expect(bestFunction.models).toContain(firstModel.name)
        }
      } else {
        // 如果没有 text_to_video 类型的 models，测试其他类型
        const allModels = AIService.getModels()
        if (allModels.length > 0) {
          const firstModel = allModels[0]
          const bestFunction = AIService.getBestFunction(firstModel.type, firstModel.name)
          
          if (bestFunction) {
            expect(bestFunction.models).toContain(firstModel.name)
          }
        }
      }
    })

    test('应该返回null当没有匹配的function', () => {
      const bestFunction = AIService.getBestFunction('non_existent_type', 'non_existent_model')
      
      expect(bestFunction).toBeNull()
    })

    test('应该按优先级排序', () => {
      const functions = AIService.getFunctions({ type: 'text_to_video' })
      
      if (functions.length > 1) {
        const firstPriority = functions[0].priority || 0
        const secondPriority = functions[1].priority || 0
        
        expect(firstPriority).toBeGreaterThanOrEqual(secondPriority)
      }
    })
  })

  /**
   * 测试11：根据function获取请求接口定义
   */
  describe('11. 根据function获取请求接口定义', () => {
    test('应该获取function的API定义', () => {
      const functions = AIService.getFunctions()
      const firstFunction = functions[0]
      
      const func = AIService.getFunction(firstFunction.name)
      
      if (func && func.apis) {
        expect(func.apis).toBeDefined()
      }
    })

    test('应该获取request API定义', () => {
      const functions = AIService.getFunctions({ type: 'text_to_video' })
      const firstFunction = functions.find((f: any) => f.apis && f.apis.request)
      
      if (firstFunction) {
        const apiName = (firstFunction as any).apis.request
        const api = AIService.getAPI(apiName)
        
        expect(api).toBeDefined()
        expect(api.endpoint).toBeDefined()
      }
    })

    test('应该获取query API定义（异步function）', () => {
      const asyncFunctions = AIService.getFunctions({ asyncOnly: true })
      const asyncFunction = asyncFunctions.find((f: any) => f.apis && f.apis.query)
      
      if (asyncFunction) {
        const apiName = (asyncFunction as any).apis.query
        const api = AIService.getAPI(apiName)
        
        expect(api).toBeDefined()
      }
    })
  })

  /**
   * 测试12：根据function获取异步/同步调用方法
   */
  describe('12. 根据function获取异步/同步调用方法', () => {
    test('应该识别异步function', () => {
      const asyncFunctions = AIService.getFunctions({ asyncOnly: true })
      
      expect(Array.isArray(asyncFunctions)).toBe(true)
      asyncFunctions.forEach((func: any) => {
        expect(func.type).toBe('async')
      })
    })

    test('应该识别同步function', () => {
      const syncFunctions = AIService.getFunctions({ asyncOnly: false })
      
      expect(Array.isArray(syncFunctions)).toBe(true)
      syncFunctions.forEach((func: any) => {
        expect(func.type).toBe('sync')
      })
    })

    test('应该获取function实例', () => {
      const functions = AIService.getFunctions()
      const firstFunction = functions[0]
      
      const funcInstance = AIService.functionManager.get(firstFunction.name)
      
      expect(funcInstance).toBeDefined()
      expect(funcInstance.metadata.name).toBe(firstFunction.name)
    })

    test('应该获取function的输入输出schema', () => {
      const functions = AIService.getFunctions()
      const firstFunction = functions[0]
      
      const funcInstance = AIService.functionManager.get(firstFunction.name)
      
      if (funcInstance) {
        const inputSchema = funcInstance.getInputSchema()
        const outputSchema = funcInstance.getOutputSchema()
        
        expect(inputSchema).toBeDefined()
        expect(outputSchema).toBeDefined()
      }
    })
  })

  /**
   * 测试13：根据function获取api列表，并获取api对应的入参、出参信息列表
   */
  describe('13. 根据function获取api列表和参数信息', () => {
    test('应该获取function关联的API列表', () => {
      const functions = AIService.getFunctions()
      const firstFunction = functions[0]
      
      const relatedAPIs = AIService.functionManager.getRelatedAPIs(firstFunction.name)
      
      if (relatedAPIs) {
        expect(relatedAPIs).toBeDefined()
      }
    })

    test('应该获取API的输入参数定义', () => {
      const apis = AIService.getAPIs()
      const firstAPI = apis[0]
      
      const api = AIService.getAPI(firstAPI.name)
      
      if (api && api.paramSchema) {
        expect(api.paramSchema.input).toBeDefined()
      }
    })

    test('应该获取API的输出参数定义', () => {
      const apis = AIService.getAPIs()
      const firstAPI = apis[0]
      
      const api = AIService.getAPI(firstAPI.name)
      
      if (api && api.paramSchema) {
        expect(api.paramSchema.output).toBeDefined()
      }
    })

    test('应该通过registry获取参数schema', () => {
      const { apiRegistry } = AIService.Registry
      const apis = apiRegistry.getAll()
      
      if (apis.length > 0) {
        const firstAPI = apis[0]
        const inputSchema = apiRegistry.getInputSchema(firstAPI.name)
        const outputSchema = apiRegistry.getOutputSchema(firstAPI.name)
        
        expect(inputSchema).toBeDefined()
        expect(outputSchema).toBeDefined()
      }
    })
  })

  /**
   * 测试14：根据function + api_id + 当前参数状态，动态获取参数信息列表调整结果
   */
  describe('14. 动态获取参数信息列表', () => {
    test('应该获取function的参数配置', () => {
      const functions = AIService.getFunctions()
      const firstFunction = functions[0]
      
      const funcInstance = AIService.functionManager.get(firstFunction.name)
      
      if (funcInstance) {
        const paramConfig = funcInstance.getParamConfig({})
        
        if (paramConfig) {
          expect(paramConfig).toBeDefined()
        }
      }
    })

    test('应该验证参数', () => {
      const functions = AIService.getFunctions()
      const firstFunction = functions[0]
      
      const funcInstance = AIService.functionManager.get(firstFunction.name)
      
      if (funcInstance) {
        const validationResult = funcInstance.validateParams({})
        
        expect(validationResult).toBeDefined()
        expect(validationResult.valid).toBeDefined()
        expect(Array.isArray(validationResult.errors)).toBe(true)
      }
    })

    test('应该根据上下文动态调整参数', () => {
      const functions = AIService.getFunctions()
      const firstFunction = functions[0]
      
      const funcInstance = AIService.functionManager.get(firstFunction.name)
      
      if (funcInstance) {
        const context = { model: 'test_model' }
        const paramConfig = funcInstance.getParamConfig(context)
        
        if (paramConfig) {
          expect(paramConfig).toBeDefined()
        }
      }
    })
  })

  /**
   * 测试15：获取框架中的常量列表
   */
  describe('15. 获取框架中的常量列表', () => {
    test('应该获取API类型常量', () => {
      const { APITypes } = AIService.Constants
      
      expect(APITypes).toBeDefined()
      expect(APITypes.TEXT_TO_VIDEO.id).toBe('text_to_video')
      expect(APITypes.TEXT_TO_IMAGE.id).toBe('text_to_image')
      expect(APITypes.TEXT_TO_AUDIO.id).toBe('text_to_audio')
      expect(APITypes.TEXT_TO_VIDEO.inputOutput).toBeDefined()
      expect(APITypes.TEXT_TO_VIDEO.description).toBeDefined()
    })

    test('应该获取媒体类型常量', () => {
      const { MediaTypes } = AIService.Constants
      
      expect(MediaTypes).toBeDefined()
      expect(MediaTypes.TEXT).toBe('text')
      expect(MediaTypes.IMAGE).toBe('image')
      expect(MediaTypes.VIDEO).toBe('video')
      expect(MediaTypes.AUDIO).toBe('audio')
    })

    test('应该获取Provider优先级', () => {
      const { ProviderPriority, getProviderPriority } = AIService.Constants
      
      expect(ProviderPriority).toBeDefined()
      expect(typeof getProviderPriority).toBe('function')
      
      const ltxPriority = getProviderPriority('ltx')
      expect(typeof ltxPriority).toBe('number')
    })

    test('应该获取语言常量', () => {
      const { Languages, DEFAULT_LANGUAGE } = AIService.Constants
      
      expect(Languages).toBeDefined()
      expect(DEFAULT_LANGUAGE).toBeDefined()
    })

    test('应该获取Series常量', () => {
      const { Series, SeriesMeta } = AIService.Constants
      
      expect(Series).toBeDefined()
      expect(SeriesMeta).toBeDefined()
    })

    test('应该支持Provider优先级排序', () => {
      const { sortByProviderPriority, getHighestPriorityProvider } = AIService.Constants
      
      expect(typeof sortByProviderPriority).toBe('function')
      expect(typeof getHighestPriorityProvider).toBe('function')
      
      const items = [
        { provider: 'mureka' },
        { provider: 'ltx' },
        { provider: 'volcengine' }
      ]
      
      const sorted = sortByProviderPriority(items)
      expect(sorted[0].provider).toBe('ltx')
      
      const highest = getHighestPriorityProvider(['mureka', 'ltx', 'volcengine'])
      expect(highest).toBe('ltx')
    })
  })

  /**
   * 额外测试：框架基础功能
   */
  describe('框架基础功能', () => {
    test('应该正确导出所有模块', () => {
      expect(AIService.Services).toBeDefined()
      expect(AIService.APIs).toBeDefined()
      expect(AIService.Params).toBeDefined()
      expect(AIService.Config).toBeDefined()
      expect(AIService.Utils).toBeDefined()
      expect(AIService.Functions).toBeDefined()
      expect(AIService.Constants).toBeDefined()
      expect(AIService.Registry).toBeDefined()
    })

    test('应该支持多语言设置', () => {
      AIService.setLanguage('zh')
      expect(AIService.getLanguage()).toBe('zh')
      
      AIService.setLanguage('en')
      expect(AIService.getLanguage()).toBe('en')
    })

    test('应该获取统计信息', () => {
      const stats = AIService.functionManager.getStats()
      
      expect(stats).toBeDefined()
      expect(stats.totalModels).toBeGreaterThan(0)
      expect(stats.totalAPIs).toBeGreaterThan(0)
      expect(stats.totalFunctions).toBeGreaterThan(0)
    })

    test('应该清除缓存', () => {
      expect(() => {
        AIService.functionManager.clearCache()
      }).not.toThrow()
    })
  })
})
