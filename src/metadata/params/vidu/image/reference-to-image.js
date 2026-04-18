/**
 * 参考生图参数定义
 * 支持模型: viduq2, viduq1
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

/**
 * example
   curl -X POST -H "Authorization: Token {your_api_key}" -H "Content-Type: application/json" -d '
    {
        "model": "viduq2",
        "images":["your_image_url1","your_image_url2","your_image_url3"],
        "prompt": "your_prompt",
        "seed": 0,
        "aspect_ratio":"16:9",
        "resolution":"2K",
        "payload":"",
    }' https://api.vidu.cn/ent/v2/reference2image
 */
module.exports = {
  input: {
    model: {
      type: ParamType.ENUM,
      elementType: ElementType.DEFAULT,
      required: true,
      options: ['viduq2', 'viduq1']
    },

    images: {
      type: ParamType.ARRAY,
      elementType: ElementType.IMAGE_UPLOAD,
      required: false,
      maxItems: 7,
      maxSizeMB: 50
    },

    prompt: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: true,
      minLength: 1,
      maxLength: 2000
    },

    seed: {
      type: ParamType.NUMBER,
      elementType: ElementType.DEFAULT,
      required: false,
      min: 0,
      max: 2147483647,
      default: 0,
      integer: true
    },

    aspect_ratio: {
      type: ParamType.ENUM,
      elementType: ElementType.RATIO,
      required: false,
      options: ['16:9', '9:16', '1:1', '3:4', '4:3', 'auto'],
      default: '16:9'
    },

    resolution: {
      type: ParamType.ENUM,
      elementType: ElementType.RADIO,
      required: false,
      default: '1080p'
    },

    payload: {
      type: ParamType.STRING,
      elementType: ElementType.DEFAULT,
      required: false,
      maxLength: 1048576
    },

    callback_url: {
      type: ParamType.STRING,
      elementType: ElementType.DEFAULT,
      required: false,
    }
  },

  output: {
    task_id: {
      type: ParamType.STRING,
      path: 'task_id'
    },
    state: {
      type: ParamType.STRING,
      path: 'state'
    },
    model: {
      type: ParamType.STRING,
      path: 'model'
    },
    prompt: {
      type:  ParamType.STRING,
      path: 'prompt'
    },
    images: {
      type: ParamType.ARRAY,
      isResultField: true,
    },
    seed: {
      type: ParamType.NUMBER,
      path: 'seed'
    },
    aspect_ratio: {
      type: ParamType.STRING,
      path: 'aspect_ratio'
    },
    resolution: {
      type: ParamType.STRING,
      path: 'resolution'
    },
    callback_url: {
      type: ParamType.STRING,
      path: 'callback_url'
    },
    payload: {
      type: ParamType.STRING,
      path: 'payload'
    },
    credits: {    
      type: ParamType.NUMBER,
      path: 'credits'
    },
    created_at: {
      type: ParamType.STRING,
      path: 'created_at'
    }
  },

  cases: [
    {
      dependsOn: 'model',
      value: 'viduq2',
      aspect_ratio: {
        type: ParamType.ENUM,
        elementType: ElementType.RATIO,
        required: false,
        options: ['16:9', '9:16', '1:1', '3:4', '4:3', '21:9', '2:3', '3:2', 'auto'],
        default: '16:9',
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RADIO,
        required: false,
        options: ['1080p', '2K', '4K'],
        default: '1080p'
      },
    },
    {
      dependsOn: 'model',
      value: 'viduq1',
      aspect_ratio: {
        type: ParamType.ENUM,
        elementType: ElementType.RATIO,
        required: false,
        options: ['16:9', '9:16', '1:1', '3:4', '4:3', 'auto'],
        default: '16:9',
      },
      resolution: {
        type: ParamType.ENUM,
        elementType: ElementType.RADIO,
        required: false,
        options: ['1080p'],
        default: '1080p'
      },
    }
  ]
}
