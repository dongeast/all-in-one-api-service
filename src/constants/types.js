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
    display_name: '文本生成图像'
  },
  IMAGE_TO_IMAGE: {
    input: MediaTypes.IMAGE,
    output: MediaTypes.IMAGE,
    display_name: '图像转换'
  },
  IMAGE_EDITING: {
    input: MediaTypes.IMAGE,
    output: MediaTypes.IMAGE,
    display_name: '图像编辑'
  },
  IMAGE_UPSCALING: {
    input: MediaTypes.IMAGE,
    output: MediaTypes.IMAGE,
    display_name: '图像放大'
  },

  // 视频生成类
  TEXT_TO_VIDEO: {
    input: MediaTypes.TEXT,
    output: MediaTypes.VIDEO,
    display_name: '文本生成视频'
  },
  IMAGE_TO_VIDEO: {
    input: MediaTypes.IMAGE,
    output: MediaTypes.VIDEO,
    display_name: '图像生成视频'
  },
  AUDIO_TO_VIDEO: {
    input: MediaTypes.AUDIO,
    output: MediaTypes.VIDEO,
    display_name: '音频生成视频'
  },
  VIDEO_EDITING: {
    input: MediaTypes.VIDEO,
    output: MediaTypes.VIDEO,
    display_name: '视频编辑'
  },
  VIDEO_EXTENSION: {
    input: MediaTypes.VIDEO,
    output: MediaTypes.VIDEO,
    display_name: '视频延长'
  },

  // 音频生成类
  TEXT_TO_AUDIO: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO,
    display_name: '文本生成音频'
  },
  TEXT_TO_SPEECH: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO,
    display_name: '文本转语音'
  },
  SPEECH_TO_TEXT: {
    input: MediaTypes.AUDIO,
    output: MediaTypes.TEXT,
    display_name: '语音转文本'
  },
  AUDIO_GENERATION: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO,
    display_name: '音频生成'
  },
  MUSIC_GENERATION: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO,
    display_name: '音乐生成'
  },
  SONG_GENERATION: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO,
    display_name: '歌曲生成'
  },
  INSTRUMENTAL_GENERATION: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO,
    display_name: '伴奏生成'
  },
  VOCAL_CLONING: {
    input: MediaTypes.AUDIO,
    output: MediaTypes.AUDIO,
    display_name: '声音克隆'
  },

  // 文本生成类
  TEXT_GENERATION: {
    input: MediaTypes.TEXT,
    output: MediaTypes.TEXT,
    display_name: '文本生成'
  },
  TEXT_EDITING: {
    input: MediaTypes.TEXT,
    output: MediaTypes.TEXT,
    display_name: '文本编辑'
  },

  // 3D生成类
  IMAGE_TO_3D: {
    input: MediaTypes.IMAGE,
    output: MediaTypes.AUDIO_3D,
    display_name: '图像生成3D'
  },
  TEXT_TO_3D: {
    input: MediaTypes.TEXT,
    output: MediaTypes.AUDIO_3D,
    display_name: '文本生成3D'
  },

  // 查询类
  TASK_QUERY: {
    input: MediaTypes.TEXT,
    output: MediaTypes.TEXT,
    display_name: '任务查询'
  },
  FILE_UPLOAD: {
    input: MediaTypes.FILE,
    output: MediaTypes.FILE,
    display_name: '文件上传'
  },

  // Avatar类
  AVATAR_GENERATION: {
    input: MediaTypes.IMAGE,
    output: MediaTypes.VIDEO,
    display_name: '数字人生成'
  },
  LIP_SYNC: {
    input: MediaTypes.VIDEO,
    output: MediaTypes.VIDEO,
    display_name: '口型同步'
  }
}

/**
 * API类型枚举
 * 定义API的功能类型分类，包含完整元数据
 */
