// import ServiceDecorator from "./ServiceDecorator";
import config from './config'
import api from './api'
import axios from '@/config/axios'

const fetcher = axios

export { config, api, fetcher as axios }
export default fetcher
