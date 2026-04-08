/**
 * API类型枚举
 * 定义API的功能类型分类
 */
const APITypes = {
  // 图像生成类
  TEXT_TO_IMAGE: 'text_to_image',
  IMAGE_TO_IMAGE: 'image_to_image',
  IMAGE_EDITING: 'image_editing',
  IMAGE_UPSCALING: 'image_upscaling',

  // 视频生成类
  TEXT_TO_VIDEO: 'text_to_video',
  IMAGE_TO_VIDEO: 'image_to_video',
  AUDIO_TO_VIDEO: 'audio_to_video',
  VIDEO_EDITING: 'video_editing',
  VIDEO_EXTENSION: 'video_extension',

  // 音频生成类
  TEXT_TO_AUDIO: 'text_to_audio',
  TEXT_TO_SPEECH: 'text_to_speech',
  SPEECH_TO_TEXT: 'speech_to_text',
  AUDIO_GENERATION: 'audio_generation',
  MUSIC_GENERATION: 'music_generation',
  SONG_GENERATION: 'song_generation',
  INSTRUMENTAL_GENERATION: 'instrumental_generation',
  VOCAL_CLONING: 'vocal_cloning',

  // 文本生成类
  TEXT_GENERATION: 'text_generation',
  TEXT_EDITING: 'text_editing',

  // 3D生成类
  IMAGE_TO_3D: 'image_to_3d',
  TEXT_TO_3D: 'text_to_3d',

  // 查询类
  TASK_QUERY: 'task_query',
  FILE_UPLOAD: 'file_upload',

  // Avatar类
  AVATAR_GENERATION: 'avatar_generation',
  LIP_SYNC: 'lip_sync'
}

/**
 * 媒体类型枚举
 */
const MediaTypes = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  AUDIO_3D: '3d'
}

/**
 * 输入输出类型映射
 */
const InputOutputTypes = {
  TEXT_TO_IMAGE: { input: MediaTypes.TEXT, output: MediaTypes.IMAGE },
  IMAGE_TO_VIDEO: { input: MediaTypes.IMAGE, output: MediaTypes.VIDEO },
  TEXT_TO_VIDEO: { input: MediaTypes.TEXT, output: MediaTypes.VIDEO },
  AUDIO_TO_VIDEO: { input: MediaTypes.AUDIO, output: MediaTypes.VIDEO },
  TEXT_TO_AUDIO: { input: MediaTypes.TEXT, output: MediaTypes.AUDIO },
  TEXT_TO_SPEECH: { input: MediaTypes.TEXT, output: MediaTypes.AUDIO },
  TEXT_GENERATION: { input: MediaTypes.TEXT, output: MediaTypes.TEXT },
  IMAGE_TO_3D: { input: MediaTypes.IMAGE, output: MediaTypes.AUDIO_3D }
}

module.exports = {
  APITypes,
  MediaTypes,
  InputOutputTypes
}
