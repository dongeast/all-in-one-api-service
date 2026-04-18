/**
 * 火山引擎3D参数入口
 */

const create3DGenerationTask = require('./create-3d-generation-task')
const query3DGenerationTask = require('./query-3d-generation-task')
const query3DGenerationTaskList = require('./query-3d-generation-task-list')
const cancelDelete3DGenerationTask = require('./cancel-delete-3d-generation-task')

module.exports = {
  create3DGenerationTask,
  query3DGenerationTask,
  query3DGenerationTaskList,
  cancelDelete3DGenerationTask
}
