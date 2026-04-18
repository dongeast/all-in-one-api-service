/**
 * Query 模块入口
 */

const metadataQuery = require('./metadata-query')

module.exports = {
  metadataQuery,
  MetadataQuery: metadataQuery.MetadataQuery
}
