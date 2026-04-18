/**
 * 取消任务参数定义
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    task_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: true,
      description: 'Task ID to cancel'
    }
  },

  output: {
    task_id: {
      type: ParamType.STRING,
      description: 'Vidu generated task ID',
      path: 'task_id'
    },
    state: {
      type: ParamType.STRING,
      description: 'Task status after cancellation',
      path: 'state'
    },
    message: {
      type: ParamType.STRING,
      description: 'Cancellation result message',
      path: 'message'
    }
  }
}
