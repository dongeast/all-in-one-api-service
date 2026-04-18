/**
 * 查询逻辑验证测试
 * 验证各种查询方法是否正确工作
 */

const initializer = require('../src/core/initializer');
const { functionManager } = require('../src/functions');

async function testQueryLogic() {
  console.log('=== 查询逻辑验证测试 ===\n');
  
  try {
    // 初始化
    await initializer.initialize();
    
    // 测试1: getAvailableOptions - 不传参数
    console.log('1. 测试 getAvailableOptions - 不传参数');
    const result1 = functionManager.getAvailableOptions({});
    console.log(`   apiTypes: ${result1.apiTypes.length}`);
    console.log(`   series: ${result1.series.length}`);
    console.log(`   models: ${result1.models.length}`);
    console.log(`   providers: ${result1.providers.length}`);
    console.log(`   functions: ${result1.functions.length}`);
    
    // 测试2: getAvailableOptions - 只传 apiType
    console.log('\n2. 测试 getAvailableOptions - apiType=text_to_video');
    const result2 = functionManager.getAvailableOptions({ apiType: 'text_to_video' });
    console.log(`   apiTypes: ${result2.apiTypes.length}`);
    console.log(`   series: ${result2.series.length}`);
    console.log(`   models: ${result2.models.length}`);
    console.log(`   providers: ${result2.providers.length}`);
    console.log(`   functions: ${result2.functions.length}`);
    
    // 验证返回的数据是否合理
    if (result2.series.length === 0) {
      console.log('   ⚠️  警告: series 为空');
    }
    if (result2.models.length === 0) {
      console.log('   ❌ 错误: models 为空');
    }
    
    // 测试3: getAvailableOptions - apiType + series
    if (result2.series.length > 0) {
      console.log('\n3. 测试 getAvailableOptions - apiType + series');
      const result3 = functionManager.getAvailableOptions({ 
        apiType: 'text_to_video', 
        series: result2.series[0] 
      });
      console.log(`   series: ${result3.series.length}`);
      console.log(`   models: ${result3.models.length}`);
      console.log(`   providers: ${result3.providers.length}`);
      console.log(`   functions: ${result3.functions.length}`);
    }
    
    // 测试4: getAvailableOptions - apiType + series + model
    if (result2.models.length > 0) {
      console.log('\n4. 测试 getAvailableOptions - apiType + series + model');
      const result4 = functionManager.getAvailableOptions({ 
        apiType: 'text_to_video', 
        series: result2.series[0],
        model: result2.models[0]
      });
      console.log(`   models: ${result4.models.length}`);
      console.log(`   providers: ${result4.providers.length}`);
      console.log(`   functions: ${result4.functions.length}`);
    }
    
    // 测试5: 其他 API 类型
    console.log('\n5. 测试其他 API 类型');
    const otherApiTypes = ['image_to_video', 'text_to_image', 'song_generation'];
    
    for (const apiType of otherApiTypes) {
      const result = functionManager.getAvailableOptions({ apiType });
      console.log(`\n   ${apiType}:`);
      console.log(`     series: ${result.series.length}`);
      console.log(`     models: ${result.models.length}`);
      console.log(`     providers: ${result.providers.length}`);
      console.log(`     functions: ${result.functions.length}`);
    }
    
    // 验证结果
    console.log('\n=== 验证结果 ===');
    
    let passed = true;
    
    if (result1.apiTypes.length === 0) {
      console.log('❌ 错误: 不传参数时 apiTypes 为空');
      passed = false;
    } else {
      console.log(`✅ 通过: 不传参数时返回 ${result1.apiTypes.length} 个 apiTypes`);
    }
    
    if (result2.models.length === 0) {
      console.log('❌ 错误: text_to_video 类型没有找到模型');
      passed = false;
    } else {
      console.log(`✅ 通过: text_to_video 类型找到 ${result2.models.length} 个模型`);
    }
    
    if (result2.series.length === 0) {
      console.log('❌ 错误: text_to_video 类型没有找到系列');
      passed = false;
    } else {
      console.log(`✅ 通过: text_to_video 类型找到 ${result2.series.length} 个系列`);
    }
    
    if (result2.providers.length === 0) {
      console.log('❌ 错误: text_to_video 类型没有找到提供商');
      passed = false;
    } else {
      console.log(`✅ 通过: text_to_video 类型找到 ${result2.providers.length} 个提供商`);
    }
    
    if (result2.functions.length === 0) {
      console.log('⚠️  警告: text_to_video 类型没有找到 functions (可能需要修复)');
    } else {
      console.log(`✅ 通过: text_to_video 类型找到 ${result2.functions.length} 个 functions`);
    }
    
    if (passed) {
      console.log('\n✅ 查询逻辑验证完成 - 所有核心测试通过');
    } else {
      console.log('\n❌ 查询逻辑验证完成 - 存在失败的测试');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ 测试失败:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

testQueryLogic();
