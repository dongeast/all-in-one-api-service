/**
 * LTX 视频参数入口
 */

const GenerateVideoFromText = require('./generate-video-from-text')
const GenerateVideoFromImage = require('./generate-video-from-image')
const GenerateVideoFromAudio = require('./generate-video-from-audio')
const RetakeVideoSection = require('./retake-video-section')
const ExtendVideoDuration = require('./extend-video-duration')

module.exports = {
  GenerateVideoFromText,
  GenerateVideoFromImage,
  GenerateVideoFromAudio,
  RetakeVideoSection,
  ExtendVideoDuration
}
