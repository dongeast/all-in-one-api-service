/**
 * Mureka 模型元数据定义
 */

const { Series } = require('../../constants')

const Models = {
  AUTO: 'auto',
  MUREKA_8: 'mureka-8',
  MUREKA_O2: 'mureka-o2',
  MUREKA_7_6: 'mureka-7.6',
  MUREKA_7_5: 'mureka-7.5',
  MUREKA_TTS: 'mureka-tts',
  MUREKA_VOCAL_CLONING: 'mureka-vocal-cloning'
}

const ModelsMeta = {
  [Models.AUTO]: {
    logo: '',
    series: Series.MUREKA,
    priority: 100,
  },
  [Models.MUREKA_8]: {
    logo: '',
    series: Series.MUREKA,
    priority: 100,
  },
  [Models.MUREKA_O2]: {
    logo: '',
    series: Series.MUREKA,
    priority: 95,
  },
  [Models.MUREKA_7_6]: {
    logo: '',
    series: Series.MUREKA,
    priority: 90,
  },
  [Models.MUREKA_7_5]: {
    logo: '',
    series: Series.MUREKA,
    priority: 85,
  },
  [Models.MUREKA_TTS]: {
    logo: '',
    series: Series.MUREKA,
    priority: 100,
  },
  [Models.MUREKA_VOCAL_CLONING]: {
    logo: '',
    series: Series.MUREKA,
    priority: 100,
  }
}

module.exports = {
  Models,
  ModelsMeta
}
