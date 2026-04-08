/**
 * Query Instrumental Task API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/mureka/instrumental/query-task')

/**
 * Query Instrumental Task API类
 */
class QueryInstrumentalTask extends BaseAPI {
  /**
   * 创建Query Instrumental Task API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'instrumental-query'
    this.endpoint = '/instrumental/query/{task_id}'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return {
      task_id: params.task_id
    }
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

module.exports = QueryInstrumentalTask
