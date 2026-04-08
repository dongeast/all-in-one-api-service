/**
 * 火山引擎模型能力定义
 * 定义每个模型支持的参数组合和约束
 */

module.exports = {
  'doubao-seedream-5.0-lite': {
    aspectRatios: ['1:1', '16:9', '9:16', '4:3', '3:4', '21:9'],
    
    compositeConstraints: [
      {
        name: 'totalPixels',
        description: '总像素范围约束',
        expression: 'width * height',
        params: ['width', 'height'],
        validate: {
          min: 3686400,
          max: 10404496
        },
        message: '总像素必须在 {min} 到 {max} 之间，当前为 {value}'
      },
      {
        name: 'aspectRatio',
        description: '宽高比范围约束',
        expression: 'width / height',
        params: ['width', 'height'],
        validate: {
          min: 0.0625,
          max: 16
        },
        message: '宽高比必须在 {min} 到 {max} 之间，当前为 {value}'
      }
    ],
    
    recommendedSizes: [
      { resolution: '2K', aspectRatio: '1:1', size: '2048x2048', pixels: 4194304 },
      { resolution: '2K', aspectRatio: '16:9', size: '2848x1600', pixels: 4556800 },
      { resolution: '2K', aspectRatio: '9:16', size: '1600x2848', pixels: 4556800 },
      { resolution: '3K', aspectRatio: '1:1', size: '3072x3072', pixels: 9437184 }
    ],
    
    features: {
      sequentialImageGeneration: true,
      multiImageFusion: true,
      webSearchIntegration: true,
      outputFormats: ['png', 'jpeg'],
      resolutions: ['2K', '3K']
    }
  },

  'doubao-seedream-4.5': {
    aspectRatios: ['1:1', '16:9', '9:16', '4:3', '3:4', '21:9'],
    
    compositeConstraints: [
      {
        name: 'totalPixels',
        description: '总像素范围约束',
        expression: 'width * height',
        params: ['width', 'height'],
        validate: {
          min: 3686400,
          max: 16777216
        },
        message: '总像素必须在 {min} 到 {max} 之间，当前为 {value}'
      },
      {
        name: 'aspectRatio',
        description: '宽高比范围约束',
        expression: 'width / height',
        params: ['width', 'height'],
        validate: {
          min: 0.0625,
          max: 16
        },
        message: '宽高比必须在 {min} 到 {max} 之间，当前为 {value}'
      }
    ],
    
    recommendedSizes: [
      { resolution: '2K', aspectRatio: '1:1', size: '2048x2048', pixels: 4194304 },
      { resolution: '2K', aspectRatio: '16:9', size: '2848x1600', pixels: 4556800 },
      { resolution: '2K', aspectRatio: '9:16', size: '1600x2848', pixels: 4556800 },
      { resolution: '4K', aspectRatio: '1:1', size: '4096x4096', pixels: 16777216 },
      { resolution: '4K', aspectRatio: '16:9', size: '5504x3040', pixels: 16732160 },
      { resolution: '4K', aspectRatio: '9:16', size: '3040x5504', pixels: 16732160 }
    ],
    
    features: {
      sequentialImageGeneration: true,
      multiImageFusion: true,
      resolutions: ['2K', '4K']
    }
  },

  'doubao-seedream-4.0': {
    aspectRatios: ['1:1', '16:9', '9:16', '4:3', '3:4', '21:9'],
    
    compositeConstraints: [
      {
        name: 'totalPixels',
        description: '总像素范围约束',
        expression: 'width * height',
        params: ['width', 'height'],
        validate: {
          min: 921600,
          max: 16777216
        },
        message: '总像素必须在 {min} 到 {max} 之间，当前为 {value}'
      },
      {
        name: 'aspectRatio',
        description: '宽高比范围约束',
        expression: 'width / height',
        params: ['width', 'height'],
        validate: {
          min: 0.0625,
          max: 16
        },
        message: '宽高比必须在 {min} 到 {max} 之间，当前为 {value}'
      }
    ],
    
    recommendedSizes: [
      { resolution: '1K', aspectRatio: '1:1', size: '1024x1024', pixels: 1048576 },
      { resolution: '1K', aspectRatio: '16:9', size: '1280x720', pixels: 921600 },
      { resolution: '1K', aspectRatio: '9:16', size: '720x1280', pixels: 921600 },
      { resolution: '2K', aspectRatio: '1:1', size: '2048x2048', pixels: 4194304 },
      { resolution: '2K', aspectRatio: '16:9', size: '2848x1600', pixels: 4556800 },
      { resolution: '2K', aspectRatio: '9:16', size: '1600x2848', pixels: 4556800 },
      { resolution: '4K', aspectRatio: '1:1', size: '4096x4096', pixels: 16777216 },
      { resolution: '4K', aspectRatio: '16:9', size: '5504x3040', pixels: 16732160 },
      { resolution: '4K', aspectRatio: '9:16', size: '3040x5504', pixels: 16732160 }
    ],
    
    features: {
      sequentialImageGeneration: true,
      multiImageFusion: true,
      resolutions: ['1K', '2K', '4K']
    }
  },

  'doubao-seedream-3.0-t2i': {
    aspectRatios: ['1:1', '16:9', '9:16', '4:3', '3:4'],
    
    sizeRange: {
      min: 512,
      max: 2048
    },
    
    recommendedSizes: [
      { resolution: '1K', aspectRatio: '1:1', size: '1024x1024' },
      { resolution: '1K', aspectRatio: '16:9', size: '1280x720' },
      { resolution: '1K', aspectRatio: '9:16', size: '720x1280' },
      { resolution: '2K', aspectRatio: '1:1', size: '2048x2048' }
    ],
    
    features: {
      textToImage: true,
      resolutions: ['512x512', '2048x2048']
    }
  },

  'doubao-seedance-2-0': {
    aspectRatios: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9', 'adaptive'],
    resolutions: ['480p', '720p', '1080p'],
    
    durationRange: {
      min: 4,
      max: 15,
      auto: -1
    },
    
    features: {
      multiModalReference: true,
      firstToLastFrameControl: true,
      audioGeneration: true,
      webSearchIntegration: true
    }
  },

  'doubao-seedance-2-0-fast': {
    aspectRatios: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9', 'adaptive'],
    resolutions: ['480p', '720p', '1080p'],
    
    durationRange: {
      min: 4,
      max: 15,
      auto: -1
    },
    
    features: {
      multiModalReference: true,
      firstToLastFrameControl: true,
      audioGeneration: true,
      webSearchIntegration: true,
      fastGeneration: true
    }
  },

  'doubao-seedance-1-5-pro': {
    aspectRatios: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9'],
    resolutions: ['480p', '720p', '1080p'],
    
    durationRange: {
      min: 4,
      max: 12,
      auto: -1
    },
    
    features: {
      firstToLastFrameControl: true,
      audioGeneration: true,
      draftMode: true
    }
  },

  'doubao-seedance-1-0-pro': {
    aspectRatios: ['16:9', '4:3', '1:1', '3:4', '9:16'],
    resolutions: ['480p', '720p', '1080p'],
    
    durationRange: {
      min: 2,
      max: 12
    },
    
    features: {
      firstToLastFrameControl: true
    }
  },

  'doubao-seedance-1-0-pro-fast': {
    aspectRatios: ['16:9', '4:3', '1:1', '3:4', '9:16'],
    resolutions: ['480p', '720p', '1080p'],
    
    durationRange: {
      min: 2,
      max: 12
    },
    
    features: {
      firstToLastFrameControl: true,
      fastGeneration: true
    }
  },

  'doubao-seedance-1-0-lite': {
    aspectRatios: ['16:9', '4:3', '1:1', '3:4', '9:16'],
    resolutions: ['480p', '720p'],
    
    durationRange: {
      min: 2,
      max: 12
    },
    
    features: {
      textToVideo: true,
      imageToVideo: true,
      referenceImageFusion: true,
      maxReferenceImages: 4
    }
  },

  'doubao-seed3d-1-0-250928': {
    features: {
      imageTo3D: true,
      outputFormats: ['glb', 'obj', 'usd', 'usdz'],
      subdivisionLevels: {
        low: 30000,
        medium: 100000,
        high: 200000
      }
    },
    
    inputConstraints: {
      maxImageSize: 10485760,
      maxImageResolution: '4096x4096',
      supportedFormats: ['jpg', 'jpeg', 'png', 'webp', 'bmp']
    }
  }
}
