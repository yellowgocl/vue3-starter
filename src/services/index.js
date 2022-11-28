import ServiceDecorator from "./ServiceDecorator";
import axios from '@/config/axios';
import config from './config'
import reduce from 'lodash/reduce'
import isFunction from 'lodash/isFunction'
import lowerCase from 'lodash/lowerCase'

const service = ServiceDecorator.getInstance(axios)
export { service, config }
const services = reduce(config, (resource, configItem, key) => {
    const fetchConfig = configItem
    if (!fetchConfig?.method) {
        console.warn(`method field in the request config is empty, the request will still be sent using the get method. but is this the behavior you expect? current config: ${fetchConfig}`)
    }
    const method = lowerCase(fetchConfig?.method ?? 'get')
    

    resource[key] = async (data, outerConfig) => {
        const outerData = isFunction(fetchConfig?.data) ? fetchConfig?.data() : fetchConfig?.data
        const outerParams = { ...(isFunction(fetchConfig?.params) ? fetchConfig?.params() : fetchConfig?.params), ...outerConfig.params }
        let parsedDataParams = { data: { ...outerData, ...data }, params: outerParams }
        switch (method) {
            case 'get':
                parsedDataParams = { params: { ...outerParams, ...data } }
                break;
        }
        console.info({outerParams, data})
        const parsedConfig = { ...fetchConfig, ...outerConfig, method, ...parsedDataParams }
        try {
            const { data, ...rest } = await service?.request(parsedConfig) || {}
            return data
        } catch(e) {
            throw e?.response || e
        }
    }
    return resource
}, {})
export default services