/**
 * Vocal Cloning API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/mureka/vocal/vocal-cloning')

/**
 * Vocal Cloning API类
 */
class VocalCloning extends BaseAPI {
  /**
   * 创建Vocal Cloning API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'vocal-clone'
    this.endpoint = '/vocal/clone'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return {
      file: params.file
    }
  }

  /**
   * 调用API
   * @param {object} params - API参数
   * @param {object} options - 调用选项
   * @returns {Promise<any>} API响应
   */
  async callAPI(params, options) {
    const FormData = require('form-data')
    const formData = new FormData()
    
    formData.append('file', params.file)

    return await this.service.uploadFile(this.endpoint, formData, options)
  }
}

module.exports = VocalCloning
