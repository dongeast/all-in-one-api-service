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
    provider: 'lightricks',
    mediaType: 'video',
    logo: 'ltx.svg'
  },
  [Series.SKYREELS]: {
    name: 'skyreels',
    displayName: 'Skyreels',
    description: 'Skyreels video generation model series',
    provider: 'skywork',
    mediaType: 'video',
    logo: 'skyreels.svg'
  },
  [Series.MUREKA]: {
    name: 'mureka',
    displayName: 'Mureka',
    description: 'Mureka music generation model series',
    provider: 'skywork',
    mediaType: 'audio',
    logo: 'mureka.svg'
  },
  [Series.SEEDANCE]: {
    name: 'seedance',
    displayName: 'Seedance',
    description: 'Volcengine video generation model series',
    provider: 'volcengine',
    mediaType: 'video',
    logo: 'seedance.svg'
  },
  [Series.SEEDREAM]: {
    name: 'seedream',
    displayName: 'Seedream',
    description: 'Volcengine image generation model series',
    provider: 'volcengine',
    mediaType: 'image',
    logo: 'seedream.svg'
  },
  [Series.SEED3D]: {
    name: 'seed3d',
    displayName: 'Seed3D',
    description: 'Volcengine 3D model generation series',
    provider: 'volcengine',
    mediaType: '3d',
    logo: 'seed3d.svg'
  }
}

module.exports = {
  Series,
  SeriesMeta
}
