/**
 * Skyreels 模型元数据定义
 */

const { APITypes, MediaTypes, Providers, Series } = require('../../constants')
const { ModelTags } = require('../../constants/tags')

module.exports = {
  'skyreels-v4': {
    name: 'skyreels-v4',
    displayName: 'Skyreels V4',
    description: 'Skyreels最新视频生成模型，支持文本和图片生成视频',
    logo: '',
    series: Series.SKYREELS,
    type: [APITypes.TEXT_TO_VIDEO, APITypes.IMAGE_TO_VIDEO],
    mediaType: MediaTypes.VIDEO,
    tags: [ModelTags.HIGH_QUALITY, ModelTags.STABLE, ModelTags.RECOMMENDED],
    priority: 100,
    provider: Providers.SKYREELS,
    capabilities: {
      supportsTextToVideo: true,
      supportsImageToVideo: true,
      supportsVideoRestyling: true,
      supportsVideoExtension: true,
      supportsOmniReference: true
    }
  },

  'skyreels-v3': {
    name: 'skyreels-v3',
    displayName: 'Skyreels V3',
    description: 'Skyreels视频生成模型，支持文本和图片生成视频',
    logo: '',
    series: Series.SKYREELS,
    type: [APITypes.TEXT_TO_VIDEO, APITypes.IMAGE_TO_VIDEO],
    mediaType: MediaTypes.VIDEO,
    tags: [ModelTags.STABLE],
    priority: 95,
    provider: Providers.SKYREELS,
    capabilities: {
      supportsTextToVideo: true,
      supportsImageToVideo: true,
      supportsVideoRestyling: true,
      supportsVideoExtension: true,
      supportsOmniReference: true
    }
  },

  'skyreels-avatar': {
    name: 'skyreels-avatar',
    displayName: 'Skyreels Avatar',
    description: 'Skyreels数字人模型，支持口型同步和动作生成',
    logo: '',
    series: Series.SKYREELS,
    type: [APITypes.AVATAR_GENERATION, APITypes.LIP_SYNC],
    mediaType: MediaTypes.VIDEO,
    tags: [ModelTags.STABLE],
    priority: 100,
    provider: Providers.SKYREELS,
    capabilities: {
      supportsLipSync: true,
      supportsSingleActorAvatar: true,
      supportsMultiActorAvatar: true,
      supportsCameraMotion: true
    }
  }
}
