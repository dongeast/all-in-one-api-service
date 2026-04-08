/**
 * Add Upload Part API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/mureka/upload/add-upload-part')

/**
 * Add Upload Part API类
 */
class AddUploadPart extends BaseAPI {
  /**
   * 创建Add Upload Part API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'upload-part'
    this.endpoint = '/uploads/add'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return {
      upload_id: params.upload_id,
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
    
    formData.append('upload_id', params.upload_id)
    formData.append('file', params.file)

    return await this.service.uploadFile(this.endpoint, formData, options)
  }
}

module.exports = AddUploadPart
