/**
 * 视频类共用参数
 */

const { textPrompt, seed } = require('../templates')

module.exports = {
  input: {
    prompt: {
      ...textPrompt.prompt,
      description: 'Video generation prompt',
      maxLength: 2000
    },

    seed: seed.seed,

    duration: {
      type: 'number',
      required: false,
      description: 'Video duration (seconds)',
      min: 1,
      max: 60,
      default: 5
    },

    fps: {
      type: 'number',
      required: false,
      description: 'Frame rate',
      min: 1,
      max: 60,
      integer: true,
      default: 24
    },

    width: {
      type: 'number',
      required: false,
      description: 'Video width',
      min: 256,
      max: 2048,
      integer: true
    },

    height: {
      type: 'number',
      required: false,
      description: 'Video height',
      min: 256,
      max: 2048,
      integer: true
    }
  },

  output: {
    videoUrl: {
      type: 'string',
      description: 'Video URL',
      path: 'data.url'
    },

    videoId: {
      type: 'string',
      description: 'Video ID',
      path: 'data.id'
    },

    duration: {
      type: 'number',
      description: 'Video duration (seconds)',
      path: 'data.duration'
    },

    created: {
      type: 'number',
      description: 'Creation timestamp',
      path: 'created'
    }
  }
}
