/**
 * 场景特效模板参数定义
 * 支持模型: Vidu Template Models
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    template: {
      type: ParamType.STRING,
      elementType: ElementType.SELECT,
      required: true,
      description: 'Scene template parameter (see: https://platform.vidu.cn/docs/templates)'
    },

    images: {
      type: ParamType.ARRAY,
      elementType: ElementType.IMAGE_UPLOAD,
      required: true,
      description: 'Images for template video generation',
      maxItems: 7,
      maxSizeMB: 50
    },

    prompt: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: false,
      description: 'Text description for video generation (not required when template is subject_3 or pubg_winner_hit)',
      minLength: 1,
      maxLength: 2000
    },

    seed: {
      type: ParamType.NUMBER,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Random seed, 0 for random',
      min: 0,
      max: 2147483647,
      integer: true
    },

    aspect_ratio: {
      type: ParamType.ENUM,
      elementType: ElementType.RATIO,
      required: false,
      description: 'Aspect ratio (different templates support different options)',
      options: ['16:9', '9:16'],
      default: '16:9'
    },

    area: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: 'Exotic princess effect parameter (only available when template is exotic_princess)',
      options: ['denmark', 'uk', 'africa', 'china', 'mexico', 'switzerland', 'russia', 'italy', 'korea', 'thailand', 'india', 'japan']
    },

    beast: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: 'Beast companion effect parameter (only available when template is beast_companion)',
      options: ['bear', 'tiger', 'elk', 'snake', 'lion', 'wolf']
    },

    bgm: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Add background music (auto-select from preset BGM library)',
      default: false
    },

    payload: {
      type: ParamType.STRING,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Pass-through parameter',
      maxLength: 1048576
    },

    watermark: {
      type: ParamType.BOOLEAN,
      elementType: ElementType.SWITCH,
      required: false,
      description: 'Add watermark',
      default: false
    },

    wm_position: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: 'Watermark position',
      options: [
        { value: 1, label: 'Top Left' },
        { value: 2, label: 'Top Right' },
        { value: 3, label: 'Bottom Right' },
        { value: 4, label: 'Bottom Left' }
      ],
      default: 3
    },

    wm_url: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Watermark image URL'
    },

    meta_data: {
      type: ParamType.STRING,
      elementType: ElementType.TEXTAREA,
      required: false,
      description: 'Metadata identifier (JSON format)'
    },

    callback_url: {
      type: ParamType.STRING,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Callback URL for task status notification'
    }
  },

  output: {
    task_id: {
      type: ParamType.STRING,
      description: 'Vidu generated task ID',
      path: 'task_id'
    },
    state: {
      type: ParamType.STRING,
      description: 'Processing status',
      path: 'state'
    },
    template: {
      type: ParamType.STRING,
      description: 'Scene parameter used in this call',
      path: 'template'
    },
    prompt: {
      type: ParamType.STRING,
      description: 'Prompt used',
      path: 'prompt'
    },
    images: {
      type: ParamType.ARRAY,
      description: 'Images used',
      path: 'images',
      isResultField: true
    },
    seed: {
      type: ParamType.NUMBER,
      description: 'Random seed used',
      path: 'seed'
    },
    aspect_ratio: {
      type: ParamType.STRING,
      description: 'Aspect ratio used',
      path: 'aspect_ratio'
    },
    bgm: {
      type: ParamType.BOOLEAN,
      description: 'Background music parameter used in this call',
      path: 'bgm'
    },
    payload: {
      type: ParamType.STRING,
      description: 'Pass-through parameter',
      path: 'payload'
    },
    watermark: {
      type: ParamType.BOOLEAN,
      description: 'Whether watermark was used',
      path: 'watermark'
    },
    credits: {
      type: ParamType.NUMBER,
      description: 'Credits used',
      path: 'credits'
    },
    created_at: {
      type: ParamType.STRING,
      description: 'Task creation time',
      path: 'created_at'
    }
  }
}
