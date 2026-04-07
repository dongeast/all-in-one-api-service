/**
 * Stable Diffusion 系列共用参数
 */

const imageCommon = require('../../../common/image-common')

module.exports = {
  input: {
    ...imageCommon.input,

    stylePreset: {
      type: 'enum',
      required: false,
      description: '风格预设',
      options: [
        '3d-model', 'analog-film', 'anime', 'cinematic', 'comic-book',
        'digital-art', 'enhance', 'fantasy-art', 'isometric', 'line-art',
        'low-poly', 'modeling-compound', 'neon-punk', 'origami',
        'photographic', 'pixel-art', 'tile-texture'
      ]
    },

    cfgScale: {
      type: 'number',
      required: false,
      description: 'CFG Scale（提示词相关性）',
      min: 0,
      max: 35,
      default: 7
    },

    clipGuidancePreset: {
      type: 'enum',
      required: false,
      description: 'CLIP引导预设',
      options: ['NONE', 'FAST_BLUE', 'FAST_GREEN', 'SIMPLE', 'SLOW', 'SLOWER', 'SLOWEST']
    },

    sampler: {
      type: 'enum',
      required: false,
      description: '采样器',
      options: [
        'DDIM', 'DDPM', 'K_DPMPP_2M', 'K_DPMPP_2S_ANCESTRAL',
        'K_DPM_2', 'K_DPM_2_ANCESTRAL', 'K_EULER', 'K_EULER_ANCESTRAL',
        'K_HEUN', 'K_LMS'
      ]
    },

    steps: {
      type: 'number',
      required: false,
      description: '采样步数',
      min: 10,
      max: 150,
      integer: true,
      default: 30
    }
  },

  output: {
    ...imageCommon.output,

    artifacts: {
      type: 'array',
      description: '生成的图像列表',
      path: 'artifacts',
      itemSchema: {
        fields: {
          base64: { path: 'base64' },
          seed: { path: 'seed' },
          finishReason: { path: 'finishReason' }
        }
      }
    }
  }
}
