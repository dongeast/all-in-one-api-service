/**
 * Generate Song 参数定义
 * 支持模型: mureka-7.5, mureka-7.6, mureka-o2, mureka-8
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    lyrics: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: true,
      description: 'Lyrics for generated song',
      maxLength: 3000
    },

    model: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: 'The model to use',
      options: ['auto', 'mureka-7.5', 'mureka-7.6', 'mureka-o2', 'mureka-8'],
      default: 'auto'
    },

    n: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'How many songs to generate for each request',
      min: 1,
      max: 3,
      default: 2
    },

    prompt: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: false,
      description: 'Control music generation by inputting a prompt',
      maxLength: 1024
    },

    reference_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Control music generation by referencing music (via files/upload API)'
    },

    vocal_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Control music generation by any voice you like (via files/upload API)'
    },

    melody_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Control music generation by melody idea (via files/upload API)'
    },

    stream: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Enable streaming phase for playback while generating',
      default: false
    }
  },

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
