/**
 * 媒体类型枚举
 */
const MediaTypes = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  AUDIO_3D: '3d',
  FILE: 'file'
}

/**
 * 输入输出类型映射
 * 包含输入输出类型和显示名称
 */
const InputOutputTypes = {
  // 图像生成类
  TEXT_TO_IMAGE: {
    input: MediaTypes.TEXT,
    output: MediaTypes.IMAGE,
    display_name: 'Text to Image'
  },
  IMAGE_TO_IMAGE: {
    input: MediaTypes.IMAGE,
    output: MediaTypes.IMAGE,
    display_name: 'Image to Image'
  },
  IMAGE_EDITING: {
    input: MediaTypes.IMAGE,
    output: MediaTypes.IMAGE,
    display_name: 'Image Editing'
  },
  IMAGE_UPSCALING: {
    input: MediaTypes.IMAGE,
    output: MediaTypes.IMAGE,
    display_name: 'Image Upscaling'
  },

  // 视频生成类
  TEXT_TO_VIDEO: {
    input: MediaTypes.TEXT,
    output: MediaTypes.VIDEO,
    display_name: 'Text to Video'
  },
  IMAGE_TO_VIDEO: {
    input: MediaTypes.IMAGE,
    output: MediaTypes.VIDEO,
    display_name: 'Image to Video'
  },
  AUDIO_TO_VIDEO: {
    input: MediaTypes.AUDIO,
    output: MediaTypes.VIDEO,
    display_name: 'Audio to Video'
  },
  VIDEO_EDITING: {
    input: MediaTypes.VIDEO,
    output: MediaTypes.VIDEO,
    display_name: 'Video Editing'
  },
  VIDEO_EXTENSION: {
    input: MediaTypes.VIDEO,
    output: MediaTypes.VIDEO,
    display_name: 'Video Extension'
  },

  // 音频生成类
  TEXT_TO_AUDIO: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO,
    display_name: 'Text to Audio'
  },
  TEXT_TO_SPEECH: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO,
    display_name: 'Text to Speech'
  },
  SPEECH_TO_TEXT: {
    input: MediaTypes.AUDIO,
    output: MediaTypes.TEXT,
    display_name: 'Speech to Text'
  },
  AUDIO_GENERATION: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO,
    display_name: 'Audio Generation'
  },
  MUSIC_GENERATION: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO,
    display_name: 'Music Generation'
  },
  SONG_GENERATION: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO,
    display_name: 'Song Generation'
  },
  INSTRUMENTAL_GENERATION: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO,
    display_name: 'Instrumental Generation'
  },
  VOCAL_CLONING: {
    input: MediaTypes.AUDIO,
    output: MediaTypes.AUDIO,
    display_name: 'Vocal Cloning'
  },

  // 文本生成类
  TEXT_GENERATION: {
    input: MediaTypes.TEXT,
    output: MediaTypes.TEXT,
    display_name: 'Text Generation'
  },
  TEXT_EDITING: {
    input: MediaTypes.TEXT,
    output: MediaTypes.TEXT,
    display_name: 'Text Editing'
  },

  // 3D生成类
  IMAGE_TO_3D: {
    input: MediaTypes.IMAGE,
    output: MediaTypes.AUDIO_3D,
    display_name: 'Image to 3D'
  },
  TEXT_TO_3D: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO_3D,
    display_name: 'Text to 3D'
  },

  // 查询类
  TASK_QUERY: {
    input: MediaTypes.TEXT,
    output: MediaTypes.TEXT,
    display_name: 'Task Query'
  },
  FILE_UPLOAD: {
    input: MediaTypes.FILE,
    output: MediaTypes.FILE,
    display_name: 'File Upload'
  },

  // Avatar类
  AVATAR_GENERATION: {
    input: MediaTypes.IMAGE,
    output: MediaTypes.VIDEO,
    display_name: 'Avatar Generation'
  },
  LIP_SYNC: {
    input: MediaTypes.VIDEO,
    output: MediaTypes.VIDEO,
    display_name: 'Lip Sync'
  }
}

/**
 * API类型枚举
 * 定义API的功能类型分类，包含完整元数据
 */
