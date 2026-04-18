# 测试文档

## 测试概述

本测试套件针对 All-in-One API Service 框架重构计划编写，覆盖了所有核心模块的功能测试、性能测试和集成测试。

## 测试结构

```
tests/
├── setup.ts                          # Jest 测试设置文件
├── helpers/
│   └── test-utils.ts                 # 测试工具函数和模拟数据
├── utils/
│   └── i18n-manager.test.ts          # 多语言管理器测试
├── credits/
│   └── credit-registry.test.ts       # 积分注册中心测试
├── registry/
│   ├── unified-registry.test.ts      # 统一注册中心测试
│   ├── api-registry.test.ts          # API 注册中心测试
│   └── model-registry.test.ts        # 模型注册中心测试
├── functions/
│   └── function-registry.test.ts     # Function 注册中心测试
├── query/
│   └── metadata-query.test.ts        # 元数据查询接口测试
├── services/
│   └── service-registry.test.ts      # 服务注册中心测试
├── integration/
│   └── integration.test.ts           # 集成测试
└── run-tests.js                      # 测试运行脚本
```

## 测试覆盖范围

### 1. 多语言翻译系统测试 (I18nManager)

**测试模块**: `tests/utils/i18n-manager.test.ts`

**测试内容**:
- ✅ 构造函数和配置
- ✅ 翻译资源注册
- ✅ Request 语言提取
- ✅ Accept-Language Header 解析
- ✅ 翻译功能（简单键、嵌套键、参数替换）
- ✅ 翻译缓存机制
- ✅ 元数据翻译
- ✅ 参数配置翻译
- ✅ 性能测试（翻译查询 < 1ms）

**测试用例数**: 50+

### 2. 积分计算系统测试

**测试模块**: `tests/credits/credit-registry.test.ts`

**测试内容**:
- ✅ 积分配置注册
- ✅ API 积分配置查询
- ✅ 模型倍率管理
- ✅ 默认积分配置
- ✅ 分辨率、时长、质量倍率
- ✅ 积分配置验证
- ✅ 性能测试（查询 < 1ms）

**测试用例数**: 40+

### 3. 注册系统测试

#### 3.1 统一注册中心

**测试模块**: `tests/registry/unified-registry.test.ts`

**测试内容**:
- ✅ 初始化流程
- ✅ Provider 注册
- ✅ 批量注册
- ✅ 数据验证
- ✅ 统计信息
- ✅ 性能测试（初始化 < 100ms）

**测试用例数**: 30+

#### 3.2 API 注册中心

**测试模块**: `tests/registry/api-registry.test.ts`

**测试内容**:
- ✅ 按类型、模型、Provider、标签查询
- ✅ 最佳 API 选择
- ✅ Endpoint 和 Method 管理
- ✅ 参数 Schema 管理
- ✅ 性能测试（查询 < 2ms）

**测试用例数**: 35+

#### 3.3 模型注册中心

**测试模块**: `tests/registry/model-registry.test.ts`

**测试内容**:
- ✅ 按类型、Provider、系列查询
- ✅ 标签过滤
- ✅ 类型系列组合查询
- ✅ 性能测试（查询 < 2ms）

**测试用例数**: 25+

#### 3.4 Function 注册中心

**测试模块**: `tests/functions/function-registry.test.ts`

**测试内容**:
- ✅ Function 注册和 API 映射
- ✅ 按类型、模型、Provider 查询
- ✅ API 关联查询
- ✅ Request/Query API 识别
- ✅ 性能测试（查询 < 2ms）

**测试用例数**: 35+

### 4. 查询系统测试

**测试模块**: `tests/query/metadata-query.test.ts`

**测试内容**:
- ✅ API、Model、Function 查询
- ✅ 关联查询
- ✅ 批量查询
- ✅ 搜索功能
- ✅ 积分配置查询
- ✅ 多语言翻译集成
- ✅ 性能测试（查询 < 2ms）

**测试用例数**: 40+

### 5. 服务层测试

**测试模块**: `tests/services/service-registry.test.ts`

**测试内容**:
- ✅ 服务注册
- ✅ 服务实例获取和缓存
- ✅ 按 API 和 Function 获取服务
- ✅ 实例缓存管理
- ✅ 性能测试（获取 < 1ms）

**测试用例数**: 30+

### 6. 集成测试

**测试模块**: `tests/integration/integration.test.ts`

