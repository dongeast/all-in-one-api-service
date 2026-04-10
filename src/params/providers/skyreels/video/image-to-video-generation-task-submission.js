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
      elementType: ElementType.UPLOAD,
      required: true,
      description: '视频首帧图片',
      format: 'uri'
    },

    end_frame_image: {
      type: ParamType.STRING,
      elementType: ElementType.UPLOAD,
      required: false,
      description: '视频尾帧图片',
      format: 'uri'
    },

    mid_frame_images: {
      type: ParamType.ARRAY,
      elementType: ElementType.INPUT,
      required: false,
      description: '视频中间帧图片列表',
      maxItems: 6,
      items: {
        type: ParamType.OBJECT,
        properties: {
          tag: {
            type: ParamType.STRING,
            elementType: ElementType.INPUT,
            required: true,
            description: '参考图片标识符,必须以 @ 开头',
            pattern: '^@'
          },
          image_url: {
            type: ParamType.STRING,
            elementType: ElementType.UPLOAD,
            required: true,
            description: '图片URL',
            format: 'uri'
          },
          time_stamp: {
            type: ParamType.NUMBER,
            elementType: ElementType.INPUT,
            required: false,
            description: '目标时间戳,-1 表示未指定',
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
