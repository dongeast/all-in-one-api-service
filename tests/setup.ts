/**
 * Jest 测试设置文件
 * 在所有测试运行前执行
 */

process.env['NODE_ENV'] = 'test'

// 导入测试工具函数和常量到全局作用域
const testUtils = require('./helpers/test-utils')
const constants = require('../src/constants')
Object.assign(global, testUtils, constants)

global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
}

expect.extend({
  toBeValidRegistry(received) {
    const pass = received && typeof received.register === 'function' && typeof received.get === 'function'
    return {
      pass,
      message: () => pass
        ? `expected ${received} not to be a valid registry`
        : `expected ${received} to be a valid registry with register and get methods`
    }
  },
  
  toBeValidI18nManager(received) {
    const pass = received && 
      typeof received.t === 'function' && 
      typeof received.registerResources === 'function' &&
      typeof received.getLanguageFromRequest === 'function'
    return {
      pass,
      message: () => pass
        ? `expected ${received} not to be a valid I18nManager`
        : `expected ${received} to be a valid I18nManager with t, registerResources, and getLanguageFromRequest methods`
    }
  }
})
