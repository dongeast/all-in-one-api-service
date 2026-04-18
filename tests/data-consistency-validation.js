/**
 * 数据一致性验证测试
 * 验证注册中心实例和数据的一致性
 */

const initializer = require('../src/core/initializer');
const unifiedRegistry = require('../src/registry/unified-registry');
const modelRegistry = require('../src/registry/model-registry');
const apiRegistry = require('../src/registry/api-registry');
const functionRegistry = require('../src/functions/function-registry');

async function testDataConsistency() {
  console.log('=== 数据一致性验证测试 ===\n');
  
  try {
    // 初始化
    await initializer.initialize();
    
    // 测试1: 注册中心实例一致性
    console.log('1. 验证注册中心实例一致性');
    const isModelRegistrySame = unifiedRegistry.modelRegistry === modelRegistry;
    const isApiRegistrySame = unifiedRegistry.apiRegistry === apiRegistry;
    
    console.log(`   modelRegistry 是否同一实例: ${isModelRegistrySame ? '✅' : '❌'}`);
    console.log(`   apiRegistry 是否同一实例: ${isApiRegistrySame ? '✅' : '❌'}`);
    
    // 测试2: 数据完整性
    console.log('\n2. 验证数据完整性');
    
    // 检查 Function 引用的模型是否存在
    const functions = functionRegistry.getAll();
    let missingModels = 0;
    const missingModelList = [];
    
    functions.forEach(func => {
      if (func.models && func.models.length > 0) {
        func.models.forEach(modelName => {
          if (!unifiedRegistry.modelRegistry.has(modelName)) {
            missingModelList.push({ func: func.name, model: modelName });
            missingModels++;
          }
        });
      }
    });
    
    if (missingModels > 0) {
      console.log(`   ⚠️  发现 ${missingModels} 个缺失的模型引用:`);
      missingModelList.slice(0, 5).forEach(item => {
        console.log(`     - Function ${item.func} 引用的模型 ${item.model} 不存在`);
      });
      if (missingModelList.length > 5) {
        console.log(`     ... 还有 ${missingModelList.length - 5} 个`);
      }
    } else {
      console.log(`   ✅ 所有 Function 引用的模型都存在`);
    }
    
    // 检查 Function 引用的 API 是否存在
    let missingApis = 0;
    const missingApiList = [];
    
    functions.forEach(func => {
      if (func.apis) {
        Object.entries(func.apis).forEach(([key, apiName]) => {
          if (apiName && !unifiedRegistry.apiRegistry.has(apiName)) {
            missingApiList.push({ func: func.name, api: apiName, key });
            missingApis++;
          }
        });
      }
    });
    
    if (missingApis > 0) {
      console.log(`   ⚠️  发现 ${missingApis} 个缺失的 API 引用:`);
      missingApiList.slice(0, 5).forEach(item => {
        console.log(`     - Function ${item.func} 的 ${item.key} API ${item.api} 不存在`);
      });
      if (missingApiList.length > 5) {
        console.log(`     ... 还有 ${missingApiList.length - 5} 个`);
      }
    } else {
      console.log(`   ✅ 所有 Function 引用的 API 都存在`);
    }
    
    // 测试3: 数据统计
    console.log('\n3. 数据统计');
    console.log(`   Models: ${unifiedRegistry.modelRegistry.size()}`);
    console.log(`   APIs: ${unifiedRegistry.apiRegistry.size()}`);
    console.log(`   Functions: ${functionRegistry.size()}`);
    
    // 验证结果
    console.log('\n=== 验证结果 ===');
    
    let passed = true;
    
    if (!isModelRegistrySame) {
      console.log('❌ 错误: modelRegistry 实例不一致');
      passed = false;
    } else {
      console.log('✅ 通过: modelRegistry 实例一致');
    }
    
    if (!isApiRegistrySame) {
      console.log('❌ 错误: apiRegistry 实例不一致');
      passed = false;
    } else {
      console.log('✅ 通过: apiRegistry 实例一致');
    }
    
    if (missingModels > 0) {
      console.log(`⚠️  警告: 有 ${missingModels} 个模型引用缺失`);
    } else {
      console.log('✅ 通过: 所有模型引用完整');
    }
    
    if (missingApis > 0) {
      console.log(`⚠️  警告: 有 ${missingApis} 个 API 引用缺失`);
    } else {
      console.log('✅ 通过: 所有 API 引用完整');
    }
    
    if (passed) {
      console.log('\n✅ 数据一致性验证完成 - 所有核心测试通过');
    } else {
      console.log('\n❌ 数据一致性验证完成 - 存在失败的测试');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ 测试失败:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

testDataConsistency();
