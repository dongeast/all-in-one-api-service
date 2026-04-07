/**
 * Stability AI 图像参数入口
 */

const sdCommon = require('./sd-common')
const stableDiffusionXL = require('./stable-diffusion-xl')
const stableImageCore = require('./stable-image-core')

module.exports = {
  sdCommon,
  stableDiffusionXL,
  stableImageCore
}
