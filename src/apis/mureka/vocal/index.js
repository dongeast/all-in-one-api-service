/**
 * Vocal API 入口
 */

const VocalCloning = require('./vocal-cloning')

class Vocal {
  /**
   * 创建Vocal API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    this.clone = new VocalCloning(service)
  }
}

module.exports = Vocal
