/**
 * Lightricks (LTX) 接口元数据定义
 * 仅维护 API 的必要信息
 */

const { APITypes, Providers, MediaTypes, HttpMethod } = require('../../constants')

const APIs = {
  V1_TEXT_TO_VIDEO: 'lightricks-v1-text-to-video',
  V1_IMAGE_TO_VIDEO: 'lightricks-v1-image-to-video',
  V1_AUDIO_TO_VIDEO: 'lightricks-v1-audio-to-video',
  V1_EXTEND: 'lightricks-v1-extend',
  V1_RETAKE: 'lightricks-v1-retake'
}

const APIsMeta = {
  [APIs.V1_TEXT_TO_VIDEO]: {
    provider: Providers.LIGHTRICKS,
    apiType: APITypes.TEXT_TO_VIDEO,
    resultType: MediaTypes.VIDEO,
    endpoint: '/v1/text-to-video',
    method: HttpMethod.POST,
    paramSchema: require('../params/lightricks/video/generate-video-from-text'),
    priority: 100
  },
  [APIs.V1_IMAGE_TO_VIDEO]: {
    provider: Providers.LIGHTRICKS,
    apiType: APITypes.IMAGE_TO_VIDEO,
    resultType: MediaTypes.VIDEO,
    endpoint: '/v1/image-to-video',
    method: HttpMethod.POST,
    paramSchema: require('../params/lightricks/video/generate-video-from-image'),
    priority: 100
  },
  [APIs.V1_AUDIO_TO_VIDEO]: {
    provider: Providers.LIGHTRICKS,
    apiType: APITypes.AUDIO_TO_VIDEO,
    resultType: MediaTypes.VIDEO,
    endpoint: '/v1/audio-to-video',
    method: HttpMethod.POST,
    paramSchema: require('../params/lightricks/video/generate-video-from-audio'),
    priority: 100
  },
  [APIs.V1_EXTEND]: {
    provider: Providers.LIGHTRICKS,
    apiType: APITypes.VIDEO_EXTENSION,
    resultType: MediaTypes.VIDEO,
    endpoint: '/v1/extend',
    method: HttpMethod.POST,
    paramSchema: require('../params/lightricks/video/extend-video-duration'),
    priority: 100
  },
  [APIs.V1_RETAKE]: {
    provider: Providers.LIGHTRICKS,
    apiType: APITypes.VIDEO_EDITING,
    resultType: MediaTypes.VIDEO,
    endpoint: '/v1/retake',
    method: HttpMethod.POST,
    paramSchema: require('../params/lightricks/video/retake-video-section'),
    priority: 100
  }
}

module.exports = {
  APIs,
  APIsMeta
}
