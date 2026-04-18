/**
 * 后端初始化流程检查脚本
 * 验证 Initializer 和 UnifiedRegistry 是否正常工作
 */

const path = require('path');
const fs = require('fs');

// 设置测试环境
process.env.NODE_ENV = 'test';

// 动态导入模块
const projectRoot = path.resolve(__dirname, '..');
const srcPath = path.join(projectRoot, 'src');

console.log('='.repeat(80));
console.log('后端初始化流程检查');
console.log('='.repeat(80));
console.log('');

async function checkInitialization() {
  const results = {
    passed: [],
    failed: [],
    warnings: []
  };

  try {
    // 1. 检查 Initializer
    console.log('1. 检查 Initializer 初始化');
    console.log('-'.repeat(80));
    
    const initializerPath = path.join(srcPath, 'core', 'initializer.js');
    if (!fs.existsSync(initializerPath)) {
      results.failed.push('Initializer 文件不存在');
      console.log('❌ Initializer 文件不存在:', initializerPath);
      return results;
    }
    
    const initializerModule = require(initializerPath);
    const initializer = initializerModule.initializer || initializerModule;
    console.log('✅ Initializer 模块加载成功');
    
    // 检查 initializer 对象
    if (!initializer) {
      results.failed.push('Initializer 对象为 undefined');
      console.log('❌ Initializer 对象为 undefined');
      return results;
    }
    
    // 重置初始化器
    if (initializer.initialized) {
      initializer.reset();
    }
    
    // 执行初始化
    const startTime = Date.now();
    await initializer.initialize();
    const duration = Date.now() - startTime;
    
    console.log(`✅ 初始化完成，耗时: ${duration}ms`);
    
    if (duration < 100) {
      results.passed.push(`初始化性能符合要求: ${duration}ms < 100ms`);
    } else {
      results.warnings.push(`初始化性能较慢: ${duration}ms > 100ms`);
    }
    
    // 检查初始化状态
    if (initializer.isInitialized()) {
      results.passed.push('Initializer 初始化状态正确');
      console.log('✅ Initializer 初始化状态正确');
    } else {
      results.failed.push('Initializer 初始化状态不正确');
      console.log('❌ Initializer 初始化状态不正确');
    }
    
    // 获取统计信息
    const stats = initializer.getStats();
    console.log('\nInitializer 统计信息:');
    console.log(JSON.stringify(stats, null, 2));
    
    console.log('\n');
    
    // 2. 检查 UnifiedRegistry
    console.log('2. 检查 UnifiedRegistry 注册');
    console.log('-'.repeat(80));
    
    const unifiedRegistryPath = path.join(srcPath, 'registry', 'unified-registry.js');
    if (!fs.existsSync(unifiedRegistryPath)) {
      results.failed.push('UnifiedRegistry 文件不存在');
      console.log('❌ UnifiedRegistry 文件不存在:', unifiedRegistryPath);
      return results;
    }
    
    const unifiedRegistryModule = require(unifiedRegistryPath);
    const unifiedRegistry = unifiedRegistryModule.unifiedRegistry || unifiedRegistryModule;
    console.log('✅ UnifiedRegistry 模块加载成功');
    
    // 检查初始化状态
    if (unifiedRegistry.isInitialized()) {
      results.passed.push('UnifiedRegistry 初始化状态正确');
      console.log('✅ UnifiedRegistry 初始化状态正确');
    } else {
      results.failed.push('UnifiedRegistry 初始化状态不正确');
      console.log('❌ UnifiedRegistry 初始化状态不正确');
    }
    
    // 获取统计信息
    const registryStats = unifiedRegistry.getStats();
    console.log('\nUnifiedRegistry 统计信息:');
    console.log(JSON.stringify(registryStats, null, 2));
    
    // 检查 provider 列表
    const providers = unifiedRegistry.getProviders();
    console.log('\n已注册的 Providers:', providers);
    
    if (providers.length > 0) {
      results.passed.push(`Provider 注册成功: ${providers.length} 个`);
    } else {
      results.failed.push('没有 Provider 被注册');
    }
    
    // 检查各注册中心的数量
    if (registryStats.models && registryStats.models.total > 0) {
      results.passed.push(`Models 注册成功: ${registryStats.models.total} 个`);
    } else {
      results.failed.push('Models 注册失败或数量为 0');
    }
    
    if (registryStats.apis && registryStats.apis.total > 0) {
      results.passed.push(`APIs 注册成功: ${registryStats.apis.total} 个`);
    } else {
      results.failed.push('APIs 注册失败或数量为 0');
    }
    
    if (registryStats.functions && registryStats.functions.total > 0) {
      results.passed.push(`Functions 注册成功: ${registryStats.functions.total} 个`);
    } else {
      results.failed.push('Functions 注册失败或数量为 0');
    }
    
    if (registryStats.credits && registryStats.credits.apiCredits > 0) {
      results.passed.push(`Credits 注册成功: ${registryStats.credits.apiCredits} 个 API 积分配置`);
    } else {
      results.warnings.push('Credits 注册失败或数量为 0');
    }
    
    console.log('\n');
    
    // 3. 验证注册数据
    console.log('3. 验证注册数据');
    console.log('-'.repeat(80));
    
    const validationResult = unifiedRegistry.validate();
    console.log('\n验证结果:');
    console.log(JSON.stringify(validationResult, null, 2));
    
    if (validationResult.valid) {
      results.passed.push('注册数据验证通过');
      console.log('✅ 注册数据验证通过');
    } else {
      results.failed.push(`注册数据验证失败: ${validationResult.errors.join(', ')}`);
      console.log('❌ 注册数据验证失败:', validationResult.errors);
    }
    
    if (validationResult.warnings.length > 0) {
      validationResult.warnings.forEach(warning => {
        results.warnings.push(warning);
        console.log('⚠️  警告:', warning);
      });
    }
    
  } catch (error) {
    results.failed.push(`初始化检查失败: ${error.message}`);
    console.error('❌ 初始化检查失败:', error);
    console.error(error.stack);
  }
  
  return results;
}

// 执行检查
checkInitialization()
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
    
    // 返回退出码
    process.exit(results.failed.length > 0 ? 1 : 0);
  })
  .catch(error => {
    console.error('检查脚本执行失败:', error);
    process.exit(1);
  });
