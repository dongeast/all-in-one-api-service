/**
 * Volcengine Functions 元数据定义
 * 统一的 Function 元数据源
 * 只引用API名称，不定义endpoint和method
 */

const { Providers, SyncType } = require('../../constants')
const { APIs } = require('../apis/volcengine')
const { Models } = require('../models/volcengine')

const Functions = {
  CREATE_VIDEO_GENERATION: 'create-video-generation',
  CREATE_3D_GENERATION: 'create-3d-generation',
  GENERATE_IMAGE: 'generate-image',
  QUERY_VIDEO_GENERATION_TASK_LIST: 'query-video-generation-task-list',
  CANCEL_DELETE_VIDEO_GENERATION_TASK: 'cancel-delete-video-generation-task',
  QUERY_3D_GENERATION_TASK_LIST: 'query-3d-generation-task-list',
  CANCEL_DELETE_3D_GENERATION_TASK: 'cancel-delete-3d-generation-task'
}

const FunctionsMeta = {
  [Functions.CREATE_VIDEO_GENERATION]: {
    name: 'create-video-generation',
    type: SyncType.ASYNC,
    provider: Providers.VOLCENGINE,
    apis: {
      request: APIs.CONTENTS_GENERATIONS_TASKS_VIDEO,
      query: APIs.CONTENTS_GENERATIONS_TASK_VIDEO
    },
    models: [
      Models.DOUBAO_SEEDANCE_2_0_260128,
      Models.DOUBAO_SEEDANCE_2_0_FAST_260128,
      Models.DOUBAO_SEEDANCE_1_5_PRO_251215,
      Models.DOUBAO_SEEDANCE_1_0_PRO_250528,
      Models.DOUBAO_SEEDANCE_1_0_PRO_FAST_251015,
      Models.DOUBAO_SEEDANCE_1_0_LITE_T2V_250428
    ],
    priority: 100
  },
  
  [Functions.CREATE_3D_GENERATION]: {
    name: 'create-3d-generation',
    type: SyncType.ASYNC,
    provider: Providers.VOLCENGINE,
    apis: {
      request: APIs.CONTENTS_GENERATIONS_TASKS_3D,
      query: APIs.CONTENTS_GENERATIONS_TASK_3D
    },
    models: [Models.DOUBAO_SEED3D_1_0_250928],
    priority: 100
  },
  
  [Functions.GENERATE_IMAGE]: {
    name: 'generate-image',
    type: SyncType.SYNC,
    provider: Providers.VOLCENGINE,
    apis: {
      request: APIs.IMAGES_GENERATIONS
    },
    models: [
      Models.DOUBAO_SEEDREAM_5_0_260128,
      Models.DOUBAO_SEEDREAM_4_5_251128,
      Models.DOUBAO_SEEDREAM_4_0_250828,
      Models.DOUBAO_SEEDREAM_3_0_T2I_250415
    ],
    priority: 100
  },
  
  [Functions.QUERY_VIDEO_GENERATION_TASK_LIST]: {
    name: 'query-video-generation-task-list',
    type: SyncType.SYNC,
    provider: Providers.VOLCENGINE,
    apis: {
      request: APIs.CONTENTS_GENERATIONS_TASKS_LIST_VIDEO
    },
    models: [
      Models.DOUBAO_SEEDANCE_2_0_260128,
      Models.DOUBAO_SEEDANCE_2_0_FAST_260128,
      Models.DOUBAO_SEEDANCE_1_5_PRO_251215,
      Models.DOUBAO_SEEDANCE_1_0_PRO_250528,
      Models.DOUBAO_SEEDANCE_1_0_PRO_FAST_251015,
      Models.DOUBAO_SEEDANCE_1_0_LITE_T2V_250428
    ],
    priority: 100
  },
  
  [Functions.CANCEL_DELETE_VIDEO_GENERATION_TASK]: {
    name: 'cancel-delete-video-generation-task',
    type: SyncType.SYNC,
    provider: Providers.VOLCENGINE,
    apis: {
      request: APIs.CONTENTS_GENERATIONS_TASK_DELETE_VIDEO
    },
    models: [
      Models.DOUBAO_SEEDANCE_2_0_260128,
      Models.DOUBAO_SEEDANCE_2_0_FAST_260128,
      Models.DOUBAO_SEEDANCE_1_5_PRO_251215,
      Models.DOUBAO_SEEDANCE_1_0_PRO_250528,
      Models.DOUBAO_SEEDANCE_1_0_PRO_FAST_251015,
      Models.DOUBAO_SEEDANCE_1_0_LITE_T2V_250428
    ],
    priority: 100
  },
  
  [Functions.QUERY_3D_GENERATION_TASK_LIST]: {
    name: 'query-3d-generation-task-list',
    type: SyncType.SYNC,
    provider: Providers.VOLCENGINE,
    apis: {
      request: APIs.CONTENTS_GENERATIONS_TASKS_LIST_3D
    },
    models: [Models.DOUBAO_SEED3D_1_0_250928],
    priority: 100
  },
  
  [Functions.CANCEL_DELETE_3D_GENERATION_TASK]: {
    name: 'cancel-delete-3d-generation-task',
    type: SyncType.SYNC,
    provider: Providers.VOLCENGINE,
    apis: {
      request: APIs.CONTENTS_GENERATIONS_TASK_DELETE_3D
    },
    models: [Models.DOUBAO_SEED3D_1_0_250928],
    priority: 100
  }
}

module.exports = {
  Functions,
  FunctionsMeta
}
