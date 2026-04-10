/**
 * Generate Song 参数定义
 */

const murekaCommon = require('../mureka-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    lyrics: {
      ...murekaCommon.input.lyrics,
      description: '歌词内容',
      required: true,
    },

    model: {
      ...murekaCommon.input.model,
      description: '模型选择',
      required: false
    },

    n: {
      ...murekaCommon.input.n,
      description: '生成数量',
    },

    prompt: {
      ...murekaCommon.input.prompt,
      description: '音乐风格提示词',
      maxLength: 1024
    },

    reference_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: '参考音乐ID(通过 files/upload API)'
    },

    vocal_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: '人声ID(通过 files/upload API)'
    },

    melody_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: '旋律ID(通过 files/upload API)'
    },

    stream: {
      ...murekaCommon.input.stream,
      description: '是否启用流式播放'
    }
  },

  output: {
    id: {
      ...murekaCommon.output.id,
      description: '任务ID',
      path: 'id'
    },

    created_at: {
      ...murekaCommon.output.created_at,
      description: '创建时间戳',
      path: 'created_at'
    },

    finished_at: {
      ...murekaCommon.output.finished_at,
      description: '完成时间戳',
      path: 'finished_at'
    },

    model: {
      ...murekaCommon.output.model,
      description: '使用的模型',
      path: 'model'
    },

    status: {
      ...murekaCommon.output.status,
      description: '任务状态',
      path: 'status'
    },

    failed_reason: {
      type: 'string',
      description: '失败原因',
      path: 'failed_reason'
    },

    choices: {
      ...murekaCommon.output.choices,
      description: '生成结果列表',
      path: 'choices'
    }
  }
}
