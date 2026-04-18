/**
 * Vidu 视频参数定义入口
 */

const textToVideo = require('./text-to-video')
const imageToVideo = require('./image-to-video')
const referenceToVideo = require('./reference-to-video')
const startEndToVideo = require('./start-end-to-video')
const multiframe = require('./multiframe')
const template = require('./template')
const templateStory = require('./template-story')
const queryTask = require('./query-task')
const cancelTask = require('./cancel-task')

module.exports = {
  textToVideo,
  imageToVideo,
  referenceToVideo,
  startEndToVideo,
  multiframe,
  template,
  templateStory,
  queryTask,
  cancelTask
}
