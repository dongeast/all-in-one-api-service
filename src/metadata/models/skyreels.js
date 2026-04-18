/**
 * Skyreels 模型元数据定义
 */

const { Series } = require('../../constants')

const Models = {
  SKYREELS_V4: 'skyreels-v4',
  SKYREELS_V3: 'skyreels-v3',
  SKYREELS_AVATAR: 'skyreels-avatar'
}

const ModelsMeta = {
  [Models.SKYREELS_V4]: {
    logo: '',
    series: Series.SKYREELS,
    priority: 100,
  },
  [Models.SKYREELS_V3]: {
    logo: '',
    series: Series.SKYREELS,
    priority: 95,
  },
  [Models.SKYREELS_AVATAR]: {
    logo: '',
    series: Series.SKYREELS,
    priority: 100,
  }
}

module.exports = {
  Models,
  ModelsMeta
}
