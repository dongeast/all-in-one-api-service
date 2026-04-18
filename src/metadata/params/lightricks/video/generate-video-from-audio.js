/**
 * Generate Video from Audio 参数定义
 * 支持模型: ltx-2-pro, ltx-2-3-pro
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    audio_uri: {
      type: ParamType.STRING,
      elementType: ElementType.AUDIO_UPLOAD,
      maxItems: 1,
      required: true,
      description: 'Audio file URI to use as video soundtrack. Duration must be between 2 and 20 seconds'
    },

    image_uri: {
      type: ParamType.STRING,
      elementType: ElementType.IMAGE_UPLOAD,
      required: false,
      maxItems: 1,
      maxSizeMB: 10,
      description: 'Input image URI to use as the first frame of the video. Required if prompt is not provided'
    },

    prompt: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: false,
      description: 'Text describing how the video should be generated. Required if image_uri is not provided',
      minLength: 1,
      maxLength: 5000
    },

    resolution: {
      type: ParamType.ENUM,
      elementType: ElementType.RESOLUTION,
      required: false,
      description: 'Generated video resolution, format is WIDTHxHEIGHT. Automatically determined by image orientation',
      options: [
        '1920x1080',
        '1080x1920',
        '2560x1440',
        '1440x2560',
        '3840x2160',
        '2160x3840'
      ]
    },

    guidance_scale: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Video generation guidance scale (CFG). Default is 5 for text-to-video, 9 when image is provided',
      min: 1,
      max: 20,
      default: 5
    },

    model: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      default: 'ltx-2-3-pro',
      description: 'Model to use (only Pro models supported: ltx-2-pro, ltx-2-3-pro)',
      options: ['ltx-2-pro', 'ltx-2-3-pro']
    }
  },

  validation: {
    conditionalRequired: [
      {
        condition: (params) => !params.image_uri,
        requiredParams: ['prompt'],
        message: '当未提供image_uri时，prompt参数为必填项'
      },
      {
        condition: (params) => !params.prompt,
        requiredParams: ['image_uri'],
        message: '当未提供prompt时，image_uri参数为必填项'
      }
    ],
    mutuallyExclusive: [
      {
        params: ['image_uri', 'prompt'],
        mode: 'at_least_one',
        message: 'image_uri和prompt参数至少需要提供一个'
      }
    ]
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

  cases: [
    {
      dependsOn: 'model',
      value: 'ltx-2-3-pro',
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Generated video resolution, format is WIDTHxHEIGHT. Automatically determined by image orientation',
        options: [
          '1920x1080',
          '1080x1920',
          '2560x1440',
          '1440x2560',
          '3840x2160',
          '2160x3840'
        ]
      }
    },
    {
      dependsOn: 'model',
      value: 'ltx-2-pro',
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Generated video resolution (LTX-2 only supports landscape 16:9)',
        options: [
          '1920x1080',
          '2560x1440',
          '3840x2160'
        ]
      }
    }
  ]
}
