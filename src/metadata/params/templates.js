/**
 * 参数模板定义
 */

const { ParamType, ElementType } = require('./common')

const textPrompt = {
  prompt: {
    type: ParamType.STRING,
    elementType: ElementType.TEXTAREA,
    required: true,
    description: 'Text prompt for generation'
  }
}

const imagePrompt = {
  prompt: {
    type: ParamType.STRING,
    elementType: ElementType.TEXTAREA,
    required: true,
    description: 'Image generation prompt'
  }
}

const videoPrompt = {
  prompt: {
    type: ParamType.STRING,
    elementType: ElementType.TEXTAREA,
    required: true,
    description: 'Video generation prompt'
  }
}

const audioPrompt = {
  prompt: {
    type: ParamType.STRING,
    elementType: ElementType.TEXTAREA,
    required: true,
    description: 'Audio generation prompt'
  }
}

const taskId = {
  task_id: {
    type: ParamType.STRING,
    required: true,
    description: 'Task ID'
  }
}

const imageUrl = {
  image_url: {
    type: ParamType.STRING,
    required: true,
    description: 'Image URL'
  }
}

const videoUrl = {
  video_url: {
    type: ParamType.STRING,
    required: true,
    description: 'Video URL'
  }
}

const audioUrl = {
  audio_url: {
    type: ParamType.STRING,
    required: true,
    description: 'Audio URL'
  }
}

module.exports = {
  textPrompt,
  imagePrompt,
  videoPrompt,
  audioPrompt,
  taskId,
  imageUrl,
  videoUrl,
  audioUrl
}
