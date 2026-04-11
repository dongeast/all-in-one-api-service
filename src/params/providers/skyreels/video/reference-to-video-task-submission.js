/**
 * Reference to Video Task Submission 参数定义
 */

const skyreelsCommon = require('../skyreels-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    prompt: {
      ...skyreelsCommon.input.prompt,
      maxLength: 512
    },

    ref_images: {
      type: ParamType.ARRAY,
      elementType: ElementType.INPUT,
      required: true,
      description: '1-4 subject reference images',
      minItems: 1,
      maxItems: 4,
      items: {
        type: ParamType.STRING,
        elementType: ElementType.UPLOAD,
        format: 'uri'
      }
    },

    duration: {
      ...skyreelsCommon.input.duration,
      min: 1,
      max: 5,
      default: 5
    },

    aspect_ratio: skyreelsCommon.input.aspect_ratio
  },

  output: {
    task_id: skyreelsCommon.output.task_id,
    msg: skyreelsCommon.output.msg,
    code: skyreelsCommon.output.code,
    status: skyreelsCommon.output.status,
    trace_id: skyreelsCommon.output.trace_id
  }
}
