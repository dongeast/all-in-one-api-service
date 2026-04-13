/**
 * 火山引擎模型元数据定义
 */

const { APITypes, MediaTypes, Providers, Series } = require('../../constants')
const { ModelTags } = require('../../constants/tags')

module.exports = {
  'doubao-seedream-5-0-260128': {
    name: 'doubao-seedream-5-0-260128',
    displayName: 'Seedream 5.0 Lite',
    description: 'Volcengine lightweight image generation model, supports 2K-3K resolution',
    logo: '',
    series: Series.SEEDREAM,
    type: APITypes.TEXT_TO_IMAGE,
    mediaType: MediaTypes.IMAGE,
    tags: [ModelTags.LITE, ModelTags.FAST, ModelTags.STABLE],
    priority: 100,
    provider: Providers.VOLCENGINE,
    capabilities: {
      maxResolution: '3K',
      aspectRatios: ['1:1', '16:9', '9:16', '4:3', '3:4', '21:9'],
      outputFormats: ['png', 'jpeg'],
      supportsMultiImageFusion: true,
      supportsWebSearch: true
    }
  },

  'doubao-seedream-4-5-251128': {
    name: 'doubao-seedream-4-5-251128',
    displayName: 'Seedream 4.5',
    description: 'Volcengine high-quality image generation model, supports 2K-4K resolution',
    logo: '',
    series: Series.SEEDREAM,
    type: APITypes.TEXT_TO_IMAGE,
    mediaType: MediaTypes.IMAGE,
    tags: [ModelTags.HIGH_QUALITY, ModelTags.STABLE],
    priority: 95,
    provider: Providers.VOLCENGINE,
    capabilities: {
      maxResolution: '4K',
      aspectRatios: ['1:1', '16:9', '9:16', '4:3', '3:4', '21:9'],
      supportsMultiImageFusion: true
    }
  },

  'doubao-seedream-4-0-250828': {
    name: 'doubao-seedream-4-0-250828',
    displayName: 'Seedream 4.0',
    description: 'Volcengine image generation model, supports 1K-4K resolution',
    logo: '',
    series: Series.SEEDREAM,
    type: APITypes.TEXT_TO_IMAGE,
    mediaType: MediaTypes.IMAGE,
    tags: [ModelTags.STABLE],
    priority: 90,
    provider: Providers.VOLCENGINE,
    capabilities: {
      maxResolution: '4K',
      aspectRatios: ['1:1', '16:9', '9:16', '4:3', '3:4', '21:9'],
      supportsMultiImageFusion: true
    }
  },

  'doubao-seedream-3-0-t2i-250415': {
    name: 'doubao-seedream-3-0-t2i-250415',
    displayName: 'Seedream 3.0 T2I',
    description: 'Volcengine text-to-image model',
    logo: '',
    series: Series.SEEDREAM,
    type: APITypes.TEXT_TO_IMAGE,
    mediaType: MediaTypes.IMAGE,
    tags: [ModelTags.STABLE],
    priority: 85,
    provider: Providers.VOLCENGINE,
    capabilities: {
      maxResolution: '2K',
      aspectRatios: ['1:1', '16:9', '9:16', '4:3', '3:4']
    }
  },

  'doubao-seedance-2-0-260128': {
    name: 'doubao-seedance-2-0-260128',
    displayName: 'Seedance 2.0',
    description: 'Volcengine latest video generation model, supports multi-modal reference',
    logo: '',
    series: Series.SEEDANCE,
    type: [APITypes.TEXT_TO_VIDEO, APITypes.IMAGE_TO_VIDEO],
    mediaType: MediaTypes.VIDEO,
    tags: [ModelTags.HIGH_QUALITY, ModelTags.PREMIUM, ModelTags.STABLE, ModelTags.RECOMMENDED],
    priority: 100,
    provider: Providers.VOLCENGINE,
    capabilities: {
      maxResolution: '1080p',
      maxDuration: 15,
      aspectRatios: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9', 'adaptive'],
      resolutions: ['480p', '720p', '1080p'],
      supportsMultiModalReference: true,
      supportsAudioGeneration: true,
      supportsWebSearch: true
    }
  },

  'doubao-seedance-2-0-fast-260128': {
    name: 'doubao-seedance-2-0-fast-260128',
    displayName: 'Seedance 2.0 Fast',
    description: 'Volcengine fast video generation model',
    logo: '',
    series: Series.SEEDANCE,
    type: [APITypes.TEXT_TO_VIDEO, APITypes.IMAGE_TO_VIDEO],
    mediaType: MediaTypes.VIDEO,
    tags: [ModelTags.FAST, ModelTags.STABLE],
    priority: 95,
    provider: Providers.VOLCENGINE,
    capabilities: {
      maxResolution: '1080p',
      maxDuration: 15,
      aspectRatios: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9', 'adaptive'],
      resolutions: ['480p', '720p', '1080p'],
      supportsMultiModalReference: true,
      supportsAudioGeneration: true
    }
  },

  'doubao-seedance-1-5-pro-251215': {
    name: 'doubao-seedance-1-5-pro-251215',
    displayName: 'Seedance 1.5 Pro',
    description: 'Volcengine professional video generation model',
    logo: '',
    series: Series.SEEDANCE,
    type: [APITypes.TEXT_TO_VIDEO, APITypes.IMAGE_TO_VIDEO],
    mediaType: MediaTypes.VIDEO,
    tags: [ModelTags.HIGH_QUALITY, ModelTags.STABLE],
    priority: 90,
    provider: Providers.VOLCENGINE,
    capabilities: {
      maxResolution: '1080p',
      maxDuration: 12,
      aspectRatios: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9'],
      resolutions: ['480p', '720p', '1080p'],
      supportsAudioGeneration: true
    }
  },

  'doubao-seedance-1-0-pro-250528': {
    name: 'doubao-seedance-1-0-pro-250528',
    displayName: 'Seedance 1.0 Pro',
    description: 'Volcengine video generation model',
    logo: '',
    series: Series.SEEDANCE,
    type: [APITypes.TEXT_TO_VIDEO, APITypes.IMAGE_TO_VIDEO],
    mediaType: MediaTypes.VIDEO,
    tags: [ModelTags.STABLE],
    priority: 85,
    provider: Providers.VOLCENGINE,
    capabilities: {
      maxResolution: '1080p',
      maxDuration: 12,
      aspectRatios: ['16:9', '4:3', '1:1', '3:4', '9:16'],
      resolutions: ['480p', '720p', '1080p']
    }
  },

  'doubao-seedance-1-0-pro-fast-251015': {
    name: 'doubao-seedance-1-0-pro-fast-251015',
    displayName: 'Seedance 1.0 Pro Fast',
    description: 'Volcengine fast video generation model',
    logo: '',
    series: Series.SEEDANCE,
    type: [APITypes.TEXT_TO_VIDEO, APITypes.IMAGE_TO_VIDEO],
    mediaType: MediaTypes.VIDEO,
    tags: [ModelTags.FAST],
    priority: 80,
    provider: Providers.VOLCENGINE,
    capabilities: {
      maxResolution: '1080p',
      maxDuration: 12,
      aspectRatios: ['16:9', '4:3', '1:1', '3:4', '9:16'],
      resolutions: ['480p', '720p', '1080p']
    }
  },

  'doubao-seedance-1-0-lite-t2v-250428': {
    name: 'doubao-seedance-1-0-lite-t2v-250428',
    displayName: 'Seedance 1.0 Lite',
    description: 'Volcengine lightweight video generation model',
    logo: '',
    series: Series.SEEDANCE,
    type: [APITypes.TEXT_TO_VIDEO, APITypes.IMAGE_TO_VIDEO],
    mediaType: MediaTypes.VIDEO,
    tags: [ModelTags.LITE, ModelTags.FAST],
    priority: 75,
    provider: Providers.VOLCENGINE,
    capabilities: {
      maxResolution: '720p',
      maxDuration: 12,
      aspectRatios: ['16:9', '4:3', '1:1', '3:4', '9:16'],
      resolutions: ['480p', '720p'],
      maxReferenceImages: 4
    }
  },

  'doubao-seed3d-1-0-250928': {
    name: 'doubao-seed3d-1-0-250928',
    displayName: 'Doubao Seed3D 1.0',
    description: 'Volcengine 3D model generation model',
    logo: '',
    series: Series.SEED3D,
    type: APITypes.IMAGE_TO_3D,
    mediaType: MediaTypes.MODEL_3D,
    tags: [ModelTags.STABLE],
    priority: 100,
    provider: Providers.VOLCENGINE,
    capabilities: {
      outputFormats: ['glb', 'obj', 'usd', 'usdz'],
      subdivisionLevels: ['low', 'medium', 'high'],
      maxImageSize: 10485760,
      supportedImageFormats: ['jpg', 'jpeg', 'png', 'webp', 'bmp']
    }
  }
}
