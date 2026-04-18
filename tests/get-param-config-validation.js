/**
 * 测试 getParamConfig 方法
 * 验证智能识别 Function 名称、API 名称和 Model 名称
 */

const initializer = require('../src/core/initializer');
const unifiedRegistry = require('../src/registry/unified-registry');

async function testGetParamConfig() {
  console.log('=== 测试 getParamConfig 方法 ===\n');
  
  try {
    // 初始化
    await initializer.initialize();
    
    // 测试1: 使用 Function 名称
    console.log('测试1: 使用 Function 名称 "text-to-video-generation"');
    const result1 = unifiedRegistry.getParamConfig(
      'text-to-video-generation',
      {model: 'skyreels-v4'},
      {provider: 'skyreels', language: 'en'}
    );
    console.log('结果:', result1 ? '✅ 成功' : '❌ 失败');
    console.log('参数数量:', result1?.parameters?.length || 0);
    if (result1?.parameters?.length > 0) {
      console.log('前3个参数:', result1.parameters.slice(0, 3).map(p => p.name).join(', '));
    }
    
    // 测试2: 使用 API 名称
    console.log('\n测试2: 使用 API 名称 "skyreels-api-v1-video-text2video-submit"');
    const result2 = unifiedRegistry.getParamConfig(
      'skyreels-api-v1-video-text2video-submit',
      {model: 'skyreels-v4'},
      {provider: 'skyreels', language: 'en'}
    );
    console.log('结果:', result2 ? '✅ 成功' : '❌ 失败');
    console.log('参数数量:', result2?.parameters?.length || 0);
    
    // 测试3: 使用 Model 名称
    console.log('\n测试3: 使用 Model 名称 "skyreels-v4"');
    const result3 = unifiedRegistry.getParamConfig(
      'skyreels-v4',
      {},
      {provider: 'skyreels', language: 'en'}
    );
    console.log('结果:', result3 ? '✅ 成功' : '❌ 失败');
    console.log('参数数量:', result3?.parameters?.length || 0);
    
    // 测试4: 不存在的名称
    console.log('\n测试4: 不存在的名称 "non-existent-api"');
    const result4 = unifiedRegistry.getParamConfig('non-existent-api', {}, {});
    console.log('结果:', result4 === null ? '✅ 正确返回 null' : '❌ 应该返回 null');
    
    // 测试5: 其他 provider 的 Function
    console.log('\n测试5: 其他 provider 的 Function "vidu-text-to-video" (vidu)');
    const result5 = unifiedRegistry.getParamConfig(
      'vidu-text-to-video',
      {model: 'viduq3-turbo'},
      {provider: 'vidu', language: 'en'}
    );
    console.log('结果:', result5 ? '✅ 成功' : '❌ 失败');
    console.log('参数数量:', result5?.parameters?.length || 0);
    
    // 测试6: 其他 provider 的 API 名称
    console.log('\n测试6: 其他 provider 的 API 名称 "vidu-ent-v2-text2video" (vidu)');
    const result6 = unifiedRegistry.getParamConfig(
      'vidu-ent-v2-text2video',
      {model: 'viduq3-turbo'},
      {provider: 'vidu', language: 'en'}
    );
    console.log('结果:', result6 ? '✅ 成功' : '❌ 失败');
    console.log('参数数量:', result6?.parameters?.length || 0);
    
    // 测试7: 多语言支持
    console.log('\n测试7: 多语言支持 (中文)');
    const result7 = unifiedRegistry.getParamConfig(
      'text-to-video-generation',
      {model: 'skyreels-v4'},
      {provider: 'skyreels', language: 'zh'}
    );
    console.log('结果:', result7 ? '✅ 成功' : '❌ 失败');
    console.log('参数数量:', result7?.parameters?.length || 0);
    if (result7?.parameters?.length > 0) {
      const firstParam = result7.parameters[0];
      console.log('第一个参数标签:', firstParam.label || firstParam.name);
    }
    
    // 测试8: 验证一致性
    console.log('\n测试8: 验证 Function 名称和 API 名称返回相同的参数配置');
    const funcParams = result1?.parameters?.map(p => p.name).sort();
    const apiParams = result2?.parameters?.map(p => p.name).sort();
    const isConsistent = JSON.stringify(funcParams) === JSON.stringify(apiParams);
    console.log('结果:', isConsistent ? '✅ 一致' : '❌ 不一致');
    
    // 总结
    console.log('\n=== 测试总结 ===');
    const allTests = [
      { name: 'Function 名称', passed: !!result1 },
      { name: 'API 名称', passed: !!result2 },
      { name: 'Model 名称', passed: !!result3 },
      { name: '不存在的名称', passed: result4 === null },
      { name: '其他 provider Function', passed: !!result5 },
      { name: '其他 provider API', passed: !!result6 },
      { name: '多语言支持', passed: !!result7 },
      { name: '一致性验证', passed: isConsistent },
    ];
    
    const passedCount = allTests.filter(t => t.passed).length;
    console.log(`通过: ${passedCount}/${allTests.length}`);
    
    allTests.forEach(t => {
      console.log(`  ${t.passed ? '✅' : '❌'} ${t.name}`);
    });
    
    if (passedCount === allTests.length) {
      console.log('\n✅ 所有测试通过！');
    } else {
      console.log('\n❌ 部分测试失败');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ 测试失败:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

testGetParamConfig();
