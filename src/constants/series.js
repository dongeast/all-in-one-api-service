/**
 * 模型系列常量定义
 */

const Series = {
  LTX: 'ltx',
  SKYREELS: 'skyreels',
  MUREKA: 'mureka',
  SEEDANCE: 'seedance',
  SEEDREAM: 'seedream',
  SEED3D: 'seed3d',
  VIDU: 'vidu'
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
  },
  [Series.VIDU]: {
    name: 'vidu',
    displayName: 'Vidu',
    description: 'Vidu video generation model series',
    provider: 'vidu',
    mediaType: 'video',
    logo: 'vidu.svg'
  }
}

module.exports = {
  Series,
  SeriesMeta
}
