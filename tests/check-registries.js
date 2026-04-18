/**
 * 元数据注册系统检查脚本
 * 验证 API、Model、Function Registry 是否正常工作
 */

const path = require('path');
const fs = require('fs');

process.env.NODE_ENV = 'test';

const projectRoot = path.resolve(__dirname, '..');
const srcPath = path.join(projectRoot, 'src');

console.log('='.repeat(80));
console.log('元数据注册系统检查');
console.log('='.repeat(80));
console.log('');

async function checkRegistries() {
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

    // 1. 检查 API Registry
    console.log('1. 检查 API Registry');
    console.log('-'.repeat(80));
    
    const unifiedRegistryPath = path.join(srcPath, 'registry', 'unified-registry.js');
    const unifiedRegistryModule = require(unifiedRegistryPath);
    const unifiedRegistry = unifiedRegistryModule.unifiedRegistry || unifiedRegistryModule;
    
    const apiRegistry = unifiedRegistry.apiRegistry;
    console.log('✅ API Registry 模块加载成功');
    
    const totalAPIs = apiRegistry.size();
    console.log(`总 API 数量: ${totalAPIs}`);
    
    if (totalAPIs > 0) {
      results.passed.push(`API Registry 注册成功: ${totalAPIs} 个 API`);
    } else {
      results.failed.push('API Registry 注册失败或数量为 0');
    }
    
    // 检查按 provider 查询
    const murekaAPIs = apiRegistry.getByProvider('mureka');
    console.log(`Mureka APIs: ${murekaAPIs.length} 个`);
    
    if (murekaAPIs.length > 0) {
      results.passed.push(`API Registry 按 provider 查询正常`);
    } else {
      results.failed.push('API Registry 按 provider 查询失败');
    }
    
    // 检查按 apiType 查询
    const { APITypes } = require(path.join(srcPath, 'constants'));
    const textToVideoAPIs = apiRegistry.getByAPIType(APITypes.TEXT_TO_VIDEO);
    console.log(`Text to Video APIs: ${textToVideoAPIs.length} 个`);
    
    if (textToVideoAPIs.length > 0) {
      results.passed.push(`API Registry 按 apiType 查询正常`);
    } else {
      results.warnings.push('API Registry 按 apiType 查询返回空结果');
    }
    
    // 检查单个 API 查询
    const firstAPI = murekaAPIs[0];
    if (firstAPI) {
      const api = apiRegistry.get(firstAPI.name);
      if (api) {
        console.log(`单个 API 查询成功: ${api.name}`);
        results.passed.push('API Registry 单个查询正常');
      } else {
        results.failed.push('API Registry 单个查询失败');
      }
    }
    
    // 检查优先级排序
    const allAPIs = apiRegistry.getAll();
    const hasPriority = allAPIs.some(api => api.priority !== undefined);
    if (hasPriority) {
      console.log('✅ API 优先级字段存在');
      results.passed.push('API 优先级字段存在');
    } else {
      results.warnings.push('API 优先级字段缺失');
    }
    
    console.log('\n');
    
    // 2. 检查 Model Registry
    console.log('2. 检查 Model Registry');
    console.log('-'.repeat(80));
    
    const modelRegistry = unifiedRegistry.modelRegistry;
    console.log('✅ Model Registry 模块加载成功');
    
    const totalModels = modelRegistry.size();
    console.log(`总 Model 数量: ${totalModels}`);
    
    if (totalModels > 0) {
      results.passed.push(`Model Registry 注册成功: ${totalModels} 个 Model`);
    } else {
      results.failed.push('Model Registry 注册失败或数量为 0');
    }
    
    // 检查按 provider 查询
    const murekaModels = modelRegistry.getByProvider('mureka');
    console.log(`Mureka Models: ${murekaModels.length} 个`);
    
    if (murekaModels.length > 0) {
      results.passed.push(`Model Registry 按 provider 查询正常`);
    } else {
      results.failed.push('Model Registry 按 provider 查询失败');
    }
    
    // 检查按 series 查询
    const { Series } = require(path.join(srcPath, 'constants'));
    const seriesModels = modelRegistry.getBySeries ? modelRegistry.getBySeries(Series.MUREKA) : [];
    if (seriesModels.length > 0) {
      console.log(`Series Models: ${seriesModels.length} 个`);
      results.passed.push(`Model Registry 按 series 查询正常`);
    } else {
      results.warnings.push('Model Registry 按 series 查询返回空结果');
    }
    
    // 检查单个 Model 查询
    const firstModel = murekaModels[0];
    if (firstModel) {
      const model = modelRegistry.get(firstModel.name);
      if (model) {
        console.log(`单个 Model 查询成功: ${model.name}`);
        results.passed.push('Model Registry 单个查询正常');
      } else {
        results.failed.push('Model Registry 单个查询失败');
      }
    }
    
    // 检查系列和类型关联
    const modelsWithSeries = murekaModels.filter(m => m.series);
    if (modelsWithSeries.length > 0) {
      console.log(`带系列信息的 Models: ${modelsWithSeries.length} 个`);
      results.passed.push('Model 系列关联正确');
    } else {
      results.warnings.push('Model 系列关联缺失');
    }
    
    console.log('\n');
    
    // 3. 检查 Function Registry
    console.log('3. 检查 Function Registry');
    console.log('-'.repeat(80));
    
    const functionRegistry = unifiedRegistry.functionRegistry;
    console.log('✅ Function Registry 模块加载成功');
    
    const totalFunctions = functionRegistry.size();
    console.log(`总 Function 数量: ${totalFunctions}`);
    
    if (totalFunctions > 0) {
      results.passed.push(`Function Registry 注册成功: ${totalFunctions} 个 Function`);
    } else {
      results.failed.push('Function Registry 注册失败或数量为 0');
    }
    
    // 检查 API 映射
    const apiToFunctionIndex = functionRegistry.apiToFunctionIndex;
    if (apiToFunctionIndex && apiToFunctionIndex.size > 0) {
      console.log(`API 映射数量: ${apiToFunctionIndex.size}`);
      results.passed.push(`Function Registry API 映射正常: ${apiToFunctionIndex.size} 个映射`);
    } else {
      results.failed.push('Function Registry API 映射失败或数量为 0');
    }
    
    // 检查按 provider 查询
    const murekaFunctions = functionRegistry.getByProvider('mureka');
    console.log(`Mureka Functions: ${murekaFunctions.length} 个`);
    
    if (murekaFunctions.length > 0) {
      results.passed.push(`Function Registry 按 provider 查询正常`);
    } else {
      results.failed.push('Function Registry 按 provider 查询失败');
    }
    
    // 检查单个 Function 查询
    const firstFunction = murekaFunctions[0];
    if (firstFunction) {
      const func = functionRegistry.get(firstFunction.name);
      if (func) {
        console.log(`单个 Function 查询成功: ${func.name}`);
        results.passed.push('Function Registry 单个查询正常');
      } else {
        results.failed.push('Function Registry 单个查询失败');
      }
    }
    
    // 检查关联 API 查询
    if (firstFunction && firstFunction.apis) {
      const relatedAPIs = functionRegistry.getRelatedAPIs(firstFunction.name);
      if (relatedAPIs) {
        console.log(`关联 APIs: ${JSON.stringify(relatedAPIs)}`);
        results.passed.push('Function Registry 关联 API 查询正常');
      } else {
        results.warnings.push('Function Registry 关联 API 查询返回空结果');
      }
    }
    
    // 检查异步/同步分类
    const asyncFunctions = functionRegistry.getByType ? functionRegistry.getByType('async') : [];
    const syncFunctions = functionRegistry.getByType ? functionRegistry.getByType('sync') : [];
    console.log(`异步 Functions: ${asyncFunctions.length} 个`);
    console.log(`同步 Functions: ${syncFunctions.length} 个`);
    
    if (asyncFunctions.length > 0 && syncFunctions.length > 0) {
      results.passed.push(`Function Registry 异步/同步分类正常`);
    } else {
      results.warnings.push('Function Registry 异步/同步分类不完整');
    }
    
    console.log('\n');
    
    // 4. 检查数据一致性
    console.log('4. 检查数据一致性');
    console.log('-'.repeat(80));
    
    // 检查 Function 引用的 API 是否存在
    let missingAPIs = 0;
    const allFunctions = functionRegistry.getAll();
    allFunctions.forEach(func => {
      if (func.apis) {
        if (func.apis.request && !apiRegistry.has(func.apis.request)) {
          console.log(`⚠️  Function ${func.name} 引用的 request API 不存在: ${func.apis.request}`);
          missingAPIs++;
        }
        if (func.apis.query && !apiRegistry.has(func.apis.query)) {
          console.log(`⚠️  Function ${func.name} 引用的 query API 不存在: ${func.apis.query}`);
          missingAPIs++;
        }
      }
    });
    
    if (missingAPIs === 0) {
      console.log('✅ 所有 Function 引用的 API 都存在');
      results.passed.push('Function 引用的 API 一致性检查通过');
    } else {
      results.warnings.push(`有 ${missingAPIs} 个 Function 引用的 API 不存在`);
    }
    
    // 检查 API 引用的 Model 是否存在
    let missingModels = 0;
    const allAPIsList = apiRegistry.getAll();
    allAPIsList.forEach(api => {
      if (api.models && Array.isArray(api.models)) {
        api.models.forEach(modelName => {
          if (!modelRegistry.has(modelName)) {
            console.log(`⚠️  API ${api.name} 引用的 Model 不存在: ${modelName}`);
            missingModels++;
          }
        });
      }
    });
    
    if (missingModels === 0) {
      console.log('✅ 所有 API 引用的 Model 都存在');
      results.passed.push('API 引用的 Model 一致性检查通过');
    } else {
      results.warnings.push(`有 ${missingModels} 个 API 引用的 Model 不存在`);
    }
    
  } catch (error) {
    results.failed.push(`元数据注册系统检查失败: ${error.message}`);
    console.error('❌ 元数据注册系统检查失败:', error);
    console.error(error.stack);
  }
  
  return results;
}

// 执行检查
checkRegistries()
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
