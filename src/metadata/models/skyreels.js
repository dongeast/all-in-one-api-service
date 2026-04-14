/**
 * Skyreels 模型元数据定义
 */

const { APITypes, MediaTypes, Providers, Series } = require('../../constants')
const { ModelTags } = require('../../constants/tags')

module.exports = {
  'skyreels-v4': {
    name: 'skyreels-v4',
    displayName: 'Skyreels V4',
    description: 'Skyreels latest video generation model, supports text-to-video, image-to-video and omni-reference',
    logo: '',
    series: Series.SKYREELS,
    type: [APITypes.TEXT_TO_VIDEO, APITypes.IMAGE_TO_VIDEO, APITypes.VIDEO_REFERENCE],
    mediaType: MediaTypes.VIDEO,
    tags: [ModelTags.HIGH_QUALITY, ModelTags.STABLE, ModelTags.RECOMMENDED],
    priority: 100,
    provider: Providers.SKYWORK,
    capabilities: {
      supportsTextToVideo: true,
      supportsImageToVideo: true,
      supportsOmniReference: true
    }
  },

  'skyreels-v3': {
    name: 'skyreels-v3',
    displayName: 'Skyreels V3',
    description: 'Skyreels video generation model, supports reference-to-video, video-restyling and video-extension',
    logo: '',
    series: Series.SKYREELS,
    type: [APITypes.VIDEO_EDITING, APITypes.VIDEO_EXTENSION],
    mediaType: MediaTypes.VIDEO,
    tags: [ModelTags.STABLE],
    priority: 95,
    provider: Providers.SKYWORK,
    capabilities: {
      supportsReferenceToVideo: true,
      supportsVideoRestyling: true,
      supportsVideoExtension: true
    }
  },

  'skyreels-avatar': {
    name: 'skyreels-avatar',
    displayName: 'Skyreels Avatar',
    description: 'Skyreels digital human model, supports lip sync and motion generation',
    logo: '',
    series: Series.SKYREELS,
    type: [APITypes.AVATAR_GENERATION, APITypes.LIP_SYNC],
    mediaType: MediaTypes.VIDEO,
    tags: [ModelTags.STABLE],
    priority: 100,
    provider: Providers.SKYWORK,
    capabilities: {
      supportsLipSync: true,
      supportsSingleActorAvatar: true,
      supportsMultiActorAvatar: true,
      supportsCameraMotion: true
    }
  }
}
