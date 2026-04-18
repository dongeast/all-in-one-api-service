/**
 * Upload 参数定义入口
 */

const createUpload = require('./create-upload')
const addUploadPart = require('./add-upload-part')
const completeUpload = require('./complete-upload')

module.exports = {
  createUpload,
  addUploadPart,
  completeUpload
}
