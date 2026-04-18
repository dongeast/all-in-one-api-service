/**
 * 综合系统检查脚本
 * 检查多语言翻译、积分计算和服务注册系统
 */

const path = require('path');
const fs = require('fs');

process.env.NODE_ENV = 'test';

const projectRoot = path.resolve(__dirname, '..');
const srcPath = path.join(projectRoot, 'src');

console.log('='.repeat(80));
console.log('综合系统检查');
console.log('='.repeat(80));
console.log('');

async function checkSystems() {
  const results = {
    passed: [],
    failed: [],
    warnings: []
  };

  try {
    // 先初始化框架
    const initializerPath = path.join(srcPath, 'core', 'initializer.js');
    const initializerModule = require(initializerPath);
    const initializer = initializerModule.initializer || initializerModule;
    
    if (!initializer.isInitialized()) {
      await initializer.initialize();
    }

    const unifiedRegistryPath = path.join(srcPath, 'registry', 'unified-registry.js');
    const unifiedRegistryModule = require(unifiedRegistryPath);
    const unifiedRegistry = unifiedRegistryModule.unifiedRegistry || unifiedRegistryModule;

    // 1. 检查多语言翻译系统
    console.log('1. 检查多语言翻译系统');
    console.log('-'.repeat(80));
    
    const i18nManagerPath = path.join(srcPath, 'utils', 'i18n-manager.js');
    const i18nManagerModule = require(i18nManagerPath);
    const i18nManager = i18nManagerModule.i18nManager || i18nManagerModule;
    
    console.log('✅ I18nManager 模块加载成功');
    
    // 检查支持的语言
    const supportedLanguages = i18nManager.getSupportedLanguages();
    console.log(`支持的语言: ${supportedLanguages.join(', ')}`);
    
    if (supportedLanguages.length >= 2) {
      results.passed.push(`I18nManager 支持多语言: ${supportedLanguages.length} 种`);
    } else {
      results.failed.push('I18nManager 支持的语言数量不足');
    }
    
    // 检查翻译功能
    const testKey = 'apis.mureka.mureka-song-generate.displayName';
    const zhTranslation = i18nManager.t(testKey, { language: 'zh' });
    const enTranslation = i18nManager.t(testKey, { language: 'en' });
    
    console.log(`中文翻译: ${zhTranslation}`);
    console.log(`英文翻译: ${enTranslation}`);
    
    if (zhTranslation && enTranslation) {
      results.passed.push('I18nManager 翻译功能正常');
    } else {
      results.warnings.push('I18nManager 部分翻译缺失');
    }
    
    // 检查缓存机制
    const stats = i18nManager.getStats();
    console.log(`缓存大小: ${stats.cacheSize}`);
    
    if (stats.cacheSize > 0) {
      results.passed.push('I18nManager 缓存机制正常');
    } else {
      results.warnings.push('I18nManager 缓存未启用或为空');
    }
    
    // 检查元数据翻译
    const metadataI18nPath = path.join(srcPath, 'utils', 'metadata-i18n.js');
    if (fs.existsSync(metadataI18nPath)) {
      const { translateAPIMetadata } = require(metadataI18nPath);
      const api = unifiedRegistry.apiRegistry.getByProvider('mureka')[0];
      if (api) {
        const translatedAPI = translateAPIMetadata(api, 'mureka', 'zh');
        console.log(`API 翻译示例: ${translatedAPI.displayName}`);
        results.passed.push('元数据翻译功能正常');
      }
    } else {
      results.warnings.push('元数据翻译工具文件不存在');
    }
    
    console.log('\n');
    
    // 2. 检查积分计算系统
    console.log('2. 检查积分计算系统');
    console.log('-'.repeat(80));
    
    const creditRegistry = unifiedRegistry.creditRegistry;
    console.log('✅ CreditRegistry 模块加载成功');
    
    // 检查积分配置
    const creditStats = creditRegistry.getStats();
    console.log(`积分配置统计: ${JSON.stringify(creditStats)}`);
    
    if (creditStats.apiCredits > 0) {
      results.passed.push(`CreditRegistry 积分配置正常: ${creditStats.apiCredits} 个 API 配置`);
    } else {
      results.warnings.push('CreditRegistry 积分配置缺失');
    }
    
    // 检查模型倍率
    const modelMultiplier = creditRegistry.getModelMultiplier('mureka', 'mureka-8');
    console.log(`模型倍率示例 (mureka-8): ${modelMultiplier}`);
    
    if (modelMultiplier !== undefined) {
      results.passed.push('CreditRegistry 模型倍率查询正常');
    } else {
      results.warnings.push('CreditRegistry 模型倍率缺失');
    }
    
    // 检查积分计算器
    const creditCalculatorPath = path.join(srcPath, 'credits', 'credit-calculator.js');
    if (fs.existsSync(creditCalculatorPath)) {
      const { creditCalculator } = require(creditCalculatorPath);
      console.log('✅ CreditCalculator 模块加载成功');
      
      // 测试积分计算
      try {
        const testCredits = creditCalculator.calculate({
          apiName: 'mureka-song-generate',
          params: { duration: 60, model: 'mureka-8' }
        });
        console.log(`积分计算示例: ${JSON.stringify(testCredits)}`);
        results.passed.push('CreditCalculator 积分计算功能正常');
      } catch (error) {
        results.warnings.push(`CreditCalculator 积分计算异常: ${error.message}`);
      }
    } else {
      results.warnings.push('CreditCalculator 文件不存在');
    }
    
    console.log('\n');
    
    // 3. 检查服务注册系统
    console.log('3. 检查服务注册系统');
    console.log('-'.repeat(80));
    
    const serviceRegistry = unifiedRegistry.serviceRegistry;
    if (serviceRegistry) {
      console.log('✅ ServiceRegistry 模块加载成功');
      
      // 检查服务注册
      const serviceStats = serviceRegistry.getStats();
      console.log(`服务统计: ${JSON.stringify(serviceStats)}`);
      
      if (serviceStats.services > 0) {
        results.passed.push(`ServiceRegistry 服务注册正常: ${serviceStats.services} 个服务`);
      } else {
        results.failed.push('ServiceRegistry 服务注册失败或数量为 0');
      }
      
      // 检查服务获取
      const providers = serviceRegistry.getProviders();
      console.log(`已注册的服务提供商: ${providers.join(', ')}`);
      
      if (providers.length > 0) {
        results.passed.push('ServiceRegistry 服务提供商查询正常');
      } else {
        results.failed.push('ServiceRegistry 服务提供商查询失败');
      }
      
      // 检查服务实例获取
      try {
        const murekaService = serviceRegistry.get('mureka');
        if (murekaService) {
          console.log('✅ 服务实例获取成功');
          results.passed.push('ServiceRegistry 服务实例获取正常');
        } else {
          results.warnings.push('ServiceRegistry 服务实例获取返回 null');
        }
      } catch (error) {
        results.warnings.push(`ServiceRegistry 服务实例获取异常: ${error.message}`);
      }
    } else {
      results.failed.push('ServiceRegistry 未初始化');
    }
    
    // 检查 BaseService 元数据加载
    const baseServicePath = path.join(srcPath, 'services', 'base-service.js');
    if (fs.existsSync(baseServicePath)) {
      const BaseService = require(baseServicePath);
      console.log('✅ BaseService 模块加载成功');
      
      // 测试元数据加载
      try {
        const testService = new BaseService({ skipConfigLoad: true });
        testService.providerName = 'mureka';
        testService.loadMetadata();
        
        if (testService.metadataLoaded) {
          console.log('✅ BaseService 元数据加载成功');
          results.passed.push('BaseService 元数据加载功能正常');
        } else {
          results.warnings.push('BaseService 元数据未加载');
        }
      } catch (error) {
        results.warnings.push(`BaseService 元数据加载异常: ${error.message}`);
      }
    } else {
      results.failed.push('BaseService 文件不存在');
    }
    
    console.log('\n');
    
    // 4. 检查前端 API 路由集成
    console.log('4. 检查前端 API 路由集成');
    console.log('-'.repeat(80));
    
    // 检查前端路由文件是否存在
    const frontendBase = 'd:\\2026OutGoing\\shipany-template-nano-banana\\src\\app\\api\\ai';
    const routeFiles = [
      'apis/options/route.ts',
      'apis/params/route.ts',
      'apis/execute/route.ts'
    ];
    
    let routesExist = 0;
    routeFiles.forEach(routeFile => {
      const fullPath = path.join(frontendBase, routeFile);
      if (fs.existsSync(fullPath)) {
        console.log(`✅ 前端路由文件存在: ${routeFile}`);
        routesExist++;
      } else {
        console.log(`❌ 前端路由文件不存在: ${routeFile}`);
      }
    });
    
    if (routesExist === routeFiles.length) {
      results.passed.push('前端 API 路由文件完整');
    } else {
      results.failed.push(`前端 API 路由文件缺失: ${routeFiles.length - routesExist} 个`);
    }
    
    // 检查前端是否正确导入后端模块
    const paramsRoutePath = path.join(frontendBase, 'apis/params/route.ts');
    if (fs.existsSync(paramsRoutePath)) {
      const paramsRouteContent = fs.readFileSync(paramsRoutePath, 'utf-8');
      if (paramsRouteContent.includes('all-in-one-api-service')) {
        console.log('✅ 前端正确导入后端模块');
        results.passed.push('前端正确导入后端模块');
      } else {
        results.failed.push('前端未正确导入后端模块');
      }
    }
    
    console.log('\n');
    
    // 5. 检查数据结构一致性
    console.log('5. 检查数据结构一致性');
    console.log('-'.repeat(80));
    
    // 检查 API 元数据字段
    const sampleAPI = unifiedRegistry.apiRegistry.getAll()[0];
    if (sampleAPI) {
      const requiredAPIFields = ['name', 'provider', 'endpoint', 'method'];
      const missingAPIFields = requiredAPIFields.filter(field => !sampleAPI[field]);
      
      if (missingAPIFields.length === 0) {
        console.log('✅ API 元数据字段完整');
        results.passed.push('API 元数据字段完整');
      } else {
        results.warnings.push(`API 元数据缺失字段: ${missingAPIFields.join(', ')}`);
      }
    }
    
    // 检查 Model 元数据字段
    const sampleModel = unifiedRegistry.modelRegistry.getAll()[0];
    if (sampleModel) {
      const requiredModelFields = ['name', 'provider'];
      const missingModelFields = requiredModelFields.filter(field => !sampleModel[field]);
      
      if (missingModelFields.length === 0) {
        console.log('✅ Model 元数据字段完整');
        results.passed.push('Model 元数据字段完整');
      } else {
        results.warnings.push(`Model 元数据缺失字段: ${missingModelFields.join(', ')}`);
      }
    }
    
    // 检查 Function 元数据字段
    const sampleFunction = unifiedRegistry.functionRegistry.getAll()[0];
    if (sampleFunction) {
      const requiredFunctionFields = ['name', 'provider', 'type', 'apis'];
      const missingFunctionFields = requiredFunctionFields.filter(field => !sampleFunction[field]);
      
      if (missingFunctionFields.length === 0) {
        console.log('✅ Function 元数据字段完整');
        results.passed.push('Function 元数据字段完整');
      } else {
        results.warnings.push(`Function 元数据缺失字段: ${missingFunctionFields.join(', ')}`);
      }
    }
    
  } catch (error) {
    results.failed.push(`综合系统检查失败: ${error.message}`);
    console.error('❌ 综合系统检查失败:', error);
    console.error(error.stack);
  }
  
  return results;
}

// 执行检查
checkSystems()
  .then(results => {
    console.log('\n');
    console.log('='.repeat(80));
    console.log('检查结果汇总');
    console.log('='.repeat(80));
    console.log('');
    
    console.log(`✅ 通过: ${results.passed.length} 项`);
    results.passed.forEach(item => console.log(`   - ${item}`));
    
    console.log(`\n❌ 失败: ${results.failed.length} 项`);
    results.failed.forEach(item => console.log(`   - ${item}`));
    
    console.log(`\n⚠️  警告: ${results.warnings.length} 项`);
    results.warnings.forEach(item => console.log(`   - ${item}`));
    
    console.log('\n');
    
    process.exit(results.failed.length > 0 ? 1 : 0);
  })
  .catch(error => {
    console.error('检查脚本执行失败:', error);
    process.exit(1);
  });
