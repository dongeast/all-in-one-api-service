/**
 * Omni Reference Task Submission 参数定义
 * 支持模型: Skyreels V4
 */

const { textPrompt } = require('../../templates')
const { ParamType, ElementType } = require('../../common')

module.exports = {
  input: {
    prompt: {
      ...textPrompt.prompt,
      elementType: ElementType.TEXTAREA,
      description: 'Video generation prompt',
      maxLength: 1280
    },

    aspect_ratio: {
      type: ParamType.ENUM,
      elementType: ElementType.RATIO,
      required: false,
      description: 'Video aspect ratio (ignored if ref_videos provided)',
      options: ['16:9', '9:16', '3:4', '4:3', '1:1'],
      default: '16:9'
    },

    duration: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Video duration (seconds), overridden if ref_videos with type "reference" provided',
      min: 3,
      max: 15,
      default: 5
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
            options: ['grid', 'image'],
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

    sound: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Whether to include sound effects (not effective when using video reference)',
      default: false
    },

    prompt_optimizer: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Whether to enable automatic prompt optimization',
      default: true
    },

    mode: {
      type: ParamType.ENUM,
      elementType: ElementType.RADIO,
      required: false,
      description: 'Quality/performance mode (currently only std supported)',
      options: ['fast', 'std', 'pro'],
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
      dependsOn: 'ref_videos.type',
      value: 'reference',
      sound: {
        type: ParamType.BOOLEAN,
        description: 'Sound is not effective for reference type (audio from input video is used by default)',
        value: false,
        disabled: true
      },
      ref_images: {
        type: ParamType.ARRAY,
        description: 'Can only combine with image type ref_images (not grid type)',
        constraints: {
          itemTypes: ['image']
        }
      }
    },
    {
      dependsOn: 'ref_videos.type',
      value: 'extend',
      sound: {
        type: ParamType.BOOLEAN,
        description: 'Can enable sound for extend type',
        default: false
      },
      ref_images: {
        type: ParamType.ARRAY,
        description: 'Cannot combine with ref_images for extend type',
        disabled: true
      }
    }
  ]
}
