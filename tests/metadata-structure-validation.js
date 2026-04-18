/**
 * 元数据结构验证测试
 * 验证 API、Function、Model 元数据的结构是否符合预期
 */

const initializer = require('../src/core/initializer');
const { functionManager } = require('../src/functions');
const functionRegistry = require('../src/functions/function-registry');
const unifiedRegistry = require('../src/registry/unified-registry');

async function testMetadataStructure() {
  console.log('=== 元数据结构验证测试 ===\n');
  
  try {
    // 初始化
    await initializer.initialize();
    
    // 测试1: API 元数据结构
    console.log('1. 验证 API 元数据结构');
    const apis = unifiedRegistry.apiRegistry.getAll();
    console.log(`   总共 ${apis.length} 个 API`);
    
    let apiWithApiType = 0;
    let apiWithModels = 0;
    
    apis.forEach(api => {
      if (api.apiType) apiWithApiType++;
      if (api.models && api.models.length > 0) apiWithModels++;
    });
    
    console.log(`   有 apiType 字段的 API: ${apiWithApiType}`);
    console.log(`   有 models 字段的 API: ${apiWithModels}`);
    
    // 测试2: Function 元数据结构
    console.log('\n2. 验证 Function 元数据结构');
    const functions = functionRegistry.getAll();
    console.log(`   总共 ${functions.length} 个 Function`);
    
    let funcWithApiType = 0;
    let funcWithModels = 0;
    
    functions.forEach(func => {
      if (func.apiType) funcWithApiType++;
      if (func.models && func.models.length > 0) funcWithModels++;
    });
    
    console.log(`   有 apiType 字段的 Function: ${funcWithApiType}`);
    console.log(`   有 models 字段的 Function: ${funcWithModels}`);
    
    // 测试3: Model 元数据结构
    console.log('\n3. 验证 Model 元数据结构');
    const models = unifiedRegistry.modelRegistry.getAll();
    console.log(`   总共 ${models.length} 个 Model`);
    
    let modelWithType = 0;
    let modelWithSeries = 0;
    
    models.forEach(model => {
      if (model.type) modelWithType++;
      if (model.series) modelWithSeries++;
    });
    
    console.log(`   有 type 字段的 Model: ${modelWithType} (预期为 0)`);
    console.log(`   有 series 字段的 Model: ${modelWithSeries}`);
    
    // 验证结果
    console.log('\n=== 验证结果 ===');
    
    let passed = true;
    
    if (modelWithType !== 0) {
      console.log('❌ 错误: Model 元数据中存在 type 字段，预期应该没有');
      passed = false;
    } else {
      console.log('✅ 通过: Model 元数据中没有 type 字段');
    }
    
    if (modelWithSeries !== models.length) {
      console.log('❌ 错误: 不是所有 Model 都有 series 字段');
      passed = false;
    } else {
      console.log('✅ 通过: 所有 Model 都有 series 字段');
    }
    
    if (funcWithApiType === 0) {
      console.log('❌ 错误: 没有 Function 有 apiType 字段');
      passed = false;
    } else {
      console.log(`✅ 通过: 有 ${funcWithApiType} 个 Function 有 apiType 字段`);
    }
    
    if (funcWithModels === 0) {
      console.log('❌ 错误: 没有 Function 有 models 字段');
      passed = false;
    } else {
      console.log(`✅ 通过: 有 ${funcWithModels} 个 Function 有 models 字段`);
    }
    
    if (passed) {
      console.log('\n✅ 元数据结构验证完成 - 所有测试通过');
    } else {
      console.log('\n❌ 元数据结构验证完成 - 存在失败的测试');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ 测试失败:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

testMetadataStructure();
