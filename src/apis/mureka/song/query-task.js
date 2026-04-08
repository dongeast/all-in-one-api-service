/**
 * Query Task API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/mureka/song/query-task')

/**
 * Query Task API类
 */
class QueryTask extends BaseAPI {
  /**
   * 创建Query Task API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'song-query'
    this.endpoint = '/song/query/{task_id}'
  }

  
  prepareAPIParams(params) {
    return {}
  }

  /**
   * 调用API
   * @param {object} params - API参数
   * @param {object} options - 调用选项
   * @returns {Promise<any>} API响应
   */
  async callAPI(params, options) {
    return await this.service.queryTask(this.endpoint, params.task_id, options)
  }
}

module.exports = QueryTask
