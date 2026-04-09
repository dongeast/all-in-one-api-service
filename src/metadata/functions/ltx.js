/**
 * LTX Functions 元数据定义
 * 统一的 Function 元数据源
 * 只引用API名称，不定义endpoint和method
 */

module.exports = {
  'generate-video-from-text': {
    name: 'generate-video-from-text',
    type: 'sync',
    provider: 'ltx',
    category: 'video',
    
    apis: {
      request: 'generate-video-from-text'
    },
    
    models: ['ltx-2-fast', 'ltx-2-pro', 'ltx-2-3-fast', 'ltx-2-3-pro'],
    tags: ['video', 'generation', 'text-to-video'],
    priority: 100
  },
  
  'generate-video-from-image': {
    name: 'generate-video-from-image',
    type: 'sync',
    provider: 'ltx',
    category: 'video',
    
    apis: {
      request: 'generate-video-from-image'
    },
    
    models: ['ltx-2-fast', 'ltx-2-pro', 'ltx-2-3-fast', 'ltx-2-3-pro'],
    tags: ['video', 'generation', 'image-to-video'],
    priority: 100
  },
  
  'generate-video-from-audio': {
    name: 'generate-video-from-audio',
    type: 'sync',
    provider: 'ltx',
    category: 'video',
    
    apis: {
      request: 'generate-video-from-audio'
    },
    
    models: ['ltx-2-pro', 'ltx-2-3-pro'],
    tags: ['video', 'generation', 'audio-to-video'],
    priority: 100
  },
  
  'extend-video-duration': {
    name: 'extend-video-duration',
    type: 'sync',
    provider: 'ltx',
    category: 'video',
    
    apis: {
      request: 'extend-video-duration'
    },
    
    models: ['ltx-2-pro', 'ltx-2-3-pro'],
    tags: ['video', 'editing', 'extension'],
    priority: 100
  },
  
  'retake-video-section': {
    name: 'retake-video-section',
    type: 'sync',
    provider: 'ltx',
    category: 'video',
    
    apis: {
      request: 'retake-video-section'
    },
    
    models: ['ltx-2-pro', 'ltx-2-3-pro'],
    tags: ['video', 'editing', 'retake'],
    priority: 100
  }
}
