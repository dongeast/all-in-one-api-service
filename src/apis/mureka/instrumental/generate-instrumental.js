/**
 * Generate Instrumental API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/mureka/instrumental/generate-instrumental')

/**
 * Generate Instrumental API类
 */
class GenerateInstrumental extends BaseAPI {
  /**
   * 创建Generate Instrumental API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'instrumental-generate'
    this.endpoint = '/instrumental/generate'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    const apiParams = {}
    
    if (params.model) {
      apiParams.model = params.model
    }
    
    if (params.n !== undefined) {
      apiParams.n = params.n
    }
    
    if (params.prompt) {
      apiParams.prompt = params.prompt
    }
    
    if (params.instrumental_id) {
      apiParams.instrumental_id = params.instrumental_id
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

module.exports = GenerateInstrumental
