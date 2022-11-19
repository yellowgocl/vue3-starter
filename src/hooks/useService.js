import { inject } from 'vue'

const useService = () => {
    const services = inject('services')
    return services
}

export default useService;
