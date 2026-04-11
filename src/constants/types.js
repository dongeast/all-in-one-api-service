/**
 * 媒体类型枚举
 * 包含媒体类型值、显示标志和显示名称
 */
const MediaTypes = {
  TEXT: {
    value: 'Text Generator',
    display_flag: true,
    display_name: 'Text'
  },
  IMAGE: {
    value: 'Image Generator',
    display_flag: true,
    display_name: 'Image'
  },
  VIDEO: {
    value: 'Video Generator',
    display_flag: true,
    display_name: 'Video'
  },
  AUDIO: {
    value: 'Audio Generator',
    display_flag: true,
    display_name: 'Audio'
  },
  MODEL_3D: {
    value: '3D Model Generator',
    display_flag: true,
    display_name: '3D Model'
  },
  FILE: {
    value: 'file',
    display_flag: false,
    display_name: 'File'
  }
}

/**
 * 输入输出类型映射
 * 包含输入输出类型、显示名称和显示标志
 */
const InputOutputTypes = {
  // 图像生成类
  TEXT_TO_IMAGE: {
    input: MediaTypes.TEXT,
    output: MediaTypes.IMAGE,
    display_name: 'Text to Image',
    display_flag: true
  },
  IMAGE_TO_IMAGE: {
    input: MediaTypes.IMAGE,
    output: MediaTypes.IMAGE,
    display_name: 'Image to Image',
    display_flag: true
  },
  IMAGE_EDITING: {
    input: MediaTypes.IMAGE,
    output: MediaTypes.IMAGE,
    display_name: 'Image Editing',
    display_flag: true
  },
  IMAGE_UPSCALING: {
    input: MediaTypes.IMAGE,
    output: MediaTypes.IMAGE,
    display_name: 'Image Upscaling',
    display_flag: true
  },

  // 视频生成类
  TEXT_TO_VIDEO: {
    input: MediaTypes.TEXT,
    output: MediaTypes.VIDEO,
    display_name: 'Text to Video',
    display_flag: true
  },
  IMAGE_TO_VIDEO: {
    input: MediaTypes.IMAGE,
    output: MediaTypes.VIDEO,
    display_name: 'Image to Video',
    display_flag: true
  },
  AUDIO_TO_VIDEO: {
    input: MediaTypes.AUDIO,
    output: MediaTypes.VIDEO,
    display_name: 'Audio to Video',
    display_flag: true
  },
  VIDEO_EDITING: {
    input: MediaTypes.VIDEO,
    output: MediaTypes.VIDEO,
    display_name: 'Video Editing',
    display_flag: true
  },
  VIDEO_EXTENSION: {
    input: MediaTypes.VIDEO,
    output: MediaTypes.VIDEO,
    display_name: 'Video Extension',
    display_flag: true
  },

  // 音频生成类
  TEXT_TO_AUDIO: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO,
    display_name: 'Text to Audio',
    display_flag: true
  },
  TEXT_TO_SPEECH: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO,
    display_name: 'Text to Speech',
    display_flag: true
  },
  SPEECH_TO_TEXT: {
    input: MediaTypes.AUDIO,
    output: MediaTypes.TEXT,
    display_name: 'Speech to Text',
    display_flag: true
  },
  AUDIO_GENERATION: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO,
    display_name: 'Audio Generation',
    display_flag: true
  },
  MUSIC_GENERATION: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO,
    display_name: 'Music Generation',
    display_flag: true
  },
  SONG_GENERATION: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO,
    display_name: 'Song Generation',
    display_flag: true
  },
  INSTRUMENTAL_GENERATION: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO,
    display_name: 'Instrumental Generation',
    display_flag: true
  },
  VOCAL_CLONING: {
    input: MediaTypes.AUDIO,
    output: MediaTypes.AUDIO,
    display_name: 'Vocal Cloning',
    display_flag: true
  },

  // 文本生成类
  TEXT_GENERATION: {
    input: MediaTypes.TEXT,
    output: MediaTypes.TEXT,
    display_name: 'Text Generation',
    display_flag: true
  },
  TEXT_EDITING: {
    input: MediaTypes.TEXT,
    output: MediaTypes.TEXT,
    display_name: 'Text Editing',
    display_flag: true
  },

  // 3D生成类
  IMAGE_TO_3D: {
    input: MediaTypes.IMAGE,
    output: MediaTypes.MODEL_3D,
    display_name: 'Image to 3D',
    display_flag: true
  },
  TEXT_TO_3D: {
    input: MediaTypes.TEXT,
    output: MediaTypes.MODEL_3D,
    display_name: 'Text to 3D',
    display_flag: true
  },

  // 查询类
  TASK_QUERY: {
    input: MediaTypes.TEXT,
    output: MediaTypes.TEXT,
    display_name: 'Task Query',
    display_flag: false
  },
  FILE_UPLOAD: {
    input: MediaTypes.FILE,
    output: MediaTypes.FILE,
    display_name: 'File Upload',
    display_flag: false
  },

  // Avatar类
  AVATAR_GENERATION: {
    input: MediaTypes.IMAGE,
    output: MediaTypes.VIDEO,
    display_name: 'Avatar Generation',
    display_flag: true
  },
  LIP_SYNC: {
    input: MediaTypes.VIDEO,
    output: MediaTypes.VIDEO,
    display_name: 'Lip Sync',
    display_flag: true
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
    description: 'Generate image from text description',
    display_name: 'Text to Image',
    display_flag: true
  },
  IMAGE_TO_IMAGE: {
    id: 'image_to_image',
    inputOutput: InputOutputTypes.IMAGE_TO_IMAGE,
    description: 'Convert input image to another style',
    display_name: 'Image to Image',
    display_flag: true
  },
  IMAGE_EDITING: {
    id: 'image_editing',
    inputOutput: InputOutputTypes.IMAGE_EDITING,
    description: 'Edit and modify images',
    display_name: 'Image Editing',
    display_flag: true
  },
  IMAGE_UPSCALING: {
    id: 'image_upscaling',
    inputOutput: InputOutputTypes.IMAGE_UPSCALING,
    description: 'Enhance image resolution and quality',
    display_name: 'Image Upscaling',
    display_flag: true
  },

  TEXT_TO_VIDEO: {
    id: 'text_to_video',
    inputOutput: InputOutputTypes.TEXT_TO_VIDEO,
    description: 'Generate video from text description',
    display_name: 'Text to Video',
    display_flag: true
  },
  IMAGE_TO_VIDEO: {
    id: 'image_to_video',
    inputOutput: InputOutputTypes.IMAGE_TO_VIDEO,
    description: 'Convert static image to dynamic video',
    display_name: 'Image to Video',
    display_flag: true
  },
  AUDIO_TO_VIDEO: {
    id: 'audio_to_video',
    inputOutput: InputOutputTypes.AUDIO_TO_VIDEO,
    description: 'Generate video from audio content',
    display_name: 'Audio to Video',
    display_flag: true
  },
  VIDEO_EDITING: {
    id: 'video_editing',
    inputOutput: InputOutputTypes.VIDEO_EDITING,
    description: 'Edit and modify videos',
    display_name: 'Video Editing',
    display_flag: true
  },
  VIDEO_EXTENSION: {
    id: 'video_extension',
    inputOutput: InputOutputTypes.VIDEO_EXTENSION,
    description: 'Extend video duration',
    display_name: 'Video Extension',
    display_flag: true
  },

  TEXT_TO_AUDIO: {
    id: 'text_to_audio',
    inputOutput: InputOutputTypes.TEXT_TO_AUDIO,
    description: 'Generate audio from text description',
    display_name: 'Text to Audio',
    display_flag: true
  },
  TEXT_TO_SPEECH: {
    id: 'text_to_speech',
    inputOutput: InputOutputTypes.TEXT_TO_SPEECH,
    description: 'Convert text to speech',
    display_name: 'Text to Speech',
    display_flag: true
  },
  SPEECH_TO_TEXT: {
    id: 'speech_to_text',
    inputOutput: InputOutputTypes.SPEECH_TO_TEXT,
    description: 'Convert speech to text',
    display_name: 'Speech to Text',
    display_flag: true
  },
  AUDIO_GENERATION: {
    id: 'audio_generation',
    inputOutput: InputOutputTypes.AUDIO_GENERATION,
    description: 'Generate various types of audio',
    display_name: 'Audio Generation',
    display_flag: true
  },
  MUSIC_GENERATION: {
    id: 'music_generation',
    inputOutput: InputOutputTypes.MUSIC_GENERATION,
    description: 'Generate music from description',
    display_name: 'Music Generation',
    display_flag: true
  },
  SONG_GENERATION: {
    id: 'song_generation',
    inputOutput: InputOutputTypes.SONG_GENERATION,
    description: 'Generate complete songs',
    display_name: 'Song Generation',
    display_flag: true
  },
  INSTRUMENTAL_GENERATION: {
    id: 'instrumental_generation',
    inputOutput: InputOutputTypes.INSTRUMENTAL_GENERATION,
    description: 'Generate instrumental accompaniment',
    display_name: 'Instrumental Generation',
    display_flag: true
  },
  VOCAL_CLONING: {
    id: 'vocal_cloning',
    inputOutput: InputOutputTypes.VOCAL_CLONING,
    description: 'Clone specific voice characteristics',
    display_name: 'Vocal Cloning',
    display_flag: true
  },

  TEXT_GENERATION: {
    id: 'text_generation',
    inputOutput: InputOutputTypes.TEXT_GENERATION,
    description: 'Generate text content',
    display_name: 'Text Generation',
    display_flag: true
  },
  TEXT_EDITING: {
    id: 'text_editing',
    inputOutput: InputOutputTypes.TEXT_EDITING,
    description: 'Edit and modify text',
    display_name: 'Text Editing',
    display_flag: true
  },

  IMAGE_TO_3D: {
    id: 'image_to_3d',
    inputOutput: InputOutputTypes.IMAGE_TO_3D,
    description: 'Generate 3D model from image',
    display_name: 'Image to 3D',
    display_flag: true
  },
  TEXT_TO_3D: {
    id: 'text_to_3d',
    inputOutput: InputOutputTypes.TEXT_TO_3D,
    description: 'Generate 3D model from text description',
    display_name: 'Text to 3D',
    display_flag: true
  },

  TASK_QUERY: {
    id: 'task_query',
    inputOutput: InputOutputTypes.TASK_QUERY,
    description: 'Query task status',
    display_name: 'Task Query',
    display_flag: false
  },
  FILE_UPLOAD: {
    id: 'file_upload',
    inputOutput: InputOutputTypes.FILE_UPLOAD,
    description: 'Upload files',
    display_name: 'File Upload',
    display_flag: false
  },

  AVATAR_GENERATION: {
    id: 'avatar_generation',
    inputOutput: InputOutputTypes.AVATAR_GENERATION,
    description: 'Generate digital avatar',
    display_name: 'Avatar Generation',
    display_flag: true
  },
  LIP_SYNC: {
    id: 'lip_sync',
    inputOutput: InputOutputTypes.LIP_SYNC,
    description: 'Synchronize video lip movements with audio',
    display_name: 'Lip Sync',
    display_flag: true
  }
}

module.exports = {
  APITypes,
  MediaTypes,
  InputOutputTypes
}
