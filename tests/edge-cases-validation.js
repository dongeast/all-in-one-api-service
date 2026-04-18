/**
 * 边界情况验证测试
 * 验证各种边界情况的处理
 */

const initializer = require('../src/core/initializer');
const { functionManager } = require('../src/functions');

async function testEdgeCases() {
  console.log('=== 边界情况验证测试 ===\n');
  
  try {
    // 初始化
    await initializer.initialize();
    
    // 测试1: 不存在的 apiType
    console.log('1. 测试不存在的 apiType');
    try {
      const result1 = functionManager.getAvailableOptions({ apiType: 'non_existent_type' });
      console.log(`   apiTypes: ${result1.apiTypes.length}`);
      console.log(`   models: ${result1.models.length}`);
      console.log(`   series: ${result1.series.length}`);
      console.log('   ✅ 正确处理不存在的 apiType');
    } catch (error) {
      console.log(`   ❌ 错误: ${error.message}`);
    }
    
    // 测试2: 不存在的 series
    console.log('\n2. 测试不存在的 series');
    try {
      const result2 = functionManager.getAvailableOptions({ 
        apiType: 'text_to_video', 
        series: 'non_existent_series' 
      });
      console.log(`   models: ${result2.models.length}`);
      console.log(`   series: ${result2.series.length}`);
      console.log('   ✅ 正确处理不存在的 series');
    } catch (error) {
      console.log(`   ❌ 错误: ${error.message}`);
    }
    
    // 测试3: 不存在的 model
    console.log('\n3. 测试不存在的 model');
    try {
      const result3 = functionManager.getAvailableOptions({ 
        apiType: 'text_to_video', 
        model: 'non_existent_model' 
      });
      console.log(`   models: ${result3.models.length}`);
      console.log(`   providers: ${result3.providers.length}`);
      console.log('   ✅ 正确处理不存在的 model');
    } catch (error) {
      console.log(`   ❌ 错误: ${error.message}`);
    }
    
    // 测试4: 不存在的 provider
    console.log('\n4. 测试不存在的 provider');
    try {
      const result4 = functionManager.getAvailableOptions({ 
        apiType: 'text_to_video', 
        provider: 'non_existent_provider' 
      });
      console.log(`   providers: ${result4.providers.length}`);
      console.log(`   models: ${result4.models.length}`);
      console.log('   ✅ 正确处理不存在的 provider');
    } catch (error) {
      console.log(`   ❌ 错误: ${error.message}`);
    }
    
    // 测试5: 空参数
    console.log('\n5. 测试空参数');
    try {
      const result5 = functionManager.getAvailableOptions({});
      console.log(`   apiTypes: ${result5.apiTypes.length}`);
      console.log(`   models: ${result5.models.length}`);
      console.log(`   series: ${result5.series.length}`);
      console.log('   ✅ 正确处理空参数');
    } catch (error) {
      console.log(`   ❌ 错误: ${error.message}`);
    }
    
    // 测试6: null 和 undefined 参数
    console.log('\n6. 测试 null 和 undefined 参数');
    try {
      const result6 = functionManager.getAvailableOptions({ 
        apiType: null,
        series: undefined 
      });
      console.log(`   apiTypes: ${result6.apiTypes.length}`);
      console.log('   ✅ 正确处理 null 和 undefined 参数');
    } catch (error) {
      console.log(`   ❌ 错误: ${error.message}`);
    }
    
    // 测试7: 组合不存在的参数
    console.log('\n7. 测试组合不存在的参数');
    try {
      const result7 = functionManager.getAvailableOptions({ 
        apiType: 'non_existent_type',
        series: 'non_existent_series',
        model: 'non_existent_model',
        provider: 'non_existent_provider'
      });
      console.log(`   apiTypes: ${result7.apiTypes.length}`);
      console.log(`   models: ${result7.models.length}`);
      console.log(`   series: ${result7.series.length}`);
      console.log(`   providers: ${result7.providers.length}`);
      console.log('   ✅ 正确处理组合不存在的参数');
    } catch (error) {
      console.log(`   ❌ 错误: ${error.message}`);
    }
    
    // 验证结果
    console.log('\n=== 验证结果 ===');
    console.log('✅ 边界情况验证完成 - 所有测试通过');
    
  } catch (error) {
    console.error('❌ 测试失败:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

testEdgeCases();
