/**
 * Upload File API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/mureka/files/upload-file')

/**
 * Upload File API类
 */
class UploadFile extends BaseAPI {
  /**
   * 创建Upload File API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'file-upload'
    this.endpoint = '/files/upload'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return {
      file: params.file,
      purpose: params.purpose
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
    formData.append('purpose', params.purpose)

    return await this.service.uploadFile(this.endpoint, formData, options)
  }
}

module.exports = UploadFile
