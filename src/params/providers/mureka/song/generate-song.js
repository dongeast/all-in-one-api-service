/**
 * Generate Song 参数定义
 */

const murekaCommon = require('../mureka-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    lyrics: {
      ...murekaCommon.input.lyrics,
      description: 'Lyrics content',
      required: true,
    },

    model: {
      ...murekaCommon.input.model,
      description: 'Model selection',
      required: false
    },

    n: {
      ...murekaCommon.input.n,
      description: 'Number of generations',
    },

    prompt: {
      ...murekaCommon.input.prompt,
      description: 'Music style prompt',
      maxLength: 1024
    },

    reference_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Reference music ID (via files/upload API)'
    },

    vocal_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Vocal ID (via files/upload API)'
    },

    melody_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Melody ID (via files/upload API)'
    },

    stream: {
      ...murekaCommon.input.stream,
      description: 'Enable streaming playback'
    }
  },

  output: {
    id: {
      ...murekaCommon.output.id,
      description: 'Task ID',
      path: 'id'
    },

    created_at: {
      ...murekaCommon.output.created_at,
      description: 'Creation timestamp',
      path: 'created_at'
    },

    finished_at: {
      ...murekaCommon.output.finished_at,
      description: 'Completion timestamp',
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
      type: 'string',
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
