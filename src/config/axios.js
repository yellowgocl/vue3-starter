import axios from 'axios'
const config = {
    baseURL: '',
    timeout: 10000,
    debug: import.meta.env.PROD
}
const instance = axios.create(config)
export default instance