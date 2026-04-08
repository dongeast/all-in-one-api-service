/**
 * 火山引擎查询视频生成任务参数定义
 */

const volcengineCommon = require('../volcengine-common')

module.exports = {
  input: {
    id: {
      type: 'string',
      required: true,
      description: '视频生成任务ID'
    }
  },

  output: {
    id: {
      type: 'string',
      description: '视频生成任务ID',
      path: 'id'
    },

    model: {
      type: 'string',
      description: '使用的模型名称和版本',
      path: 'model'
    },

    status: {
      type: 'string',
      description: '任务状态',
      path: 'status'
    },

    error: {
      type: 'object',
      description: '错误信息',
      path: 'error'
    },

    'error.code': {
      type: 'string',
      description: '错误码',
      path: 'error.code'
    },

    'error.message': {
      type: 'string',
      description: '错误消息',
      path: 'error.message'
    },

    created_at: {
      type: 'number',
      description: '任务创建Unix时间戳（秒）',
      path: 'created_at'
    },

    updated_at: {
      type: 'number',
      description: '任务状态更新Unix时间戳（秒）',
      path: 'updated_at'
    },

    content: {
      type: 'object',
      description: '视频生成输出',
      path: 'content'
    },

    'content.video_url': {
      type: 'string',
      description: '生成的视频URL（mp4格式），有效期24小时',
      path: 'content.video_url'
    },

    'content.last_frame_url': {
      type: 'string',
      description: '最后一帧图像URL，有效期24小时',
      path: 'content.last_frame_url'
    },

    seed: {
      type: 'number',
      description: '本次请求使用的种子值',
      path: 'seed'
    },

    resolution: {
      type: 'string',
      description: '生成的视频分辨率',
      path: 'resolution'
    },

    ratio: {
      type: 'string',
      description: '生成的视频宽高比',
      path: 'ratio'
    },

    duration: {
      type: 'number',
      description: '生成的视频时长（秒）',
      path: 'duration'
    },

    frames: {
      type: 'number',
      description: '生成的视频帧数',
      path: 'frames'
    },

    framespersecond: {
      type: 'number',
      description: '生成的视频帧率',
      path: 'framespersecond'
    },

    generate_audio: {
      type: 'boolean',
      description: '视频是否包含同步音频',
      path: 'generate_audio'
    },

    usage: {
      type: 'object',
      description: 'Token使用信息',
      path: 'usage'
    },

    'usage.completion_tokens': {
      type: 'number',
      description: '视频生成消耗的token数',
      path: 'usage.completion_tokens'
    },

    'usage.total_tokens': {
      type: 'number',
      description: '总消耗token数',
      path: 'usage.total_tokens'
    },

    tools: {
      type: 'array',
      description: '模型实际使用的工具',
      path: 'tools'
    },

    safety_identifier: {
      type: 'string',
      description: '终端用户唯一标识符',
      path: 'safety_identifier'
    },

    draft: {
      type: 'boolean',
      description: '生成的视频是否为草稿',
      path: 'draft'
    },

    draft_task_id: {
      type: 'string',
      description: '草稿视频任务ID',
      path: 'draft_task_id'
    },

    service_tier: {
      type: 'string',
      description: '处理任务使用的服务层级',
      path: 'service_tier'
    },

    execution_expires_after: {
      type: 'number',
      description: '任务超时阈值（秒）',
      path: 'execution_expires_after'
    },

    'usage.tool_usage': {
      type: 'object',
      description: '工具使用信息',
      path: 'usage.tool_usage'
    },

    'usage.tool_usage.web_search': {
      type: 'number',
      description: '网页搜索调用次数',
      path: 'usage.tool_usage.web_search'
    }
  }
}
