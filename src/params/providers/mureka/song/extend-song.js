/**
 * Extend Song 参数定义
 */

const murekaCommon = require('../mureka-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    song_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Song ID for extending',
      mutuallyExclusiveWith: ['upload_audio_id']
    },

    upload_audio_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Upload ID of the song to be extended',
      mutuallyExclusiveWith: ['song_id']
    },

    lyrics: {
      ...murekaCommon.input.lyrics,
      elementType: ElementType.TEXTAREA,
      description: 'The lyrics to be extended',
      required: true
    },

    extend_at: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: true,
      description: 'Extending start time (milliseconds)',
      min: 8000,
      max: 420000
    }
  },

  mutuallyExclusive: [
    ['song_id', 'upload_audio_id']
  ],

  output: {
    id: {
      ...murekaCommon.output.id,
      description: '任务ID',
      path: 'id'
    },

    created_at: {
      ...murekaCommon.output.created_at,
      description: '创建时间戳(秒)',
      path: 'created_at'
    },

    finished_at: {
      ...murekaCommon.output.finished_at,
      description: '完成时间戳(秒)',
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
      ...murekaCommon.output.failed_reason,
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
