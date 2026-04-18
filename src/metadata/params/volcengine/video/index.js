/**
 * 火山引擎视频参数入口
 */

const createVideoGenerationTask = require('./create-video-generation-task')
const queryVideoGenerationTask = require('./query-video-generation-task')
const queryVideoGenerationTaskList = require('./query-video-generation-task-list')
const cancelDeleteVideoGenerationTask = require('./cancel-delete-video-generation-task')

module.exports = {
  createVideoGenerationTask,
  queryVideoGenerationTask,
  queryVideoGenerationTaskList,
  cancelDeleteVideoGenerationTask
}
