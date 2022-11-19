import { inject } from 'vue'

const useAxios = () => {
    const axios = inject('service')
    return axios
}

export default useAxios;
