/**
 * Midjourney V6 API
 */

const BaseAPI = require('../../base-api')
const paramSchema = require('../../../params/providers/midjourney/image/midjourney-v6')

/**
 * Midjourney V6 API类
 */
class MidjourneyV6 extends BaseAPI {
  /**
   * 创建Midjourney V6 API实例
   * @param {object} service - Midjourney服务实例
   */
  constructor(service) {
    super(service, paramSchema)
    this.modelName = 'midjourney-v6'
    this.endpoint = '/imagine'
  }

  /**
   * 准备API调用参数
   * @param {object} params - 转换后的参数
   * @returns {object} API参数
   */
  prepareAPIParams(params) {
    let prompt = params.prompt

    if (params.aspectRatio) {
      prompt += ` --ar ${params.aspectRatio}`
    }
    if (params.version) {
      prompt += ` --${params.version}`
    }
    if (params.stylize !== undefined) {
      prompt += ` --s ${params.stylize}`
    }
    if (params.chaos !== undefined) {
      prompt += ` --c ${params.chaos}`
    }
    if (params.quality) {
      prompt += ` --q ${params.quality === 'low' ? 0.25 : params.quality === 'medium' ? 0.5 : 1}`
    }
    if (params.mode) {
      prompt += ` --${params.mode}`
    }

    return {
      prompt,
      seed: params.seed
    }
  }

  /**
   * 调用API
   * @param {object} params - API参数
   * @param {object} options - 调用选项
   * @returns {Promise<any>} API响应
   */
  async callAPI(params, options) {
    const task = await this.service.createTask(params)
    const result = await this.service.waitForTask(task.taskId, options)
    return result
  }
}

module.exports = MidjourneyV6
