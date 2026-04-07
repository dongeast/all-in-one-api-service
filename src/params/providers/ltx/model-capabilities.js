/**
 * LTX 模型能力定义
 * 定义每个模型支持的参数组合和约束
 */

module.exports = {
  'ltx-2-3-fast': {
    aspectRatios: ['16:9', '9:16'],
    resolutions: {
      '1080p': {
        landscape: '1920x1080',
        portrait: '1080x1920',
        fps: {
          24: { duration: { min: 6, max: 20, step: 2 } },
          25: { duration: { min: 6, max: 20, step: 2 } },
          48: { duration: { min: 6, max: 10, step: 2 } },
          50: { duration: { min: 6, max: 10, step: 2 } }
        }
      },
      '1440p': {
        landscape: '2560x1440',
        portrait: '1440x2560',
        fps: {
          24: { duration: { min: 6, max: 10, step: 2 } },
          25: { duration: { min: 6, max: 10, step: 2 } },
          48: { duration: { min: 6, max: 10, step: 2 } },
          50: { duration: { min: 6, max: 10, step: 2 } }
        }
      },
      '4K': {
        landscape: '3840x2160',
        portrait: '2160x3840',
        fps: {
          24: { duration: { min: 6, max: 10, step: 2 } },
          25: { duration: { min: 6, max: 10, step: 2 } },
          48: { duration: { min: 6, max: 10, step: 2 } },
          50: { duration: { min: 6, max: 10, step: 2 } }
        }
      }
    },
    endpoints: ['text-to-video', 'image-to-video']
  },

  'ltx-2-3-pro': {
    aspectRatios: ['16:9', '9:16'],
    resolutions: {
      '1080p': {
        landscape: '1920x1080',
        portrait: '1080x1920',
        fps: {
          24: { duration: { min: 6, max: 10, step: 2 } },
          25: { duration: { min: 6, max: 10, step: 2 } },
          48: { duration: { min: 6, max: 10, step: 2 } },
          50: { duration: { min: 6, max: 10, step: 2 } }
        }
      },
      '1440p': {
        landscape: '2560x1440',
        portrait: '1440x2560',
        fps: {
          24: { duration: { min: 6, max: 10, step: 2 } },
          25: { duration: { min: 6, max: 10, step: 2 } },
          48: { duration: { min: 6, max: 10, step: 2 } },
          50: { duration: { min: 6, max: 10, step: 2 } }
        }
      },
      '4K': {
        landscape: '3840x2160',
        portrait: '2160x3840',
        fps: {
          24: { duration: { min: 6, max: 10, step: 2 } },
          25: { duration: { min: 6, max: 10, step: 2 } },
          48: { duration: { min: 6, max: 10, step: 2 } },
          50: { duration: { min: 6, max: 10, step: 2 } }
        }
      }
    },
    endpoints: ['text-to-video', 'image-to-video', 'audio-to-video', 'retake', 'extend']
  },

  'ltx-2-fast': {
    aspectRatios: ['16:9'],
    resolutions: {
      '1080p': {
        landscape: '1920x1080',
        portrait: null,
        fps: {
          25: { duration: { min: 6, max: 20, step: 2 } },
          50: { duration: { min: 6, max: 10, step: 2 } }
        }
      },
      '1440p': {
        landscape: '2560x1440',
        portrait: null,
        fps: {
          25: { duration: { min: 6, max: 10, step: 2 } },
          50: { duration: { min: 6, max: 10, step: 2 } }
        }
      },
      '4K': {
        landscape: '3840x2160',
        portrait: null,
        fps: {
          25: { duration: { min: 6, max: 10, step: 2 } },
          50: { duration: { min: 6, max: 10, step: 2 } }
        }
      }
    },
    endpoints: ['text-to-video', 'image-to-video']
  },

  'ltx-2-pro': {
    aspectRatios: ['16:9'],
    resolutions: {
      '1080p': {
        landscape: '1920x1080',
        portrait: null,
        fps: {
          25: { duration: { min: 6, max: 10, step: 2 } },
          50: { duration: { min: 6, max: 10, step: 2 } }
        }
      },
      '1440p': {
        landscape: '2560x1440',
        portrait: null,
        fps: {
          25: { duration: { min: 6, max: 10, step: 2 } },
          50: { duration: { min: 6, max: 10, step: 2 } }
        }
      },
      '4K': {
        landscape: '3840x2160',
        portrait: null,
        fps: {
          25: { duration: { min: 6, max: 10, step: 2 } },
          50: { duration: { min: 6, max: 10, step: 2 } }
        }
      }
    },
    endpoints: ['text-to-video', 'image-to-video', 'audio-to-video', 'retake', 'extend']
  }
}
