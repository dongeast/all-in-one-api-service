/**
 * 火山引擎3D生成任务参数定义
 * 支持模型: doubao-seed3d-1-0-250928
 */

const { ParamType, ElementType } = require('../../../../constants/param-types')

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
      type: ParamType.ENUM,
      elementType: ElementType.DEFAULT,
      required: true,
      description: 'Model ID or endpoint ID',
      options: ['doubao-seed3d-1-0-250928']
    },

    content: {
      type: ParamType.ARRAY,
      elementType: ElementType.IMAGE_UPLOAD,
      required: true,
      description: '3D generation input content, must contain at least 1 image',
      minItems: 1,
      maxItems: 10,
      maxSizeMB: 10
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
      path: 'id',
      isResultField: true
    }
  },

  cases: [
    {
      dependsOn: 'model',
      value: 'doubao-seed3d-1-0-250928',
      content: {
        type: ParamType.ARRAY,
        elementType: ElementType.IMAGE_UPLOAD,
        required: true,
        description: '3D generation input content, must contain at least 1 image (max 10MB, max 4096x4096)',
        minItems: 1,
        maxItems: 10,
        maxSizeMB: 10
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
    }
  ],

  transform: transform3DParams
}
