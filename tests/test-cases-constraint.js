/**
 * 测试 cases 约束功能
 */

const ParamConfigManager = require('../src/params/param-config-manager')

// 模拟 vidu reference-to-image 的参数定义
const testSchema = {
  apiName: 'vidu-ent-v2-reference2image',
  modelName: 'unknown',
  input: {
    model: {
      type: 'enum',
      elementType: 'default',
      required: true,
      description: 'Model to use for generation',
      options: ['viduq2', 'viduq1']
    },
    images: {
      type: 'array',
      elementType: 'image-upload',
      required: false,
      description: 'Image URLs or base64 encoded images',
      maxItems: 7,
      maxSizeMB: 50
    },
    prompt: {
      type: 'string',
      elementType: 'textarea',
      required: true,
      description: 'Text description for generation',
      minLength: 1,
      maxLength: 2000
    },
    seed: {
      type: 'number',
      elementType: 'default',
      required: false,
      description: 'Random seed, 0 for random',
      min: 0,
      max: 2147483647,
      integer: true
    },
    aspect_ratio: {
      type: 'enum',
      elementType: 'ratio',
      required: false,
      description: 'Aspect ratio (viduq1: 16:9, 9:16, 1:1, 3:4, 4:3; viduq2: adds 21:9, 2:3, 3:2, auto)',
      options: ['16:9', '9:16', '1:1', '3:4', '4:3', '21:9', '2:3', '3:2', 'auto'],
      default: '16:9'
    },
    resolution: {
      type: 'enum',
      elementType: 'radio',
      required: false,
      description: 'Resolution (viduq1: 1080p; viduq2: 1080p, 2K, 4K)',
      default: '1080p'
    }
  },
  cases: [
    {
      dependsOn: 'model',
      value: 'viduq2',
      aspect_ratio: {
        type: 'enum',
        elementType: 'ratio',
        required: false,
        description: 'Aspect ratio (viduq1: 16:9, 9:16, 1:1, 3:4, 4:3; viduq2: adds 21:9, 2:3, 3:2, auto)',
        options: ['16:9', '9:16', '1:1', '3:4', '4:3', '21:9', '2:3', '3:2', 'auto'],
        default: '16:9'
      },
      resolution: {
        type: 'enum',
        elementType: 'radio',
        required: false,
        description: 'Resolution (viduq1: 1080p; viduq2: 1080p, 2K, 4K)',
        options: ['1080p', '2K', '4K'],
        default: '1080p'
      }
    },
    {
      dependsOn: 'model',
      value: 'viduq1',
      aspect_ratio: {
        type: 'enum',
        elementType: 'ratio',
        required: false,
        description: 'Aspect ratio (viduq1: 16:9, 9:16, 1:1, 3:4, 4:3; viduq2: adds 21:9, 2:3, 3:2, auto)',
        options: ['16:9', '9:16', '1:1', '3:4', '4:3', 'auto'],
        default: '16:9'
      },
      resolution: {
        type: 'enum',
        elementType: 'radio',
        required: false,
        description: 'Resolution (viduq1: 1080p; viduq2: 1080p, 2K, 4K)',
        options: ['1080p'],
        default: '1080p'
      }
    }
  ]
}

console.log('=== 测试 cases 约束功能 ===\n')

const manager = new ParamConfigManager()

// 测试 1: 推断 affects 字段
console.log('测试 1: 推断 affects 字段')
console.log('-----------------------------------')
const schemaWithAffects = manager.inferAffectsFields(JSON.parse(JSON.stringify(testSchema)))
console.log('model 参数的 affects 字段:', schemaWithAffects.input.model.affects)
console.log('预期: ["aspect_ratio", "resolution"]\n')

// 测试 2: 应用 cases 约束 (model = viduq1)
console.log('测试 2: 应用 cases 约束 (model = viduq1)')
console.log('-----------------------------------')
const context1 = { model: 'viduq1' }
const processedSchema1 = manager.applyCases(JSON.parse(JSON.stringify(schemaWithAffects)), context1)
console.log('aspect_ratio 选项:', processedSchema1.input.aspect_ratio.options)
console.log('预期: ["16:9", "9:16", "1:1", "3:4", "4:3", "auto"]\n')
console.log('resolution 选项:', processedSchema1.input.resolution.options)
console.log('预期: ["1080p"]\n')

// 测试 3: 应用 cases 约束 (model = viduq2)
console.log('测试 3: 应用 cases 约束 (model = viduq2)')
console.log('-----------------------------------')
const context2 = { model: 'viduq2' }
const processedSchema2 = manager.applyCases(JSON.parse(JSON.stringify(schemaWithAffects)), context2)
console.log('aspect_ratio 选项:', processedSchema2.input.aspect_ratio.options)
console.log('预期: ["16:9", "9:16", "1:1", "3:4", "4:3", "21:9", "2:3", "3:2", "auto"]\n')
console.log('resolution 选项:', processedSchema2.input.resolution.options)
console.log('预期: ["1080p", "2K", "4K"]\n')

// 测试 4: 完整流程 (model = viduq1)
console.log('测试 4: 完整流程 (model = viduq1)')
console.log('-----------------------------------')
const paramConfig1 = manager.getParamConfig(testSchema, context1, null, null, {})
console.log('model 参数配置:')
const modelParam1 = paramConfig1.parameters.find(p => p.name === 'model')
console.log('  - affects:', modelParam1.affects)
console.log('  预期: ["aspect_ratio", "resolution"]')

console.log('\naspect_ratio 参数配置:')
const aspectRatioParam1 = paramConfig1.parameters.find(p => p.name === 'aspect_ratio')
console.log('  - options:', aspectRatioParam1.options.map(o => o.value))
console.log('  预期: ["16:9", "9:16", "1:1", "3:4", "4:3", "auto"]')

console.log('\nresolution 参数配置:')
const resolutionParam1 = paramConfig1.parameters.find(p => p.name === 'resolution')
console.log('  - options:', resolutionParam1.options ? resolutionParam1.options.map(o => o.value) : 'undefined')
console.log('  预期: ["1080p"]\n')

// 测试 5: 完整流程 (model = viduq2)
console.log('测试 5: 完整流程 (model = viduq2)')
console.log('-----------------------------------')
const paramConfig2 = manager.getParamConfig(testSchema, context2, null, null, {})
console.log('model 参数配置:')
const modelParam2 = paramConfig2.parameters.find(p => p.name === 'model')
console.log('  - affects:', modelParam2.affects)
console.log('  预期: ["aspect_ratio", "resolution"]')

console.log('\naspect_ratio 参数配置:')
const aspectRatioParam2 = paramConfig2.parameters.find(p => p.name === 'aspect_ratio')
console.log('  - options:', aspectRatioParam2.options.map(o => o.value))
console.log('  预期: ["16:9", "9:16", "1:1", "3:4", "4:3", "21:9", "2:3", "3:2", "auto"]')

console.log('\nresolution 参数配置:')
const resolutionParam2 = paramConfig2.parameters.find(p => p.name === 'resolution')
console.log('  - options:', resolutionParam2.options ? resolutionParam2.options.map(o => o.value) : 'undefined')
console.log('  预期: ["1080p", "2K", "4K"]\n')

console.log('=== 测试完成 ===')
