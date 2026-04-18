/**
 * 火山引擎图像生成参数定义
 * 支持模型: doubao-seedream-5-0-260128, doubao-seedream-4-5-251128, 
 *          doubao-seedream-4-0-250828, doubao-seedream-3-0-t2i-250415
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    model: {
      type: ParamType.ENUM,
      elementType: ElementType.DEFAULT,
      required: true,
      description: 'Model ID or endpoint ID',
      options: [
        'doubao-seedream-5-0-260128',
        'doubao-seedream-4-5-251128',
        'doubao-seedream-4-0-250828',
        'doubao-seedream-3-0-t2i-250415'
      ]
    },

    prompt: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: true,
      description: 'Image generation prompt, supports Chinese and English, recommended max 300 Chinese characters or 600 English words',
      minLength: 1,
      maxLength: 2000
    },

    image: {
      type: ParamType.ARRAY,
      elementType: ElementType.IMAGE_UPLOAD,
      required: false,
      description: 'Input image information, supports URL or Base64 encoding',
      maxItems: 14,
      maxSizeMB: 10
    },

    size: {
      type: ParamType.ENUM,
      elementType: ElementType.RESOLUTION,
      required: false,
      description: 'Image size (width x height) or resolution identifier',
      options: [
        '1024x1024',
        '1280x720',
        '720x1280',
        '2048x2048',
        '2848x1600',
        '1600x2848',
        '4096x4096',
        '5504x3040',
        '3040x5504'
      ],
      default: '2048x2048'
    },

    seed: {
      type: ParamType.NUMBER,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Random seed for controlling generation randomness (-1 for random)',
      min: -1,
      max: 2147483647,
      default: -1
    },

    sequential_image_generation: {
      type: ParamType.ENUM,
      elementType: ElementType.RADIO,
      required: false,
      description: 'Whether to enable continuous image generation',
      options: ['auto', 'disabled'],
      default: 'disabled'
    },

    sequential_image_generation_options: {
      type: ParamType.OBJECT,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Continuous image generation configuration',
      default: {
        max_images: 15
      }
    },

    stream: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Whether to enable streaming output mode',
      default: false
    },

    guidance_scale: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Consistency between model output and prompt',
      min: 1,
      max: 10,
      default: 2.5
    },

    output_format: {
      type: ParamType.ENUM,
      elementType: ElementType.RADIO,
      required: false,
      description: 'Output image file format',
      options: ['png', 'jpeg'],
      default: 'jpeg'
    },

    response_format: {
      type: ParamType.ENUM,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Response format',
      options: ['url', 'b64_json'],
      default: 'url'
    },

    watermark: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Whether to add watermark to generated content',
      default: false
    },

    optimize_prompt_options: {
      type: ParamType.OBJECT,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Prompt optimization configuration'
    }
  },

  output: {
    model: {
      type: 'string',
      description: 'Model ID used',
      path: 'model'
    },

    created: {
      type: 'number',
      description: 'Creation timestamp (seconds)',
      path: 'created'
    },

    data: {
      type: 'array',
      description: 'Generated image information array',
      path: 'data',
      isResultField: true
    },

    'data[].url': {
      type: 'string',
      description: 'Image URL (valid for 24 hours)',
      path: 'data[0].url',
      isResultField: true
    },

    'data[].b64_json': {
      type: 'string',
      description: 'Image Base64 data',
      path: 'data[0].b64_json',
      isResultField: true
    },

    'data[].size': {
      type: 'string',
      description: 'Image size',
      path: 'data[0].size'
    },

    'data[].error': {
      type: 'object',
      description: 'Error information',
      path: 'data[0].error'
    },

    usage: {
      type: 'object',
      description: 'Usage information',
      path: 'usage'
    },

    'usage.generated_images': {
      type: 'number',
      description: 'Number of successfully generated images',
      path: 'usage.generated_images'
    },

    'usage.output_tokens': {
      type: 'number',
      description: 'Output token count',
      path: 'usage.output_tokens'
    },

    'usage.total_tokens': {
      type: 'number',
      description: 'Total token count',
      path: 'usage.total_tokens'
    },

    error: {
      type: 'object',
      description: 'Error information',
      path: 'error'
    },

    'error.code': {
      type: 'string',
      description: 'Error code',
      path: 'error.code'
    },

    'error.message': {
      type: 'string',
      description: 'Error message',
      path: 'error.message'
    }
  },

  cases: [
    {
      dependsOn: 'model',
      value: 'doubao-seedream-5-0-260128',
      image: {
        type: ParamType.ARRAY,
        elementType: ElementType.IMAGE_UPLOAD,
        required: false,
        description: 'Input image information, supports URL or Base64 encoding, up to 14 reference images',
        maxItems: 14,
        maxSizeMB: 10
      },
      size: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Image size (2K, 3K or width x height), total pixels: 3686400-10404496, aspect ratio: 1/16-16',
        options: ['2K', '3K', '2048x2048', '2848x1600', '1600x2848', '3072x3072'],
        default: '2048x2048'
      },
      seed: {
        type: ParamType.NUMBER,
        elementType: ElementType.DEFAULT,
        required: false,
        description: 'Random seed for controlling generation randomness (-1 for random)',
        min: -1,
        max: 2147483647,
        default: -1
      },
      sequential_image_generation: {
        type: ParamType.ENUM,
        elementType: ElementType.RADIO,
        required: false,
        description: 'Whether to enable continuous image generation',
        options: ['auto', 'disabled'],
        default: 'disabled'
      },
      sequential_image_generation_options: {
        type: ParamType.OBJECT,
        elementType: ElementType.DEFAULT,
        required: false,
        description: 'Continuous image generation configuration',
        default: {
          max_images: 15
        }
      },
      stream: {
        type: ParamType.BOOLEAN,
        elementType: ElementType.SWITCH,
        required: false,
        description: 'Whether to enable streaming output mode',
        default: false
      },
      output_format: {
        type: ParamType.ENUM,
        elementType: ElementType.RADIO,
        required: false,
        description: 'Output image file format',
        options: ['png', 'jpeg'],
        default: 'jpeg'
      },
      optimize_prompt_options: {
        type: ParamType.OBJECT,
        elementType: ElementType.DEFAULT,
        required: false,
        description: 'Prompt optimization configuration'
      }
    },
    {
      dependsOn: 'model',
      value: 'doubao-seedream-4-5-251128',
      image: {
        type: ParamType.ARRAY,
        elementType: ElementType.IMAGE_UPLOAD,
        required: false,
        description: 'Input image information, supports URL or Base64 encoding, up to 14 reference images',
        maxItems: 14,
        maxSizeMB: 10
      },
      size: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Image size (2K, 4K or width x height), total pixels: 3686400-16777216, aspect ratio: 1/16-16',
        options: ['2K', '4K', '2048x2048', '2848x1600', '1600x2848', '4096x4096', '5504x3040', '3040x5504'],
        default: '2048x2048'
      },
      seed: {
        type: ParamType.NUMBER,
        elementType: ElementType.DEFAULT,
        required: false,
        description: 'Random seed for controlling generation randomness (-1 for random)',
        min: -1,
        max: 2147483647,
        default: -1
      },
      sequential_image_generation: {
        type: ParamType.ENUM,
        elementType: ElementType.RADIO,
        required: false,
        description: 'Whether to enable continuous image generation',
        options: ['auto', 'disabled'],
        default: 'disabled'
      },
      sequential_image_generation_options: {
        type: ParamType.OBJECT,
        elementType: ElementType.DEFAULT,
        required: false,
        description: 'Continuous image generation configuration',
        default: {
          max_images: 15
        }
      },
      stream: {
        type: ParamType.BOOLEAN,
        elementType: ElementType.SWITCH,
        required: false,
        description: 'Whether to enable streaming output mode',
        default: false
      },
      optimize_prompt_options: {
        type: ParamType.OBJECT,
        elementType: ElementType.DEFAULT,
        required: false,
        description: 'Prompt optimization configuration'
      }
    },
    {
      dependsOn: 'model',
      value: 'doubao-seedream-4-0-250828',
      image: {
        type: ParamType.ARRAY,
        elementType: ElementType.IMAGE_UPLOAD,
        required: false,
        description: 'Input image information, supports URL or Base64 encoding, up to 14 reference images',
        maxItems: 14,
        maxSizeMB: 10
      },
      size: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Image size (1K, 2K, 4K or width x height), total pixels: 921600-16777216, aspect ratio: 1/16-16',
        options: ['1K', '2K', '4K', '1024x1024', '1280x720', '720x1280', '2048x2048', '2848x1600', '1600x2848', '4096x4096', '5504x3040', '3040x5504'],
        default: '2048x2048'
      },
      seed: {
        type: ParamType.NUMBER,
        elementType: ElementType.DEFAULT,
        required: false,
        description: 'Random seed for controlling generation randomness (-1 for random)',
        min: -1,
        max: 2147483647,
        default: -1
      },
      sequential_image_generation: {
        type: ParamType.ENUM,
        elementType: ElementType.RADIO,
        required: false,
        description: 'Whether to enable continuous image generation',
        options: ['auto', 'disabled'],
        default: 'disabled'
      },
      sequential_image_generation_options: {
        type: ParamType.OBJECT,
        elementType: ElementType.DEFAULT,
        required: false,
        description: 'Continuous image generation configuration',
        default: {
          max_images: 15
        }
      },
      stream: {
        type: ParamType.BOOLEAN,
        elementType: ElementType.SWITCH,
        required: false,
        description: 'Whether to enable streaming output mode',
        default: false
      },
      optimize_prompt_options: {
        type: ParamType.OBJECT,
        elementType: ElementType.DEFAULT,
        required: false,
        description: 'Prompt optimization configuration'
      }
    },
    {
      dependsOn: 'model',
      value: 'doubao-seedream-3-0-t2i-250415',
      size: {
        type: ParamType.ENUM,
        elementType: ElementType.RESOLUTION,
        required: false,
        description: 'Image size (512x512 to 2048x2048)',
        options: ['1024x1024', '1280x720', '720x1280', '2048x2048'],
        default: '1024x1024'
      },
      seed: {
        type: ParamType.NUMBER,
        elementType: ElementType.DEFAULT,
        required: false,
        description: 'Random seed for controlling generation randomness (-1 for random)',
        min: -1,
        max: 2147483647,
        default: -1
      },
      guidance_scale: {
        type: ParamType.NUMBER,
        elementType: ElementType.SLIDER,
        required: false,
        description: 'Consistency between model output and prompt',
        min: 1,
        max: 10,
        default: 2.5
      }
    }
  ]
}