const APITypes = {
  TEXT_TO_IMAGE: {
    id: 'text_to_image',
    inputOutput: InputOutputTypes.TEXT_TO_IMAGE,
    description: 'Generate image from text description'
  },
  IMAGE_TO_IMAGE: {
    id: 'image_to_image',
    inputOutput: InputOutputTypes.IMAGE_TO_IMAGE,
    description: 'Convert input image to another style'
  },
  IMAGE_EDITING: {
    id: 'image_editing',
    inputOutput: InputOutputTypes.IMAGE_EDITING,
    description: 'Edit and modify images'
  },
  IMAGE_UPSCALING: {
    id: 'image_upscaling',
    inputOutput: InputOutputTypes.IMAGE_UPSCALING,
    description: 'Enhance image resolution and quality'
  },

  TEXT_TO_VIDEO: {
    id: 'text_to_video',
    inputOutput: InputOutputTypes.TEXT_TO_VIDEO,
    description: 'Generate video from text description'
  },
  IMAGE_TO_VIDEO: {
    id: 'image_to_video',
    inputOutput: InputOutputTypes.IMAGE_TO_VIDEO,
    description: 'Convert static image to dynamic video'
  },
  AUDIO_TO_VIDEO: {
    id: 'audio_to_video',
    inputOutput: InputOutputTypes.AUDIO_TO_VIDEO,
    description: 'Generate video from audio content'
  },
  VIDEO_EDITING: {
    id: 'video_editing',
    inputOutput: InputOutputTypes.VIDEO_EDITING,
    description: 'Edit and modify videos'
  },
  VIDEO_EXTENSION: {
    id: 'video_extension',
    inputOutput: InputOutputTypes.VIDEO_EXTENSION,
    description: 'Extend video duration'
  },

  TEXT_TO_AUDIO: {
    id: 'text_to_audio',
    inputOutput: InputOutputTypes.TEXT_TO_AUDIO,
    description: 'Generate audio from text description'
  },
  TEXT_TO_SPEECH: {
    id: 'text_to_speech',
    inputOutput: InputOutputTypes.TEXT_TO_SPEECH,
    description: 'Convert text to speech'
  },
  SPEECH_TO_TEXT: {
    id: 'speech_to_text',
    inputOutput: InputOutputTypes.SPEECH_TO_TEXT,
    description: 'Convert speech to text'
  },
  AUDIO_GENERATION: {
    id: 'audio_generation',
    inputOutput: InputOutputTypes.AUDIO_GENERATION,
    description: 'Generate various types of audio'
  },
  MUSIC_GENERATION: {
    id: 'music_generation',
    inputOutput: InputOutputTypes.MUSIC_GENERATION,
    description: 'Generate music from description'
  },
  SONG_GENERATION: {
    id: 'song_generation',
    inputOutput: InputOutputTypes.SONG_GENERATION,
    description: 'Generate complete songs'
  },
  INSTRUMENTAL_GENERATION: {
    id: 'instrumental_generation',
    inputOutput: InputOutputTypes.INSTRUMENTAL_GENERATION,
    description: 'Generate instrumental accompaniment'
  },
  VOCAL_CLONING: {
    id: 'vocal_cloning',
    inputOutput: InputOutputTypes.VOCAL_CLONING,
    description: 'Clone specific voice characteristics'
  },

  TEXT_GENERATION: {
    id: 'text_generation',
    inputOutput: InputOutputTypes.TEXT_GENERATION,
    description: 'Generate text content'
  },
  TEXT_EDITING: {
    id: 'text_editing',
    inputOutput: InputOutputTypes.TEXT_EDITING,
    description: 'Edit and modify text'
  },

  IMAGE_TO_3D: {
    id: 'image_to_3d',
    inputOutput: InputOutputTypes.IMAGE_TO_3D,
    description: 'Generate 3D model from image'
  },
  TEXT_TO_3D: {
    id: 'text_to_3d',
    inputOutput: InputOutputTypes.TEXT_TO_3D,
    description: 'Generate 3D model from text description'
  },

  TASK_QUERY: {
    id: 'task_query',
    inputOutput: InputOutputTypes.TASK_QUERY,
    description: 'Query task status'
  },
  FILE_UPLOAD: {
    id: 'file_upload',
    inputOutput: InputOutputTypes.FILE_UPLOAD,
    description: 'Upload files'
  },

  AVATAR_GENERATION: {
    id: 'avatar_generation',
    inputOutput: InputOutputTypes.AVATAR_GENERATION,
    description: 'Generate digital avatar'
  },
  LIP_SYNC: {
    id: 'lip_sync',
    inputOutput: InputOutputTypes.LIP_SYNC,
    description: 'Synchronize video lip movements with audio'
  }
}

module.exports = {
  APITypes,
  MediaTypes,
  InputOutputTypes
}
