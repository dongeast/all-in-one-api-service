/**
 * Skyreels 说话头像参数入口
 */

const singleActorAvatarTaskSubmission = require('./single-actor-avatar-task-submission')
const singleActorAvatarTaskQuery = require('./single-actor-avatar-task-query')
const multiActorAvatarTaskSubmission = require('./multi-actor-avatar-task-submission')
const multiActorAvatarTaskQuery = require('./multi-actor-avatar-task-query')
const segmentedCameraMotionTaskSubmit = require('./segmented-camera-motion-task-submit')
const segmentedCameraMotionTaskQuery = require('./segmented-camera-motion-task-query')
const lipSyncTaskSubmit = require('./lip-sync-task-submit')
const lipSyncTaskQuery = require('./lip-sync-task-query')

module.exports = {
  singleActorAvatarTaskSubmission,
  singleActorAvatarTaskQuery,
  multiActorAvatarTaskSubmission,
  multiActorAvatarTaskQuery,
  segmentedCameraMotionTaskSubmit,
  segmentedCameraMotionTaskQuery,
  lipSyncTaskSubmit,
  lipSyncTaskQuery
}
