/**
 * Vidu 模型元数据定义
 */

const { Series } = require('../../constants')

const Models = {
  VIDUQ3_MIX: 'viduq3-mix',
  VIDUQ3: 'viduq3',
  VIDUQ3_TURBO: 'viduq3-turbo',
  VIDUQ3_PRO: 'viduq3-pro',
  VIDUQ3_PRO_FAST: 'viduq3-pro-fast',
  VIDUQ2_PRO: 'viduq2-pro',
  VIDUQ2_PRO_FAST: 'viduq2-pro-fast',
  VIDUQ2_TURBO: 'viduq2-turbo',
  VIDUQ2: 'viduq2',
  VIDUQ1: 'viduq1',
  VIDUQ1_CLASSIC: 'viduq1-classic',
  VIDU_2_0: 'vidu2.0',
  VIDU_TEMPLATE: 'vidu-template',
  VIDU_STORY_TEMPLATE: 'vidu-story-template'
}

const ModelsMeta = {
  [Models.VIDUQ3_MIX]: {
    logo: '',
    series: Series.VIDU,
    priority: 100,
  },
  [Models.VIDUQ3]: {
    logo: '',
    series: Series.VIDU,
    priority: 99,
  },
  [Models.VIDUQ3_TURBO]: {
    logo: '',
    series: Series.VIDU,
    priority: 98,
  },
  [Models.VIDUQ3_PRO]: {
    logo: '',
    series: Series.VIDU,
    priority: 97,
  },
  [Models.VIDUQ3_PRO_FAST]: {
    logo: '',
    series: Series.VIDU,
    priority: 96,
  },
  [Models.VIDUQ2_PRO]: {
    logo: '',
    series: Series.VIDU,
    priority: 95,
  },
  [Models.VIDUQ2_PRO_FAST]: {
    logo: '',
    series: Series.VIDU,
    priority: 94,
  },
  [Models.VIDUQ2_TURBO]: {
    logo: '',
    series: Series.VIDU,
    priority: 93,
  },
  [Models.VIDUQ2]: {
    logo: '',
    series: Series.VIDU,
    priority: 92,
  },
  [Models.VIDUQ1]: {
    logo: '',
    series: Series.VIDU,
    priority: 90,
  },
  [Models.VIDUQ1_CLASSIC]: {
    logo: '',
    series: Series.VIDU,
    priority: 89,
  },
  [Models.VIDU_2_0]: {
    logo: '',
    series: Series.VIDU,
    priority: 85,
  },
  [Models.VIDU_TEMPLATE]: {
    logo: '',
    series: Series.VIDU,
    priority: 80,
  },
  [Models.VIDU_STORY_TEMPLATE]: {
    logo: '',
    series: Series.VIDU,
    priority: 80,
  }
}

module.exports = {
  Models,
  ModelsMeta
}
