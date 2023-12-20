import { reduce, isFunction, lowerCase } from 'lodash'
import axios from '@/config/axios'
import config from './config'

const parseFunctionValue = (val) => (isFunction(val) ? val?.() : val)
const parseApi = (item,) => {
    const fetchConfig = item
    if (!fetchConfig) {
        return
    }
    const method = lowerCase(fetchConfig?.method || 'get')

    return async (data, outerConfig) => {
        const outerData = parseFunctionValue(fetchConfig?.data)
        const outerParams = { ...(parseFunctionValue(fetchConfig?.params)), ...(parseFunctionValue(outerConfig?.params)) }
        let parsedDataAndParams = { data: { ...outerData, ...data }, params: outerParams }
        if (method === 'get') {
            parsedDataAndParams = { params: { ...outerParams, ...data } }
        }
        const parsedConfig = { ...fetchConfig, ...outerConfig, method, ...parsedDataAndParams }
        try {
            const { data } = await axios.request(parsedConfig) || {}
            return data
        } catch (error) {
            throw error
        }
    }
}

const parse = () => {
    const services = config
    return reduce(services, (r, v, k) => {
        const api = parseApi(v, k)
        api && (r[k] = api)
        return r
    }, {})
}

export default parse()
