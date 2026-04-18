/**
 * Volcengine 接口元数据定义
 * 仅维护 API 的必要信息
 */

const { APITypes, Providers, MediaTypes, HttpMethod } = require('../../constants')

const APIs = {
  IMAGES_GENERATIONS: 'volcengine-images-generations',
  CONTENTS_GENERATIONS_TASKS_VIDEO: 'volcengine-contents-generations-tasks-video',
  CONTENTS_GENERATIONS_TASK_VIDEO: 'volcengine-contents-generations-task-video',
  CONTENTS_GENERATIONS_TASKS_LIST_VIDEO: 'volcengine-contents-generations-tasks-list-video',
  CONTENTS_GENERATIONS_TASK_DELETE_VIDEO: 'volcengine-contents-generations-task-delete-video',
  CONTENTS_GENERATIONS_TASKS_3D: 'volcengine-contents-generations-tasks-3d',
  CONTENTS_GENERATIONS_TASK_3D: 'volcengine-contents-generations-task-3d',
  CONTENTS_GENERATIONS_TASKS_LIST_3D: 'volcengine-contents-generations-tasks-list-3d',
  CONTENTS_GENERATIONS_TASK_DELETE_3D: 'volcengine-contents-generations-task-delete-3d'
}

const APIsMeta = {
  [APIs.IMAGES_GENERATIONS]: {
    provider: Providers.VOLCENGINE,
    apiType: APITypes.TEXT_TO_IMAGE,
    resultType: MediaTypes.IMAGE,
    endpoint: '/images/generations',
    method: HttpMethod.POST,
    paramSchema: require('../params/volcengine/image/generate-image'),
    priority: 100
  },
  [APIs.CONTENTS_GENERATIONS_TASKS_VIDEO]: {
    provider: Providers.VOLCENGINE,
    apiType: [APITypes.TEXT_TO_VIDEO, APITypes.IMAGE_TO_VIDEO],
    resultType: MediaTypes.VIDEO,
    endpoint: '/contents/generations/tasks',
    method: HttpMethod.POST,
    paramSchema: require('../params/volcengine/video/create-video-generation-task'),
    priority: 100
  },
  [APIs.CONTENTS_GENERATIONS_TASK_VIDEO]: {
    provider: Providers.VOLCENGINE,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/contents/generations/tasks/{id}',
    method: HttpMethod.GET,
    paramSchema: require('../params/volcengine/video/query-video-generation-task'),
    priority: 100
  },
  [APIs.CONTENTS_GENERATIONS_TASKS_LIST_VIDEO]: {
    provider: Providers.VOLCENGINE,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/contents/generations/tasks',
    method: HttpMethod.GET,
    paramSchema: require('../params/volcengine/video/query-video-generation-task-list'),
    priority: 100
  },
  [APIs.CONTENTS_GENERATIONS_TASK_DELETE_VIDEO]: {
    provider: Providers.VOLCENGINE,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/contents/generations/tasks/{id}',
    method: HttpMethod.DELETE,
    paramSchema: require('../params/volcengine/video/cancel-delete-video-generation-task'),
    priority: 100
  },
  [APIs.CONTENTS_GENERATIONS_TASKS_3D]: {
    provider: Providers.VOLCENGINE,
    apiType: APITypes.IMAGE_TO_3D,
    resultType: MediaTypes.MODEL_3D,
    endpoint: '/contents/generations/tasks',
    method: HttpMethod.POST,
    paramSchema: require('../params/volcengine/3d/create-3d-generation-task'),
    priority: 100
  },
  [APIs.CONTENTS_GENERATIONS_TASK_3D]: {
    provider: Providers.VOLCENGINE,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/contents/generations/tasks/{id}',
    method: HttpMethod.GET,
    paramSchema: require('../params/volcengine/3d/query-3d-generation-task'),
    priority: 100
  },
  [APIs.CONTENTS_GENERATIONS_TASKS_LIST_3D]: {
    provider: Providers.VOLCENGINE,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/contents/generations/tasks',
    method: HttpMethod.GET,
    paramSchema: require('../params/volcengine/3d/query-3d-generation-task-list'),
    priority: 100
  },
  [APIs.CONTENTS_GENERATIONS_TASK_DELETE_3D]: {
    provider: Providers.VOLCENGINE,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/contents/generations/tasks/{id}',
    method: 'DELETE',
    paramSchema: require('../params/volcengine/3d/cancel-delete-3d-generation-task'),
    priority: 100
  }
}

module.exports = {
  APIs,
  APIsMeta
}
