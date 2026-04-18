/**
 * SkyReels Functions 元数据定义
 * 统一的 Function 元数据源
 * 只引用API名称，不定义endpoint和method
 */

const { Providers, SyncType, APITypes } = require('../../constants')
const { Models } = require('../models/skyreels')
const { APIs } = require('../apis/skyreels')

const Functions = {
  TEXT_TO_VIDEO_GENERATION: 'text-to-video-generation',
  IMAGE_TO_VIDEO_GENERATION: 'image-to-video-generation',
  LIP_SYNC: 'lip-sync',
  SINGLE_ACTOR_AVATAR: 'single-actor-avatar',
  MULTI_ACTOR_AVATAR: 'multi-actor-avatar',
  SEGMENTED_CAMERA_MOTION: 'segmented-camera-motion',
  REFERENCE_TO_VIDEO: 'reference-to-video',
  OMNI_REFERENCE: 'omni-reference',
  SINGLE_SHOT_VIDEO_EXTENSION: 'single-shot-video-extension',
  SHOT_SWITCHING_VIDEO_EXTENSION: 'shot-switching-video-extension',
  VIDEO_RESTYLING: 'video-restyling'
}

const FunctionsMeta = {
  [Functions.TEXT_TO_VIDEO_GENERATION]: {
    name: 'text-to-video-generation',
    type: SyncType.ASYNC,
    provider: Providers.SKYREELS,
    apiType: APITypes.TEXT_TO_VIDEO,
    
    apis: {
      request: APIs.API_V1_VIDEO_TEXT2VIDEO_SUBMIT,
      query: APIs.API_V1_VIDEO_TEXT2VIDEO_TASK
    },
    
    models: [Models.SKYREELS_V4],
    priority: 100
  },
  
  [Functions.IMAGE_TO_VIDEO_GENERATION]: {
    name: 'image-to-video-generation',
    type: SyncType.ASYNC,
    provider: Providers.SKYREELS,
    apiType: APITypes.IMAGE_TO_VIDEO,
    
    apis: {
      request: APIs.API_V1_VIDEO_IMAGE2VIDEO_SUBMIT,
      query: APIs.API_V1_VIDEO_IMAGE2VIDEO_TASK
    },
    
    models: [Models.SKYREELS_V4],
    priority: 100
  },
  
  [Functions.LIP_SYNC]: {
    name: 'lip-sync',
    type: SyncType.ASYNC,
    provider: Providers.SKYREELS,
    apiType: APITypes.LIP_SYNC,
    
    apis: {
      request: APIs.API_V1_VIDEO_RETALKING_SUBMIT,
      query: APIs.API_V1_VIDEO_RETALKING_TASK
    },
    
    models: [Models.SKYREELS_AVATAR],
    priority: 100
  },
  
  [Functions.SINGLE_ACTOR_AVATAR]: {
    name: 'single-actor-avatar',
    type: SyncType.ASYNC,
    provider: Providers.SKYREELS,
    apiType: APITypes.AVATAR_GENERATION,
    
    apis: {
      request: APIs.API_V1_VIDEO_AUDIO2VIDEO_SINGLE_SUBMIT,
      query: APIs.API_V1_VIDEO_AUDIO2VIDEO_SINGLE_TASK
    },
    
    models: [Models.SKYREELS_AVATAR],
    priority: 100
  },
  
  [Functions.MULTI_ACTOR_AVATAR]: {
    name: 'multi-actor-avatar',
    type: SyncType.ASYNC,
    provider: Providers.SKYREELS,
    apiType: APITypes.AVATAR_GENERATION,
    
    apis: {
      request: APIs.API_V1_VIDEO_AUDIO2VIDEO_MULTI_SUBMIT,
      query: APIs.API_V1_VIDEO_AUDIO2VIDEO_MULTI_TASK
    },
    
    models: [Models.SKYREELS_AVATAR],
    priority: 100
  },
  
  [Functions.SEGMENTED_CAMERA_MOTION]: {
    name: 'segmented-camera-motion',
    type: SyncType.ASYNC,
    provider: Providers.SKYREELS,
    apiType: APITypes.AVATAR_GENERATION,
    
    apis: {
      request: APIs.API_V1_VIDEO_AUDIO2VIDEO_CAMERA_SUBMIT,
      query: APIs.API_V1_VIDEO_AUDIO2VIDEO_CAMERA_TASK
    },
    
    models: [Models.SKYREELS_AVATAR],
    priority: 100
  },
  
  [Functions.REFERENCE_TO_VIDEO]: {
    name: 'reference-to-video',
    type: SyncType.ASYNC,
    provider: Providers.SKYREELS,
    apiType: APITypes.VIDEO_EDITING,
    
    apis: {
      request: APIs.API_V1_VIDEO_MULTIOBJECT_SUBMIT,
      query: APIs.API_V1_VIDEO_MULTIOBJECT_TASK
    },
    
    models: [Models.SKYREELS_V3],
    priority: 100
  },
  
  [Functions.OMNI_REFERENCE]: {
    name: 'omni-reference',
    type: SyncType.ASYNC,
    provider: Providers.SKYREELS,
    apiType: APITypes.VIDEO_REFERENCE,
    
    apis: {
      request: APIs.API_V1_VIDEO_OMNI_VIDEO_SUBMIT,
      query: APIs.API_V1_VIDEO_OMNI_VIDEO_TASK
    },
    
    models: [Models.SKYREELS_V4],
    priority: 100
  },
  
  [Functions.SINGLE_SHOT_VIDEO_EXTENSION]: {
    name: 'single-shot-video-extension',
    type: SyncType.ASYNC,
    provider: Providers.SKYREELS,
    apiType: APITypes.VIDEO_EXTENSION,
    
    apis: {
      request: APIs.API_V1_VIDEO_EXTENSION_SUBMIT,
      query: APIs.API_V1_VIDEO_EXTENSION_TASK
    },
    
    models: [Models.SKYREELS_V3],
    priority: 100
  },
  
  [Functions.SHOT_SWITCHING_VIDEO_EXTENSION]: {
    name: 'shot-switching-video-extension',
    type: SyncType.ASYNC,
    provider: Providers.SKYREELS,
    apiType: APITypes.VIDEO_EXTENSION,
    
    apis: {
      request: APIs.API_V1_VIDEO_EXTENSION_CUTSHOT_SUBMIT,
      query: APIs.API_V1_VIDEO_EXTENSION_CUTSHOT_TASK
    },
    
    models: [Models.SKYREELS_V3],
    priority: 100
  },
  
  [Functions.VIDEO_RESTYLING]: {
    name: 'video-restyling',
    type: SyncType.ASYNC,
    provider: Providers.SKYREELS,
    apiType: APITypes.VIDEO_EDITING,
    
    apis: {
      request: APIs.API_V1_VIDEO_STYLETRANSFER_SUBMIT,
      query: APIs.API_V1_VIDEO_STYLETRANSFER_TASK
    },
    
    models: [Models.SKYREELS_V3],
    priority: 100
  }
}

module.exports = {
  Functions,
  FunctionsMeta
}
