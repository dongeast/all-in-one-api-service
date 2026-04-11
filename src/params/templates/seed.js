/**
 * 随机种子模板
 */

module.exports = {
  seed: {
    type: 'number',
    required: false,
    description: 'Random seed',
    min: 0,
    max: 2147483647,
    integer: true
  }
}
