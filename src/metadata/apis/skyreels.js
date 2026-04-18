/**
 * Skyreels 接口元数据定义
 * 仅维护 API 的必要信息
 */

const { APITypes, Providers, MediaTypes, HttpMethod } = require('../../constants')

const APIs = {
  API_V1_VIDEO_TEXT2VIDEO_SUBMIT: 'skyreels-api-v1-video-text2video-submit',
  API_V1_VIDEO_TEXT2VIDEO_TASK: 'skyreels-api-v1-video-text2video-task',
  API_V1_VIDEO_IMAGE2VIDEO_SUBMIT: 'skyreels-api-v1-video-image2video-submit',
  API_V1_VIDEO_IMAGE2VIDEO_TASK: 'skyreels-api-v1-video-image2video-task',
  API_V1_VIDEO_RETALKING_SUBMIT: 'skyreels-api-v1-video-retalking-submit',
  API_V1_VIDEO_RETALKING_TASK: 'skyreels-api-v1-video-retalking-task',
  API_V1_VIDEO_AUDIO2VIDEO_SINGLE_SUBMIT: 'skyreels-api-v1-video-audio2video-single-submit',
  API_V1_VIDEO_AUDIO2VIDEO_SINGLE_TASK: 'skyreels-api-v1-video-audio2video-single-task',
  API_V1_VIDEO_AUDIO2VIDEO_MULTI_SUBMIT: 'skyreels-api-v1-video-audio2video-multi-submit',
  API_V1_VIDEO_AUDIO2VIDEO_MULTI_TASK: 'skyreels-api-v1-video-audio2video-multi-task',
  API_V1_VIDEO_AUDIO2VIDEO_CAMERA_SUBMIT: 'skyreels-api-v1-video-audio2video-camera-submit',
  API_V1_VIDEO_AUDIO2VIDEO_CAMERA_TASK: 'skyreels-api-v1-video-audio2video-camera-task',
  API_V1_VIDEO_MULTIOBJECT_SUBMIT: 'skyreels-api-v1-video-multiobject-submit',
  API_V1_VIDEO_MULTIOBJECT_TASK: 'skyreels-api-v1-video-multiobject-task',
  API_V1_VIDEO_OMNI_VIDEO_SUBMIT: 'skyreels-api-v1-video-omni-video-submit',
  API_V1_VIDEO_OMNI_VIDEO_TASK: 'skyreels-api-v1-video-omni-video-task',
  API_V1_VIDEO_EXTENSION_SUBMIT: 'skyreels-api-v1-video-extension-submit',
  API_V1_VIDEO_EXTENSION_TASK: 'skyreels-api-v1-video-extension-task',
  API_V1_VIDEO_EXTENSION_CUTSHOT_SUBMIT: 'skyreels-api-v1-video-extension-cutshot-submit',
  API_V1_VIDEO_EXTENSION_CUTSHOT_TASK: 'skyreels-api-v1-video-extension-cutshot-task',
  API_V1_VIDEO_STYLETRANSFER_SUBMIT: 'skyreels-api-v1-video-styletransfer-submit',
  API_V1_VIDEO_STYLETRANSFER_TASK: 'skyreels-api-v1-video-styletransfer-task'
}

