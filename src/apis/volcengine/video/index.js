/**
 * 火山引擎视频API入口
 */

const CreateVideoGenerationTask = require('./create-video-generation-task')
const QueryVideoGenerationTask = require('./query-video-generation-task')
const QueryVideoGenerationTaskList = require('./query-video-generation-task-list')
const CancelDeleteVideoGenerationTask = require('./cancel-delete-video-generation-task')

module.exports = {
  CreateVideoGenerationTask,
  QueryVideoGenerationTask,
  QueryVideoGenerationTaskList,
  CancelDeleteVideoGenerationTask
}
