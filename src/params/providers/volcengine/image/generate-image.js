/**
 * 火山引擎图像生成参数定义
 */

const volcengineCommon = require('../volcengine-common')
const modelCapabilities = require('../model-capabilities')

module.exports = {
  input: {
    model: volcengineCommon.input.model,

    prompt: {
      ...volcengineCommon.input.prompt,
      description: '图像生成提示词，支持中英文，建议最多300个中文字符或600个英文单词'
    },

    image: {
      type: 'string',
      required: false,
      description: '输入图像信息，支持URL或Base64编码，最多14张参考图像'
    },

    size: {
      ...volcengineCommon.input.size,
      description: '图像尺寸（格式：宽x高，如 2048x2048）或分辨率标识（如 2K、4K）'
    },

    width: volcengineCommon.input.width,

    height: volcengineCommon.input.height,

    seed: volcengineCommon.input.seed,

    sequential_image_generation: {
      type: 'enum',
      required: false,
      description: '是否启用连续图像生成',
      options: ['auto', 'disabled'],
      default: 'disabled'
    },

    sequential_image_generation_options: {
      type: 'object',
      required: false,
      description: '连续图像生成配置'
    },

    stream: {
      type: 'boolean',
      required: false,
      description: '是否启用流式输出模式',
      default: false
    },

    guidance_scale: {
      type: 'number',
      required: false,
      description: '模型输出与提示词的一致性',
      min: 1,
      max: 10,
      default: 2.5
    },

    output_format: {
      type: 'enum',
      required: false,
      description: '输出图像文件格式',
      options: ['png', 'jpeg'],
      default: 'jpeg'
    },

    response_format: volcengineCommon.input.response_format,

    watermark: volcengineCommon.input.watermark,

    optimize_prompt_options: {
      type: 'object',
      required: false,
      description: '提示词优化功能配置'
    }
  },

  output: {
    model: volcengineCommon.output.model,
    created: volcengineCommon.output.created,
    data: volcengineCommon.output.data,
    'data[].url': volcengineCommon.output['data[].url'],
    'data[].b64_json': volcengineCommon.output['data[].b64_json'],
    'data[].size': volcengineCommon.output['data[].size'],
    'data[].error': volcengineCommon.output['data[].error'],
    usage: volcengineCommon.output.usage,
    'usage.generated_images': volcengineCommon.output['usage.generated_images'],
    'usage.output_tokens': volcengineCommon.output['usage.output_tokens'],
    'usage.total_tokens': volcengineCommon.output['usage.total_tokens'],
    error: volcengineCommon.output.error,
    'error.code': volcengineCommon.output['error.code'],
    'error.message': volcengineCommon.output['error.message']
  },

  modelCapabilities
}
