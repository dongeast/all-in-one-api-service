/**
 * 火山引擎接口元数据定义
 */

const { APITypes, Providers } = require('../../constants')
const { APITags } = require('../../constants/tags')

module.exports = {
  'generate-image': {
    name: 'generate-image',
    displayName: '生成图像',
    description: '根据文本生成图像',
    type: APITypes.TEXT_TO_IMAGE,
    tags: [APITags.ASYNC],
    priority: 100,
    provider: Providers.VOLCENGINE,
    models: [
      'doubao-seedream-5.0-lite',
      'doubao-seedream-4.5',
      'doubao-seedream-4.0',
      'doubao-seedream-3.0-t2i'
    ],
    apiClass: 'GenerateImage',
    endpoint: '/image/generate'
  },

  'create-video-generation-task': {
    name: 'create-video-generation-task',
    displayName: '创建视频生成任务',
    description: '创建视频生成任务（支持文生视频和图生视频）',
    type: [APITypes.TEXT_TO_VIDEO, APITypes.IMAGE_TO_VIDEO],
    tags: [APITags.ASYNC],
    priority: 100,
    provider: Providers.VOLCENGINE,
    models: [
      'doubao-seedance-2-0',
      'doubao-seedance-2-0-fast',
      'doubao-seedance-1-5-pro',
      'doubao-seedance-1-0-pro',
      'doubao-seedance-1-0-pro-fast',
      'doubao-seedance-1-0-lite'
    ],
    apiClass: 'CreateVideoGenerationTask',
    endpoint: '/video/generation/submit'
  },

  'query-video-generation-task': {
    name: 'query-video-generation-task',
    displayName: '查询视频生成任务',
    description: '查询单个视频生成任务状态',
    type: APITypes.TASK_QUERY,
    tags: [APITags.STABLE],
    priority: 100,
    provider: Providers.VOLCENGINE,
    models: [],
    apiClass: 'QueryVideoGenerationTask',
    endpoint: '/video/generation/query'
  },

  'query-video-generation-task-list': {
    name: 'query-video-generation-task-list',
    displayName: '查询视频生成任务列表',
    description: '查询视频生成任务列表',
    type: APITypes.TASK_QUERY,
    tags: [APITags.STABLE],
    priority: 100,
    provider: Providers.VOLCENGINE,
    models: [],
    apiClass: 'QueryVideoGenerationTaskList',
    endpoint: '/video/generation/list'
  },

  'cancel-delete-video-generation-task': {
    name: 'cancel-delete-video-generation-task',
    displayName: '取消/删除视频生成任务',
    description: '取消或删除视频生成任务',
    type: APITypes.TASK_QUERY,
    tags: [APITags.STABLE],
    priority: 100,
    provider: Providers.VOLCENGINE,
    models: [],
    apiClass: 'CancelDeleteVideoGenerationTask',
    endpoint: '/video/generation/cancel'
  },

  'create-3d-generation-task': {
    name: 'create-3d-generation-task',
    displayName: '创建3D生成任务',
    description: '根据图片生成3D模型',
    type: APITypes.IMAGE_TO_3D,
    tags: [APITags.ASYNC],
    priority: 100,
    provider: Providers.VOLCENGINE,
    models: ['doubao-seed3d-1-0-250928'],
    apiClass: 'Create3DGenerationTask',
    endpoint: '/3d/generation/submit'
  },

  'query-3d-generation-task': {
    name: 'query-3d-generation-task',
    displayName: '查询3D生成任务',
    description: '查询单个3D生成任务状态',
    type: APITypes.TASK_QUERY,
    tags: [APITags.STABLE],
    priority: 100,
    provider: Providers.VOLCENGINE,
    models: [],
    apiClass: 'Query3DGenerationTask',
    endpoint: '/3d/generation/query'
  },

  'query-3d-generation-task-list': {
    name: 'query-3d-generation-task-list',
    displayName: '查询3D生成任务列表',
    description: '查询3D生成任务列表',
    type: APITypes.TASK_QUERY,
    tags: [APITags.STABLE],
    priority: 100,
    provider: Providers.VOLCENGINE,
    models: [],
    apiClass: 'Query3DGenerationTaskList',
    endpoint: '/3d/generation/list'
  },

  'cancel-delete-3d-generation-task': {
    name: 'cancel-delete-3d-generation-task',
    displayName: '取消/删除3D生成任务',
    description: '取消或删除3D生成任务',
    type: APITypes.TASK_QUERY,
    tags: [APITags.STABLE],
    priority: 100,
    provider: Providers.VOLCENGINE,
    models: [],
    apiClass: 'CancelDelete3DGenerationTask',
    endpoint: '/3d/generation/cancel'
  }
}
