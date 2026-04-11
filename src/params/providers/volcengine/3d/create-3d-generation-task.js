/**
 * 火山引擎3D生成任务参数定义
 */

const volcengineCommon = require('../volcengine-common')
const modelCapabilities = require('../model-capabilities')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    model: {
      ...volcengineCommon.input.model,
      description: 'Model ID or endpoint ID (must be doubao-seed3d-1-0-250928)'
    },

    content: {
      type: ParamType.ARRAY,
      elementType: ElementType.INPUT,
      required: true,
      description: '3D generation input content, must contain 1 image'
    }
  },

  output: {
    id: {
      type: 'string',
      description: '3D generation task ID, valid for 7 days',
      path: 'id'
    }
  },

  modelCapabilities
}
