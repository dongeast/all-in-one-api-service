/**
 * Image to Video Generation Task Submission 参数定义
 */

const skyreelsCommon = require('../skyreels-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    prompt: skyreelsCommon.input.prompt,

    first_frame_image: {
      type: ParamType.STRING,
      elementType: ElementType.IMAGE_UPLOAD,
      maxItems: 1,
      required: true,
      description: 'Video first frame image',
      format: 'uri'
    },

    end_frame_image: {
      type: ParamType.STRING,
      elementType: ElementType.IMAGE_UPLOAD,
      maxItems: 1,
      required: false,
      description: 'Video last frame image',
      format: 'uri'
    },

    mid_frame_images: {
      type: ParamType.ARRAY,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Video middle frame image list',
      maxItems: 6,
      items: {
        type: ParamType.OBJECT,
        properties: {
          tag: {
            type: ParamType.STRING,
            elementType: ElementType.INPUT,
            required: true,
            description: 'Reference image identifier, must start with @',
            pattern: '^@'
          },
          image_url: {
            type: ParamType.STRING,
            elementType: ElementType.IMAGE_UPLOAD,
            maxItems: 1,
            required: true,
            description: 'Image URL',
            format: 'uri'
          },
          time_stamp: {
            type: ParamType.NUMBER,
            elementType: ElementType.DEFAULT,
            required: false,
            description: 'Target timestamp, -1 means unspecified',
            default: -1
          }
        }
      }
    },

    duration: {
      ...skyreelsCommon.input.duration,
      min: 3,
      max: 15,
      default: 5
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
