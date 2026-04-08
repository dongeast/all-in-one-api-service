/**
 * 火山引擎模型元数据定义
 */

const { APITypes, MediaTypes, Providers, Series } = require('../../constants')
const { ModelTags } = require('../../constants/tags')

module.exports = {
  'doubao-seedream-5.0-lite': {
    name: 'doubao-seedream-5.0-lite',
    displayName: '豆包 Seedream 5.0 Lite',
    description: '火山引擎轻量级图像生成模型，支持2K-3K分辨率',
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

  'doubao-seedream-4.5': {
    name: 'doubao-seedream-4.5',
    displayName: '豆包 Seedream 4.5',
    description: '火山引擎高质量图像生成模型，支持2K-4K分辨率',
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

  'doubao-seedream-4.0': {
    name: 'doubao-seedream-4.0',
    displayName: '豆包 Seedream 4.0',
    description: '火山引擎图像生成模型，支持1K-4K分辨率',
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

  'doubao-seedream-3.0-t2i': {
    name: 'doubao-seedream-3.0-t2i',
    displayName: '豆包 Seedream 3.0 T2I',
    description: '火山引擎文生图模型',
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

  'doubao-seedance-2-0': {
    name: 'doubao-seedance-2-0',
    displayName: '豆包 Seedance 2.0',
    description: '火山引擎最新视频生成模型，支持多模态参考',
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

  'doubao-seedance-2-0-fast': {
    name: 'doubao-seedance-2-0-fast',
    displayName: '豆包 Seedance 2.0 Fast',
    description: '火山引擎快速视频生成模型',
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

  'doubao-seedance-1-5-pro': {
    name: 'doubao-seedance-1-5-pro',
    displayName: '豆包 Seedance 1.5 Pro',
    description: '火山引擎专业版视频生成模型',
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

  'doubao-seedance-1-0-pro': {
    name: 'doubao-seedance-1-0-pro',
    displayName: '豆包 Seedance 1.0 Pro',
    description: '火山引擎视频生成模型',
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

  'doubao-seedance-1-0-pro-fast': {
    name: 'doubao-seedance-1-0-pro-fast',
    displayName: '豆包 Seedance 1.0 Pro Fast',
    description: '火山引擎快速视频生成模型',
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

  'doubao-seedance-1-0-lite': {
    name: 'doubao-seedance-1-0-lite',
    displayName: '豆包 Seedance 1.0 Lite',
    description: '火山引擎轻量级视频生成模型',
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
    displayName: '豆包 Seed3D 1.0',
    description: '火山引擎3D模型生成模型',
    logo: '',
    series: Series.SEED3D,
    type: APITypes.IMAGE_TO_3D,
    mediaType: MediaTypes.AUDIO_3D,
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
