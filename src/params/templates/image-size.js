/**
 * 图像尺寸模板
 */

module.exports = {
  imageSize: {
    type: 'enum',
    required: false,
    description: '图像尺寸',
    options: ['256x256', '512x512', '1024x1024', '1792x1024', '1024x1792'],
    default: '1024x1024'
  }
}
