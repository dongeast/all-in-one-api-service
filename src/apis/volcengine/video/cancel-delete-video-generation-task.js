/**
 * 火山引擎取消/删除视频生成任务API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/volcengine/video/cancel-delete-video-generation-task')

/**
 * 火山引擎取消/删除视频生成任务API类
 */
class CancelDeleteVideoGenerationTask extends BaseAPI {
  /**
   * 创建火山引擎取消/删除视频生成任务API实例
   * @param {object} service - 火山引擎服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'volcengine-video'
    this.endpoint = '/contents/generations/tasks/{id}'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return {
      id: params.id
    }
  }

  /**
   * 调用API
   * @param {object} params - API参数
   * @param {object} options - 调用选项
   * @returns {Promise<any>} API响应
   */
  async callAPI(params, options) {
    const endpoint = this.endpoint.replace('{id}', params.id)
    return await this.service.call(endpoint, {}, { method: 'DELETE', ...options })
  }
}

module.exports = CancelDeleteVideoGenerationTask
