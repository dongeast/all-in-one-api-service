/**
 * Skyreels 通用参数定义
 */

const { textPrompt } = require('../../templates')
const { ParamType, ElementType } = require('../../common')

module.exports = {
  input: {
    prompt: {
      ...textPrompt.prompt,
      elementType: ElementType.TEXTAREA,
      description: '视频生成提示词',
      maxLength: 1280
    },

    duration: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: '视频时长（秒）',
      min: 1,
      max: 30,
      default: 5
    },

    aspect_ratio: {
      type: ParamType.ENUM,
      elementType: ElementType.RATIO,
      required: false,
      description: '视频宽高比',
      options: ['16:9', '9:16', '3:4', '4:3', '1:1'],
      default: '16:9'
    },

    mode: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: '质量/性能模式',
      options: ['fast', 'std', 'pro'],
      default: 'std'
    },

    sound: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: '是否包含音效',
      default: false
    },

    prompt_optimizer: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: '是否启用自动提示词优化',
      default: true
    }
  },

  output: {
    task_id: {
      type: 'string',
      description: '任务ID',
      path: 'task_id'
    },

    msg: {
      type: 'string',
      description: '消息描述',
      path: 'msg'
    },

    code: {
      type: 'number',
      description: '状态码',
      path: 'code'
    },

    status: {
      type: 'string',
      description: '任务状态',
      path: 'status'
    },

    trace_id: {
      type: 'string',
      description: '请求跟踪ID',
      path: 'trace_id'
    },

    video_url: {
      type: 'string',
      description: '视频URL',
      path: 'data.video_url'
    },

    duration_output: {
      type: 'number',
      description: '视频时长（秒）',
      path: 'data.duration'
    },

    resolution: {
      type: 'string',
      description: '视频分辨率',
      path: 'data.resolution'
    },

    cost_credits: {
      type: 'number',
      description: '消耗的积分',
      path: 'data.cost_credits'
    }
  },

  taskStatus: {
    SUBMITTED: 'submitted',
    PENDING: 'pending',
    RUNNING: 'running',
    FAILED: 'failed',
    UNKNOWN: 'unknown'
  }
}
