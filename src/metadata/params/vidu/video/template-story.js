/**
 * 模板成片参数定义
 * 支持模型: Vidu Story Template Models
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

module.exports = {
  input: {
    story: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: true,
      description: 'Story template parameter',
      options: ['love_story', 'workday_feels', 'monkey_king', 'pigsy', 'monk_tang', 'one_shot']
    },

    images: {
      type: ParamType.ARRAY,
      elementType: ElementType.IMAGE_UPLOAD,
      required: true,
      description: 'Images for story template video generation',
      maxItems: 7,
      maxSizeMB: 50
    },

    payload: {
      type: ParamType.STRING,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Pass-through parameter',
      maxLength: 1048576
    },

    callback_url: {
      type: ParamType.STRING,
      elementType: ElementType.DEFAULT,
      required: false,
      description: 'Callback URL for task status notification'
    }
  },

  output: {
    task_id: {
      type: ParamType.STRING,
      description: 'Vidu generated task ID',
      path: 'task_id'
    },
    state: {
      type: ParamType.STRING,
      description: 'Processing status',
      path: 'state'
    },
    story: {
      type: ParamType.STRING,
      description: 'Story template parameter used in this call',
      path: 'story'
    },
    images: {
      type: ParamType.ARRAY,
      description: 'Images used',
      path: 'images',
      isResultField: true
    },
    payload: {
      type: ParamType.STRING,
      description: 'Pass-through parameter',
      path: 'payload'
    },
    credits: {
      type: ParamType.NUMBER,
      description: 'Credits used',
      path: 'credits'
    },
    created_at: {
      type: ParamType.STRING,
      description: 'Task creation time',
      path: 'created_at'
    }
  }
}
