/**
 * 火山引擎3D API入口
 */

const Create3DGenerationTask = require('./create-3d-generation-task')
const Query3DGenerationTask = require('./query-3d-generation-task')
const Query3DGenerationTaskList = require('./query-3d-generation-task-list')
const CancelDelete3DGenerationTask = require('./cancel-delete-3d-generation-task')

module.exports = {
  Create3DGenerationTask,
  Query3DGenerationTask,
  Query3DGenerationTaskList,
  CancelDelete3DGenerationTask
}
