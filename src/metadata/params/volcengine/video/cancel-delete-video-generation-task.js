/**
 * 火山引擎取消/删除视频生成任务参数定义
 * 支持模型: Seedance 2.0, Seedance 2.0 fast, Seedance 1.5 pro,
 *          Seedance 1.0 pro, Seedance 1.0 pro fast, Seedance 1.0 lite
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: true,
      description: 'Video generation task ID to cancel or delete'
    }
  },

  output: {}
}
