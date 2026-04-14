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
      elementType: ElementType.MID_FRAME_ARRAY,
      required: false,
      description: 'Video middle frame image list (tag auto-generated)',
      maxItems: 6,
      minItems: 0,
      maxSizeMB: 10,
      itemSchema: {
        type: ParamType.OBJECT,
        properties: {
          tag: {
            type: ParamType.STRING,
            elementType: ElementType.DEFAULT,
            required: true,
            description: 'Auto-generated tag identifier (e.g., @image1, @image2)',
            pattern: '^@image\\d+$'
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
