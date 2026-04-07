/**
 * OpenAI 音频参数入口
 */

const ttsCommon = require('./tts-common')
const tts1 = require('./tts-1')
const whisper1 = require('./whisper-1')

module.exports = {
  ttsCommon,
  tts1,
  whisper1
}
