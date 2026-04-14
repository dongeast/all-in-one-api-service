/**
 * Text to Video Generation Task Submission 参数定义
 */

const skyreelsCommon = require('../skyreels-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    prompt: skyreelsCommon.input.prompt,

    duration: {
      ...skyreelsCommon.input.duration,
      min: 3,
      max: 15,
      default: 5
    },

    aspect_ratio: skyreelsCommon.input.aspect_ratio,
    resolution: {
      type: ParamType.ENUM,
      elementType: ElementType.RESOLUTION,
      required: false,
      description: 'Output video resolution. Supports 480p, 720p, and 1080p.',
      options: ['480p', '720p', '1080p'],
      default: '1080p'
    },
    sound: skyreelsCommon.input.sound,
    prompt_optimizer: skyreelsCommon.input.prompt_optimizer,
    mode: skyreelsCommon.input.mode
  },

  output: {
    task_id: skyreelsCommon.output.task_id,
    msg: skyreelsCommon.output.msg,
    code: skyreelsCommon.output.code,
    status: skyreelsCommon.output.status,
    trace_id: skyreelsCommon.output.trace_id
  }
}
