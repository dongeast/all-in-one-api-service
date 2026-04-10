/**
 * 火山引擎查询3D生成任务列表参数定义
 */

const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    page_num: {
      type: ParamType.NUMBER,
      elementType: ElementType.INPUT,
      required: false,
      description: '结果页码',
      min: 1,
      max: 500
    },

    page_size: {
      type: ParamType.NUMBER,
      elementType: ElementType.INPUT,
      required: false,
      description: '每页结果数量',
      min: 1,
      max: 500
    },

    'filter.status': {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: '按任务状态过滤',
      options: ['queued', 'running', 'cancelled', 'succeeded', 'failed']
    },

    'filter.task_ids': {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: '按任务ID过滤，多个ID用&分隔'
    },

    'filter.model': {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: '按模型Endpoint ID过滤'
    }
  },

  output: {
    items: {
      type: 'array',
      description: '3D生成任务列表',
      path: 'items'
    }
  }
}
