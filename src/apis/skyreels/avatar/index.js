/**
 * Skyreels 说话头像API入口
 */

const SingleActorAvatarTaskSubmission = require('./single-actor-avatar-task-submission')
const SingleActorAvatarTaskQuery = require('./single-actor-avatar-task-query')
const MultiActorAvatarTaskSubmission = require('./multi-actor-avatar-task-submission')
const MultiActorAvatarTaskQuery = require('./multi-actor-avatar-task-query')
const SegmentedCameraMotionTaskSubmit = require('./segmented-camera-motion-task-submit')
const SegmentedCameraMotionTaskQuery = require('./segmented-camera-motion-task-query')
const LipSyncTaskSubmit = require('./lip-sync-task-submit')
const LipSyncTaskQuery = require('./lip-sync-task-query')

module.exports = {
  SingleActorAvatarTaskSubmission,
  SingleActorAvatarTaskQuery,
  MultiActorAvatarTaskSubmission,
  MultiActorAvatarTaskQuery,
  SegmentedCameraMotionTaskSubmit,
  SegmentedCameraMotionTaskQuery,
  LipSyncTaskSubmit,
  LipSyncTaskQuery
}
