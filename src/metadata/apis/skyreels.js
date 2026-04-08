/**
 * Skyreels 接口元数据定义
 */

const { APITypes, Providers } = require('../../constants')
const { APITags } = require('../../constants/tags')

module.exports = {
  'text-to-video-generation-task-submission': {
    name: 'text-to-video-generation-task-submission',
    displayName: '提交文本生成视频任务',
    description: '根据文本提交视频生成任务',
    type: APITypes.TEXT_TO_VIDEO,
    tags: [APITags.ASYNC],
    priority: 100,
    provider: Providers.SKYREELS,
    models: ['skyreels-v3', 'skyreels-v4'],
    apiClass: 'TextToVideoGenerationTaskSubmission',
    endpoint: '/video/text-to-video/submit'
  },

  'text-to-video-generation-task-query': {
    name: 'text-to-video-generation-task-query',
    displayName: '查询文本生成视频任务',
    description: '查询文本生成视频任务状态',
    type: APITypes.TASK_QUERY,
    tags: [APITags.STABLE],
    priority: 100,
    provider: Providers.SKYREELS,
    models: [],
    apiClass: 'TextToVideoGenerationTaskQuery',
    endpoint: '/video/text-to-video/query'
  },

  'image-to-video-generation-task-submission': {
    name: 'image-to-video-generation-task-submission',
    displayName: '提交图片生成视频任务',
    description: '根据图片提交视频生成任务',
    type: APITypes.IMAGE_TO_VIDEO,
    tags: [APITags.ASYNC],
    priority: 100,
    provider: Providers.SKYREELS,
    models: ['skyreels-v3', 'skyreels-v4'],
    apiClass: 'ImageToVideoGenerationTaskSubmission',
    endpoint: '/video/image-to-video/submit'
  },

  'image-to-video-generation-task-query': {
    name: 'image-to-video-generation-task-query',
    displayName: '查询图片生成视频任务',
    description: '查询图片生成视频任务状态',
    type: APITypes.TASK_QUERY,
    tags: [APITags.STABLE],
    priority: 100,
    provider: Providers.SKYREELS,
    models: [],
    apiClass: 'ImageToVideoGenerationTaskQuery',
    endpoint: '/video/image-to-video/query'
  },

  'lip-sync-task-submit': {
    name: 'lip-sync-task-submit',
    displayName: '提交口型同步任务',
    description: '为视频人物添加口型同步',
    type: APITypes.LIP_SYNC,
    tags: [APITags.ASYNC],
    priority: 100,
    provider: Providers.SKYREELS,
    models: ['skyreels-avatar'],
    apiClass: 'LipSyncTaskSubmit',
    endpoint: '/avatar/lip-sync/submit'
  },

  'lip-sync-task-query': {
    name: 'lip-sync-task-query',
    displayName: '查询口型同步任务',
    description: '查询口型同步任务状态',
    type: APITypes.TASK_QUERY,
    tags: [APITags.STABLE],
    priority: 100,
    provider: Providers.SKYREELS,
    models: [],
    apiClass: 'LipSyncTaskQuery',
    endpoint: '/avatar/lip-sync/query'
  }
}
