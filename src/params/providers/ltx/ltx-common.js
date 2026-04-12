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
      description: 'Video generation prompt',
      maxLength: 5000
    },

    model: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: true,
      description: 'Model to use',
      options: ['ltx-2-fast', 'ltx-2-pro', 'ltx-2-3-fast', 'ltx-2-3-pro']
    },

    duration: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Video duration (seconds)',
      min: 2,
      max: 20,
      default: 8,
      unit: 's'
    },

    resolution: {
      type: ParamType.ENUM,
      elementType: ElementType.RESOLUTION,
      required: false,
      description: 'Video resolution',
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
      description: 'Frame rate',
      min: 24,
      max: 50,
      integer: true,
      default: 24,
      unit: 'fps'
    },

    generate_audio: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Whether to generate audio',
      default: true
    },

    camera_motion: {
      type: ParamType.ENUM,
      elementType: ElementType.CAMERA_MOTION,
      required: false,
      description: 'Camera motion effect',
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
      elementType: ElementType.IMAGE_UPLOAD,
      required: false,
      maxItems: 1,
      maxSizeMB: 10,
      description: 'Image URI to use as the first frame of the video'
    },

    audio_uri: {
      type: ParamType.STRING,
      elementType: ElementType.AUDIO_UPLOAD,
      maxItems: 1,
      required: false,
      description: 'Audio file URI to use as the video soundtrack'
    },

    video_uri: {
      type: ParamType.STRING,
      elementType: ElementType.UPLOAD,
      required: false,
      description: 'Video URI for editing or extension'
    },

    last_frame_uri: {
      type: ParamType.STRING,
      elementType: ElementType.IMAGE_UPLOAD,
      required: false,
      maxItems: 1,
      maxSizeMB: 10,
      description: 'Image URI to use as the last frame of the video (only supported by ltx-2-3 models)'
    },

    guidance_scale: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Guidance scale (CFG)',
      min: 1,
      max: 20,
      default: 5
    },

    start_time: {
      type: ParamType.NUMBER,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Start time (seconds)',
      min: 0
    },

    mode: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: 'Operation mode',
      options: ['replace_audio', 'replace_video', 'replace_audio_and_video', 'end', 'start']
    },

    context: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Context duration from input video (seconds)',
      min: 0,
      max: 20,
      unit: 's'
    }
  },

  output: {
    video: {
      type: 'buffer',
      description: 'Video binary data',
      path: 'video'
    },

    contentType: {
      type: 'string',
      description: 'Content type',
      path: 'contentType'
    },

    error: {
      type: 'object',
      description: 'Error information',
      path: 'error'
    }
  },

  modelCapabilities
}
