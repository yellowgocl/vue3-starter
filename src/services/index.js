// import ServiceDecorator from "./ServiceDecorator";
import axios from '@/config/axios'
import config from './config'
import api from './api'

const fetcher = axios

export { config, api, fetcher as axios }
export default fetcher;
