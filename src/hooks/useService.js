import { inject } from 'vue'
import { reduce, isFunction, lowerCase } from 'lodash'
import { axios, config } from '@/services'

const parseFunctionValue = (val) => (isFunction(val) ? val?.() : val)
const parseApi = (item, key) => {
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

const useService = () => {
    const services = inject('services')
    return reduce(services, (r, v, k) => {
        const api = parseApi(v, k)
        api && (r[k] = api)
        return r
    }, {})
}

export default useService;
