/**
 * Service层入口
 */

const BaseService = require('./base-service')
const SkyreelsService = require('./skyreels-service')
const LTXService = require('./ltx-service')
const VolcengineService = require('./volcengine-service')
const MurekaService = require('./mureka-service')
const CustomService = require('./custom-service')

module.exports = {
  BaseService,
  Skyreels: SkyreelsService,
  LTX: LTXService,
  Volcengine: VolcengineService,
  Mureka: MurekaService,
  Custom: CustomService
}
