/**
 * LTX 模型元数据定义
 */

const { Series } = require('../../constants')

const Models = {
  LTX_2_3_PRO: 'ltx-2-3-pro',
  LTX_2_3_FAST: 'ltx-2-3-fast',
  LTX_2_PRO: 'ltx-2-pro',
  LTX_2_FAST: 'ltx-2-fast'
}

const ModelsMeta = {
  [Models.LTX_2_3_PRO]: {
    logo: '',
    series: Series.LTX,
    priority: 100,
  },
  [Models.LTX_2_3_FAST]: {
    logo: '',
    series: Series.LTX,
    priority: 95,
  },
  [Models.LTX_2_PRO]: {
    logo: '',
    series: Series.LTX,
    priority: 90,
  },
  [Models.LTX_2_FAST]: {
    logo: '',
    series: Series.LTX,
    priority: 85,
  }
}

module.exports = {
  Models,
  ModelsMeta
}
