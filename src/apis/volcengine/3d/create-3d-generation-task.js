/**
 * 火山引擎创建3D生成任务API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/volcengine/3d/create-3d-generation-task')

/**
 * 火山引擎创建3D生成任务API类
 */
class Create3DGenerationTask extends BaseAPI {
  /**
   * 创建火山引擎创建3D生成任务API实例
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
    const apiParams = {
      model: params.model,
      content: params.content
    }

    return apiParams
  }

  /**
   * 调用API
   * @param {object} params - API参数
   * @param {object} options - 调用选项
   * @returns {Promise<any>} API响应
   */
  async callAPI(params, options) {
    return await this.service.call(this.endpoint, params, options)
  }
}

module.exports = Create3DGenerationTask
