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
      description: '模型ID或端点ID（必须为 doubao-seed3d-1-0-250928）'
    },

    content: {
      type: ParamType.ARRAY,
      elementType: ElementType.INPUT,
      required: true,
      description: '3D生成输入内容，必须包含1张图像'
    }
  },

  output: {
    id: {
      type: 'string',
      description: '3D生成任务ID，有效期7天',
      path: 'id'
    }
  },

  modelCapabilities
}
