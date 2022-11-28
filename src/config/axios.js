import axios from 'axios'
const config = {
    baseURL: import.meta.env.VITE_API_PROXY_URL || import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    debug: import.meta.env.PROD
}
const instance = axios.create(config)
export default instance