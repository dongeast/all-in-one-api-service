/**
 * Service层入口
 */

const BaseService = require('./base-service')
const SkyreelsService = require('./skyreels-service')
const LightricksService = require('./lightricks-service')
const VolcengineService = require('./volcengine-service')
const MurekaService = require('./mureka-service')
const ViduService = require('./vidu-service')
const CustomService = require('./custom-service')
const serviceRegistry = require('./service-registry')

module.exports = {
  BaseService,
  Skyreels: SkyreelsService,
  LTX: LightricksService,
  Lightricks: LightricksService,
  Volcengine: VolcengineService,
  Mureka: MurekaService,
  Vidu: ViduService,
  Custom: CustomService,
  serviceRegistry,
  ServiceRegistry: serviceRegistry.ServiceRegistry
}
