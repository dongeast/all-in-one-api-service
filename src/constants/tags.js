/**
 * 标签常量定义
 */

const ModelTags = {
  TEXT_TO_IMAGE: 'text_to_image',
  IMAGE_TO_IMAGE: 'image_to_image',
  TEXT_TO_VIDEO: 'text_to_video',
  IMAGE_TO_VIDEO: 'image_to_video',
  TEXT_TO_AUDIO: 'text_to_audio',
  TEXT_TO_SPEECH: 'text_to_speech',
  AUDIO_GENERATION: 'audio_generation',
  MUSIC_GENERATION: 'music_generation',
  SONG_GENERATION: 'song_generation',
  IMAGE_TO_3D: 'image_to_3d',
  TEXT_TO_3D: 'text_to_3d'
}

const APITags = {
  ASYNC: 'async',
  SYNC: 'sync',
  STREAMING: 'streaming',
  BATCH: 'batch',
  PREMIUM: 'premium',
  STANDARD: 'standard',
  EXPERIMENTAL: 'experimental'
}

const ProviderTags = {
  OFFICIAL: 'official',
  THIRD_PARTY: 'third_party',
  OPEN_SOURCE: 'open_source',
  ENTERPRISE: 'enterprise'
}

module.exports = {
  ModelTags,
  APITags,
  ProviderTags
}
