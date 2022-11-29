import { inject } from 'vue'
import { reduce } from 'lodash'

const useService = () => {
    const services = inject('services')
    return reduce(services, (r, v, k) => {
        const api = async (data, options = {}) => {
            const { statusKey = 'resultCode', status = ['1'], ...rest } = options
            try {
                const response = await v(data, rest)
                const isValid = [].concat(status).filter(Boolean).some((v) => response[statusKey] === v)
                if (!response || !isValid) throw response

                return response
            } catch (e) {
                console.error(e)
                throw e
            }
        }
        r[k] = api
        return r
    }, {})
}

export default useService;
