/**
 * Vidu 接口元数据定义
 * 仅维护 API 的必要信息
 */

const { APITypes, Providers, MediaTypes, HttpMethod } = require('../../constants')

const APIs = {
  ENT_V2_REFERENCE2IMAGE: 'vidu-ent-v2-reference2image',
  ENT_V2_TEXT2VIDEO: 'vidu-ent-v2-text2video',
  ENT_V2_IMG2VIDEO: 'vidu-ent-v2-img2video',
  ENT_V2_REFERENCE2VIDEO: 'vidu-ent-v2-reference2video',
  ENT_V2_START_END2VIDEO: 'vidu-ent-v2-start-end2video',
  ENT_V2_MULTIFRAME: 'vidu-ent-v2-multiframe',
  ENT_V2_TEMPLATE: 'vidu-ent-v2-template',
  ENT_V2_TEMPLATE_STORY: 'vidu-ent-v2-template-story',
  ENT_V2_TASKS: 'vidu-ent-v2-tasks',
  ENT_V2_TASKS_CANCEL: 'vidu-ent-v2-tasks-cancel'
}

const APIsMeta = {
  [APIs.ENT_V2_REFERENCE2IMAGE]: {
    provider: Providers.VIDU,
    apiType: [APITypes.TEXT_TO_IMAGE, APITypes.IMAGE_TO_IMAGE],
    resultType: MediaTypes.IMAGE,
    endpoint: '/ent/v2/reference2image',
    method: HttpMethod.POST,
    paramSchema: require('../params/vidu/image/reference-to-image'),
    priority: 100
  },
  [APIs.ENT_V2_TEXT2VIDEO]: {
    provider: Providers.VIDU,
    apiType: APITypes.TEXT_TO_VIDEO,
    resultType: MediaTypes.VIDEO,
    endpoint: '/ent/v2/text2video',
    method: HttpMethod.POST,
    paramSchema: require('../params/vidu/video/text-to-video'),
    priority: 100
  },
  [APIs.ENT_V2_IMG2VIDEO]: {
    provider: Providers.VIDU,
    apiType: APITypes.IMAGE_TO_VIDEO,
    resultType: MediaTypes.VIDEO,
    endpoint: '/ent/v2/img2video',
    method: HttpMethod.POST,
    paramSchema: require('../params/vidu/video/image-to-video'),
    priority: 100
  },
  [APIs.ENT_V2_REFERENCE2VIDEO]: {
    provider: Providers.VIDU,
    apiType: APITypes.REFERENCE_TO_VIDEO,
    resultType: MediaTypes.VIDEO,
    endpoint: '/ent/v2/reference2video',
    method: HttpMethod.POST,
    paramSchema: require('../params/vidu/video/reference-to-video'),
    priority: 100
  },
  [APIs.ENT_V2_START_END2VIDEO]: {
    provider: Providers.VIDU,
    apiType: APITypes.START_END_TO_VIDEO,
    resultType: MediaTypes.VIDEO,
    endpoint: '/ent/v2/start-end2video',
    method: HttpMethod.POST,
    paramSchema: require('../params/vidu/video/start-end-to-video'),
    priority: 100
  },
  [APIs.ENT_V2_MULTIFRAME]: {
    provider: Providers.VIDU,
    apiType: APITypes.MULTIFRAME,
    resultType: MediaTypes.VIDEO,
    endpoint: '/ent/v2/multiframe',
    method: HttpMethod.POST,
    paramSchema: require('../params/vidu/video/multiframe'),
    priority: 100
  },
  [APIs.ENT_V2_TEMPLATE]: {
    provider: Providers.VIDU,
    apiType: APITypes.TEMPLATE,
    resultType: MediaTypes.VIDEO,
    endpoint: '/ent/v2/template',
    method: HttpMethod.POST,
    paramSchema: require('../params/vidu/video/template'),
    priority: 100
  },
  [APIs.ENT_V2_TEMPLATE_STORY]: {
    provider: Providers.VIDU,
    apiType: APITypes.TEMPLATE_STORY,
    resultType: MediaTypes.VIDEO,
    endpoint: '/ent/v2/template-story',
    method: HttpMethod.POST,
    paramSchema: require('../params/vidu/video/template-story'),
    priority: 100
  },
  [APIs.ENT_V2_TASKS]: {
    provider: Providers.VIDU,
    apiType: APITypes.TASK_QUERY,
    endpoint: '/ent/v2/tasks/{task_id}',
    method: HttpMethod.GET,
    paramSchema: require('../params/vidu/video/query-task'),
    priority: 100
  },
  [APIs.ENT_V2_TASKS_CANCEL]: {
    provider: Providers.VIDU,
    apiType: APITypes.TASK_CANCEL,
    endpoint: '/ent/v2/tasks/{task_id}/cancel',
    method: HttpMethod.POST,
    paramSchema: require('../params/vidu/video/cancel-task'),
    priority: 100
  }
}

module.exports = {
  APIs,
  APIsMeta
}
