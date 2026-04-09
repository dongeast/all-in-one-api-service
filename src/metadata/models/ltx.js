/**
 * LTX 模型元数据定义
 */

const { APITypes, MediaTypes, Providers, Series } = require('../../constants')
const { ModelTags } = require('../../constants/tags')

module.exports = {
  'ltx-2-3-pro': {
    name: 'ltx-2-3-pro',
    displayName: 'LTX 2.3 Pro',
    description: 'LTX latest professional video generation model, supports text, image, and audio to video',
    logo: '',
    series: Series.LTX,
    type: [APITypes.TEXT_TO_VIDEO, APITypes.IMAGE_TO_VIDEO, APITypes.AUDIO_TO_VIDEO],
    mediaType: MediaTypes.VIDEO,
    tags: [ModelTags.HIGH_QUALITY, ModelTags.PREMIUM, ModelTags.STABLE, ModelTags.RECOMMENDED],
    priority: 100,
    provider: Providers.LTX,
    capabilities: {
      maxResolution: '4K',
      maxDuration: 20,
      supportedFPS: [24, 25, 48, 50],
      aspectRatios: ['16:9', '9:16'],
      supportsAudioToVideo: true,
      supportsImageToVideo: true,
      supportsTextToVideo: true,
      supportsVideoExtension: true,
      supportsVideoRetake: true
    }
  },

  'ltx-2-3-fast': {
    name: 'ltx-2-3-fast',
    displayName: 'LTX 2.3 Fast',
    description: 'LTX latest fast video generation model, suitable for quick preview',
    logo: '',
    series: Series.LTX,
    type: [APITypes.TEXT_TO_VIDEO, APITypes.IMAGE_TO_VIDEO],
    mediaType: MediaTypes.VIDEO,
    tags: [ModelTags.FAST, ModelTags.STABLE],
    priority: 95,
    provider: Providers.LTX,
    capabilities: {
      maxResolution: '4K',
      maxDuration: 20,
      supportedFPS: [24, 25, 48, 50],
      aspectRatios: ['16:9', '9:16'],
      supportsImageToVideo: true,
      supportsTextToVideo: true
    }
  },

  'ltx-2-pro': {
    name: 'ltx-2-pro',
    displayName: 'LTX 2 Pro',
    description: 'LTX professional video generation model, supports multiple generation methods',
    logo: '',
    series: Series.LTX,
    type: [APITypes.TEXT_TO_VIDEO, APITypes.IMAGE_TO_VIDEO, APITypes.AUDIO_TO_VIDEO],
    mediaType: MediaTypes.VIDEO,
    tags: [ModelTags.HIGH_QUALITY, ModelTags.STABLE],
    priority: 90,
    provider: Providers.LTX,
    capabilities: {
      maxResolution: '4K',
      maxDuration: 20,
      supportedFPS: [25, 50],
      aspectRatios: ['16:9'],
      supportsAudioToVideo: true,
      supportsImageToVideo: true,
      supportsTextToVideo: true,
      supportsVideoExtension: true,
      supportsVideoRetake: true
    }
  },

  'ltx-2-fast': {
    name: 'ltx-2-fast',
    displayName: 'LTX 2 Fast',
    description: 'LTX fast video generation model',
    logo: '',
    series: Series.LTX,
    type: [APITypes.TEXT_TO_VIDEO, APITypes.IMAGE_TO_VIDEO],
    mediaType: MediaTypes.VIDEO,
    tags: [ModelTags.FAST],
    priority: 85,
    provider: Providers.LTX,
    capabilities: {
      maxResolution: '4K',
      maxDuration: 20,
      supportedFPS: [25, 50],
      aspectRatios: ['16:9'],
      supportsImageToVideo: true,
      supportsTextToVideo: true
    }
  }
}
