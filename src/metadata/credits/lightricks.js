/**
 * Lightricks (LTX) 积分配置
 * 统一的积分配置管理
 */

const { CreditCalculationType } = require('../../credits/credit-registry')

module.exports = {
  /**
   * 模型积分倍率
   * 基于模型版本和质量等级设定
   */
  modelMultipliers: {
    'ltx-2-3-pro': 3,
    'ltx-2-3-fast': 2,
    'ltx-2-pro': 2.5,
    'ltx-2-fast': 1
  },

  /**
   * API 积分配置
   * 基于功能类型和时长计算
   */
  apiCredits: {
    'lightricks-v1-text-to-video': {
      type: CreditCalculationType.FORMULA,
      baseCost: 10,
      factors: [
        {
          name: 'model',
          multipliers: 'modelMultipliers'
        },
        {
          name: 'duration',
          formula: 'duration * 2'
        }
      ],
      minCost: 10,
      maxCost: 50
    },

    'lightricks-v1-image-to-video': {
      type: CreditCalculationType.FORMULA,
      baseCost: 10,
      factors: [
        {
          name: 'model',
          multipliers: 'modelMultipliers'
        },
        {
          name: 'duration',
          formula: 'duration * 2'
        }
      ],
      minCost: 10,
      maxCost: 60
    },

    'lightricks-v1-audio-to-video': {
      type: CreditCalculationType.FORMULA,
      baseCost: 15,
      factors: [
        {
          name: 'model',
          multipliers: 'modelMultipliers'
        },
        {
          name: 'duration',
          formula: 'duration * 2'
        }
      ],
      minCost: 15,
      maxCost: 80
    },

    'lightricks-v1-extend': {
      type: CreditCalculationType.FORMULA,
      baseCost: 6,
      factors: [
        {
          name: 'model',
          multipliers: 'modelMultipliers'
        },
        {
          name: 'duration',
          formula: 'duration * 2'
        }
      ],
      minCost: 6,
      maxCost: 40
    },

    'lightricks-v1-retake': {
      type: CreditCalculationType.FORMULA,
      baseCost: 5,
      factors: [
        {
          name: 'model',
          multipliers: 'modelMultipliers'
        },
        {
          name: 'duration',
          formula: 'duration * 2'
        }
      ],
      minCost: 5,
      maxCost: 30
    }
  },

  /**
   * 默认积分配置
   */
  defaults: {
    textToVideo: 10,
    imageToVideo: 10,
    audioToVideo: 15,
    videoExtension: 6,
    videoEditing: 5
  }
}
