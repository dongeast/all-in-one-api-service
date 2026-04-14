/**
 * Skyreels 视频参数入口
 */

const referenceToVideoTaskSubmission = require('./reference-to-video-task-submission')
const referenceToVideoTaskQuery = require('./reference-to-video-task-query')
const videoRestylingTaskSubmission = require('./video-restyling-task-submission')
const videoRestylingTaskQuery = require('./video-restyling-task-query')
const singleShotVideoExtensionTaskSubmission = require('./single-shot-video-extension-task-submission')
const singleShotVideoExtensionTaskQuery = require('./single-shot-video-extension-task-query')
const shotSwitchingVideoExtensionTaskSubmission = require('./shot-switching-video-extension-task-submission')
const shotSwitchingVideoExtensionTaskQuery = require('./shot-switching-video-extension-task-query')
const textToVideoGenerationTaskSubmission = require('./text-to-video-generation-task-submission')
const textToVideoGenerationTaskQuery = require('./text-to-video-generation-task-query')
const imageToVideoGenerationTaskSubmission = require('./image-to-video-generation-task-submission')
const imageToVideoGenerationTaskQuery = require('./image-to-video-generation-task-query')
const omniReferenceTaskSubmission = require('./omni-reference-task-submission')
const omniReferenceTaskQuery = require('./omni-reference-task-query')
// const referenceImageArrayTaskSubmission = require('./reference-image-array-task-submission')
// const refVideosTaskSubmission = require('./ref-videos-task-submission')

module.exports = {
  referenceToVideoTaskSubmission,
  referenceToVideoTaskQuery,
  videoRestylingTaskSubmission,
  videoRestylingTaskQuery,
  singleShotVideoExtensionTaskSubmission,
  singleShotVideoExtensionTaskQuery,
  shotSwitchingVideoExtensionTaskSubmission,
  shotSwitchingVideoExtensionTaskQuery,
  textToVideoGenerationTaskSubmission,
  textToVideoGenerationTaskQuery,
  imageToVideoGenerationTaskSubmission,
  imageToVideoGenerationTaskQuery,
  omniReferenceTaskSubmission,
  omniReferenceTaskQuery,
  // referenceImageArrayTaskSubmission,
  // refVideosTaskSubmission
}
