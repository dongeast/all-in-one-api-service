/**
 * Create Upload API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/mureka/upload/create-upload')

/**
 * Create Upload API类
 */
class CreateUpload extends BaseAPI {
  /**
   * 创建Create Upload API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'upload'
    this.endpoint = '/uploads/create'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return {
      upload_name: params.upload_name,
      purpose: params.purpose,
      bytes: params.bytes
    }
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

module.exports = CreateUpload
