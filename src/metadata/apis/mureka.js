/**
 * Mureka 接口元数据定义
 */

const { APITypes, Providers } = require('../../constants')
const { APITags } = require('../../constants/tags')

module.exports = {
  'generate-song': {
    name: 'generate-song',
    displayName: '生成歌曲',
    description: '根据歌词和风格生成歌曲',
    type: APITypes.SONG_GENERATION,
    tags: [APITags.ASYNC],
    priority: 100,
    provider: Providers.MUREKA,
    models: ['auto', 'mureka-7.5', 'mureka-7.6', 'mureka-o2', 'mureka-8'],
    apiClass: 'GenerateSong',
    endpoint: '/song/generate'
  },

  'extend-song': {
    name: 'extend-song',
    displayName: '延长歌曲',
    description: '延长已有歌曲',
    type: APITypes.SONG_GENERATION,
    tags: [APITags.ASYNC],
    priority: 100,
    provider: Providers.MUREKA,
    models: ['auto', 'mureka-7.5', 'mureka-7.6', 'mureka-o2', 'mureka-8'],
    apiClass: 'ExtendSong',
    endpoint: '/song/extend'
  },

  'query-song-task': {
    name: 'query-song-task',
    displayName: '查询歌曲任务',
    description: '查询歌曲生成任务状态',
    type: APITypes.TASK_QUERY,
    tags: [APITags.STABLE],
    priority: 100,
    provider: Providers.MUREKA,
    models: [],
    apiClass: 'QueryTask',
    endpoint: '/song/query'
  },

  'generate-lyrics': {
    name: 'generate-lyrics',
    displayName: '生成歌词',
    description: '根据主题生成歌词',
    type: APITypes.TEXT_GENERATION,
    tags: [APITags.STABLE],
    priority: 100,
    provider: Providers.MUREKA,
    models: [],
    apiClass: 'GenerateLyrics',
    endpoint: '/lyrics/generate'
  },

  'generate-instrumental': {
    name: 'generate-instrumental',
    displayName: '生成伴奏',
    description: '根据风格生成伴奏',
    type: APITypes.INSTRUMENTAL_GENERATION,
    tags: [APITags.ASYNC],
    priority: 100,
    provider: Providers.MUREKA,
    models: ['auto', 'mureka-7.5', 'mureka-7.6', 'mureka-8'],
    apiClass: 'GenerateInstrumental',
    endpoint: '/instrumental/generate'
  },

  'create-speech': {
    name: 'create-speech',
    displayName: '创建语音',
    description: '将文本转换为语音',
    type: APITypes.TEXT_TO_SPEECH,
    tags: [APITags.STABLE],
    priority: 100,
    provider: Providers.MUREKA,
    models: ['mureka-tts'],
    apiClass: 'CreateSpeech',
    endpoint: '/tts/speech'
  },

  'vocal-cloning': {
    name: 'vocal-cloning',
    displayName: '声音克隆',
    description: '克隆声音特征',
    type: APITypes.VOCAL_CLONING,
    tags: [APITags.ASYNC],
    priority: 100,
    provider: Providers.MUREKA,
    models: ['mureka-vocal-cloning'],
    apiClass: 'VocalCloning',
    endpoint: '/vocal/cloning'
  },

  'upload-file': {
    name: 'upload-file',
    displayName: '上传文件',
    description: '上传音频或视频文件',
    type: APITypes.FILE_UPLOAD,
    tags: [APITags.STABLE],
    priority: 100,
    provider: Providers.MUREKA,
    models: [],
    apiClass: 'UploadFile',
    endpoint: '/files/upload'
  }
}
