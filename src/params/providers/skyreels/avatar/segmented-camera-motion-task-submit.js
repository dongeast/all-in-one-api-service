/**
 * Segmented Camera Motion Task Submit 参数定义
 */

const skyreelsCommon = require('../skyreels-common')

module.exports = {
  input: {
    prompt: {
      ...skyreelsCommon.input.prompt,
      maxLength: 512
    },

    first_frame_image: {
      type: 'string',
      required: true,
      description: '视频首帧图片',
      format: 'uri'
    },

    audios: {
      type: 'array',
      required: true,
      description: '音频文件URL列表,支持mp3/wav格式,每个音频时长<=200秒',
      minItems: 1,
      maxItems: 1,
      items: {
        type: 'string',
        format: 'uri',
        description: '音频URL,支持mp3/wav格式'
      }
    },

    traj_type: {
      type: 'enum',
      required: false,
      description: '镜头运动类型',
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
      type: 'number',
      required: false,
      description: '镜头运动幅度',
      min: 0.01,
      max: 1,
      default: 0.8
    },

    camera_control_pro: {
      type: 'array',
      required: false,
      description: '复杂镜头运动参数,支持精确控制多个时间段',
      items: {
        type: 'object',
        properties: {
          start_time: {
            type: 'number',
            required: true,
            description: '镜头运动开始时间（秒）'
          },
          end_time: {
            type: 'number',
            required: true,
            description: '镜头运动结束时间（秒）,-1 表示到视频结束'
          },
          traj_type: {
            type: 'enum',
            required: true,
            description: '第一个镜头运动类型',
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
            type: 'number',
            required: false,
            description: '第一个镜头运动幅度',
            min: 0,
            max: 1,
            default: 0.8
          },
          traj_type_2: {
            type: 'enum',
            required: false,
            description: '第二个镜头运动类型（支持双镜头运动组合）',
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
            type: 'number',
            required: false,
            description: '第二个镜头运动幅度',
            min: 0,
            max: 1
          }
        }
      }
    },

    mode: {
      type: 'enum',
      required: false,
      description: '返回结果的分辨率模式',
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
