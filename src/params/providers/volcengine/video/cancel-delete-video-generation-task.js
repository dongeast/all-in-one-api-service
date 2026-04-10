/**
 * 火山引擎取消/删除视频生成任务参数定义
 */

const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: true,
      description: '视频生成任务ID'
    }
  },

  output: {}
}
