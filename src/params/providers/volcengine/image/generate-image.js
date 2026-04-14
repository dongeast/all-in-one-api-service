/**
 * 火山引擎图像生成参数定义
 */

const volcengineCommon = require('../volcengine-common')
const modelCapabilities = require('../model-capabilities')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    model: volcengineCommon.input.model,

    prompt: {
      ...volcengineCommon.input.prompt,
      description: 'Image generation prompt, supports Chinese and English, recommended max 300 Chinese characters or 600 English words'
    },

    image: {
      type: ParamType.ARRAY,
      elementType: ElementType.IMAGE_UPLOAD,
      required: false,
      description: 'Input image information, supports URL or Base64 encoding, up to 14 reference images',
      maxItems: 14,
      items: {
        type: ParamType.STRING,
        description: 'Image URL or Base64 encoded data'
      },
      supportedModels: ['doubao-seedream-5-0-260128', 'doubao-seedream-4-5-251128', 'doubao-seedream-4-0-250828']
    },

    size: {
      type: ParamType.ENUM,
      elementType: ElementType.RESOLUTION,
      required: false,
      description: 'Image size (width x height) or resolution identifier',
      options: [
        '1024x1024',
        '1280x720',
        '720x1280',
        '2048x2048',
        '2848x1600',
        '1600x2848',
        '4096x4096',
        '5504x3040',
        '3040x5504'
      ],
      default: '2048x2048'
    },

    seed: {
      ...volcengineCommon.input.seed,
      supportedModels: ['doubao-seedream-3-0-t2i-250415']
    },

    sequential_image_generation: {
      type: ParamType.ENUM,
      elementType: ElementType.RADIO,
      required: false,
      description: 'Whether to enable continuous image generation',
      options: ['auto', 'disabled'],
      default: 'disabled',
      supportedModels: ['doubao-seedream-5-0-260128', 'doubao-seedream-4-5-251128', 'doubao-seedream-4-0-250828']
    },

    sequential_image_generation_options: {
      type: ParamType.OBJECT,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Continuous image generation configuration',
      default: {
        max_images: 15
      },
      supportedModels: ['doubao-seedream-5-0-260128', 'doubao-seedream-4-5-251128', 'doubao-seedream-4-0-250828']
    },

    guidance_scale: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Consistency between model output and prompt',
      min: 1,
      max: 10,
      default: 2.5,
      supportedModels: ['doubao-seedream-3-0-t2i-250415']
    },

    output_format: {
      type: ParamType.ENUM,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Output image file format',
      options: ['png', 'jpeg'],
      default: 'jpeg',
      supportedModels: ['doubao-seedream-5-0-260128']
    },

    response_format: volcengineCommon.input.response_format,

    watermark: volcengineCommon.input.watermark,

    optimize_prompt_options: {
      type: ParamType.OBJECT,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Prompt optimization configuration',
      supportedModels: ['doubao-seedream-5-0-260128', 'doubao-seedream-4-5-251128', 'doubao-seedream-4-0-250828']
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
