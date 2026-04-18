/**
 * Mureka Functions 元数据定义
 * 统一的 Function 元数据源
 * 只引用API名称，不定义endpoint和method
 */

const { APITypes, Providers } = require('../../constants')
const { APIs } = require('../apis/mureka')
const { Models } = require('../models/mureka')

const Functions = {
  GENERATE_SONG: 'generate-song',
  EXTEND_SONG: 'extend-song',
  GENERATE_LYRICS: 'generate-lyrics',
  EXTEND_LYRICS: 'extend-lyrics',
  GENERATE_INSTRUMENTAL: 'generate-instrumental',
  CREATE_SPEECH: 'create-speech',
  CREATE_PODCAST: 'create-podcast',
  VOCAL_CLONING: 'vocal-cloning',
  UPLOAD_FILE: 'upload-file',
  CREATE_UPLOAD: 'create-upload',
  ADD_UPLOAD_PART: 'add-upload-part',
  COMPLETE_UPLOAD: 'complete-upload',
  DESCRIBE_SONG: 'describe-song',
  RECOGNIZE_SONG: 'recognize-song',
  STEM_SONG: 'stem-song'
}

const FunctionsMeta = {
  [Functions.GENERATE_SONG]: {
    name: 'generate-song',
    type: 'async',
    provider: Providers.MUREKA,
    apiType: APITypes.SONG_GENERATION,
    
    apis: {
      request: APIs.SONG_GENERATE,
      query: APIs.SONG_QUERY
    },
    
    models: [Models.AUTO, Models.MUREKA_7_5, Models.MUREKA_7_6, Models.MUREKA_O2, Models.MUREKA_8],
    priority: 100
  },
  
  [Functions.EXTEND_SONG]: {
    name: 'extend-song',
    type: 'async',
    provider: Providers.MUREKA,
    apiType: APITypes.SONG_GENERATION,
    
    apis: {
      request: APIs.SONG_EXTEND,
      query: APIs.SONG_QUERY
    },
    
    models: [Models.AUTO, Models.MUREKA_7_5, Models.MUREKA_7_6, Models.MUREKA_O2, Models.MUREKA_8],
    priority: 95
  },
  
  [Functions.GENERATE_LYRICS]: {
    name: 'generate-lyrics',
    type: 'sync',
    provider: Providers.MUREKA,
    apiType: APITypes.TEXT_GENERATION,
    
    apis: {
      request: APIs.LYRICS_GENERATE
    },
    
    models: [],
    priority: 100
  },
  
  [Functions.EXTEND_LYRICS]: {
    name: 'extend-lyrics',
    type: 'sync',
    provider: Providers.MUREKA,
    apiType: APITypes.TEXT_GENERATION,
    
    apis: {
      request: APIs.LYRICS_EXTEND
    },
    
    models: [],
    priority: 95
  },
  
  [Functions.GENERATE_INSTRUMENTAL]: {
    name: 'generate-instrumental',
    type: 'async',
    provider: Providers.MUREKA,
    apiType: APITypes.INSTRUMENTAL_GENERATION,
    
    apis: {
      request: APIs.INSTRUMENTAL_GENERATE,
      query: APIs.INSTRUMENTAL_QUERY
    },
    
    models: [Models.AUTO, Models.MUREKA_7_5, Models.MUREKA_7_6, Models.MUREKA_8],
    priority: 100
  },
  
  [Functions.CREATE_SPEECH]: {
    name: 'create-speech',
    type: 'sync',
    provider: Providers.MUREKA,
    apiType: APITypes.TEXT_TO_SPEECH,
    
    apis: {
      request: APIs.TTS_SPEECH
    },
    
    models: [Models.MUREKA_TTS],
    priority: 100
  },
  
  [Functions.CREATE_PODCAST]: {
    name: 'create-podcast',
    type: 'sync',
    provider: Providers.MUREKA,
    apiType: APITypes.TEXT_TO_SPEECH,
    
    apis: {
      request: APIs.TTS_PODCAST
    },
    
    models: [Models.MUREKA_TTS],
    priority: 100
  },
  
  [Functions.VOCAL_CLONING]: {
    name: 'vocal-cloning',
    type: 'async',
    provider: Providers.MUREKA,
    apiType: APITypes.VOCAL_CLONING,
    
    apis: {
      request: APIs.VOCAL_CLONING
    },
    
    models: [Models.MUREKA_VOCAL_CLONING],
    priority: 100
  },
  
  [Functions.UPLOAD_FILE]: {
    name: 'upload-file',
    type: 'sync',
    provider: Providers.MUREKA,
    apiType: APITypes.FILE_UPLOAD,
    
    apis: {
      request: APIs.FILES_UPLOAD
    },
    
    models: [],
    priority: 100
  },
  
  [Functions.CREATE_UPLOAD]: {
    name: 'create-upload',
    type: 'sync',
    provider: Providers.MUREKA,
    apiType: APITypes.FILE_UPLOAD,
    
    apis: {
      request: APIs.UPLOAD_CREATE
    },
    
    models: [],
    priority: 100
  },
  
  [Functions.ADD_UPLOAD_PART]: {
    name: 'add-upload-part',
    type: 'sync',
    provider: Providers.MUREKA,
    apiType: APITypes.FILE_UPLOAD,
    
    apis: {
      request: APIs.UPLOAD_PART
    },
    
    models: [],
    priority: 100
  },
  
  [Functions.COMPLETE_UPLOAD]: {
    name: 'complete-upload',
    type: 'sync',
    provider: Providers.MUREKA,
    apiType: APITypes.FILE_UPLOAD,
    
    apis: {
      request: APIs.UPLOAD_COMPLETE
    },
    
    models: [],
    priority: 100
  },
  
  [Functions.DESCRIBE_SONG]: {
    name: 'describe-song',
    type: 'sync',
    provider: Providers.MUREKA,
    apiType: APITypes.TASK_QUERY,
    
    apis: {
      request: APIs.SONG_DESCRIBE
    },
    
    models: [],
    priority: 100
  },
  
  [Functions.RECOGNIZE_SONG]: {
    name: 'recognize-song',
    type: 'sync',
    provider: Providers.MUREKA,
    apiType: APITypes.TASK_QUERY,
    
    apis: {
      request: APIs.SONG_RECOGNIZE
    },
    
    models: [],
    priority: 100
  },
  
  [Functions.STEM_SONG]: {
    name: 'stem-song',
    type: 'sync',
    provider: Providers.MUREKA,
    apiType: APITypes.AUDIO_GENERATION,
    
    apis: {
      request: APIs.SONG_STEM
    },
    
    models: [],
    priority: 100
  }
}

module.exports = {
  Functions,
  FunctionsMeta
}
