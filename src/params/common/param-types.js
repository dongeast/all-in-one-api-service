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
  INPUT: 'input',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  SLIDER: 'slider',
  UPLOAD: 'upload',
  COLOR_PICKER: 'color-picker',
  DATE_PICKER: 'date-picker',
  SWITCH: 'switch'
}

module.exports = {
  ParamType,
  ElementType
}
