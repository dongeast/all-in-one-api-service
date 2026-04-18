/**
 * Vidu Functions 元数据定义
 * 统一的 Function 元数据源
 * 只引用API名称，不定义endpoint和method
 */

const { APITypes, Providers, SyncType } = require('../../constants')
const { APIs } = require('../apis/vidu')
const { Models } = require('../models/vidu')

const Functions = {
  REFERENCE_TO_IMAGE: 'vidu-reference-to-image',
  TEXT_TO_VIDEO: 'vidu-text-to-video',
  IMAGE_TO_VIDEO: 'vidu-image-to-video',
  REFERENCE_TO_VIDEO: 'vidu-reference-to-video',
  START_END_TO_VIDEO: 'vidu-start-end-to-video',
  MULTIFRAME: 'vidu-multiframe',
  TEMPLATE: 'vidu-template',
  TEMPLATE_STORY: 'vidu-template-story',
  QUERY_TASK: 'vidu-query-task',
  CANCEL_TASK: 'vidu-cancel-task'
}

const FunctionsMeta = {
  [Functions.REFERENCE_TO_IMAGE]: {
    name: 'vidu-reference-to-image',
    type: SyncType.ASYNC,
    provider: Providers.VIDU,
    apiType: [APITypes.TEXT_TO_IMAGE, APITypes.IMAGE_TO_IMAGE],
    apis: {
      request: APIs.ENT_V2_REFERENCE2IMAGE,
      query: APIs.ENT_V2_TASKS,
      cancel: APIs.ENT_V2_TASKS_CANCEL
    },
    models: [Models.VIDUQ2, Models.VIDUQ1],
    priority: 100
  },

  [Functions.TEXT_TO_VIDEO]: {
    name: 'vidu-text-to-video',
    type: SyncType.ASYNC,
    provider: Providers.VIDU,
    apiType: APITypes.TEXT_TO_VIDEO,
    apis: {
      request: APIs.ENT_V2_TEXT2VIDEO,
      query: APIs.ENT_V2_TASKS,
      cancel: APIs.ENT_V2_TASKS_CANCEL
    },
    models: [Models.VIDUQ3_TURBO, Models.VIDUQ3_PRO, Models.VIDUQ2, Models.VIDUQ1],
    priority: 100
  },

  [Functions.IMAGE_TO_VIDEO]: {
    name: 'vidu-image-to-video',
    type: SyncType.ASYNC,
    provider: Providers.VIDU,
    apiType: APITypes.IMAGE_TO_VIDEO,
    apis: {
      request: APIs.ENT_V2_IMG2VIDEO,
      query: APIs.ENT_V2_TASKS,
      cancel: APIs.ENT_V2_TASKS_CANCEL
    },
    models: [
      Models.VIDUQ3_MIX,
      Models.VIDUQ3_TURBO,
      Models.VIDUQ3_PRO,
      Models.VIDUQ3_PRO_FAST,
      Models.VIDUQ2_PRO,
      Models.VIDUQ2_PRO_FAST,
      Models.VIDUQ2_TURBO,
      Models.VIDUQ2,
      Models.VIDUQ1,
      Models.VIDUQ1_CLASSIC,
      Models.VIDU_2_0
    ],
    priority: 100
  },

  [Functions.REFERENCE_TO_VIDEO]: {
    name: 'vidu-reference-to-video',
    type: SyncType.ASYNC,
    provider: Providers.VIDU,
    apiType: APITypes.REFERENCE_TO_VIDEO,
    apis: {
      request: APIs.ENT_V2_REFERENCE2VIDEO,
      query: APIs.ENT_V2_TASKS,
      cancel: APIs.ENT_V2_TASKS_CANCEL
    },
    models: [Models.VIDUQ3_MIX, Models.VIDUQ3, Models.VIDUQ3_TURBO, Models.VIDUQ3_PRO, Models.VIDUQ2_PRO, Models.VIDUQ2, Models.VIDUQ1, Models.VIDU_2_0],
    priority: 100
  },

  [Functions.START_END_TO_VIDEO]: {
    name: 'vidu-start-end-to-video',
    type: SyncType.ASYNC,
    provider: Providers.VIDU,
    apiType: APITypes.START_END_TO_VIDEO,
    apis: {
      request: APIs.ENT_V2_START_END2VIDEO,
      query: APIs.ENT_V2_TASKS,
      cancel: APIs.ENT_V2_TASKS_CANCEL
    },
    models: [
      Models.VIDUQ3_TURBO,
      Models.VIDUQ3_PRO,
      Models.VIDUQ2_PRO_FAST,
      Models.VIDUQ2_PRO,
      Models.VIDUQ2_TURBO,
      Models.VIDUQ1,
      Models.VIDUQ1_CLASSIC,
      Models.VIDU_2_0
    ],
    priority: 100
  },

  [Functions.MULTIFRAME]: {
    name: 'vidu-multiframe',
    type: SyncType.ASYNC,
    provider: Providers.VIDU,
    apiType: APITypes.MULTIFRAME,
    apis: {
      request: APIs.ENT_V2_MULTIFRAME,
      query: APIs.ENT_V2_TASKS,
      cancel: APIs.ENT_V2_TASKS_CANCEL
    },
    models: [Models.VIDUQ2_TURBO, Models.VIDUQ2_PRO],
    priority: 100
  },

  [Functions.TEMPLATE]: {
    name: 'vidu-template',
    type: SyncType.ASYNC,
    provider: Providers.VIDU,
    apiType: APITypes.TEMPLATE,
    apis: {
      request: APIs.ENT_V2_TEMPLATE,
      query: APIs.ENT_V2_TASKS,
      cancel: APIs.ENT_V2_TASKS_CANCEL
    },
    models: [Models.VIDU_TEMPLATE],
    priority: 100
  },

  [Functions.TEMPLATE_STORY]: {
    name: 'vidu-template-story',
    type: SyncType.ASYNC,
    provider: Providers.VIDU,
    apiType: APITypes.TEMPLATE_STORY,
    apis: {
      request: APIs.ENT_V2_TEMPLATE_STORY,
      query: APIs.ENT_V2_TASKS,
      cancel: APIs.ENT_V2_TASKS_CANCEL
    },
    models: [Models.VIDU_STORY_TEMPLATE],
    priority: 100
  },

  [Functions.QUERY_TASK]: {
    name: 'vidu-query-task',
    type: SyncType.SYNC,
    provider: Providers.VIDU,
    apiType: APITypes.TASK_QUERY,
    apis: {
      request: APIs.ENT_V2_TASKS
    },
    models: [],
    priority: 100
  },

  [Functions.CANCEL_TASK]: {
    name: 'vidu-cancel-task',
    type: SyncType.SYNC,
    provider: Providers.VIDU,
    apiType: APITypes.TASK_CANCEL,
    apis: {
      request: APIs.ENT_V2_TASKS_CANCEL
    },
    models: [],
    priority: 100
  }
}

module.exports = {
  Functions,
  FunctionsMeta
}
