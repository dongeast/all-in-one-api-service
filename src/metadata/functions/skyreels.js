/**
 * SkyReels Functions 元数据定义
 * 统一的 Function 元数据源
 * 只引用API名称，不定义endpoint和method
 */

module.exports = {
  'text-to-video-generation': {
    name: 'text-to-video-generation',
    type: 'async',
    provider: 'skyreels',
    category: 'video',
    
    apis: {
      request: 'text-to-video-generation-task-submission',
      query: 'text-to-video-generation-task-query'
    },
    
    models: ['skyreels-v4'],
    tags: ['video', 'generation', 'text-to-video'],
    priority: 100
  },
  
  'image-to-video-generation': {
    name: 'image-to-video-generation',
    type: 'async',
    provider: 'skyreels',
    category: 'video',
    
    apis: {
      request: 'image-to-video-generation-task-submission',
      query: 'image-to-video-generation-task-query'
    },
    
    models: ['skyreels-v4'],
    tags: ['video', 'generation', 'image-to-video'],
    priority: 100
  },
  
  'lip-sync': {
    name: 'lip-sync',
    type: 'async',
    provider: 'skyreels',
    category: 'avatar',
    
    apis: {
      request: 'lip-sync-task-submit',
      query: 'lip-sync-task-query'
    },
    
    models: ['skyreels-avatar'],
    tags: ['video', 'avatar', 'lip-sync'],
    priority: 100
  },
  
  'single-actor-avatar': {
    name: 'single-actor-avatar',
    type: 'async',
    provider: 'skyreels',
    category: 'avatar',
    
    apis: {
      request: 'single-actor-avatar-task-submission',
      query: 'single-actor-avatar-task-query'
    },
    
    models: ['skyreels-avatar'],
    tags: ['video', 'avatar'],
    priority: 100
  },
  
  'multi-actor-avatar': {
    name: 'multi-actor-avatar',
    type: 'async',
    provider: 'skyreels',
    category: 'avatar',
    
    apis: {
      request: 'multi-actor-avatar-task-submission',
      query: 'multi-actor-avatar-task-query'
    },
    
    models: ['skyreels-avatar'],
    tags: ['video', 'avatar'],
    priority: 100
  },
  
  'segmented-camera-motion': {
    name: 'segmented-camera-motion',
    type: 'async',
    provider: 'skyreels',
    category: 'avatar',
    
    apis: {
      request: 'segmented-camera-motion-task-submit',
      query: 'segmented-camera-motion-task-query'
    },
    
    models: ['skyreels-avatar'],
    tags: ['video', 'avatar', 'camera-motion'],
    priority: 100
  },
  
  'reference-to-video': {
    name: 'reference-to-video',
    type: 'async',
    provider: 'skyreels',
    category: 'video',
    
    apis: {
      request: 'reference-to-video-task-submission',
      query: 'reference-to-video-task-query'
    },
    
    models: ['skyreels-v3'],
    tags: ['video', 'generation'],
    priority: 100
  },
  
  'omni-reference': {
    name: 'omni-reference',
    type: 'async',
    provider: 'skyreels',
    category: 'video',
    
    apis: {
      request: 'omni-reference-task-submission',
      query: 'omni-reference-task-query'
    },
    
    models: ['skyreels-v4'],
    tags: ['video', 'generation'],
    priority: 100
  },
  
  'single-shot-video-extension': {
    name: 'single-shot-video-extension',
    type: 'async',
    provider: 'skyreels',
    category: 'video',
    
    apis: {
      request: 'single-shot-video-extension-task-submission',
      query: 'single-shot-video-extension-task-query'
    },
    
    models: ['skyreels-v3'],
    tags: ['video', 'extension'],
    priority: 100
  },
  
  'shot-switching-video-extension': {
    name: 'shot-switching-video-extension',
    type: 'async',
    provider: 'skyreels',
    category: 'video',
    
    apis: {
      request: 'shot-switching-video-extension-task-submission',
      query: 'shot-switching-video-extension-task-query'
    },
    
    models: ['skyreels-v3'],
    tags: ['video', 'extension'],
    priority: 100
  },
  
  'video-restyling': {
    name: 'video-restyling',
    type: 'async',
    provider: 'skyreels',
    category: 'video',
    
    apis: {
      request: 'video-restyling-task-submission',
      query: 'video-restyling-task-query'
    },
    
    models: ['skyreels-v3'],
    tags: ['video', 'restyling'],
    priority: 100
  }
}
