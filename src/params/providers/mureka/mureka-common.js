/**
 * Mureka 通用参数定义
 */

const { textPrompt } = require('../../templates')
const { ParamType, ElementType } = require('../../common')

module.exports = {
  input: {
    prompt: {
      ...textPrompt.prompt,
      elementType: ElementType.TEXTAREA,
      description: '提示词',
      maxLength: 1024
    },

    lyrics: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: false,
      description: '歌词内容',
      maxLength: 3000
    },

    model: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: '模型选择',
      options: ['auto', 'mureka-7.5', 'mureka-7.6', 'mureka-o2', 'mureka-8'],
      default: 'auto'
    },

    n: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: '生成数量',
      min: 1,
      max: 3,
      default: 2
    },

    stream: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: '是否启用流式播放',
      default: false
    }
  },

  output: {
    id: {
      type: 'string',
      description: '任务ID',
      path: 'id'
    },

    created_at: {
      type: 'number',
      description: '创建时间戳(秒)',
      path: 'created_at'
    },

    finished_at: {
      type: 'number',
      description: '完成时间戳(秒)',
      path: 'finished_at'
    },

    model: {
      type: 'string',
      description: '使用的模型',
      path: 'model'
    },

    status: {
      type: 'string',
      description: '任务状态',
      path: 'status'
    },

    failed_reason: {
      type: 'string',
      description: '失败原因',
      path: 'failed_reason'
    },

    choices: {
      type: 'array',
      description: '生成结果列表',
      path: 'choices'
    }
  },

  taskStatus: {
    PREPARING: 'preparing',
    QUEUED: 'queued',
    RUNNING: 'running',
    STREAMING: 'streaming',
    SUCCEEDED: 'succeeded',
    FAILED: 'failed',
    TIMEOUTED: 'timeouted',
    CANCELLED: 'cancelled'
  },

  uploadStatus: {
    PENDING: 'pending',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
  }
}
