import services from '@/services/api'

export default (app) => {
  app.provide('api', services)
}
