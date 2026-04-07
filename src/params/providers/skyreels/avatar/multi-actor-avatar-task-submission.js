/**
 * Multi Actor Avatar Task Submission 参数定义
 */

const skyreelsCommon = require('../skyreels-common')

module.exports = {
  input: {
    prompt: {
      ...skyreelsCommon.input.prompt,
      maxLength: 512
    },

    first_frame_image: {
      type: 'string',
      required: true,
      description: '视频首帧图片',
      format: 'uri'
    },

    audios: {
      type: 'array',
      required: true,
      description: '音频文件URL列表,支持mp3/wav格式,每个音频时长<=200秒',
      items: {
        type: 'string',
        format: 'uri',
        description: '音频URL,支持mp3/wav格式'
      }
    },

    bboxes: {
      type: 'array',
      required: true,
      description: '多人音频2视频人脸边界框,bboxes数量必须与audios数量匹配',
      items: {
        type: 'array',
        items: {
          type: 'number'
        }
      }
    },

    bboxes_type: {
      type: 'enum',
      required: false,
      description: '多人bbox类型是主体检测还是人脸检测',
      options: ['face', 'body'],
      default: 'face'
    },

    mode: {
      type: 'enum',
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
