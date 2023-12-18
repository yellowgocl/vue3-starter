// import ServiceDecorator from "./ServiceDecorator";
import axios from '@/config/axios'
import config from './config'

const fetcher = axios

export { config, fetcher as axios }
export default fetcher;
