/**
 * API 映射配置
 * 定义 API 到 Function 的映射关系
 */

module.exports = {
  apiToFunction: {
    'generate-song': 'generate-song',
    'query-song-task': 'generate-song',
    'extend-song': 'extend-song',
    'query-extend-song-task': 'extend-song',
    'generate-lyrics': 'generate-lyrics',
    'extend-lyrics': 'extend-lyrics',
    'generate-instrumental': 'generate-instrumental',
    'query-instrumental-task': 'generate-instrumental',
    'create-speech': 'create-speech',
    'create-podcast': 'create-podcast',
    'vocal-cloning': 'vocal-cloning',
    'describe-song': 'describe-song',
    'recognize-song': 'recognize-song',
    'stem-song': 'stem-song',
    'upload-file': 'upload-file',
    'create-upload': 'create-upload',
    'add-upload-part': 'add-upload-part',
    'complete-upload': 'complete-upload',
    
    'generate-video-from-text': 'generate-video-from-text',
    'generate-video-from-image': 'generate-video-from-image',
    'generate-video-from-audio': 'generate-video-from-audio',
    'extend-video-duration': 'extend-video-duration',
    'retake-video-section': 'retake-video-section',
    
    'text-to-video-generation-task-submission': 'text-to-video-generation',
    'text-to-video-generation-task-query': 'text-to-video-generation',
    'image-to-video-generation-task-submission': 'image-to-video-generation',
    'image-to-video-generation-task-query': 'image-to-video-generation',
    'single-actor-avatar-task-submission': 'single-actor-avatar',
    'single-actor-avatar-task-query': 'single-actor-avatar',
    'multi-actor-avatar-task-submission': 'multi-actor-avatar',
    'multi-actor-avatar-task-query': 'multi-actor-avatar',
    'lip-sync-task-submit': 'lip-sync',
    'lip-sync-task-query': 'lip-sync',
    'segmented-camera-motion-task-submit': 'segmented-camera-motion',
    'segmented-camera-motion-task-query': 'segmented-camera-motion',
    'omni-reference-task-submission': 'omni-reference',
    'omni-reference-task-query': 'omni-reference',
    'reference-to-video-task-submission': 'reference-to-video',
    'reference-to-video-task-query': 'reference-to-video',
    'single-shot-video-extension-task-submission': 'single-shot-video-extension',
    'single-shot-video-extension-task-query': 'single-shot-video-extension',
    'shot-switching-video-extension-task-submission': 'shot-switching-video-extension',
    'shot-switching-video-extension-task-query': 'shot-switching-video-extension',
    'video-restyling-task-submission': 'video-restyling',
    'video-restyling-task-query': 'video-restyling',
    
    'create-video-generation-task': 'create-video-generation',
    'query-video-generation-task': 'create-video-generation',
    'cancel-delete-video-generation-task': 'cancel-delete-video-generation',
    'create-3d-generation-task': 'create-3d-generation',
    'query-3d-generation-task': 'create-3d-generation',
    'cancel-delete-3d-generation-task': 'cancel-delete-3d-generation',
    'generate-image': 'generate-image'
  },

  functionToAPIs: {
    'generate-song': {
      request: 'generate-song',
      query: 'query-song-task'
    },
    'extend-song': {
      request: 'extend-song',
      query: 'query-song-task'
    },
    'generate-lyrics': {
      request: 'generate-lyrics'
    },
    'extend-lyrics': {
      request: 'extend-lyrics'
    },
    'generate-instrumental': {
      request: 'generate-instrumental',
      query: 'query-instrumental-task'
    },
    'create-speech': {
      request: 'create-speech'
    },
    'create-podcast': {
      request: 'create-podcast'
    },
    'vocal-cloning': {
      request: 'vocal-cloning'
    },
    'describe-song': {
      request: 'describe-song'
    },
    'recognize-song': {
      request: 'recognize-song'
    },
    'stem-song': {
      request: 'stem-song'
    },
    'upload-file': {
      request: 'upload-file'
    },
    'create-upload': {
      request: 'create-upload'
    },
    'add-upload-part': {
      request: 'add-upload-part'
    },
    'complete-upload': {
      request: 'complete-upload'
    },
    
    'generate-video-from-text': {
      request: 'generate-video-from-text'
    },
    'generate-video-from-image': {
      request: 'generate-video-from-image'
    },
    'generate-video-from-audio': {
      request: 'generate-video-from-audio'
    },
    'extend-video-duration': {
      request: 'extend-video-duration'
    },
    'retake-video-section': {
      request: 'retake-video-section'
    },
    
    'text-to-video-generation': {
      request: 'text-to-video-generation-task-submission',
      query: 'text-to-video-generation-task-query'
    },
    'image-to-video-generation': {
      request: 'image-to-video-generation-task-submission',
      query: 'image-to-video-generation-task-query'
    },
    'single-actor-avatar': {
      request: 'single-actor-avatar-task-submission',
      query: 'single-actor-avatar-task-query'
    },
    'multi-actor-avatar': {
      request: 'multi-actor-avatar-task-submission',
      query: 'multi-actor-avatar-task-query'
    },
    'lip-sync': {
      request: 'lip-sync-task-submit',
      query: 'lip-sync-task-query'
    },
    'segmented-camera-motion': {
      request: 'segmented-camera-motion-task-submit',
      query: 'segmented-camera-motion-task-query'
    },
    'omni-reference': {
      request: 'omni-reference-task-submission',
      query: 'omni-reference-task-query'
    },
    'reference-to-video': {
      request: 'reference-to-video-task-submission',
      query: 'reference-to-video-task-query'
    },
    'single-shot-video-extension': {
      request: 'single-shot-video-extension-task-submission',
      query: 'single-shot-video-extension-task-query'
    },
    'shot-switching-video-extension': {
      request: 'shot-switching-video-extension-task-submission',
      query: 'shot-switching-video-extension-task-query'
    },
    'video-restyling': {
      request: 'video-restyling-task-submission',
      query: 'video-restyling-task-query'
    },
    
    'create-video-generation': {
      request: 'create-video-generation-task',
      query: 'query-video-generation-task'
    },
    'cancel-delete-video-generation': {
      request: 'cancel-delete-video-generation-task'
    },
    'create-3d-generation': {
      request: 'create-3d-generation-task',
      query: 'query-3d-generation-task'
    },
    'cancel-delete-3d-generation': {
      request: 'cancel-delete-3d-generation-task'
    },
    'generate-image': {
      request: 'generate-image'
    }
  },

  getFunctionByAPI(apiName) {
    return this.apiToFunction[apiName] || null
  },

  getAPIsByFunction(functionName) {
    return this.functionToAPIs[functionName] || null
  },

  isRequestAPI(apiName) {
    const functionName = this.apiToFunction[apiName]
    if (!functionName) return false
    const apis = this.functionToAPIs[functionName]
    return apis && apis.request === apiName
  },

  isQueryAPI(apiName) {
    const functionName = this.apiToFunction[apiName]
    if (!functionName) return false
    const apis = this.functionToAPIs[functionName]
    return apis && apis.query === apiName
  }
}
