/**
 * Skyreels 接口元数据定义
 * 作为唯一的API定义源，包含所有API调用信息
 */

const { APITypes } = require('../../constants')

module.exports = {
  'text-to-video-generation-task-submission': {
    name: 'text-to-video-generation-task-submission',
    provider: 'skywork',
    apiType: APITypes.TEXT_TO_VIDEO,
    category: 'video',
    endpoint: '/api/v1/video/text2video/submit',
    method: 'POST',
    type: 'async',
    paramSchema: require('../../params/providers/skyreels/video/text-to-video-generation-task-submission'),
    models: ['skyreels-v4'],
    tags: ['video', 'generation', 'text-to-video'],
    priority: 100
  },

  'text-to-video-generation-task-query': {
    name: 'text-to-video-generation-task-query',
    provider: 'skywork',
    apiType: APITypes.TASK_QUERY,
    category: 'video',
    endpoint: '/api/v1/video/text2video/task/{task_id}',
    method: 'GET',
    type: 'sync',
    paramSchema: require('../../params/providers/skyreels/video/text-to-video-generation-task-query'),
    models: ['skyreels-v4'],
    tags: ['video', 'query', 'task'],
    priority: 100
  },

  'image-to-video-generation-task-submission': {
    name: 'image-to-video-generation-task-submission',
    provider: 'skywork',
    apiType: APITypes.IMAGE_TO_VIDEO,
    category: 'video',
    endpoint: '/api/v1/video/image2video/submit',
    method: 'POST',
    type: 'async',
    paramSchema: require('../../params/providers/skyreels/video/image-to-video-generation-task-submission'),
    models: ['skyreels-v4'],
    tags: ['video', 'generation', 'image-to-video'],
    priority: 100
  },

  'image-to-video-generation-task-query': {
    name: 'image-to-video-generation-task-query',
    provider: 'skywork',
    apiType: APITypes.TASK_QUERY,
    category: 'video',
    endpoint: '/api/v1/video/image2video/task/{task_id}',
    method: 'GET',
    type: 'sync',
    paramSchema: require('../../params/providers/skyreels/video/image-to-video-generation-task-query'),
    models: ['skyreels-v4'],
    tags: ['video', 'query', 'task'],
    priority: 100
  },

  'lip-sync-task-submit': {
    name: 'lip-sync-task-submit',
    provider: 'skywork',
    apiType: APITypes.LIP_SYNC,
    category: 'avatar',
    endpoint: '/api/v1/video/retalking/submit',
    method: 'POST',
    type: 'async',
    paramSchema: require('../../params/providers/skyreels/avatar/lip-sync-task-submit'),
    models: ['skyreels-avatar'],
    tags: ['video', 'avatar', 'lip-sync'],
    priority: 100
  },

  'lip-sync-task-query': {
    name: 'lip-sync-task-query',
    provider: 'skywork',
    apiType: APITypes.TASK_QUERY,
    category: 'avatar',
    endpoint: '/api/v1/video/retalking/task/{task_id}',
    method: 'GET',
    type: 'sync',
    paramSchema: require('../../params/providers/skyreels/avatar/lip-sync-task-query'),
    models: ['skyreels-avatar'],
    tags: ['video', 'avatar', 'lip-sync'],
    priority: 100
  },

  'single-actor-avatar-task-submission': {
    name: 'single-actor-avatar-task-submission',
    provider: 'skywork',
    apiType: APITypes.AVATAR_GENERATION,
    category: 'avatar',
    endpoint: '/api/v1/video/audio2video/single/submit',
    method: 'POST',
    type: 'async',
    paramSchema: require('../../params/providers/skyreels/avatar/single-actor-avatar-task-submission'),
    models: ['skyreels-avatar'],
    tags: ['video', 'avatar'],
    priority: 100
  },

  'single-actor-avatar-task-query': {
    name: 'single-actor-avatar-task-query',
    provider: 'skywork',
    apiType: APITypes.TASK_QUERY,
    category: 'avatar',
    endpoint: '/api/v1/video/audio2video/single/task/{task_id}',
    method: 'GET',
    type: 'sync',
    paramSchema: require('../../params/providers/skyreels/avatar/single-actor-avatar-task-query'),
    models: ['skyreels-avatar'],
    tags: ['video', 'avatar'],
    priority: 100
  },

  'multi-actor-avatar-task-submission': {
    name: 'multi-actor-avatar-task-submission',
    provider: 'skywork',
    apiType: APITypes.AVATAR_GENERATION,
    category: 'avatar',
    endpoint: '/api/v1/video/audio2video/multi/submit',
    method: 'POST',
    type: 'async',
    paramSchema: require('../../params/providers/skyreels/avatar/multi-actor-avatar-task-submission'),
    models: ['skyreels-avatar'],
    tags: ['video', 'avatar'],
    priority: 100
  },

  'multi-actor-avatar-task-query': {
    name: 'multi-actor-avatar-task-query',
    provider: 'skywork',
    apiType: APITypes.TASK_QUERY,
    category: 'avatar',
    endpoint: '/api/v1/video/audio2video/multi/task/{task_id}',
    method: 'GET',
    type: 'sync',
    paramSchema: require('../../params/providers/skyreels/avatar/multi-actor-avatar-task-query'),
    models: ['skyreels-avatar'],
    tags: ['video', 'avatar'],
    priority: 100
  },

  'segmented-camera-motion-task-submit': {
    name: 'segmented-camera-motion-task-submit',
    provider: 'skywork',
    apiType: APITypes.AVATAR_GENERATION,
    category: 'avatar',
    endpoint: '/api/v1/video/audio2video/camera/submit',
    method: 'POST',
    type: 'async',
    paramSchema: require('../../params/providers/skyreels/avatar/segmented-camera-motion-task-submit'),
    models: ['skyreels-avatar'],
    tags: ['video', 'avatar', 'camera-motion'],
    priority: 100
  },

  'segmented-camera-motion-task-query': {
    name: 'segmented-camera-motion-task-query',
    provider: 'skywork',
    apiType: APITypes.TASK_QUERY,
    category: 'avatar',
    endpoint: '/api/v1/video/audio2video/camera/task/{task_id}',
    method: 'GET',
    type: 'sync',
    paramSchema: require('../../params/providers/skyreels/avatar/segmented-camera-motion-task-query'),
    models: ['skyreels-avatar'],
    tags: ['video', 'avatar', 'camera-motion'],
    priority: 100
  },

  'reference-to-video-task-submission': {
    name: 'reference-to-video-task-submission',
    provider: 'skywork',
    apiType: APITypes.VIDEO_EDITING,
    category: 'video',
    endpoint: '/api/v1/video/multiobject/submit',
    method: 'POST',
    type: 'async',
    paramSchema: require('../../params/providers/skyreels/video/reference-to-video-task-submission'),
    models: ['skyreels-v3'],
    tags: ['video', 'generation'],
    priority: 100
  },

  'reference-to-video-task-query': {
    name: 'reference-to-video-task-query',
    provider: 'skywork',
    apiType: APITypes.TASK_QUERY,
    category: 'video',
    endpoint: '/api/v1/video/multiobject/task/{task_id}',
    method: 'GET',
    type: 'sync',
    paramSchema: require('../../params/providers/skyreels/video/reference-to-video-task-query'),
    models: ['skyreels-v3'],
    tags: ['video', 'query', 'task'],
    priority: 100
  },

  'omni-reference-task-submission': {
    name: 'omni-reference-task-submission',
    provider: 'skywork',
    apiType: APITypes.VIDEO_REFERENCE,
    category: 'video',
    endpoint: '/api/v1/video/omni-video/submit',
    method: 'POST',
    type: 'async',
    paramSchema: require('../../params/providers/skyreels/video/omni-reference-task-submission'),
    models: ['skyreels-v4'],
    tags: ['video', 'generation'],
    priority: 100
  },

  'omni-reference-task-query': {
    name: 'omni-reference-task-query',
    provider: 'skyreels',
    apiType: APITypes.TASK_QUERY,
    category: 'video',
    endpoint: '/api/v1/video/omni-video/task/{task_id}',
    method: 'GET',
    type: 'sync',
    paramSchema: require('../../params/providers/skyreels/video/omni-reference-task-query'),
    models: ['skyreels-v4'],
    tags: ['video', 'query', 'task'],
    priority: 100
  },

  'single-shot-video-extension-task-submission': {
    name: 'single-shot-video-extension-task-submission',
    provider: 'skyreels',
    apiType: APITypes.VIDEO_EXTENSION,
    category: 'video',
    endpoint: '/api/v1/video/extension/submit',
    method: 'POST',
    type: 'async',
    paramSchema: require('../../params/providers/skyreels/video/single-shot-video-extension-task-submission'),
    models: ['skyreels-v3'],
    tags: ['video', 'extension'],
    priority: 100
  },

  'single-shot-video-extension-task-query': {
    name: 'single-shot-video-extension-task-query',
    provider: 'skyreels',
    apiType: APITypes.TASK_QUERY,
    category: 'video',
    endpoint: '/api/v1/video/extension/task/{task_id}',
    method: 'GET',
    type: 'sync',
    paramSchema: require('../../params/providers/skyreels/video/single-shot-video-extension-task-query'),
    models: ['skyreels-v3'],
    tags: ['video', 'query', 'task'],
    priority: 100
  },

  'shot-switching-video-extension-task-submission': {
    name: 'shot-switching-video-extension-task-submission',
    provider: 'skyreels',
    apiType: APITypes.VIDEO_EXTENSION,
    category: 'video',
    endpoint: '/api/v1/video/extension/cutshot/submit',
    method: 'POST',
    type: 'async',
    paramSchema: require('../../params/providers/skyreels/video/shot-switching-video-extension-task-submission'),
    models: ['skyreels-v3'],
    tags: ['video', 'extension'],
    priority: 100
  },

  'shot-switching-video-extension-task-query': {
    name: 'shot-switching-video-extension-task-query',
    provider: 'skyreels',
    apiType: APITypes.TASK_QUERY,
    category: 'video',
    endpoint: '/api/v1/video/extension/cutshot/task/{task_id}',
    method: 'GET',
    type: 'sync',
    paramSchema: require('../../params/providers/skyreels/video/shot-switching-video-extension-task-query'),
    models: ['skyreels-v3'],
    tags: ['video', 'query', 'task'],
    priority: 100
  },

  'video-restyling-task-submission': {
    name: 'video-restyling-task-submission',
    provider: 'skyreels',
    apiType: APITypes.VIDEO_EDITING,
    category: 'video',
    endpoint: '/api/v1/video/styletransfer/submit',
    method: 'POST',
    type: 'async',
    paramSchema: require('../../params/providers/skyreels/video/video-restyling-task-submission'),
    models: ['skyreels-v3'],
    tags: ['video', 'restyling'],
    priority: 100
  },

  'video-restyling-task-query': {
    name: 'video-restyling-task-query',
    provider: 'skyreels',
    apiType: APITypes.TASK_QUERY,
    category: 'video',
    endpoint: '/api/v1/video/styletransfer/task/{task_id}',
    method: 'GET',
    type: 'sync',
    paramSchema: require('../../params/providers/skyreels/video/video-restyling-task-query'),
    models: ['skyreels-v3'],
    tags: ['video', 'query', 'task'],
    priority: 100
  }
}
