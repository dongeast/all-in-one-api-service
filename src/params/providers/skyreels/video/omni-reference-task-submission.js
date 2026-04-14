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

    resolution: {
      type: ParamType.ENUM,
      elementType: ElementType.RESOLUTION,
      required: false,
      description: 'Output video resolution. Supports 480p, 720p, and 1080p.',
      options: ['480p', '720p', '1080p'],
      default: '1080p'
    },

    ref_images: {
      type: ParamType.ARRAY,
      elementType: ElementType.REF_IMAGE_ARRAY,
      required: false,
      description: 'Reference image list for video generation',
      maxItems: 5,
      minItems: 0,
      itemSchema: {
        type: ParamType.OBJECT,
        properties: {
          tag: {
            type: ParamType.STRING,
            elementType: ElementType.DEFAULT,
            required: true,
            description: 'Reference image identifier, must start with @ and appear in the prompt (e.g., @image1, @image2)',
            pattern: '^@[a-zA-Z_][a-zA-Z0-9_]*$'
          },
          type: {
            type: ParamType.ENUM,
            elementType: ElementType.DEFAULT,
            required: true,
            description: 'Image reference type',
            options: ['image'],
            default: 'image'
          },
          image_urls: {
            type: ParamType.ARRAY,
            elementType: ElementType.IMAGE_UPLOAD,
            required: true,
            description: 'List of image URLs (supports jpg/jpeg, png, gif, bpm)',
            maxItems: 5,
            minItems: 1,
            items: {
              type: ParamType.STRING,
              elementType: ElementType.IMAGE_UPLOAD,
              format: 'uri'
            }
          },
          audio_url: {
            type: ParamType.STRING,
            elementType: ElementType.DEFAULT,
            required: false,
            description: 'Corresponding voice timbre URL (max 15 seconds, only for type image)',
            format: 'uri',
            default: ''
          }
        }
      }
    },

    ref_videos: {
      type: ParamType.ARRAY,
      elementType: ElementType.REF_VIDEOS_ARRAY,
      required: false,
      description: 'Reference video configurations (max 10s, supports MP4/MOV)',
      maxItems: 1,
      minItems: 0,
      itemSchema: {
        type: ParamType.OBJECT,
        properties: {
          tag: {
            type: ParamType.STRING,
            elementType: ElementType.DEFAULT,
            required: true,
            description: 'Video reference identifier, must start with @ (e.g., @video1)',
            pattern: '^@[a-zA-Z_][a-zA-Z0-9_]*$'
          },
          type: {
            type: ParamType.ENUM,
            elementType: ElementType.DEFAULT,
            required: true,
            description: 'Video reference type: reference (for motion reference, includes audio by default), extend (for video extension, supports sound)',
            options: ['reference', 'extend'],
            default: 'reference'
          },
          video_url: {
            type: ParamType.STRING,
            elementType: ElementType.UPLOAD,
            required: true,
            description: 'Video URL (MP4, MOV, max 10s)',
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
