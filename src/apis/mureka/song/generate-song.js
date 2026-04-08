/**
 * Generate Song API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/mureka/song/generate-song')

/**
 * Generate Song API类
 */
class GenerateSong extends BaseAPI {
  /**
   * 创建Generate Song API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'song-generate'
    this.endpoint = '/song/generate'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    const apiParams = {
      lyrics: params.lyrics,
    }
    
    if (params.model) {
      apiParams.model = params.model
    }
    
    if (params.n !== undefined) {
      apiParams.n = params.n
    }
    
    if (params.prompt) {
      apiParams.prompt = params.prompt
    }
    
    if (params.reference_id) {
      apiParams.reference_id = params.reference_id
    }
    
    if (params.vocal_id) {
      apiParams.vocal_id = params.vocal_id
    }
    
    if (params.melody_id) {
      apiParams.melody_id = params.melody_id
    }
    
    if (params.stream !== undefined) {
      apiParams.stream = params.stream
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

module.exports = GenerateSong
