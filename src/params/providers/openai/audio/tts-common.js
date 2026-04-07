/**
 * TTS 系列共用参数
 */

const audioCommon = require('../../../common/audio-common')

module.exports = {
  input: {
    ...audioCommon.input,

    model: {
      type: 'enum',
      required: false,
      description: 'TTS模型',
      options: ['tts-1', 'tts-1-hd'],
      default: 'tts-1'
    },

    voice: {
      type: 'enum',
      required: false,
      description: '语音类型',
      options: ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'],
      default: 'alloy'
    }
  },

  output: audioCommon.output
}
