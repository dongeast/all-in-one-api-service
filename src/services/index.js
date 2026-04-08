/**
 * Service层入口
 */

const BaseService = require('./base-service')
const OpenAIService = require('./openai-service')
const StabilityService = require('./stability-service')
const ReplicateService = require('./replicate-service')
const GeminiService = require('./gemini-service')
const AnthropicService = require('./anthropic-service')
const MidjourneyService = require('./midjourney-service')
const SkyreelsService = require('./skyreels-service')
const LTXService = require('./ltx-service')
const VolcengineService = require('./volcengine-service')
const CustomService = require('./custom-service')

module.exports = {
  BaseService,
  OpenAI: OpenAIService,
  Stability: StabilityService,
  Replicate: ReplicateService,
  Gemini: GeminiService,
  Anthropic: AnthropicService,
  Midjourney: MidjourneyService,
  Skyreels: SkyreelsService,
  LTX: LTXService,
  Volcengine: VolcengineService,
  Custom: CustomService
}
