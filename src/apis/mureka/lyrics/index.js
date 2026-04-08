/**
 * Lyrics API 入口
 */

const GenerateLyrics = require('./generate-lyrics')
const ExtendLyrics = require('./extend-lyrics')

class Lyrics {
  /**
   * 创建Lyrics API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    this.generate = new GenerateLyrics(service)
    this.extend = new ExtendLyrics(service)
  }
}

module.exports = Lyrics
