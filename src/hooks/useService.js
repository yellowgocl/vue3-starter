import { inject } from 'vue'
// import { reduce } from 'lodash'
// import useError from './useError'

const useService = () => {
    const services = inject('services')
    // const setError = useError()
    
    return services
}

export default useService;
