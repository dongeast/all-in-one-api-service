/**
 * Instrumental API 入口
 */

const GenerateInstrumental = require('./generate-instrumental')
const QueryInstrumentalTask = require('./query-task')

class Instrumental {
  /**
   * 创建Instrumental API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    this.generate = new GenerateInstrumental(service)
    this.query = new QueryInstrumentalTask(service)
  }
}

module.exports = Instrumental
