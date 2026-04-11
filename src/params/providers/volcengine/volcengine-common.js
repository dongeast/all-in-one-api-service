/**
 * 火山引擎通用参数定义
 */

const { textPrompt } = require('../../templates')
const { ParamType, ElementType } = require('../../common')

module.exports = {
  input: {
    model: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: true,
      description: 'Model ID or endpoint ID'
    },

    prompt: {
      ...textPrompt.prompt,
      elementType: ElementType.TEXTAREA,
      description: 'Generation prompt, supports Chinese and English'
    },

    width: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Image width (pixels)',
      min: 256,
      max: 4096,
      default: 256
    },

    height: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Image height (pixels)',
      min: 256,
      max: 4096,
      default: 256
    },

    size: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Image size (format: width x height, e.g. 2048x2048)'
    },

    seed: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Random seed for controlling generation randomness (-1 for random)',
      min: -1,
      max: 2147483647,
      default: -1
    },

    watermark: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Whether to add watermark to generated content',
      default: true
    },

    response_format: {
      type: ParamType.ENUM,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Response format',
      options: ['url', 'b64_json'],
      default: 'url'
    }
  },

  output: {
    model: {
      type: 'string',
      description: 'Model ID used',
      path: 'model'
    },

    created: {
      type: 'number',
      description: 'Creation timestamp (seconds)',
      path: 'created'
    },

    data: {
      type: 'array',
      description: 'Generated image information array',
      path: 'data'
    },

    'data[].url': {
      type: 'string',
      description: 'Image URL (valid for 24 hours)',
      path: 'data[0].url'
    },

    'data[].b64_json': {
      type: 'string',
      description: 'Image Base64 data',
      path: 'data[0].b64_json'
    },

    'data[].size': {
      type: 'string',
      description: 'Image size',
      path: 'data[0].size'
    },

    'data[].error': {
      type: 'object',
      description: 'Error information',
      path: 'data[0].error'
    },

    usage: {
      type: 'object',
      description: 'Usage information',
      path: 'usage'
    },

    'usage.generated_images': {
      type: 'number',
      description: 'Number of successfully generated images',
      path: 'usage.generated_images'
    },

    'usage.output_tokens': {
      type: 'number',
      description: 'Output token count',
      path: 'usage.output_tokens'
    },

    'usage.total_tokens': {
      type: 'number',
      description: 'Total token count',
      path: 'usage.total_tokens'
    },

    error: {
      type: 'object',
      description: 'Error information',
      path: 'error'
    },

    'error.code': {
      type: 'string',
      description: 'Error code',
      path: 'error.code'
    },

    'error.message': {
      type: 'string',
      description: 'Error message',
      path: 'error.message'
    }
  },

  taskStatus: {
    QUEUED: 'queued',
    RUNNING: 'running',
    CANCELLED: 'cancelled',
    SUCCEEDED: 'succeeded',
    FAILED: 'failed',
    EXPIRED: 'expired'
  }
}
