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
    description: 'LTX video generation model series',
    provider: 'ltx',
    mediaType: 'video'
  },
  [Series.SKYREELS]: {
    name: 'skyreels',
    displayName: 'Skyreels',
    description: 'Skyreels video generation model series',
    provider: 'skyreels',
    mediaType: 'video'
  },
  [Series.MUREKA]: {
    name: 'mureka',
    displayName: 'Mureka',
    description: 'Mureka music generation model series',
    provider: 'mureka',
    mediaType: 'audio'
  },
  [Series.SEEDANCE]: {
    name: 'seedance',
    displayName: 'Seedance',
    description: 'Volcengine video generation model series',
    provider: 'volcengine',
    mediaType: 'video'
  },
  [Series.SEEDREAM]: {
    name: 'seedream',
    displayName: 'Seedream',
    description: 'Volcengine image generation model series',
    provider: 'volcengine',
    mediaType: 'image'
  },
  [Series.SEED3D]: {
    name: 'seed3d',
    displayName: 'Seed3D',
    description: 'Volcengine 3D model generation series',
    provider: 'volcengine',
    mediaType: '3d'
  }
}

module.exports = {
  Series,
  SeriesMeta
}
