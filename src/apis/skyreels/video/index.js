/**
 * Skyreels 视频API入口
 */

const ReferenceToVideoTaskSubmission = require('./reference-to-video-task-submission')
const ReferenceToVideoTaskQuery = require('./reference-to-video-task-query')
const VideoRestylingTaskSubmission = require('./video-restyling-task-submission')
const VideoRestylingTaskQuery = require('./video-restyling-task-query')
const SingleShotVideoExtensionTaskSubmission = require('./single-shot-video-extension-task-submission')
const SingleShotVideoExtensionTaskQuery = require('./single-shot-video-extension-task-query')
const ShotSwitchingVideoExtensionTaskSubmission = require('./shot-switching-video-extension-task-submission')
const ShotSwitchingVideoExtensionTaskQuery = require('./shot-switching-video-extension-task-query')
const TextToVideoGenerationTaskSubmission = require('./text-to-video-generation-task-submission')
const TextToVideoGenerationTaskQuery = require('./text-to-video-generation-task-query')
const ImageToVideoGenerationTaskSubmission = require('./image-to-video-generation-task-submission')
const ImageToVideoGenerationTaskQuery = require('./image-to-video-generation-task-query')
const OmniReferenceTaskSubmission = require('./omni-reference-task-submission')
const OmniReferenceTaskQuery = require('./omni-reference-task-query')

module.exports = {
  ReferenceToVideoTaskSubmission,
  ReferenceToVideoTaskQuery,
  VideoRestylingTaskSubmission,
  VideoRestylingTaskQuery,
  SingleShotVideoExtensionTaskSubmission,
  SingleShotVideoExtensionTaskQuery,
  ShotSwitchingVideoExtensionTaskSubmission,
  ShotSwitchingVideoExtensionTaskQuery,
  TextToVideoGenerationTaskSubmission,
  TextToVideoGenerationTaskQuery,
  ImageToVideoGenerationTaskSubmission,
  ImageToVideoGenerationTaskQuery,
  OmniReferenceTaskSubmission,
  OmniReferenceTaskQuery
}
