/**
 * Fetch Polyfill
 * 为Node.js 16及以下版本提供fetch支持
 */

let fetchImpl = null
let HeadersImpl = null
let RequestImpl = null
let ResponseImpl = null
let FormDataImpl = null

/**
 * 初始化fetch实现
 */
function initFetch() {
  if (fetchImpl) {
    return
  }

  if (typeof fetch === 'function') {
    fetchImpl = fetch
    HeadersImpl = Headers
    RequestImpl = Request
    ResponseImpl = Response
    FormDataImpl = typeof FormData !== 'undefined' ? FormData : null
    return
  }

  try {
    const nodeFetch = require('node-fetch')
    fetchImpl = nodeFetch.default || nodeFetch
    HeadersImpl = nodeFetch.Headers || globalThis.Headers
    RequestImpl = nodeFetch.Request || globalThis.Request
    ResponseImpl = nodeFetch.Response || globalThis.Response
    FormDataImpl = nodeFetch.FormData || null
  } catch (e) {
    throw new Error(
      'fetch is not available. Please use Node.js 18+ or install node-fetch: npm install node-fetch'
    )
  }
}

/**
 * 获取fetch函数
 * @returns {Function} fetch函数
 */
function getFetch() {
  initFetch()
  return fetchImpl
}

/**
 * 获取Headers类
 * @returns {Function} Headers类
 */
function getHeaders() {
  initFetch()
  return HeadersImpl
}

/**
 * 获取Request类
 * @returns {Function} Request类
 */
function getRequest() {
  initFetch()
  return RequestImpl
}

/**
 * 获取Response类
 * @returns {Function} Response类
 */
function getResponse() {
  initFetch()
  return ResponseImpl
}

/**
 * 获取FormData类
 * @returns {Function|null} FormData类
 */
function getFormData() {
  initFetch()
  return FormDataImpl
}

/**
 * 兼容性fetch调用
 * @param {...any} args - fetch参数
 * @returns {Promise<Response>} fetch响应
 */
async function compatibleFetch(...args) {
  const fetch = getFetch()
  return fetch(...args)
}

module.exports = {
  getFetch,
  getHeaders,
  getRequest,
  getResponse,
  getFormData,
  compatibleFetch,
  fetch: compatibleFetch
}
