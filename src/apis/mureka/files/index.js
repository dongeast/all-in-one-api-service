/**
 * Files API 入口
 */

const UploadFile = require('./upload-file')

class Files {
  /**
   * 创建Files API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    this.upload = new UploadFile(service)
  }
}

module.exports = Files
