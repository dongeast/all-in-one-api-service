/**
 * Generate Instrumental 参数定义
 */

const murekaCommon = require('../mureka-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    model: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: 'Model selection',
      options: ['auto', 'mureka-7.5', 'mureka-7.6', 'mureka-8'],
      default: 'auto'
    },

    n: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Number of generations',
      min: 1,
      max: 3,
      default: 2
    },

    prompt: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: false,
      description: 'Music style prompt',
      maxLength: 1024
    },

    instrumental_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Instrumental ID (via files/upload API)'
    },

    stream: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Enable streaming playback',
      default: false
    }
  },

  output: {
    id: {
      type: 'string',
      description: 'Task ID',
      path: 'id'
    },

    created_at: {
      type: 'number',
      description: 'Creation timestamp (seconds)',
      path: 'created_at'
    },

    finished_at: {
      type: 'number',
      description: 'Completion timestamp (seconds)',
      path: 'finished_at'
    },

    model: {
      type: 'string',
      description: 'Model used',
      path: 'model'
    },

    status: {
      type: 'string',
      description: 'Task status',
      path: 'status'
    },

    failed_reason: {
      type: 'string',
      description: 'Failure reason',
      path: 'failed_reason'
    },

    choices: {
      type: 'array',
      description: 'Generation results list',
      path: 'choices'
    }
  }
}
