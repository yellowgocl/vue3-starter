import services from '@/services/config'

export default (app) => {
    app.provide('services', services)
}