**测试内容**:
- ✅ 完整初始化流程
- ✅ 多语言翻译集成
- ✅ 积分计算集成
- ✅ 服务注册集成
- ✅ 完整查询流程
- ✅ 错误处理
- ✅ 数据一致性
- ✅ 性能测试（初始化 < 200ms）

**测试用例数**: 20+

## 运行测试

### 运行所有测试

```bash
npm test
```

### 运行特定模块测试

```bash
# 多语言翻译测试
node tests/run-tests.js i18n

# 积分系统测试
node tests/run-tests.js credits

# 注册系统测试
node tests/run-tests.js registry

# 查询系统测试
node tests/run-tests.js query

# 服务层测试
node tests/run-tests.js services

# 集成测试
node tests/run-tests.js integration
```

### 运行测试覆盖率

```bash
npm run test:coverage
```

### 运行监视模式

```bash
npm run test:watch
```

## 测试覆盖率目标

根据重构计划的验收标准，测试覆盖率目标为：

- **单元测试覆盖率**: > 80%
- **分支覆盖率**: > 70%
- **函数覆盖率**: > 70%
- **行覆盖率**: > 70%

## 性能验收标准

所有性能测试均符合重构计划的要求：

- ✅ 初始化时间 < 100ms
- ✅ 翻译查询 < 1ms
- ✅ 积分计算 < 5ms
- ✅ 元数据查询 < 2ms

## 测试工具

### 测试框架
- **Jest**: 主要测试框架
- **ts-jest**: TypeScript 支持

### 测试工具函数

`tests/helpers/test-utils.ts` 提供了以下工具函数：

- `createMockAPI()`: 创建模拟 API 元数据
- `createMockModel()`: 创建模拟 Model 元数据
- `createMockFunction()`: 创建模拟 Function 元数据
- `createMockCreditConfig()`: 创建模拟积分配置
- `createMockTranslations()`: 创建模拟翻译资源
- `createMockRequest()`: 创建模拟 Request 对象
- `sleep()`: 异步等待函数
- `createTestRegistry()`: 创建测试用注册中心实例
- `clearRegistry()`: 清理注册中心

## 自定义 Jest 匹配器

在 `tests/setup.ts` 中定义了以下自定义匹配器：

### `toBeValidRegistry()`

验证对象是否为有效的注册中心：

```typescript
expect(apiRegistry).toBeValidRegistry()
```

### `toBeValidI18nManager()`

验证对象是否为有效的 I18n 管理器：

```typescript
expect(i18nManager).toBeValidI18nManager()
```

## 最佳实践

### 1. 测试隔离

每个测试文件都使用 `beforeEach` 和 `afterEach` 钩子确保测试隔离：

```typescript
beforeEach(() => {
  registry = new Registry()
})

afterEach(() => {
  registry.clear()
})
```

### 2. 性能测试

所有模块都包含性能测试，确保符合性能要求：

```typescript
test('查询应该小于 2ms', () => {
  const start = Date.now()
  // 执行查询
  const duration = Date.now() - start
  expect(duration).toBeLessThan(2)
})
```

### 3. 错误处理测试

测试各种边界情况和错误场景：

```typescript
test('当数据不存在时应该返回 null', () => {
  const result = registry.get('nonexistent')
  expect(result).toBeNull()
})
```

### 4. 集成测试

测试模块间的协作和数据一致性：

```typescript
test('应该保持 API 和 Function 的关联一致性', async () => {
  await unifiedRegistry.initialize(options)
  
  const func = unifiedRegistry.functionRegistry.getByAPI('api-1')
  expect(func).not.toBeNull()
})
```

## 持续集成

建议在 CI/CD 流程中添加以下测试步骤：

```yaml
# .github/workflows/test.yml
- name: Run tests
  run: npm test

- name: Run coverage
  run: npm run test:coverage

- name: Upload coverage
  uses: codecov/codecov-action@v2
```

## 总结

本测试套件全面覆盖了框架重构计划中的所有核心模块，包括：

1. **多语言翻译系统**: 50+ 测试用例
2. **积分计算系统**: 40+ 测试用例
3. **注册系统**: 125+ 测试用例
4. **查询系统**: 40+ 测试用例
5. **服务层**: 30+ 测试用例
6. **集成测试**: 20+ 测试用例

总计 **300+ 测试用例**，确保框架的稳定性、性能和可靠性。
