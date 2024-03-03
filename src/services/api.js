import { isFunction, lowerCase, reduce } from 'lodash'
import config from './config'
import axios from '@/config/axios'

/**
 * @typedef {object} ApiConfig
 * @property {object | Function} [params] params
 * @property {string|string[]} [urlParams] urlParams
 * @property {('get' | 'post' | 'delete' | 'put')} [method] urlParams
 */

/**
 * @callback ApiCall
 * @param {*} [data] data
 * @param {{ [K in keyof ApiConfig]: ApiConfig[K]}} [outerConfig] config
 * @returns {Promise<*>} result
 */

const parseFunctionValue = val => (isFunction(val) ? val?.() : val)
function parseApi(item) {
  const fetchConfig = item
  if (!fetchConfig)
    return

  const configMethod = lowerCase(fetchConfig?.method || 'get')

  /**
   * @type {ApiCall}
   */
  return async (data, outerConfig) => {
    const parsedUrl = outerConfig?.urlParams ? `${fetchConfig?.url.split(':')?.[0]}${outerConfig?.urlParams}` : fetchConfig?.url

    const outerData = parseFunctionValue(fetchConfig?.data)
    const outerParams = { ...(parseFunctionValue(fetchConfig?.params)), ...(parseFunctionValue(outerConfig?.params)) }
    const method = outerConfig?.method ?? configMethod ?? 'get'
    /**
     * @type {object}
     * @property {object?} data data
     * @property {object} params params
     */
    let parsedDataAndParams = { data: { ...outerData, ...data }, params: outerParams }
    if (method === 'get')
      parsedDataAndParams = { params: { ...outerParams, ...data } }

    const parsedConfig = { ...fetchConfig, url: parsedUrl, ...outerConfig, method, ...parsedDataAndParams }
    const { data: result } = await axios.request(parsedConfig) || {}
    return result
  }
}

function parse() {
  const services = config
  return reduce(services, (r, v, k) => {
    const api = parseApi(v)
    api && (r[k] = api)
    return r
  }, {})
}

export default parse()
