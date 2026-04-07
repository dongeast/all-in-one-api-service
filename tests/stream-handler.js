/**
 * StreamHandler 测试
 */

const { StreamHandler } = require('../src/utils/stream-handler')

async function testStreamHandler() {
  console.log('=== 测试: StreamHandler ===\n')

  try {
    const handler = new StreamHandler()

    // 测试SSE解析
    const sseData = 'data: {"content":"test"}\n\nevent: message\ndata: {"type":"text"}\n\n'
    const events = handler.parseSSEChunk(sseData)

    if (events.length === 2) {
      console.log('✅ SSE解析正确:')
      console.log(`   事件数量: ${events.length}`)
      console.log(`   第一个事件数据: ${events[0].data}`)
      console.log(`   第二个事件类型: ${events[1].type}`)
      console.log('✅ 测试通过\n')
    } else {
      console.log('❌ 测试失败: SSE解析结果不正确\n')
    }
  } catch (error) {
    console.error('❌ 测试失败:', error.message, '\n')
  }
}

if (require.main === module) {
  testStreamHandler().catch(console.error)
}

module.exports = { testStreamHandler }
