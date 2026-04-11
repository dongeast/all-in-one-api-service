/**
 * Multi Actor Avatar Task Submission 参数定义
 */

const skyreelsCommon = require('../skyreels-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    prompt: {
      ...skyreelsCommon.input.prompt,
      maxLength: 512
    },

    first_frame_image: {
      type: ParamType.STRING,
      elementType: ElementType.UPLOAD,
      required: true,
      description: 'Video first frame image',
      format: 'uri'
    },

    audios: {
      type: ParamType.ARRAY,
      elementType: ElementType.INPUT,
      required: true,
      description: 'Audio file URL list, supports mp3/wav format, each audio duration <= 200 seconds',
      items: {
        type: ParamType.STRING,
        elementType: ElementType.UPLOAD,
        format: 'uri',
        description: 'Audio URL, supports mp3/wav format'
      }
    },

    bboxes: {
      type: ParamType.ARRAY,
      elementType: ElementType.INPUT,
      required: true,
      description: 'Multi-person audio-to-video face bounding boxes, bboxes count must match audios count',
      minItems: 1,
      items: {
        type: ParamType.ARRAY,
        elementType: ElementType.INPUT,
        description: 'Bounding box [x, y, width, height]',
        minItems: 4,
        maxItems: 4,
        items: {
          type: ParamType.NUMBER,
          elementType: ElementType.INPUT,
          description: 'Bounding box coordinate value',
          min: 0
        }
      },
      validate: (value, params) => {
        if (params.audios && value.length !== params.audios.length) {
          return {
            valid: false,
            message: `bboxes数量(${value.length})必须与audios数量(${params.audios.length})匹配`
          }
        }
        for (let i = 0; i < value.length; i++) {
          const bbox = value[i]
          if (!Array.isArray(bbox) || bbox.length !== 4) {
            return {
              valid: false,
              message: `bboxes[${i}]必须是包含4个数字的数组[x, y, width, height]`
            }
          }
        }
        return { valid: true }
      }
    },

    bboxes_type: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: 'Multi-person bbox type is subject detection or face detection',
      options: ['face', 'body'],
      default: 'face'
    },

    mode: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: 'Resolution mode for returned results',
      options: ['std', 'pro'],
      default: 'std'
    }
  },

  output: {
    task_id: skyreelsCommon.output.task_id,
    msg: skyreelsCommon.output.msg,
    code: skyreelsCommon.output.code,
    status: skyreelsCommon.output.status,
    trace_id: skyreelsCommon.output.trace_id
  }
}
