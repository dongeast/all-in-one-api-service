/**
 * Omni Reference Task Submission 参数定义
 */

const skyreelsCommon = require('../skyreels-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    prompt: skyreelsCommon.input.prompt,

    aspect_ratio: skyreelsCommon.input.aspect_ratio,

    duration: {
      ...skyreelsCommon.input.duration,
      min: 3,
      max: 15,
      default: 5
    },

    ref_images: {
      type: ParamType.ARRAY,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Reference image list',
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
          type: {
            type: ParamType.ENUM,
            elementType: ElementType.SELECT,
            required: true,
            description: 'Image reference type',
            options: ['grid', 'image']
          },
          image_urls: {
            type: ParamType.ARRAY,
            elementType: ElementType.INPUT,
            required: true,
            description: 'Image URL list',
            items: {
              type: ParamType.STRING,
              elementType: ElementType.UPLOAD,
              format: 'uri'
            }
          },
          audio_url: {
            type: ParamType.STRING,
            elementType: ElementType.UPLOAD,
            required: false,
            description: 'Corresponding voice tone URL',
            format: 'uri'
          }
        }
      }
    },

    ref_videos: {
      type: ParamType.ARRAY,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Reference video configuration list',
      items: {
        type: ParamType.OBJECT,
        properties: {
          tag: {
            type: ParamType.STRING,
            elementType: ElementType.INPUT,
            required: true,
            description: 'Video reference identifier, must start with @',
            pattern: '^@'
          },
          type: {
            type: ParamType.ENUM,
            elementType: ElementType.SELECT,
            required: true,
            description: 'Video reference type',
            options: ['reference', 'extend']
          },
          video_url: {
            type: ParamType.STRING,
            elementType: ElementType.UPLOAD,
            required: true,
            description: 'Video URL, supports MP4/MOV format, max 10 seconds',
            format: 'uri'
          }
        }
      }
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
