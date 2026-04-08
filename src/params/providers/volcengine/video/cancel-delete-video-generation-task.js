/**
 * 火山引擎取消/删除视频生成任务参数定义
 */

module.exports = {
  input: {
    id: {
      type: 'string',
      required: true,
      description: '要取消或删除的视频生成任务ID'
    }
  },

  output: {}
}
