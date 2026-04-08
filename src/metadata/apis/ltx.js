/**
 * LTX 接口元数据定义
 */

const { APITypes, Providers } = require('../../constants')
const { APITags } = require('../../constants/tags')

module.exports = {
  'generate-video-from-text': {
    name: 'generate-video-from-text',
    displayName: '文本生成视频',
    description: '根据文本提示生成视频',
    type: APITypes.TEXT_TO_VIDEO,
    tags: [APITags.ASYNC],
    priority: 100,
    provider: Providers.LTX,
    models: ['ltx-2-fast', 'ltx-2-pro', 'ltx-2-3-fast', 'ltx-2-3-pro'],
    apiClass: 'GenerateVideoFromText',
    endpoint: '/v1/text-to-video'
  },

  'generate-video-from-image': {
    name: 'generate-video-from-image',
    displayName: '图片生成视频',
    description: '根据图片生成视频',
    type: APITypes.IMAGE_TO_VIDEO,
    tags: [APITags.ASYNC],
    priority: 100,
    provider: Providers.LTX,
    models: ['ltx-2-fast', 'ltx-2-pro', 'ltx-2-3-fast', 'ltx-2-3-pro'],
    apiClass: 'GenerateVideoFromImage',
    endpoint: '/v1/image-to-video'
  },

  'generate-video-from-audio': {
    name: 'generate-video-from-audio',
    displayName: '音频生成视频',
    description: '根据音频生成视频',
    type: APITypes.AUDIO_TO_VIDEO,
    tags: [APITags.ASYNC],
    priority: 100,
    provider: Providers.LTX,
    models: ['ltx-2-pro', 'ltx-2-3-pro'],
    apiClass: 'GenerateVideoFromAudio',
    endpoint: '/v1/audio-to-video'
  },

  'extend-video-duration': {
    name: 'extend-video-duration',
    displayName: '延长视频时长',
    description: '延长已有视频的时长',
    type: APITypes.VIDEO_EXTENSION,
    tags: [APITags.ASYNC],
    priority: 100,
    provider: Providers.LTX,
    models: ['ltx-2-pro', 'ltx-2-3-pro'],
    apiClass: 'ExtendVideoDuration',
    endpoint: '/v1/extend'
  },

  'retake-video-section': {
    name: 'retake-video-section',
    displayName: '重拍视频片段',
    description: '重新生成视频的某个片段',
    type: APITypes.VIDEO_EDITING,
    tags: [APITags.ASYNC],
    priority: 100,
    provider: Providers.LTX,
    models: ['ltx-2-pro', 'ltx-2-3-pro'],
    apiClass: 'RetakeVideoSection',
    endpoint: '/v1/retake'
  }
}
