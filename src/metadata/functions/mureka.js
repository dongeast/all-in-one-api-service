/**
 * Mureka Functions 元数据定义
 * 统一的 Function 元数据源
 * 只引用API名称，不定义endpoint和method
 */

const { APITypes } = require('../../constants')

module.exports = {
  'generate-song': {
    name: 'generate-song',
    type: 'async',
    provider: 'mureka',
    apiType: APITypes.SONG_GENERATION,
    category: 'song',
    
    apis: {
      request: 'generate-song',
      query: 'query-song-task'
    },
    
    models: ['auto', 'mureka-7.5', 'mureka-7.6', 'mureka-o2', 'mureka-8'],
    tags: ['audio', 'generation', 'music', 'song'],
    priority: 100
  },
  
  'extend-song': {
    name: 'extend-song',
    type: 'async',
    provider: 'mureka',
    apiType: APITypes.SONG_GENERATION,
    category: 'song',
    
    apis: {
      request: 'extend-song',
      query: 'query-song-task'
    },
    
    models: ['auto', 'mureka-7.5', 'mureka-7.6', 'mureka-o2', 'mureka-8'],
    tags: ['audio', 'generation', 'music', 'song'],
    priority: 95
  },
  
  'generate-lyrics': {
    name: 'generate-lyrics',
    type: 'sync',
    provider: 'mureka',
    apiType: APITypes.TEXT_GENERATION,
    category: 'lyrics',
    
    apis: {
      request: 'generate-lyrics'
    },
    
    models: [],
    tags: ['text', 'generation', 'lyrics'],
    priority: 100
  },
  
  'extend-lyrics': {
    name: 'extend-lyrics',
    type: 'sync',
    provider: 'mureka',
    apiType: APITypes.TEXT_GENERATION,
    category: 'lyrics',
    
    apis: {
      request: 'extend-lyrics'
    },
    
    models: [],
    tags: ['text', 'generation', 'lyrics'],
    priority: 95
  },
  
  'generate-instrumental': {
    name: 'generate-instrumental',
    type: 'async',
    provider: 'mureka',
    apiType: APITypes.INSTRUMENTAL_GENERATION,
    category: 'instrumental',
    
    apis: {
      request: 'generate-instrumental',
      query: 'query-instrumental-task'
    },
    
    models: ['auto', 'mureka-7.5', 'mureka-7.6', 'mureka-8'],
    tags: ['audio', 'generation', 'music', 'instrumental'],
    priority: 100
  },
  
  'create-speech': {
    name: 'create-speech',
    type: 'sync',
    provider: 'mureka',
    apiType: APITypes.TEXT_TO_SPEECH,
    category: 'tts',
    
    apis: {
      request: 'create-speech'
    },
    
    models: ['mureka-tts'],
    tags: ['audio', 'tts', 'speech'],
    priority: 100
  },
  
  'create-podcast': {
    name: 'create-podcast',
    type: 'sync',
    provider: 'mureka',
    apiType: APITypes.TEXT_TO_SPEECH,
    category: 'tts',
    
    apis: {
      request: 'create-podcast'
    },
    
    models: ['mureka-tts'],
    tags: ['audio', 'tts', 'podcast'],
    priority: 100
  },
  
  'vocal-cloning': {
    name: 'vocal-cloning',
    type: 'async',
    provider: 'mureka',
    apiType: APITypes.VOCAL_CLONING,
    category: 'vocal',
    
    apis: {
      request: 'vocal-cloning'
    },
    
    models: ['mureka-vocal-cloning'],
    tags: ['audio', 'vocal', 'cloning'],
    priority: 100
  },
  
  'upload-file': {
    name: 'upload-file',
    type: 'sync',
    provider: 'mureka',
    apiType: APITypes.FILE_UPLOAD,
    category: 'files',
    
    apis: {
      request: 'upload-file'
    },
    
    models: [],
    tags: ['file', 'upload'],
    priority: 100
  },
  
  'create-upload': {
    name: 'create-upload',
    type: 'sync',
    provider: 'mureka',
    apiType: APITypes.FILE_UPLOAD,
    category: 'upload',
    
    apis: {
      request: 'create-upload'
    },
    
    models: [],
    tags: ['file', 'upload'],
    priority: 100
  },
  
  'add-upload-part': {
    name: 'add-upload-part',
    type: 'sync',
    provider: 'mureka',
    apiType: APITypes.FILE_UPLOAD,
    category: 'upload',
    
    apis: {
      request: 'add-upload-part'
    },
    
    models: [],
    tags: ['file', 'upload'],
    priority: 100
  },
  
  'complete-upload': {
    name: 'complete-upload',
    type: 'sync',
    provider: 'mureka',
    apiType: APITypes.FILE_UPLOAD,
    category: 'upload',
    
    apis: {
      request: 'complete-upload'
    },
    
    models: [],
    tags: ['file', 'upload'],
    priority: 100
  },
  
  'describe-song': {
    name: 'describe-song',
    type: 'sync',
    provider: 'mureka',
    apiType: APITypes.TASK_QUERY,
    category: 'song',
    
    apis: {
      request: 'describe-song'
    },
    
    models: [],
    tags: ['audio', 'analysis', 'song'],
    priority: 100
  },
  
  'recognize-song': {
    name: 'recognize-song',
    type: 'sync',
    provider: 'mureka',
    apiType: APITypes.TASK_QUERY,
    category: 'song',
    
    apis: {
      request: 'recognize-song'
    },
    
    models: [],
    tags: ['audio', 'analysis', 'song'],
    priority: 100
  },
  
  'stem-song': {
    name: 'stem-song',
    type: 'sync',
    provider: 'mureka',
    apiType: APITypes.AUDIO_GENERATION,
    category: 'song',
    
    apis: {
      request: 'stem-song'
    },
    
    models: [],
    tags: ['audio', 'processing', 'song'],
    priority: 100
  }
}
