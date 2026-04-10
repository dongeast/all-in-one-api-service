/**
 * Add Upload Part 参数定义
 */

const murekaCommon = require('../mureka-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    upload_id: {
      type: ParamType.STRING,
      elementType: ElementType.INPUT,
      required: true,
      description: '上传任务ID'
    },

    file: {
      type: ParamType.FILE,
      elementType: ElementType.UPLOAD,
      required: true,
      description: '文件对象(二进制)',
      constraints: {
        maxSize: 10 * 1024 * 1024,
        formats: ['mp3', 'm4a'],
        minDuration: 30,
        maxDuration: 270
      }
    }
  },

  output: {
    id: {
      type: 'string',
      description: '上传部分ID',
      path: 'id'
    },

    upload_id: {
      type: 'string',
      description: '上传任务ID',
      path: 'upload_id'
    },

    created_at: {
      type: 'number',
      description: '创建时间戳(秒)',
      path: 'created_at'
    }
  }
}
