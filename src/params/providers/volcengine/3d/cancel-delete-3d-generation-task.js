/**
 * 火山引擎取消/删除3D生成任务参数定义
 */

const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: true,
      description: '要取消或删除的3D生成任务ID'
    }
  },

  output: {}
}
