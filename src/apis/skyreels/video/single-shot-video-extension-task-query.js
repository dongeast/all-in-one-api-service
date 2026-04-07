/**
 * Single-shot Video Extension Task Query API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/skyreels/video/single-shot-video-extension-task-query')

/**
 * Single-shot Video Extension Task Query API类
 */
class SingleShotVideoExtensionTaskQuery extends BaseAPI {
  /**
   * 创建Single-shot Video Extension Task Query API实例
   * @param {object} service - Skyreels服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'single-shot-video-extension'
    this.endpoint = '/video/extension/task/{task_id}'
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

module.exports = SingleShotVideoExtensionTaskQuery
