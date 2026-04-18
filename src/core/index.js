/**
 * Core 模块入口
 */

const initializer = require('./initializer')

module.exports = {
  initializer,
  Initializer: initializer.Initializer
}
