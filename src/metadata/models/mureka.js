/**
 * Mureka 模型元数据定义
 */

const { APITypes, MediaTypes, Providers } = require('../../constants')
const { ModelTags } = require('../../constants/tags')

module.exports = {
  'mureka-8': {
    name: 'mureka-8',
    displayName: 'Mureka 8',
    description: 'Mureka最新音乐生成模型',
    logo: '',
    type: [APITypes.SONG_GENERATION, APITypes.INSTRUMENTAL_GENERATION],
    mediaType: MediaTypes.AUDIO,
    tags: [ModelTags.HIGH_QUALITY, ModelTags.STABLE, ModelTags.RECOMMENDED],
    priority: 100,
    provider: Providers.MUREKA,
    capabilities: {
      supportsSongGeneration: true,
      supportsInstrumentalGeneration: true,
      supportsLyricsGeneration: true
    }
  },

  'mureka-o2': {
    name: 'mureka-o2',
    displayName: 'Mureka O2',
    description: 'Mureka音乐生成模型',
    logo: '',
    type: APITypes.SONG_GENERATION,
    mediaType: MediaTypes.AUDIO,
    tags: [ModelTags.STABLE],
    priority: 95,
    provider: Providers.MUREKA,
    capabilities: {
      supportsSongGeneration: true,
      supportsLyricsGeneration: true
    }
  },

  'mureka-7.6': {
    name: 'mureka-7.6',
    displayName: 'Mureka 7.6',
    description: 'Mureka音乐生成模型',
    logo: '',
    type: [APITypes.SONG_GENERATION, APITypes.INSTRUMENTAL_GENERATION],
    mediaType: MediaTypes.AUDIO,
    tags: [ModelTags.STABLE],
    priority: 90,
    provider: Providers.MUREKA,
    capabilities: {
      supportsSongGeneration: true,
      supportsInstrumentalGeneration: true
    }
  },

  'mureka-7.5': {
    name: 'mureka-7.5',
    displayName: 'Mureka 7.5',
    description: 'Mureka音乐生成模型',
    logo: '',
    type: [APITypes.SONG_GENERATION, APITypes.INSTRUMENTAL_GENERATION],
    mediaType: MediaTypes.AUDIO,
    tags: [ModelTags.STABLE],
    priority: 85,
    provider: Providers.MUREKA,
    capabilities: {
      supportsSongGeneration: true,
      supportsInstrumentalGeneration: true
    }
  },

  'mureka-tts': {
    name: 'mureka-tts',
    displayName: 'Mureka TTS',
    description: 'Mureka文本转语音模型',
    logo: '',
    type: APITypes.TEXT_TO_SPEECH,
    mediaType: MediaTypes.AUDIO,
    tags: [ModelTags.STABLE],
    priority: 100,
    provider: Providers.MUREKA,
    capabilities: {
      voices: ['Ethan', 'Victoria', 'Jake', 'Luna', 'Emma'],
      supportsPodcast: true
    }
  },

  'mureka-vocal-cloning': {
    name: 'mureka-vocal-cloning',
    displayName: 'Mureka Vocal Cloning',
    description: 'Mureka声音克隆模型',
    logo: '',
    type: APITypes.VOCAL_CLONING,
    mediaType: MediaTypes.AUDIO,
    tags: [ModelTags.STABLE],
    priority: 100,
    provider: Providers.MUREKA,
    capabilities: {
      supportsVocalCloning: true
    }
  }
}
