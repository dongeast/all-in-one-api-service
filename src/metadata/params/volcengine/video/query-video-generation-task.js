/**
 * 火山引擎查询视频生成任务参数定义
 * 支持模型: Seedance 2.0, Seedance 2.0 fast, Seedance 1.5 pro,
 *          Seedance 1.0 pro, Seedance 1.0 pro fast, Seedance 1.0 lite
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: true,
      description: 'Video generation task ID'
    }
  },

  output: {
    id: {
      type: 'string',
      description: 'Video generation task ID',
      path: 'id'
    },

    model: {
      type: 'string',
      description: 'Model name and version used',
      path: 'model'
    },

    status: {
      type: 'string',
      description: 'Task status: queued, running, cancelled, succeeded, failed, expired',
      path: 'status'
    },

    error: {
      type: 'object',
      description: 'Error information',
      path: 'error'
    },

    'error.code': {
      type: 'string',
      description: 'Error code',
      path: 'error.code'
    },

    'error.message': {
      type: 'string',
      description: 'Error message',
      path: 'error.message'
    },

    created_at: {
      type: 'number',
      description: 'Task creation Unix timestamp (seconds)',
      path: 'created_at'
    },

    updated_at: {
      type: 'number',
      description: 'Task status update Unix timestamp (seconds)',
      path: 'updated_at'
    },

    content: {
      type: 'object',
      description: 'Video generation output',
      path: 'content',
      isResultField: true
    },

    'content.video_url': {
      type: 'string',
      description: 'Generated video URL (mp4 format), valid for 24 hours',
      path: 'content.video_url',
      isResultField: true
    },

    'content.last_frame_url': {
      type: 'string',
      description: 'Last frame image URL, valid for 24 hours',
      path: 'content.last_frame_url',
      isResultField: true
    },

    seed: {
      type: 'number',
      description: 'Seed value used for this request',
      path: 'seed'
    },

    resolution: {
      type: 'string',
      description: 'Generated video resolution',
      path: 'resolution'
    },

    ratio: {
      type: 'string',
      description: 'Generated video aspect ratio',
      path: 'ratio'
    },

    duration: {
      type: 'number',
      description: 'Generated video duration (seconds)',
      path: 'duration'
    },

    frames: {
      type: 'number',
      description: 'Generated video frame count',
      path: 'frames'
    },

    framespersecond: {
      type: 'number',
      description: 'Generated video frame rate',
      path: 'framespersecond'
    },

    generate_audio: {
      type: 'boolean',
      description: 'Whether video contains synchronized audio',
      path: 'generate_audio'
    },

    usage: {
      type: 'object',
      description: 'Token usage information',
      path: 'usage'
    },

    'usage.completion_tokens': {
      type: 'number',
      description: 'Tokens consumed for video generation',
      path: 'usage.completion_tokens'
    },

    'usage.total_tokens': {
      type: 'number',
      description: 'Total tokens consumed',
      path: 'usage.total_tokens'
    },

    tools: {
      type: 'array',
      description: 'Tools actually used by the model',
      path: 'tools'
    },

    safety_identifier: {
      type: 'string',
      description: 'End user unique identifier',
      path: 'safety_identifier'
    },

    draft: {
      type: 'boolean',
      description: 'Whether the generated video is a draft',
      path: 'draft'
    },

    draft_task_id: {
      type: 'string',
      description: 'Draft video task ID',
      path: 'draft_task_id'
    },

    service_tier: {
      type: 'string',
      description: 'Service tier used for processing task',
      path: 'service_tier'
    },

    execution_expires_after: {
      type: 'number',
      description: 'Task timeout threshold (seconds)',
      path: 'execution_expires_after'
    },

    'usage.tool_usage': {
      type: 'object',
      description: 'Tool usage information',
      path: 'usage.tool_usage'
    },

    'usage.tool_usage.web_search': {
      type: 'number',
      description: 'Number of web search calls',
      path: 'usage.tool_usage.web_search'
    }
  }
}
