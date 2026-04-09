/**
 * 火山引擎接口元数据定义
 * 作为唯一的API定义源，包含所有API调用信息
 */

module.exports = {
  'generate-image': {
    name: 'generate-image',
    provider: 'volcengine',
    category: 'image',
    endpoint: '/image/generate',
    method: 'POST',
    type: 'sync',
    paramSchema: require('../../params/providers/volcengine/image/generate-image'),
    models: ['doubao-seedit-1-0'],
    tags: ['image', 'generation', 'text-to-image'],
    priority: 100
  },

  'create-video-generation-task': {
    name: 'create-video-generation-task',
    provider: 'volcengine',
    category: 'video',
    endpoint: '/video/generation/submit',
    method: 'POST',
    type: 'async',
    paramSchema: require('../../params/providers/volcengine/video/create-video-generation-task'),
    models: [
      'doubao-seedance-2-0',
      'doubao-seedance-2-0-fast',
      'doubao-seedance-1-5-pro',
      'doubao-seedance-1-0-pro',
      'doubao-seedance-1-0-pro-fast',
      'doubao-seedance-1-0-lite'
    ],
    tags: ['video', 'generation', 'text-to-video', 'image-to-video'],
    priority: 100
  },

  'query-video-generation-task': {
    name: 'query-video-generation-task',
    provider: 'volcengine',
    category: 'video',
    endpoint: '/video/generation/query',
    method: 'GET',
    type: 'sync',
    paramSchema: require('../../params/providers/volcengine/video/query-video-generation-task'),
    models: [
      'doubao-seedance-2-0',
      'doubao-seedance-2-0-fast',
      'doubao-seedance-1-5-pro',
      'doubao-seedance-1-0-pro',
      'doubao-seedance-1-0-pro-fast',
      'doubao-seedance-1-0-lite'
    ],
    tags: ['video', 'query', 'task'],
    priority: 100
  },

  'query-video-generation-task-list': {
    name: 'query-video-generation-task-list',
    provider: 'volcengine',
    category: 'video',
    endpoint: '/video/generation/list',
    method: 'GET',
    type: 'sync',
    paramSchema: require('../../params/providers/volcengine/video/query-video-generation-task-list'),
    models: [
      'doubao-seedance-2-0',
      'doubao-seedance-2-0-fast',
      'doubao-seedance-1-5-pro',
      'doubao-seedance-1-0-pro',
      'doubao-seedance-1-0-pro-fast',
      'doubao-seedance-1-0-lite'
    ],
    tags: ['video', 'query', 'list'],
    priority: 100
  },

  'cancel-delete-video-generation-task': {
    name: 'cancel-delete-video-generation-task',
    provider: 'volcengine',
    category: 'video',
    endpoint: '/video/generation/cancel',
    method: 'POST',
    type: 'sync',
    paramSchema: require('../../params/providers/volcengine/video/cancel-delete-video-generation-task'),
    models: [
      'doubao-seedance-2-0',
      'doubao-seedance-2-0-fast',
      'doubao-seedance-1-5-pro',
      'doubao-seedance-1-0-pro',
      'doubao-seedance-1-0-pro-fast',
      'doubao-seedance-1-0-lite'
    ],
    tags: ['video', 'cancel', 'delete'],
    priority: 100
  },

  'create-3d-generation-task': {
    name: 'create-3d-generation-task',
    provider: 'volcengine',
    category: '3d',
    endpoint: '/3d/generation/submit',
    method: 'POST',
    type: 'async',
    paramSchema: require('../../params/providers/volcengine/3d/create-3d-generation-task'),
    models: ['doubao-seed3d-1-0'],
    tags: ['3d', 'generation'],
    priority: 100
  },

  'query-3d-generation-task': {
    name: 'query-3d-generation-task',
    provider: 'volcengine',
    category: '3d',
    endpoint: '/3d/generation/query',
    method: 'GET',
    type: 'sync',
    paramSchema: require('../../params/providers/volcengine/3d/query-3d-generation-task'),
    models: ['doubao-seed3d-1-0'],
    tags: ['3d', 'query', 'task'],
    priority: 100
  },

  'query-3d-generation-task-list': {
    name: 'query-3d-generation-task-list',
    provider: 'volcengine',
    category: '3d',
    endpoint: '/3d/generation/list',
    method: 'GET',
    type: 'sync',
    paramSchema: require('../../params/providers/volcengine/3d/query-3d-generation-task-list'),
    models: ['doubao-seed3d-1-0'],
    tags: ['3d', 'query', 'list'],
    priority: 100
  },

  'cancel-delete-3d-generation-task': {
    name: 'cancel-delete-3d-generation-task',
    provider: 'volcengine',
    category: '3d',
    endpoint: '/3d/generation/cancel',
    method: 'POST',
    type: 'sync',
    paramSchema: require('../../params/providers/volcengine/3d/cancel-delete-3d-generation-task'),
    models: ['doubao-seed3d-1-0'],
    tags: ['3d', 'cancel', 'delete'],
    priority: 100
  }
}
