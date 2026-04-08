/**
 * Song API 入口
 */

const GenerateSong = require('./generate-song')
const QueryTask = require('./query-task')
const ExtendSong = require('./extend-song')
const RecognizeSong = require('./recognize-song')
const DescribeSong = require('./describe-song')
const StemSong = require('./stem-song')

class Song {
  /**
   * 创建Song API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    this.generate = new GenerateSong(service)
    this.query = new QueryTask(service)
    this.extend = new ExtendSong(service)
    this.recognize = new RecognizeSong(service)
    this.describe = new DescribeSong(service)
    this.stem = new StemSong(service)
  }
}

module.exports = Song
