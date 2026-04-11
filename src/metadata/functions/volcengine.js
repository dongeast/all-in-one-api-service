/**
 * Volcengine Functions 元数据定义
 * 统一的 Function 元数据源
 * 只引用API名称，不定义endpoint和method
 */

module.exports = {
  'create-video-generation': {
    name: 'create-video-generation',
    type: 'async',
    provider: 'volcengine',
    category: 'video',
    
    apis: {
      request: 'create-video-generation-task',
      query: 'query-video-generation-task'
    },
    
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
  
  'create-3d-generation': {
    name: 'create-3d-generation',
    type: 'async',
    provider: 'volcengine',
    category: '3d',
    
    apis: {
      request: 'create-3d-generation-task',
      query: 'query-3d-generation-task'
    },
    
    models: ['doubao-seed3d-1-0-250928'],
    tags: ['3d', 'generation'],
    priority: 100
  },
  
  'generate-image': {
    name: 'generate-image',
    type: 'sync',
    provider: 'volcengine',
    category: 'image',
    
    apis: {
      request: 'generate-image'
    },
    
    models: ['doubao-seedit-1-0'],
    tags: ['image', 'generation', 'text-to-image'],
    priority: 100
  },
  
  'query-video-generation-task-list': {
    name: 'query-video-generation-task-list',
    type: 'sync',
    provider: 'volcengine',
    category: 'video',
    
    apis: {
      request: 'query-video-generation-task-list'
    },
    
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
    type: 'sync',
    provider: 'volcengine',
    category: 'video',
    
    apis: {
      request: 'cancel-delete-video-generation-task'
    },
    
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
  
  'query-3d-generation-task-list': {
    name: 'query-3d-generation-task-list',
    type: 'sync',
    provider: 'volcengine',
    category: '3d',
    
    apis: {
      request: 'query-3d-generation-task-list'
    },
    
    models: ['doubao-seed3d-1-0-250928'],
    tags: ['3d', 'query', 'list'],
    priority: 100
  },
  
  'cancel-delete-3d-generation-task': {
    name: 'cancel-delete-3d-generation-task',
    type: 'sync',
    provider: 'volcengine',
    category: '3d',
    
    apis: {
      request: 'cancel-delete-3d-generation-task'
    },
    
    models: ['doubao-seed3d-1-0-250928'],
    tags: ['3d', 'cancel', 'delete'],
    priority: 100
  }
}
