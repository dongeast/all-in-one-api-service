/**
 * 火山引擎视频生成任务参数定义
 */

const volcengineCommon = require('../volcengine-common')
const modelCapabilities = require('../model-capabilities')

module.exports = {
  input: {
    model: volcengineCommon.input.model,

    content: {
      type: 'array',
      required: true,
      description: '视频生成输入内容，支持文本、图像、音频、视频'
    },

    callback_url: {
      type: 'string',
      required: false,
      description: '任务状态通知的回调URL'
    },

    return_last_frame: {
      type: 'boolean',
      required: false,
      description: '是否返回生成视频的最后一帧',
      default: false
    },

    service_tier: {
      type: 'enum',
      required: false,
      description: '服务层级类型',
      options: ['default', 'flex'],
      default: 'default'
    },

    execution_expires_after: {
      type: 'number',
      required: false,
      description: '任务超时阈值（秒）',
      min: 3600,
      max: 259200,
      default: 172800
    },

    generate_audio: {
      type: 'boolean',
      required: false,
      description: '是否生成同步音频（仅适用于 Seedance 2.0 & 2.0 fast, Seedance 1.5 pro）',
      default: true
    },

    draft: {
      type: 'boolean',
      required: false,
      description: '是否启用草稿模式（仅适用于 Seedance 1.5 pro）',
      default: false
    },

    tools: {
      type: 'array',
      required: false,
      description: '模型工具配置（仅适用于 Seedance 2.0 & 2.0 fast）'
    },

    safety_identifier: {
      type: 'string',
      required: false,
      description: '终端用户唯一标识符',
      maxLength: 64
    },

    resolution: {
      type: 'enum',
      required: false,
      description: '视频分辨率',
      options: ['480p', '720p', '1080p']
    },

    ratio: {
      type: 'enum',
      required: false,
      description: '生成视频的宽高比',
      options: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9', 'adaptive']
    },

    duration: {
      type: 'number',
      required: false,
      description: '视频时长（秒）'
    },

    frames: {
      type: 'number',
      required: false,
      description: '视频帧数',
      min: 29,
      max: 289
    },

    seed: volcengineCommon.input.seed,

    camera_fixed: {
      type: 'boolean',
      required: false,
      description: '是否固定镜头（参考图像场景不支持）',
      default: false
    },

    watermark: {
      type: 'boolean',
      required: false,
      description: '是否为视频添加水印',
      default: false
    }
  },

  output: {
    id: {
      type: 'string',
      description: '视频生成任务ID，有效期7天',
      path: 'id'
    }
  },

  modelCapabilities
}
