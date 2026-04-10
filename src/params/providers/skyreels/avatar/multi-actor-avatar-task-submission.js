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
      description: '视频首帧图片',
      format: 'uri'
    },

    audios: {
      type: ParamType.ARRAY,
      elementType: ElementType.INPUT,
      required: true,
      description: '音频文件URL列表,支持mp3/wav格式,每个音频时长<=200秒',
      items: {
        type: ParamType.STRING,
        elementType: ElementType.UPLOAD,
        format: 'uri',
        description: '音频URL,支持mp3/wav格式'
      }
    },

    bboxes: {
      type: ParamType.ARRAY,
      elementType: ElementType.INPUT,
      required: true,
      description: '多人音频2视频人脸边界框,bboxes数量必须与audios数量匹配',
      minItems: 1,
      items: {
        type: ParamType.ARRAY,
        elementType: ElementType.INPUT,
        description: '边界框[x, y, width, height]',
        minItems: 4,
        maxItems: 4,
        items: {
          type: ParamType.NUMBER,
          elementType: ElementType.INPUT,
          description: '边界框坐标值',
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
      description: '多人bbox类型是主体检测还是人脸检测',
      options: ['face', 'body'],
      default: 'face'
    },

    mode: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: '返回结果的分辨率模式',
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
