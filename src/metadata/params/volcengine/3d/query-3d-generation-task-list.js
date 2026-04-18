/**
 * 火山引擎查询3D生成任务列表参数定义
 * 支持模型: doubao-seed3d-1-0-250928
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    page_num: {
      type: ParamType.NUMBER,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Result page number',
      min: 1,
      max: 500
    },

    page_size: {
      type: ParamType.NUMBER,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Number of results per page',
      min: 1,
      max: 500
    },

    'filter.status': {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: 'Filter by task status',
      options: ['queued', 'running', 'cancelled', 'succeeded', 'failed']
    },

    'filter.task_ids': {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Filter by task ID, multiple IDs separated by &'
    },

    'filter.model': {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Filter by model Endpoint ID'
    }
  },

  output: {
    items: {
      type: 'array',
      description: 'List of 3D generation tasks',
      path: 'items',
      isResultField: true
    },

    total: {
      type: 'number',
      description: 'Total number of tasks matching filter conditions',
      path: 'total'
    }
  }
}
