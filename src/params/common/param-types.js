/**
 * 参数类型枚举定义
 * ParamType: 值的数据类型
 * ElementType: UI组件类型
 */

const ParamType = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  ENUM: 'enum',
  ARRAY: 'array',
  OBJECT: 'object',
  FILE: 'file'
}

const ElementType = {
  DEFAULT: 'default',
  INPUT: 'input',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  SLIDER: 'slider',
  UPLOAD: 'upload',
  COLOR_PICKER: 'color-picker',
  DATE_PICKER: 'date-picker',
  SWITCH: 'switch',
  RATIO: 'ratio',
  RESOLUTION: 'resolution',
  IMAGE_UPLOAD: 'image-upload',
  AUDIO_UPLOAD: 'audio-upload',
  CAMERA_MOTION: 'camera-motion',
  THREE_D_CONTENT: '3d-content',
}

module.exports = {
  ParamType,
  ElementType
}
