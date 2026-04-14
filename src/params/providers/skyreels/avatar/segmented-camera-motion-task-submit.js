/**
 * Segmented Camera Motion Task Submit 参数定义
 */

const skyreelsCommon = require('../skyreels-common')
const { ParamType, ElementType } = require('../../../common')

module.exports = {
  input: {
    prompt: {
      ...skyreelsCommon.input.prompt,
      maxLength: 512
    },

    first_frame_image: {
      type: ParamType.STRING,
      elementType: ElementType.UPLOAD,
      required: true,
      description: 'Video first frame image',
      format: 'uri'
    },

    audios: {
      type: ParamType.ARRAY,
      elementType: ElementType.INPUT,
      required: true,
      description: 'Audio file URL list, supports mp3/wav format, each audio duration <= 200 seconds',
      minItems: 1,
      maxItems: 1,
      items: {
        type: ParamType.STRING,
        elementType: ElementType.UPLOAD,
        format: 'uri',
        description: 'Audio URL, supports mp3/wav format'
      }
    },

    traj_type: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: 'Camera motion type',
      options: [
        'static',
        'push_in',
        'push_out',
        'pan_left',
        'pan_right',
        'crane_up',
        'crane_down',
        'swing',
        'left_rotation',
        'right_rotation',
        ''
      ],
      default: ''
    },

    camera_control_strength: {
      type: ParamType.NUMBER,
      elementType: ElementType.SLIDER,
      required: false,
      description: 'Camera motion magnitude',
      min: 0.01,
      max: 1,
      default: 0.8
    },

    camera_control_pro: {
      type: ParamType.ARRAY,
      elementType: ElementType.INPUT,
      required: false,
      description: 'Complex camera motion parameters, supports precise control of multiple time segments',
      itemSchema: {
        type: ParamType.OBJECT,
        properties: {
          start_time: {
            type: ParamType.NUMBER,
            elementType: ElementType.INPUT,
            required: true,
            description: 'Camera motion start time (seconds)'
          },
          end_time: {
            type: ParamType.NUMBER,
            elementType: ElementType.INPUT,
            required: true,
            description: 'Camera motion end time (seconds), -1 means until video ends'
          },
          traj_type: {
            type: ParamType.ENUM,
            elementType: ElementType.SELECT,
            required: true,
            description: 'First camera motion type',
            options: [
              'static',
              'push_in',
              'push_out',
              'pan_left',
              'pan_right',
              'crane_up',
              'crane_down',
              'swing',
              'left_rotation',
              'right_rotation'
            ]
          },
          camera_control_strength: {
            type: ParamType.NUMBER,
            elementType: ElementType.SLIDER,
            required: false,
            description: 'First camera motion magnitude',
            min: 0,
            max: 1,
            default: 0.8
          },
          traj_type_2: {
            type: ParamType.ENUM,
            elementType: ElementType.SELECT,
            required: false,
            description: 'Second camera motion type (supports dual camera motion combination)',
            options: [
              'static',
              'push_in',
              'push_out',
              'pan_left',
              'pan_right',
              'crane_up',
              'crane_down',
              'swing',
              'left_rotation',
              'right_rotation'
            ]
          },
          camera_control_strength_2: {
            type: ParamType.NUMBER,
            elementType: ElementType.SLIDER,
            required: false,
            description: 'Second camera motion magnitude',
            min: 0,
            max: 1
          }
        }
      }
    },

    mode: {
      type: ParamType.ENUM,
      elementType: ElementType.SELECT,
      required: false,
      description: 'Resolution mode for returned results',
      options: ['std', 'pro'],
      default: 'std'
    }
  },

  output: {
    task_id: skyreelsCommon.output.task_id,
    msg: skyreelsCommon.output.msg,
    code: skyreelsCommon.output.code,
    status: skyreelsCommon.output.status,
    trace_id: skyreelsCommon.output.trace_id
  }
}
