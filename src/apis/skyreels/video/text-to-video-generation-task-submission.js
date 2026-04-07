/**
 * Text to Video Generation Task Submission API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/skyreels/video/text-to-video-generation-task-submission')

/**
 * Text to Video Generation Task Submission API类
 */
class TextToVideoGenerationTaskSubmission extends BaseAPI {
  /**
   * 创建Text to Video Generation Task Submission API实例
   * @param {object} service - Skyreels服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'text-to-video'
    this.endpoint = '/video/text2video/submit'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    return {
      api_key: this.service.getApiKey(),
      prompt: params.prompt,
      duration: params.duration || 5,
      aspect_ratio: params.aspect_ratio || '16:9',
      sound: params.sound || false,
      prompt_optimizer: params.prompt_optimizer !== false,
      mode: params.mode || 'std'
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

module.exports = TextToVideoGenerationTaskSubmission
