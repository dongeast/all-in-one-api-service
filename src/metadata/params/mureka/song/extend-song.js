/**
 * Extend Song 参数定义
 * 支持模型: All Mureka Models
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

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
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: true,
      description: 'The lyrics to be extended'
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
      type: 'string',
      description: 'Task ID of the asynchronous song generation task',
      path: 'id'
    },
    created_at: {
      type: 'number',
      description: 'The Unix timestamp (in seconds) for when the task was created',
      path: 'created_at'
    },
    finished_at: {
      type: 'number',
      description: 'The Unix timestamp (in seconds) for when the task was finished',
      path: 'finished_at'
    },
    model: {
      type: 'string',
      description: 'The model used for song generation',
      path: 'model'
    },
    status: {
      type: 'string',
      description: 'The current status of the task: preparing, queued, running, streaming, succeeded, failed, timeouted, cancelled',
      path: 'status'
    },
    failed_reason: {
      type: 'string',
      description: 'The reason for the failure',
      path: 'failed_reason'
    },
    choices: {
      type: 'array',
      description: 'The generated songs, when the status is succeeded',
      path: 'choices',
      isResultField: true
    }
  }
}
