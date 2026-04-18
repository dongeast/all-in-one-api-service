/**
 * 火山引擎模型元数据定义
 */

const { Series } = require('../../constants')

const Models = {
  DOUBAO_SEEDREAM_5_0_260128: 'doubao-seedream-5-0-260128',
  DOUBAO_SEEDREAM_4_5_251128: 'doubao-seedream-4-5-251128',
  DOUBAO_SEEDREAM_4_0_250828: 'doubao-seedream-4-0-250828',
  DOUBAO_SEEDREAM_3_0_T2I_250415: 'doubao-seedream-3-0-t2i-250415',
  DOUBAO_SEEDANCE_2_0_260128: 'doubao-seedance-2-0-260128',
  DOUBAO_SEEDANCE_2_0_FAST_260128: 'doubao-seedance-2-0-fast-260128',
  DOUBAO_SEEDANCE_1_5_PRO_251215: 'doubao-seedance-1-5-pro-251215',
  DOUBAO_SEEDANCE_1_0_PRO_250528: 'doubao-seedance-1-0-pro-250528',
  DOUBAO_SEEDANCE_1_0_PRO_FAST_251015: 'doubao-seedance-1-0-pro-fast-251015',
  DOUBAO_SEEDANCE_1_0_LITE_T2V_250428: 'doubao-seedance-1-0-lite-t2v-250428',
  DOUBAO_SEED3D_1_0_250928: 'doubao-seed3d-1-0-250928'
}

const ModelsMeta = {
  [Models.DOUBAO_SEEDREAM_5_0_260128]: {
    logo: '',
    series: Series.SEEDREAM,
    priority: 100,
  },
  [Models.DOUBAO_SEEDREAM_4_5_251128]: {
    logo: '',
    series: Series.SEEDREAM,
    priority: 95,
  },
  [Models.DOUBAO_SEEDREAM_4_0_250828]: {
    logo: '',
    series: Series.SEEDREAM,
    priority: 90,
  },
  [Models.DOUBAO_SEEDREAM_3_0_T2I_250415]: {
    logo: '',
    series: Series.SEEDREAM,
    priority: 85,
  },
  [Models.DOUBAO_SEEDANCE_2_0_260128]: {
    logo: '',
    series: Series.SEEDANCE,
    priority: 100,
  },
  [Models.DOUBAO_SEEDANCE_2_0_FAST_260128]: {
    logo: '',
    series: Series.SEEDANCE,
    priority: 95,
  },
  [Models.DOUBAO_SEEDANCE_1_5_PRO_251215]: {
    logo: '',
    series: Series.SEEDANCE,
    priority: 90,
  },
  [Models.DOUBAO_SEEDANCE_1_0_PRO_250528]: {
    logo: '',
    series: Series.SEEDANCE,
    priority: 85,
  },
  [Models.DOUBAO_SEEDANCE_1_0_PRO_FAST_251015]: {
    logo: '',
    series: Series.SEEDANCE,
    priority: 80,
  },
  [Models.DOUBAO_SEEDANCE_1_0_LITE_T2V_250428]: {
    logo: '',
    series: Series.SEEDANCE,
    priority: 75,
  },
  [Models.DOUBAO_SEED3D_1_0_250928]: {
    logo: '',
    series: Series.SEED3D,
    priority: 100,
  }
}

module.exports = {
  Models,
  ModelsMeta
}
