/**
 * Mureka 接口元数据定义
 * 作为唯一的API定义源，包含所有API调用信息
 */

module.exports = {
  'generate-song': {
    name: 'generate-song',
    provider: 'mureka',
    category: 'song',
    endpoint: '/song/generate',
    method: 'POST',
    type: 'async',
    paramSchema: require('../../params/providers/mureka/song/generate-song'),
    models: ['auto', 'mureka-7.5', 'mureka-7.6', 'mureka-o2', 'mureka-8'],
    tags: ['audio', 'generation', 'music', 'song'],
    priority: 100
  },

  'extend-song': {
    name: 'extend-song',
    provider: 'mureka',
    category: 'song',
    endpoint: '/song/extend',
    method: 'POST',
    type: 'async',
    paramSchema: require('../../params/providers/mureka/song/extend-song'),
    models: ['auto', 'mureka-7.5', 'mureka-7.6', 'mureka-o2', 'mureka-8'],
    tags: ['audio', 'generation', 'music', 'song'],
    priority: 95
  },

  'query-song-task': {
    name: 'query-song-task',
    provider: 'mureka',
    category: 'song',
    endpoint: '/song/query',
    method: 'GET',
    type: 'sync',
    paramSchema: require('../../params/providers/mureka/song/query-task'),
    models: [],
    tags: ['audio', 'query', 'task'],
    priority: 100
  },

  'generate-lyrics': {
    name: 'generate-lyrics',
    provider: 'mureka',
    category: 'lyrics',
    endpoint: '/lyrics/generate',
    method: 'POST',
    type: 'sync',
    paramSchema: require('../../params/providers/mureka/lyrics/generate-lyrics'),
    models: [],
    tags: ['text', 'generation', 'lyrics'],
    priority: 100
  },

  'extend-lyrics': {
    name: 'extend-lyrics',
    provider: 'mureka',
    category: 'lyrics',
    endpoint: '/lyrics/extend',
    method: 'POST',
    type: 'sync',
    paramSchema: require('../../params/providers/mureka/lyrics/extend-lyrics'),
    models: [],
    tags: ['text', 'generation', 'lyrics'],
    priority: 95
  },

  'generate-instrumental': {
    name: 'generate-instrumental',
    provider: 'mureka',
    category: 'instrumental',
    endpoint: '/instrumental/generate',
    method: 'POST',
    type: 'async',
    paramSchema: require('../../params/providers/mureka/instrumental/generate-instrumental'),
    models: ['auto', 'mureka-7.5', 'mureka-7.6', 'mureka-8'],
    tags: ['audio', 'generation', 'music', 'instrumental'],
    priority: 100
  },

  'query-instrumental-task': {
    name: 'query-instrumental-task',
    provider: 'mureka',
    category: 'instrumental',
    endpoint: '/instrumental/query',
    method: 'GET',
    type: 'sync',
    paramSchema: require('../../params/providers/mureka/instrumental/query-task'),
    models: [],
    tags: ['audio', 'query', 'task'],
    priority: 100
  },

  'create-speech': {
    name: 'create-speech',
    provider: 'mureka',
    category: 'tts',
    endpoint: '/tts/speech',
    method: 'POST',
    type: 'sync',
    paramSchema: require('../../params/providers/mureka/tts/create-speech'),
    models: ['mureka-tts'],
    tags: ['audio', 'tts', 'speech'],
    priority: 100
  },

  'create-podcast': {
    name: 'create-podcast',
    provider: 'mureka',
    category: 'tts',
    endpoint: '/tts/podcast',
    method: 'POST',
    type: 'sync',
    paramSchema: require('../../params/providers/mureka/tts/create-podcast'),
    models: ['mureka-tts'],
    tags: ['audio', 'tts', 'podcast'],
    priority: 100
  },

  'vocal-cloning': {
    name: 'vocal-cloning',
    provider: 'mureka',
    category: 'vocal',
    endpoint: '/vocal/cloning',
    method: 'POST',
    type: 'async',
    paramSchema: require('../../params/providers/mureka/vocal/vocal-cloning'),
    models: ['mureka-vocal-cloning'],
    tags: ['audio', 'vocal', 'cloning'],
    priority: 100
  },

  'upload-file': {
    name: 'upload-file',
    provider: 'mureka',
    category: 'files',
    endpoint: '/files/upload',
    method: 'POST',
    type: 'sync',
    paramSchema: require('../../params/providers/mureka/files/upload-file'),
    models: [],
    tags: ['file', 'upload'],
    priority: 100
  },

  'create-upload': {
    name: 'create-upload',
    provider: 'mureka',
    category: 'upload',
    endpoint: '/upload/create',
    method: 'POST',
    type: 'sync',
    paramSchema: require('../../params/providers/mureka/upload/create-upload'),
    models: [],
    tags: ['file', 'upload'],
    priority: 100
  },

  'add-upload-part': {
    name: 'add-upload-part',
    provider: 'mureka',
    category: 'upload',
    endpoint: '/upload/part',
    method: 'POST',
    type: 'sync',
    paramSchema: require('../../params/providers/mureka/upload/add-upload-part'),
    models: [],
    tags: ['file', 'upload'],
    priority: 100
  },

  'complete-upload': {
    name: 'complete-upload',
    provider: 'mureka',
    category: 'upload',
    endpoint: '/upload/complete',
    method: 'POST',
    type: 'sync',
    paramSchema: require('../../params/providers/mureka/upload/complete-upload'),
    models: [],
    tags: ['file', 'upload'],
    priority: 100
  },

  'describe-song': {
    name: 'describe-song',
    provider: 'mureka',
    category: 'song',
    endpoint: '/song/describe',
    method: 'POST',
    type: 'sync',
    paramSchema: require('../../params/providers/mureka/song/describe-song'),
    models: [],
    tags: ['audio', 'analysis', 'song'],
    priority: 100
  },

  'recognize-song': {
    name: 'recognize-song',
    provider: 'mureka',
    category: 'song',
    endpoint: '/song/recognize',
    method: 'POST',
    type: 'sync',
    paramSchema: require('../../params/providers/mureka/song/recognize-song'),
    models: [],
    tags: ['audio', 'analysis', 'song'],
    priority: 100
  },

  'stem-song': {
    name: 'stem-song',
    provider: 'mureka',
    category: 'song',
    endpoint: '/song/stem',
    method: 'POST',
    type: 'sync',
    paramSchema: require('../../params/providers/mureka/song/stem-song'),
    models: [],
    tags: ['audio', 'processing', 'song'],
    priority: 100
  }
}
