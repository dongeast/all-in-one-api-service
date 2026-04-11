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
      description: 'Task ID',
      path: 'id'
    },

    created_at: {
      ...murekaCommon.output.created_at,
      description: 'Creation timestamp (seconds)',
      path: 'created_at'
    },

    finished_at: {
      ...murekaCommon.output.finished_at,
      description: 'Completion timestamp (seconds)',
      path: 'finished_at'
    },

    model: {
      ...murekaCommon.output.model,
      description: 'Model used',
      path: 'model'
    },

    status: {
      ...murekaCommon.output.status,
      description: 'Task status',
      path: 'status'
    },

    failed_reason: {
      ...murekaCommon.output.failed_reason,
      description: 'Failure reason',
      path: 'failed_reason'
    },

    choices: {
      ...murekaCommon.output.choices,
      description: 'Generation results list',
      path: 'choices'
    }
  }
}
