/**
 * 火山引擎视频生成任务参数定义
 */

const volcengineCommon = require('../volcengine-common')
const modelCapabilities = require('../model-capabilities')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    model: volcengineCommon.input.model,

    content: {
      type: ParamType.ARRAY,
      elementType: ElementType.TEXTAREA,
      required: true,
      description: 'Video generation input content, supports text, image, audio, video'
    },

    callback_url: {
      type: ParamType.STRING,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Callback URL for task status notification'
    },

    return_last_frame: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Whether to return the last frame of generated video',
      default: false
    },

    service_tier: {
      type: ParamType.ENUM,
      elementType: ElementType.RADIO,
      required: false,
      description: 'Service tier type',
      options: ['default', 'flex'],
      default: 'default'
    },

    execution_expires_after: {
      type: ParamType.NUMBER,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Task timeout threshold (seconds)',
      min: 3600,
      max: 259200,
      default: 172800
    },

    generate_audio: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Whether to generate synchronized audio (only for Seedance 2.0 & 2.0 fast, Seedance 1.5 pro)',
      default: true
    },

    draft: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Whether to enable draft mode (only for Seedance 1.5 pro)',
      default: false
    },

    tools: {
      type: ParamType.ARRAY,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Model tool configuration (only for Seedance 2.0 & 2.0 fast)'
    },

    safety_identifier: {
      type: ParamType.STRING,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'End user unique identifier',
      maxLength: 64
    },

    resolution: {
      type: ParamType.ENUM,
      elementType: ElementType.RESOLUTION,
      required: false,
      description: 'Video resolution',
      options: ['480p', '720p', '1080p']
    },

    ratio: {
      type: ParamType.ENUM,
      elementType: ElementType.RATIO,
      required: false,
      description: 'Generated video aspect ratio',
      options: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9', 'adaptive']
    },

    duration: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Video duration (seconds)',
      min: 4,
      max: 12,
      default: 4
    },

    frames: {
      type: ParamType.NUMBER,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Video frame count',
      min: 29,
      max: 289
    },

    seed: volcengineCommon.input.seed,

    camera_fixed: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Whether to fix camera (not supported for reference image scenarios)',
      default: false
    },

    watermark: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Whether to add watermark to video',
      default: false
    }
  },

  output: {
    id: {
      type: 'string',
      description: 'Video generation task ID, valid for 7 days',
      path: 'id'
    }
  },

  modelCapabilities
}
