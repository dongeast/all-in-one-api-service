/**
 * Mureka 接口元数据定义
 * 仅维护 API 的必要信息
 */

const { APITypes, Providers, MediaTypes, HttpMethod } = require('../../constants')

const APIs = {
  SONG_GENERATE: 'mureka-song-generate',
  SONG_EXTEND: 'mureka-song-extend',
  SONG_QUERY: 'mureka-song-query',
  LYRICS_GENERATE: 'mureka-lyrics-generate',
  LYRICS_EXTEND: 'mureka-lyrics-extend',
  INSTRUMENTAL_GENERATE: 'mureka-instrumental-generate',
  INSTRUMENTAL_QUERY: 'mureka-instrumental-query',
  TTS_SPEECH: 'mureka-tts-speech',
  TTS_PODCAST: 'mureka-tts-podcast',
  VOCAL_CLONING: 'mureka-vocal-cloning',
  FILES_UPLOAD: 'mureka-files-upload',
  UPLOAD_CREATE: 'mureka-upload-create',
  UPLOAD_PART: 'mureka-upload-part',
  UPLOAD_COMPLETE: 'mureka-upload-complete',
  SONG_DESCRIBE: 'mureka-song-describe',
  SONG_RECOGNIZE: 'mureka-song-recognize',
  SONG_STEM: 'mureka-song-stem'
}

const APIsMeta = {
  [APIs.SONG_GENERATE]: {
    provider: Providers.MUREKA,
    apiType: APITypes.SONG_GENERATION,
    resultType: MediaTypes.AUDIO,
    endpoint: '/song/generate',
    method: HttpMethod.POST,
    paramSchema: require('../params/mureka/song/generate-song'),
    priority: 100
  },
  [APIs.SONG_EXTEND]: {
    provider: Providers.MUREKA,
    apiType: APITypes.SONG_GENERATION,
    resultType: MediaTypes.AUDIO,
    endpoint: '/song/extend',
    method: HttpMethod.POST,
    paramSchema: require('../params/mureka/song/extend-song'),
    priority: 95
  },
  [APIs.SONG_QUERY]: {
    provider: Providers.MUREKA,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/song/query',
    method: HttpMethod.GET,
    paramSchema: require('../params/mureka/song/query-task'),
    priority: 100
  },
  [APIs.LYRICS_GENERATE]: {
    provider: Providers.MUREKA,
    apiType: APITypes.TEXT_GENERATION,
    resultType: MediaTypes.TEXT,
    endpoint: '/lyrics/generate',
    method: HttpMethod.POST,
    paramSchema: require('../params/mureka/lyrics/generate-lyrics'),
    priority: 100
  },
  [APIs.LYRICS_EXTEND]: {
    provider: Providers.MUREKA,
    apiType: APITypes.TEXT_GENERATION,
    resultType: MediaTypes.TEXT,
    endpoint: '/lyrics/extend',
    method: HttpMethod.POST,
    paramSchema: require('../params/mureka/lyrics/extend-lyrics'),
    priority: 95
  },
  [APIs.INSTRUMENTAL_GENERATE]: {
    provider: Providers.MUREKA,
    apiType: APITypes.INSTRUMENTAL_GENERATION,
    resultType: MediaTypes.AUDIO,
    endpoint: '/instrumental/generate',
    method: HttpMethod.POST,
    priority: 100
  },
  [APIs.INSTRUMENTAL_QUERY]: {
    provider: Providers.MUREKA,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/instrumental/query',
    method: HttpMethod.GET,
    paramSchema: require('../params/mureka/instrumental/query-task'),
    priority: 100
  },
  [APIs.TTS_SPEECH]: {
    provider: Providers.MUREKA,
    apiType: APITypes.TEXT_TO_SPEECH,
    resultType: MediaTypes.AUDIO,
    endpoint: '/tts/speech',
    method: HttpMethod.POST,
    paramSchema: require('../params/mureka/tts/create-speech'),
    priority: 100
  },
  [APIs.TTS_PODCAST]: {
    provider: Providers.MUREKA,
    apiType: APITypes.TEXT_TO_SPEECH,
    resultType: MediaTypes.AUDIO,
    endpoint: '/tts/podcast',
    method: HttpMethod.POST,
    paramSchema: require('../params/mureka/tts/create-podcast'),
    priority: 100
  },
  [APIs.VOCAL_CLONING]: {
    provider: Providers.MUREKA,
    apiType: APITypes.VOCAL_CLONING,
    resultType: MediaTypes.AUDIO,
    endpoint: '/vocal/cloning',
    method: HttpMethod.POST,
    paramSchema: require('../params/mureka/vocal/vocal-cloning'),
    priority: 100
  },
  [APIs.FILES_UPLOAD]: {
    provider: Providers.MUREKA,
    apiType: APITypes.FILE_UPLOAD,
    endpoint: '/files/upload',
    method: HttpMethod.POST,
    paramSchema: require('../params/mureka/files/upload-file'),
    priority: 100
  },
  [APIs.UPLOAD_CREATE]: {
    provider: Providers.MUREKA,
    apiType: APITypes.FILE_UPLOAD,
    endpoint: '/upload/create',
    method: HttpMethod.POST,
    paramSchema: require('../params/mureka/upload/create-upload'),
    priority: 100
  },
  [APIs.UPLOAD_PART]: {
    provider: Providers.MUREKA,
    apiType: APITypes.FILE_UPLOAD,
    endpoint: '/upload/part',
    method: HttpMethod.POST,
    paramSchema: require('../params/mureka/upload/add-upload-part'),
    priority: 100
  },
  [APIs.UPLOAD_COMPLETE]: {
    provider: Providers.MUREKA,
    apiType: APITypes.FILE_UPLOAD,
    endpoint: '/upload/complete',
    method: HttpMethod.POST,
    paramSchema: require('../params/mureka/upload/complete-upload'),
    priority: 100
  },
  [APIs.SONG_DESCRIBE]: {
    provider: Providers.MUREKA,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/song/describe',
    method: HttpMethod.POST,
    paramSchema: require('../params/mureka/song/describe-song'),
    priority: 100
  },
  [APIs.SONG_RECOGNIZE]: {
    provider: Providers.MUREKA,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/song/recognize',
    method: HttpMethod.POST,
    paramSchema: require('../params/mureka/song/recognize-song'),
    priority: 100
  },
  [APIs.SONG_STEM]: {
    provider: Providers.MUREKA,
    apiType: APITypes.AUDIO_GENERATION,
    resultType: MediaTypes.AUDIO,
    endpoint: '/song/stem',
    method: HttpMethod.POST,
    paramSchema: require('../params/mureka/song/stem-song'),
    priority: 100
  }
}

module.exports = {
  APIs,
  APIsMeta
}
