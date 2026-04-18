/**
 * LTX Functions 元数据定义
 * 统一的 Function 元数据源
 * 只引用API名称，不定义endpoint和method
 */

const { APITypes, Providers, SyncType } = require('../../constants')
const { APIs } = require('../apis/lightricks')
const { Models } = require('../models/lightricks')

const Functions = {
  GENERATE_VIDEO_FROM_TEXT: 'generate-video-from-text',
  GENERATE_VIDEO_FROM_IMAGE: 'generate-video-from-image',
  GENERATE_VIDEO_FROM_AUDIO: 'generate-video-from-audio',
  EXTEND_VIDEO_DURATION: 'extend-video-duration',
  RETAKE_VIDEO_SECTION: 'retake-video-section'
}

const FunctionsMeta = {
  [Functions.GENERATE_VIDEO_FROM_TEXT]: {
    name: 'generate-video-from-text',
    type: SyncType.SYNC,
    provider: Providers.LIGHTRICKS,
    apiType: APITypes.TEXT_TO_VIDEO,
    apis: {
      request: APIs.V1_TEXT_TO_VIDEO
    },
    models: [Models.LTX_2_FAST, Models.LTX_2_PRO, Models.LTX_2_3_FAST, Models.LTX_2_3_PRO],
    priority: 100
  },
  [Functions.GENERATE_VIDEO_FROM_IMAGE]: {
    name: 'generate-video-from-image',
    type: SyncType.SYNC,
    provider: Providers.LIGHTRICKS,
    apiType: APITypes.IMAGE_TO_VIDEO,
    apis: {
      request: APIs.V1_IMAGE_TO_VIDEO
    },
    models: [Models.LTX_2_FAST, Models.LTX_2_PRO, Models.LTX_2_3_FAST, Models.LTX_2_3_PRO],
    priority: 100
  },
  [Functions.GENERATE_VIDEO_FROM_AUDIO]: {
    name: 'generate-video-from-audio',
    type: SyncType.SYNC,
    provider: Providers.LIGHTRICKS,
    apiType: APITypes.AUDIO_TO_VIDEO,
    apis: {
      request: APIs.V1_AUDIO_TO_VIDEO
    },
    models: [Models.LTX_2_PRO, Models.LTX_2_3_PRO],
    priority: 100
  },
  [Functions.EXTEND_VIDEO_DURATION]: {
    name: 'extend-video-duration',
    type: SyncType.SYNC,
    provider: Providers.LIGHTRICKS,
    apiType: APITypes.VIDEO_EXTENSION,
    apis: {
      request: APIs.V1_EXTEND
    },
    models: [Models.LTX_2_PRO, Models.LTX_2_3_PRO],
    priority: 100
  },
  [Functions.RETAKE_VIDEO_SECTION]: {
    name: 'retake-video-section',
    type: SyncType.SYNC,
    provider: Providers.LIGHTRICKS,
    apiType: APITypes.VIDEO_EDITING,
    apis: {
      request: APIs.V1_RETAKE
    },
    models: [Models.LTX_2_PRO, Models.LTX_2_3_PRO],
    priority: 100
  }
}

module.exports = {
  Functions,
  FunctionsMeta
}
