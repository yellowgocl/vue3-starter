// import ServiceDecorator from "./ServiceDecorator";
import config from './config'
import api from './api'
import { request as setupRequestInterceptor } from './interceptors'
import axios from '@/config/axios'

setupRequestInterceptor(axios.interceptors)

const fetcher = axios

export { config, api, fetcher as axios }
export default fetcher
