/**
 * 火山引擎3D生成任务参数定义
 */

const volcengineCommon = require('../volcengine-common')
const modelCapabilities = require('../model-capabilities')
const { ParamType, ElementType } = require('../../../common')

/**
 * 自定义参数转换函数
 * 将 subdivisionlevel 和 fileformat 转换为 content 数组中的 text 项
 */
function transform3DParams(params) {
  const { content, subdivisionlevel, fileformat, ...rest } = params
  
  if (!content || !Array.isArray(content)) {
    return params
  }
  
  const newContent = [...content]
  
  if (subdivisionlevel || fileformat) {
    const textParts = []
    
    if (subdivisionlevel) {
      textParts.push(`--subdivisionlevel ${subdivisionlevel}`)
    }
    
    if (fileformat) {
      textParts.push(`--fileformat ${fileformat}`)
    }
    
    if (textParts.length > 0) {
      newContent.push({
        type: 'text',
        text: textParts.join(' ')
      })
    }
  }
  
  return {
    ...rest,
    content: newContent
  }
}

module.exports = {
  input: {
    model: {
      ...volcengineCommon.input.model,
      description: 'Model ID or endpoint ID (must be doubao-seed3d-1-0-250928)'
    },

    content: {
      type: ParamType.ARRAY,
      required: true,
      description: '3D generation input content, must contain at least 1 image',
      minItems: 1,
      maxItems: 10,
      items: {
        oneOf: [
          {
            type: 'image_url',
            label: '图片',
            required: true,
            description: 'Image content for 3D generation',
            fields: {
              image_url: {
                type: ParamType.OBJECT,
                label: '图片信息',
                fields: {
                  url: {
                    type: ParamType.STRING,
                    elementType: ElementType.IMAGE_UPLOAD,
                    label: '上传图片',
                    required: true,
                    description: 'Image URL or Base64 encoding',
                    maxSizeMB: 10,
                    accept: 'image/*,.jpg,.jpeg,.png,.webp,.bmp'
                  }
                }
              }
            }
          },
          {
            type: 'text',
            label: '文本参数',
            required: false,
            description: 'Text commands for 3D generation',
            fields: {
              text: {
                type: ParamType.STRING,
                elementType: ElementType.TEXTAREA,
                label: '文本命令',
                required: true,
                description: 'Model text commands',
                placeholder: '--subdivisionlevel medium --fileformat obj',
                rows: 3
              }
            }
          }
        ]
      }
    },

    subdivisionlevel: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: '3D file polygon face count',
      default: 'medium',
      options: [
        { value: 'high', label: 'High (200,000 faces)' },
        { value: 'medium', label: 'Medium (100,000 faces)' },
        { value: 'low', label: 'Low (30,000 faces)' }
      ]
    },

    fileformat: {
      type: ParamType.ENUM,
      elementType: ElementType.RADIO,
      required: false,
      description: 'Generated 3D file format',
      default: 'glb',
      options: ['glb', 'obj', 'usd', 'usdz']
    }
  },

  output: {
    id: {
      type: 'string',
      description: '3D generation task ID, valid for 7 days',
      path: 'id'
    }
  },

  modelCapabilities,

  transform: transform3DParams
}
