/**
 * LTX 模型元数据定义
 */

const { APITypes, MediaTypes, Providers } = require('../../constants')
const { ModelTags } = require('../../constants/tags')

module.exports = {
  'ltx-2-3-pro': {
    name: 'ltx-2-3-pro',
    displayName: 'LTX 2.3 Pro',
    description: 'LTX最新专业版视频生成模型，支持文本、图片、音频生成视频',
    logo: '',
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
    description: 'LTX最新快速版视频生成模型，适合快速预览',
    logo: '',
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
    description: 'LTX专业版视频生成模型，支持多种生成方式',
    logo: '',
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
    description: 'LTX快速版视频生成模型',
    logo: '',
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
