/**
 * Lip Sync Task Query API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/skyreels/avatar/lip-sync-task-query')

/**
 * Lip Sync Task Query API类
 */
class LipSyncTaskQuery extends BaseAPI {
  /**
   * 创建Lip Sync Task Query API实例
   * @param {object} service - Skyreels服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'lip-sync'
    this.endpoint = '/video/retalking/task/{task_id}'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return params
  }

  /**
   * 调用API
   * @param {object} params - API参数
   * @param {object} options - 调用选项
   * @returns {Promise<any>} API响应
   */
  async callAPI(params, options) {
    const endpoint = this.endpoint.replace('{task_id}', params.task_id)
    return await this.service.call(endpoint, {}, { method: 'GET', ...options })
  }
}

module.exports = LipSyncTaskQuery
