/**
 * LTX 接口元数据定义
 * 作为唯一的API定义源，包含所有API调用信息
 */

const { APITypes } = require('../../constants')

module.exports = {
  'generate-video-from-text': {
    name: 'generate-video-from-text',
    provider: 'ltx',
    apiType: APITypes.TEXT_TO_VIDEO,
    category: 'video',
    endpoint: '/v1/text-to-video',
    method: 'POST',
    type: 'sync',
    paramSchema: require('../../params/providers/ltx/video/generate-video-from-text'),
    models: ['ltx-2-fast', 'ltx-2-pro', 'ltx-2-3-fast', 'ltx-2-3-pro'],
    tags: ['video', 'generation', 'text-to-video'],
    priority: 100
  },

  'generate-video-from-image': {
    name: 'generate-video-from-image',
    provider: 'ltx',
    apiType: APITypes.IMAGE_TO_VIDEO,
    category: 'video',
    endpoint: '/v1/image-to-video',
    method: 'POST',
    type: 'sync',
    paramSchema: require('../../params/providers/ltx/video/generate-video-from-image'),
    models: ['ltx-2-fast', 'ltx-2-pro', 'ltx-2-3-fast', 'ltx-2-3-pro'],
    tags: ['video', 'generation', 'image-to-video'],
    priority: 100
  },

  'generate-video-from-audio': {
    name: 'generate-video-from-audio',
    provider: 'ltx',
    apiType: APITypes.AUDIO_TO_VIDEO,
    category: 'video',
    endpoint: '/v1/audio-to-video',
    method: 'POST',
    type: 'sync',
    paramSchema: require('../../params/providers/ltx/video/generate-video-from-audio'),
    models: ['ltx-2-pro', 'ltx-2-3-pro'],
    tags: ['video', 'generation', 'audio-to-video'],
    priority: 100
  },

  'extend-video-duration': {
    name: 'extend-video-duration',
    provider: 'ltx',
    apiType: APITypes.VIDEO_EXTENSION,
    category: 'video',
    endpoint: '/v1/extend',
    method: 'POST',
    type: 'sync',
    paramSchema: require('../../params/providers/ltx/video/extend-video-duration'),
    models: ['ltx-2-pro', 'ltx-2-3-pro'],
    tags: ['video', 'editing', 'extension'],
    priority: 100
  },

  'retake-video-section': {
    name: 'retake-video-section',
    provider: 'ltx',
    apiType: APITypes.VIDEO_EDITING,
    category: 'video',
    endpoint: '/v1/retake',
    method: 'POST',
    type: 'sync',
    paramSchema: require('../../params/providers/ltx/video/retake-video-section'),
    models: ['ltx-2-pro', 'ltx-2-3-pro'],
    tags: ['video', 'editing', 'retake'],
    priority: 100
  }
}
