/**
 * TTS-1 参数模式
 */

const ttsCommon = require('./tts-common')

module.exports = {
  input: {
    ...ttsCommon.input,
    model: {
      type: 'enum',
      required: false,
      description: 'TTS模型',
      options: ['tts-1'],
      default: 'tts-1'
    }
  },
  output: ttsCommon.output
}
