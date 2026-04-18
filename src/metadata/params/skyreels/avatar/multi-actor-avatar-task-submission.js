/**
 * Multi Actor Avatar Task Submission 参数定义
 * 支持模型: Skyreels V3
 */

const { textPrompt } = require('../../templates')
const { ParamType, ElementType } = require('../../common')

module.exports = {
  input: {
    prompt: {
      ...textPrompt.prompt,
      elementType: ElementType.TEXTAREA,
      description: 'Video generation prompt',
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
    task_id: {
      type: 'string',
      description: 'Task ID',
      path: 'task_id'
    },

    msg: {
      type: 'string',
      description: 'Message description',
      path: 'msg'
    },

    code: {
      type: 'number',
      description: 'Status code',
      path: 'code'
    },

    status: {
      type: 'string',
      description: 'Task status',
      path: 'status'
    },

    trace_id: {
      type: 'string',
      description: 'Request trace ID',
      path: 'trace_id'
    }
  },

  cases: [
    {
      dependsOn: 'mode',
      value: 'std',
      resolution: {
        type: ParamType.STRING,
        description: 'Output resolution (720p for std mode)',
        value: '720p'
      }
    },
    {
      dependsOn: 'mode',
      value: 'pro',
      resolution: {
        type: ParamType.STRING,
        description: 'Output resolution (1080p for pro mode)',
        value: '1080p'
      }
    }
  ]
}
