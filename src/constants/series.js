/**
 * 模型系列常量定义
 */

const Series = {
  LTX: 'ltx',
  SKYREELS: 'skyreels',
  MUREKA: 'mureka',
  SEEDANCE: 'seedance',
  SEEDREAM: 'seedream',
  SEED3D: 'seed3d'
}

const SeriesMeta = {
  [Series.LTX]: {
    name: 'ltx',
    displayName: 'LTX',
    description: 'LTX 视频生成模型系列',
    provider: 'ltx',
    mediaType: 'video'
  },
  [Series.SKYREELS]: {
    name: 'skyreels',
    displayName: 'Skyreels',
    description: 'Skyreels 视频生成模型系列',
    provider: 'skyreels',
    mediaType: 'video'
  },
  [Series.MUREKA]: {
    name: 'mureka',
    displayName: 'Mureka',
    description: 'Mureka 音乐生成模型系列',
    provider: 'mureka',
    mediaType: 'audio'
  },
  [Series.SEEDANCE]: {
    name: 'seedance',
    displayName: 'Seedance',
    description: '火山引擎视频生成模型系列',
    provider: 'volcengine',
    mediaType: 'video'
  },
  [Series.SEEDREAM]: {
    name: 'seedream',
    displayName: 'Seedream',
    description: '火山引擎图像生成模型系列',
    provider: 'volcengine',
    mediaType: 'image'
  },
  [Series.SEED3D]: {
    name: 'seed3d',
    displayName: 'Seed3D',
    description: '火山引擎3D模型生成系列',
    provider: 'volcengine',
    mediaType: '3d'
  }
}

module.exports = {
  Series,
  SeriesMeta
}
