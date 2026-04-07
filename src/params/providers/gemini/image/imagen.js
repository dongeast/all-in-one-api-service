/**
 * Imagen 参数模式
 */

const imageCommon = require('../../../common/image-common')

module.exports = {
  input: {
    ...imageCommon.input,

    sampleCount: {
      type: 'number',
      required: false,
      description: '生成图像数量',
      min: 1,
      max: 8,
      integer: true,
      default: 1
    },

    aspectRatio: {
      type: 'enum',
      required: false,
      description: '宽高比',
      options: ['1:1', '3:4', '4:3', '9:16', '16:9'],
      default: '1:1'
    },

    safetyFilterLevel: {
      type: 'enum',
      required: false,
      description: '安全过滤级别',
      options: ['block_low_and_above', 'block_medium_and_above', 'block_high', 'block_none'],
      default: 'block_medium_and_above'
    }
  },

  output: {
    images: {
      type: 'array',
      description: '生成的图像列表',
      path: 'predictions',
      itemSchema: {
        fields: {
          bytesBase64Encoded: { path: 'bytesBase64Encoded' },
          mimeType: { path: 'mimeType' }
        }
      }
    }
  }
}
