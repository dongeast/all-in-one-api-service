/**
 * API层入口
 * 重构后：API层成为纯数据定义层
 * 不再包含API类实现，只导出API定义工具类
 */

const APIDefinition = require('./api-definition')

module.exports = {
  APIDefinition
}
