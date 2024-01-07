import { auth, common } from '@/utils'

const { getToken } = auth
const { isNullOrWhitespace } = common

const WHITE_LIST = ['/', '/perferences', '/landing', '/login', '/404', '/event', '/event/list', 'EventDetail']
export function createPermissionGuard(router) {
  router.beforeEach(async (to) => {
    const token = getToken()
    /** 没有token的情况 */
    if (isNullOrWhitespace(token))
      return (WHITE_LIST.includes(to.path) || WHITE_LIST.includes(to.name)) || { path: '/login', query: { ...to.query, redirect: to.path } }

    /** 有token的情况 */
    if (to.path === '/login')
      return { path: '/' }

    // refreshAccessToken()
    return true
  })
}
