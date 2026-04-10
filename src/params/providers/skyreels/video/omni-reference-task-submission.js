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
      description: '参考图片列表',
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
          type: {
            type: ParamType.ENUM,
            elementType: ElementType.SELECT,
            required: true,
            description: '图片参考类型',
            options: ['grid', 'image']
          },
          image_urls: {
            type: ParamType.ARRAY,
            elementType: ElementType.INPUT,
            required: true,
            description: '图片URL列表',
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
            description: '对应的语音音色URL',
            format: 'uri'
          }
        }
      }
    },

    ref_videos: {
      type: ParamType.ARRAY,
      elementType: ElementType.INPUT,
      required: false,
      description: '参考视频配置列表',
      items: {
        type: ParamType.OBJECT,
        properties: {
          tag: {
            type: ParamType.STRING,
            elementType: ElementType.INPUT,
            required: true,
            description: '视频参考标识符,必须以 @ 开头',
            pattern: '^@'
          },
          type: {
            type: ParamType.ENUM,
            elementType: ElementType.SELECT,
            required: true,
            description: '视频参考类型',
            options: ['reference', 'extend']
          },
          video_url: {
            type: ParamType.STRING,
            elementType: ElementType.UPLOAD,
            required: true,
            description: '视频URL,支持MP4/MOV格式,最大10秒',
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
