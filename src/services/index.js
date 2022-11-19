import ServiceDecorator from "./ServiceDecorator";
import axios from '@/config/axios';
import config from './config'
import reduce from 'lodash/reduce'
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
        let parsedDataParams = { data }
        switch (method) {
            case 'get':
                parsedDataParams = { params: data }
                break;
        }
        const parsedConfig = { ...fetchConfig, ...outerConfig, method, ...parsedDataParams }
        try {
            const { data, ...rest } = await service?.request(parsedConfig) || {}
            return data
        } catch(e) {
            throw e?.response
        }
    }
    return resource
}, {})
export default services