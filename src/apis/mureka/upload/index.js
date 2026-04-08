/**
 * Upload API 入口
 */

const CreateUpload = require('./create-upload')
const AddUploadPart = require('./add-upload-part')
const CompleteUpload = require('./complete-upload')

/**
 * Upload API类
 */
class Upload {
  /**
   * 创建Upload API实例
   * @param {object} service - Mureka服务实例
   */
  constructor(service) {
    this.create = new CreateUpload(service)
    this.addPart = new AddUploadPart(service)
    this.complete = new CompleteUpload(service)
  }

  /**
   * 完整的文件上传流程
   * @param {string} fileName - 文件名
   * @param {Buffer|Stream} fileData - 文件数据
   * @param {string} purpose - 用途
   * @returns {Promise<object>} 上传结果
   */
  async uploadFile(fileName, fileData, purpose = 'fine-tuning') {
    const upload = await this.create.execute({
      upload_name: fileName,
      purpose: purpose,
      bytes: fileData.length
    })

    const part = await this.addPart.execute({
      upload_id: upload.data.id,
      file: fileData
    })

    const completed = await this.complete.execute({
      upload_id: upload.data.id,
      part_ids: [part.data.id]
    })

    return completed
  }

  /**
   * 大文件分块上传
   * @param {string} fileName - 文件名
   * @param {Buffer} fileData - 文件数据
   * @param {number} chunkSize - 分块大小(默认 8MB)
   * @returns {Promise<object>} 上传结果
   */
  async uploadLargeFile(fileName, fileData, chunkSize = 8 * 1024 * 1024) {
    const upload = await this.create.execute({
      upload_name: fileName,
      purpose: 'fine-tuning',
      bytes: fileData.length
    })

    const partIds = []
    const chunks = Math.ceil(fileData.length / chunkSize)

    for (let i = 0; i < chunks; i++) {
      const start = i * chunkSize
      const end = Math.min(start + chunkSize, fileData.length)
      const chunk = fileData.slice(start, end)

      const part = await this.addPart.execute({
        upload_id: upload.data.id,
        file: chunk
      })

      partIds.push(part.data.id)
    }

    const completed = await this.complete.execute({
      upload_id: upload.data.id,
      part_ids: partIds
    })

    return completed
  }
}

module.exports = Upload
