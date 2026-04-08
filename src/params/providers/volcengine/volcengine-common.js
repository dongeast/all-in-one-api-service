/**
 * 火山引擎通用参数定义
 */

const { textPrompt } = require('../../templates')

module.exports = {
  input: {
    model: {
      type: 'string',
      required: true,
      description: '模型ID或端点ID'
    },

    prompt: {
      ...textPrompt.prompt,
      description: '生成提示词，支持中英文'
    },

    width: {
      type: 'number',
      required: false,
      description: '图像宽度（像素）',
      min: 256,
      max: 4096
    },

    height: {
      type: 'number',
      required: false,
      description: '图像高度（像素）',
      min: 256,
      max: 4096
    },

    size: {
      type: 'string',
      required: false,
      description: '图像尺寸（格式：宽x高，如 2048x2048）'
    },

    seed: {
      type: 'number',
      required: false,
      description: '随机种子，用于控制生成随机性',
      min: -1,
      max: 2147483647,
      default: -1
    },

    watermark: {
      type: 'boolean',
      required: false,
      description: '是否添加水印',
      default: true
    },

    response_format: {
      type: 'enum',
      required: false,
      description: '响应格式',
      options: ['url', 'b64_json'],
      default: 'url'
    }
  },

  output: {
    model: {
      type: 'string',
      description: '使用的模型ID',
      path: 'model'
    },

    created: {
      type: 'number',
      description: '创建时间戳（秒）',
      path: 'created'
    },

    data: {
      type: 'array',
      description: '生成的图像信息数组',
      path: 'data'
    },

    'data[].url': {
      type: 'string',
      description: '图像URL（24小时有效）',
      path: 'data[0].url'
    },

    'data[].b64_json': {
      type: 'string',
      description: '图像Base64数据',
      path: 'data[0].b64_json'
    },

    'data[].size': {
      type: 'string',
      description: '图像尺寸',
      path: 'data[0].size'
    },

    'data[].error': {
      type: 'object',
      description: '错误信息',
      path: 'data[0].error'
    },

    usage: {
      type: 'object',
      description: '使用量信息',
      path: 'usage'
    },

    'usage.generated_images': {
      type: 'number',
      description: '成功生成的图像数量',
      path: 'usage.generated_images'
    },

    'usage.output_tokens': {
      type: 'number',
      description: '输出token数',
      path: 'usage.output_tokens'
    },

    'usage.total_tokens': {
      type: 'number',
      description: '总token数',
      path: 'usage.total_tokens'
    },

    error: {
      type: 'object',
      description: '错误信息',
      path: 'error'
    },

    'error.code': {
      type: 'string',
      description: '错误码',
      path: 'error.code'
    },

    'error.message': {
      type: 'string',
      description: '错误消息',
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
