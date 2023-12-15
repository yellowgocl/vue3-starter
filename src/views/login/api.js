// import { request } from '@/utils'

export default {
  login: (data) => setTimeout(() => Promise.reject({ data: { token: '123456' } }), 1000) // request.post('/auth/login', data, { noNeedToken: true }),
}
