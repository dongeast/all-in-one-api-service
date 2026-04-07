/**
 * Imagen API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/gemini/image/imagen')

/**
 * Imagen API类
 */
class Imagen extends BaseAPI {
  /**
   * 创建Imagen API实例
   * @param {object} service - Gemini服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'imagen'
    this.endpoint = '/models/imagen:generateImage'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return {
      prompt: params.prompt,
      sampleCount: params.sampleCount || 1,
      aspectRatio: params.aspectRatio || '1:1',
      safetyFilterLevel: params.safetyFilterLevel || 'block_medium_and_above'
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

module.exports = Imagen
