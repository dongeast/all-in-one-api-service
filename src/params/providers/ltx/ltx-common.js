/**
 * LTX 通用参数定义
 */

const { textPrompt } = require('../../templates')
const modelCapabilities = require('./model-capabilities')
const { ParamType, ElementType } = require('../../common')

module.exports = {
  input: {
    prompt: {
      ...textPrompt.prompt,
      elementType: ElementType.TEXTAREA,
      description: '视频生成提示词',
      maxLength: 5000
    },

    model: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: true,
      description: '使用的模型',
      options: ['ltx-2-fast', 'ltx-2-pro', 'ltx-2-3-fast', 'ltx-2-3-pro']
    },

    duration: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: '视频时长（秒）',
      min: 2,
      max: 20,
      default: 8
    },

    resolution: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: '视频分辨率',
      options: [
        '1920x1080',
        '1080x1920',
        '2560x1440',
        '1440x2560',
        '3840x2160',
        '2160x3840'
      ]
    },

    fps: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: '帧率',
      min: 24,
      max: 50,
      integer: true,
      default: 24
    },

    generate_audio: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: '是否生成音频',
      default: true
    },

    camera_motion: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: '镜头运动效果',
      options: [
        'dolly_in',
        'dolly_out',
        'dolly_left',
        'dolly_right',
        'jib_up',
        'jib_down',
        'static',
        'focus_shift'
      ]
    },

    image_uri: {
      type: ParamType.STRING,
      elementType: ElementType.UPLOAD,
      required: false,
      description: '图片URI，用作视频的第一帧'
    },

    audio_uri: {
      type: ParamType.STRING,
      elementType: ElementType.UPLOAD,
      required: false,
      description: '音频文件URI，用作视频的音轨'
    },

    video_uri: {
      type: ParamType.STRING,
      elementType: ElementType.UPLOAD,
      required: false,
      description: '视频URI，用于编辑或扩展'
    },

    last_frame_uri: {
      type: ParamType.STRING,
      elementType: ElementType.UPLOAD,
      required: false,
      description: '图片URI，用作视频的最后一帧（仅ltx-2-3模型支持）'
    },

    guidance_scale: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: '引导比例（CFG）',
      min: 1,
      max: 20,
      default: 5
    },

    start_time: {
      type: ParamType.NUMBER,
      elementType: ElementType.INPUT,
      required: false,
      description: '开始时间（秒）',
      min: 0
    },

    mode: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: '操作模式',
      options: ['replace_audio', 'replace_video', 'replace_audio_and_video', 'end', 'start']
    },

    context: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: '从输入视频使用的上下文时长（秒）',
      min: 0,
      max: 20
    }
  },

  output: {
    video: {
      type: 'buffer',
      description: '视频二进制数据',
      path: 'video'
    },

    contentType: {
      type: 'string',
      description: '内容类型',
      path: 'contentType'
    },

    error: {
      type: 'object',
      description: '错误信息',
      path: 'error'
    }
  },

  modelCapabilities
}