const APIsMeta = {
  [APIs.API_V1_VIDEO_TEXT2VIDEO_SUBMIT]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.TEXT_TO_VIDEO,
    resultType: MediaTypes.VIDEO,
    endpoint: '/api/v1/video/text2video/submit',
    method: HttpMethod.POST,
    paramSchema: require('../params/skyreels/video/text-to-video-generation-task-submission'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_TEXT2VIDEO_TASK]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/api/v1/video/text2video/task/{task_id}',
    method: HttpMethod.GET,
    paramSchema: require('../params/skyreels/video/text-to-video-generation-task-query'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_IMAGE2VIDEO_SUBMIT]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.IMAGE_TO_VIDEO,
    resultType: MediaTypes.VIDEO,
    endpoint: '/api/v1/video/image2video/submit',
    method: HttpMethod.POST,
    paramSchema: require('../params/skyreels/video/image-to-video-generation-task-submission'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_IMAGE2VIDEO_TASK]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/api/v1/video/image2video/task/{task_id}',
    method: HttpMethod.GET,
    paramSchema: require('../params/skyreels/video/image-to-video-generation-task-query'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_RETALKING_SUBMIT]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.LIP_SYNC,
    resultType: MediaTypes.VIDEO,
    endpoint: '/api/v1/video/retalking/submit',
    method: HttpMethod.POST,
    paramSchema: require('../params/skyreels/avatar/lip-sync-task-submit'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_RETALKING_TASK]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/api/v1/video/retalking/task/{task_id}',
    method: HttpMethod.GET,
    paramSchema: require('../params/skyreels/avatar/lip-sync-task-query'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_AUDIO2VIDEO_SINGLE_SUBMIT]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.AVATAR_GENERATION,
    resultType: MediaTypes.VIDEO,
    endpoint: '/api/v1/video/audio2video/single/submit',
    method: HttpMethod.POST,
    paramSchema: require('../params/skyreels/avatar/single-actor-avatar-task-submission'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_AUDIO2VIDEO_SINGLE_TASK]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/api/v1/video/audio2video/single/task/{task_id}',
    method: HttpMethod.GET,
    paramSchema: require('../params/skyreels/avatar/single-actor-avatar-task-query'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_AUDIO2VIDEO_MULTI_SUBMIT]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.AVATAR_GENERATION,
    resultType: MediaTypes.VIDEO,
    endpoint: '/api/v1/video/audio2video/multi/submit',
    method: HttpMethod.POST,
    paramSchema: require('../params/skyreels/avatar/multi-actor-avatar-task-submission'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_AUDIO2VIDEO_MULTI_TASK]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/api/v1/video/audio2video/multi/task/{task_id}',
    method: HttpMethod.GET,
    paramSchema: require('../params/skyreels/avatar/multi-actor-avatar-task-query'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_AUDIO2VIDEO_CAMERA_SUBMIT]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.AVATAR_GENERATION,
    resultType: MediaTypes.VIDEO,
    endpoint: '/api/v1/video/audio2video/camera/submit',
    method: HttpMethod.POST,
    paramSchema: require('../params/skyreels/avatar/segmented-camera-motion-task-submit'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_AUDIO2VIDEO_CAMERA_TASK]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/api/v1/video/audio2video/camera/task/{task_id}',
    method: HttpMethod.GET,
    paramSchema: require('../params/skyreels/avatar/segmented-camera-motion-task-query'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_MULTIOBJECT_SUBMIT]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.VIDEO_EDITING,
    resultType: MediaTypes.VIDEO,
    endpoint: '/api/v1/video/multiobject/submit',
    method: HttpMethod.POST,
    paramSchema: require('../params/skyreels/video/reference-to-video-task-submission'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_MULTIOBJECT_TASK]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/api/v1/video/multiobject/task/{task_id}',
    method: HttpMethod.GET,
    paramSchema: require('../params/skyreels/video/reference-to-video-task-query'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_OMNI_VIDEO_SUBMIT]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.VIDEO_REFERENCE,
    resultType: MediaTypes.VIDEO,
    endpoint: '/api/v1/video/omni-video/submit',
    method: HttpMethod.POST,
    paramSchema: require('../params/skyreels/video/omni-reference-task-submission'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_OMNI_VIDEO_TASK]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/api/v1/video/omni-video/task/{task_id}',
    method: HttpMethod.GET,
    paramSchema: require('../params/skyreels/video/omni-reference-task-query'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_EXTENSION_SUBMIT]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.VIDEO_EXTENSION,
    resultType: MediaTypes.VIDEO,
    endpoint: '/api/v1/video/extension/submit',
    method: HttpMethod.POST,
    paramSchema: require('../params/skyreels/video/single-shot-video-extension-task-submission'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_EXTENSION_TASK]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/api/v1/video/extension/task/{task_id}',
    method: HttpMethod.GET,
    paramSchema: require('../params/skyreels/video/single-shot-video-extension-task-query'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_EXTENSION_CUTSHOT_SUBMIT]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.VIDEO_EXTENSION,
    resultType: MediaTypes.VIDEO,
    endpoint: '/api/v1/video/extension/cutshot/submit',
    method: HttpMethod.POST,
    paramSchema: require('../params/skyreels/video/shot-switching-video-extension-task-submission'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_EXTENSION_CUTSHOT_TASK]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/api/v1/video/extension/cutshot/task/{task_id}',
    method: HttpMethod.GET,
    paramSchema: require('../params/skyreels/video/shot-switching-video-extension-task-query'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_STYLETRANSFER_SUBMIT]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.VIDEO_EDITING,
    resultType: MediaTypes.VIDEO,
    endpoint: '/api/v1/video/styletransfer/submit',
    method: HttpMethod.POST,
    paramSchema: require('../params/skyreels/video/video-restyling-task-submission'),
    priority: 100
  },
  [APIs.API_V1_VIDEO_STYLETRANSFER_TASK]: {
    provider: Providers.SKYREELS,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/api/v1/video/styletransfer/task/{task_id}',
    method: HttpMethod.GET,
    paramSchema: require('../params/skyreels/video/video-restyling-task-query'),
    priority: 100
  }
}

module.exports = {
  APIs,
  APIsMeta
}