const APITypes = {
  // 图像生成类
  TEXT_TO_IMAGE: {
    id: 'text_to_image',
    inputOutput: InputOutputTypes.TEXT_TO_IMAGE,
    description: '根据文本描述生成图像'
  },
  IMAGE_TO_IMAGE: {
    id: 'image_to_image',
    inputOutput: InputOutputTypes.IMAGE_TO_IMAGE,
    description: '将输入图像转换为另一种风格的图像'
  },
  IMAGE_EDITING: {
    id: 'image_editing',
    inputOutput: InputOutputTypes.IMAGE_EDITING,
    description: '对图像进行编辑修改'
  },
  IMAGE_UPSCALING: {
    id: 'image_upscaling',
    inputOutput: InputOutputTypes.IMAGE_UPSCALING,
    description: '提升图像分辨率和质量'
  },

  // 视频生成类
  TEXT_TO_VIDEO: {
    id: 'text_to_video',
    inputOutput: InputOutputTypes.TEXT_TO_VIDEO,
    description: '根据文本描述生成视频'
  },
  IMAGE_TO_VIDEO: {
    id: 'image_to_video',
    inputOutput: InputOutputTypes.IMAGE_TO_VIDEO,
    description: '将静态图像转换为动态视频'
  },
  AUDIO_TO_VIDEO: {
    id: 'audio_to_video',
    inputOutput: InputOutputTypes.AUDIO_TO_VIDEO,
    description: '根据音频内容生成视频'
  },
  VIDEO_EDITING: {
    id: 'video_editing',
    inputOutput: InputOutputTypes.VIDEO_EDITING,
    description: '对视频进行编辑修改'
  },
  VIDEO_EXTENSION: {
    id: 'video_extension',
    inputOutput: InputOutputTypes.VIDEO_EXTENSION,
    description: '延长视频时长'
  },

  // 音频生成类
  TEXT_TO_AUDIO: {
    id: 'text_to_audio',
    inputOutput: InputOutputTypes.TEXT_TO_AUDIO,
    description: '根据文本描述生成音频'
  },
  TEXT_TO_SPEECH: {
    id: 'text_to_speech',
    inputOutput: InputOutputTypes.TEXT_TO_SPEECH,
    description: '将文本转换为语音'
  },
  SPEECH_TO_TEXT: {
    id: 'speech_to_text',
    inputOutput: InputOutputTypes.SPEECH_TO_TEXT,
    description: '将语音转换为文本'
  },
  AUDIO_GENERATION: {
    id: 'audio_generation',
    inputOutput: InputOutputTypes.AUDIO_GENERATION,
    description: '生成各种类型的音频'
  },
  MUSIC_GENERATION: {
    id: 'music_generation',
    inputOutput: InputOutputTypes.MUSIC_GENERATION,
    description: '根据描述生成音乐'
  },
  SONG_GENERATION: {
    id: 'song_generation',
    inputOutput: InputOutputTypes.SONG_GENERATION,
    description: '生成完整的歌曲'
  },
  INSTRUMENTAL_GENERATION: {
    id: 'instrumental_generation',
    inputOutput: InputOutputTypes.INSTRUMENTAL_GENERATION,
    description: '生成器乐伴奏'
  },
  VOCAL_CLONING: {
    id: 'vocal_cloning',
    inputOutput: InputOutputTypes.VOCAL_CLONING,
    description: '克隆特定声音特征'
  },

  // 文本生成类
  TEXT_GENERATION: {
    id: 'text_generation',
    inputOutput: InputOutputTypes.TEXT_GENERATION,
    description: '生成文本内容'
  },
  TEXT_EDITING: {
    id: 'text_editing',
    inputOutput: InputOutputTypes.TEXT_EDITING,
    description: '编辑和修改文本'
  },

  // 3D生成类
  IMAGE_TO_3D: {
    id: 'image_to_3d',
    inputOutput: InputOutputTypes.IMAGE_TO_3D,
    description: '从图像生成3D模型'
  },
  TEXT_TO_3D: {
    id: 'text_to_3d',
    inputOutput: InputOutputTypes.TEXT_TO_3D,
    description: '根据文本描述生成3D模型'
  },

  // 查询类
  TASK_QUERY: {
    id: 'task_query',
    inputOutput: InputOutputTypes.TASK_QUERY,
    description: '查询任务状态'
  },
  FILE_UPLOAD: {
    id: 'file_upload',
    inputOutput: InputOutputTypes.FILE_UPLOAD,
    description: '上传文件'
  },

  // Avatar类
  AVATAR_GENERATION: {
    id: 'avatar_generation',
    inputOutput: InputOutputTypes.AVATAR_GENERATION,
    description: '生成数字人形象'
  },
  LIP_SYNC: {
    id: 'lip_sync',
    inputOutput: InputOutputTypes.LIP_SYNC,
    description: '视频口型与音频同步'
  }
}

module.exports = {
  APITypes,
  MediaTypes,
  InputOutputTypes
}
