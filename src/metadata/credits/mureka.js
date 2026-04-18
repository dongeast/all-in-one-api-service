/**
 * Mureka 积分配置
 * 统一的积分配置管理
 */

const { CreditCalculationType } = require('../../credits/credit-registry')

module.exports = {
  modelMultipliers: {
    'mureka-8': 1.0,
    'mureka-o2': 0.9,
    'mureka-7.6': 0.85,
    'mureka-7.5': 0.8,
    'auto': 1.0,
    'mureka-song-v1': 1.0,
    'mureka-instrumental-v1': 0.8,
    'mureka-tts-v1': 0.5,
    'mureka-vocal-cloning': 0.6
  },

  apiCredits: {
    'mureka-song-generate': {
      type: CreditCalculationType.FORMULA,
      baseCost: 10,
      factors: [
        {
          name: 'model',
          multipliers: 'modelMultipliers'
        },
        {
          name: 'duration',
          formula: 'duration * 0.5'
        }
      ],
      minCost: 5,
      maxCost: 100
    },

    'mureka-song-extend': {
      type: CreditCalculationType.FORMULA,
      baseCost: 8,
      factors: [
        {
          name: 'model',
          multipliers: 'modelMultipliers'
        },
        {
          name: 'duration',
          formula: 'duration * 0.4'
        }
      ],
      minCost: 4,
      maxCost: 80
    },

    'mureka-lyrics-generate': {
      type: CreditCalculationType.FIXED,
      baseCost: 3
    },

    'mureka-lyrics-extend': {
      type: CreditCalculationType.FIXED,
      baseCost: 2
    },

    'mureka-instrumental-generate': {
      type: CreditCalculationType.FORMULA,
      baseCost: 8,
      factors: [
        {
          name: 'model',
          multipliers: 'modelMultipliers'
        },
        {
          name: 'duration',
          formula: 'duration * 0.3'
        }
      ],
      minCost: 4,
      maxCost: 60
    },

    'mureka-tts-speech': {
      type: CreditCalculationType.FORMULA,
      baseCost: 2,
      factors: [
        {
          name: 'duration',
          formula: 'duration * 0.1'
        }
      ],
      minCost: 1,
      maxCost: 20
    },

    'mureka-tts-podcast': {
      type: CreditCalculationType.FORMULA,
      baseCost: 5,
      factors: [
        {
          name: 'duration',
          formula: 'duration * 0.2'
        }
      ],
      minCost: 3,
      maxCost: 50
    },

    'mureka-vocal-cloning': {
      type: CreditCalculationType.FIXED,
      baseCost: 6
    },

    'mureka-song-describe': {
      type: CreditCalculationType.FIXED,
      baseCost: 1
    },

    'mureka-song-recognize': {
      type: CreditCalculationType.FIXED,
      baseCost: 2
    },

    'mureka-song-stem': {
      type: CreditCalculationType.FIXED,
      baseCost: 4
    },

    'mureka-files-upload': {
      type: CreditCalculationType.FIXED,
      baseCost: 0
    },

    'mureka-upload-create': {
      type: CreditCalculationType.FIXED,
      baseCost: 0
    },

    'mureka-upload-part': {
      type: CreditCalculationType.FIXED,
      baseCost: 0
    },

    'mureka-upload-complete': {
      type: CreditCalculationType.FIXED,
      baseCost: 0
    }
  },

  defaults: {
    songGeneration: 10,
    instrumentalGeneration: 8,
    textToSpeech: 2
  }
}
