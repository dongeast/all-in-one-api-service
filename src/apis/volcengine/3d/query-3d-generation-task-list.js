/**
 * 火山引擎查询3D生成任务列表API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/volcengine/3d/query-3d-generation-task-list')

/**
 * 火山引擎查询3D生成任务列表API类
 */
class Query3DGenerationTaskList extends BaseAPI {
  /**
   * 创建火山引擎查询3D生成任务列表API实例
   * @param {object} service - 火山引擎服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'volcengine-3d'
    this.endpoint = '/contents/generations/tasks'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    const queryParams = {}

    if (params.page_num !== undefined) {
      queryParams.page_num = params.page_num
    }

    if (params.page_size !== undefined) {
      queryParams.page_size = params.page_size
    }

    if (params['filter.status'] !== undefined) {
      queryParams['filter.status'] = params['filter.status']
    }

    if (params['filter.task_ids'] !== undefined) {
      queryParams['filter.task_ids'] = params['filter.task_ids']
    }

    if (params['filter.model'] !== undefined) {
      queryParams['filter.model'] = params['filter.model']
    }

    return queryParams
  }

  /**
   * 调用API
   * @param {object} params - API参数
   * @param {object} options - 调用选项
   * @returns {Promise<any>} API响应
   */
  async callAPI(params, options) {
    const queryString = Object.entries(params)
      .filter(([key, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&')

    const endpoint = queryString ? `${this.endpoint}?${queryString}` : this.endpoint
    return await this.service.call(endpoint, {}, { method: 'GET', ...options })
  }
}

module.exports = Query3DGenerationTaskList
