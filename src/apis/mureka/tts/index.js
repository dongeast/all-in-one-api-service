/**
 * TTS API 入口
 */

const CreateSpeech = require('./create-speech')
const CreatePodcast = require('./create-podcast')

class TTS {
  /**
   * 创建TTS API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    this.createSpeech = new CreateSpeech(service)
    this.createPodcast = new CreatePodcast(service)
  }
}

module.exports = TTS
