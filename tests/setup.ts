/**
 * Jest 测试环境设置文件
 */

// 设置测试超时时间
jest.setTimeout(10000)

// 全局测试钩子
beforeAll(() => {
  // 测试开始前的初始化
})

afterAll(() => {
  // 测试结束后的清理
})

// 模拟环境变量
process.env['NODE_ENV'] = 'test'
