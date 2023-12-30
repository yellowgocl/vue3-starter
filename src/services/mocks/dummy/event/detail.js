import { EVENT_LIST } from './list'

export default async (req) => {
    const { request, params } = req
    const { id } = params || {}
    const current = EVENT_LIST.filter((item) => item.id === id)?.[0]
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        code: current ? 1 : 404,
        data: current,
      }), 2000)
    })
}