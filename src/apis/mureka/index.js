/**
 * Mureka API 入口
 */

const Upload = require('./upload')
const Files = require('./files')
const Lyrics = require('./lyrics')
const Song = require('./song')
const Vocal = require('./vocal')
const Instrumental = require('./instrumental')
const TTS = require('./tts')

/**
 * Mureka API类
 */
class MurekaAPI {
  /**
   * 创建Mureka API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    this.upload = new Upload(service)
    this.files = new Files(service)
    this.lyrics = new Lyrics(service)
    this.song = new Song(service)
    this.vocal = new Vocal(service)
    this.instrumental = new Instrumental(service)
    this.tts = new TTS(service)
  }
}

module.exports = MurekaAPI
