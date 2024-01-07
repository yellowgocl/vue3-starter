import { router } from '@/router'
import { useUserStore } from '@/store'
import { auth as authUtil, common as commonUtil } from '@/utils'

const { isNullOrWhitespace } = commonUtil
const { getToken } = authUtil

/**
 *
 * @param {AxiosRequestConfig} config
 * @returns
 */
export async function useRequestAuthHeader(config) {
  const token = getToken()
  const isRequireAuth = config?.meta?.requireAuth
  if (isNullOrWhitespace(token) && isRequireAuth) {
    const userStore = useUserStore()
    userStore.logout()
    const to = router.currentRoute.value
    router.push({ path: '/login', query: { ...to.query, redirect: to.path } })
    return config
  }
  else { config.headers.Authorization = token }
  return config
}

export default (interceptors) => {
  interceptors?.request?.use?.(useRequestAuthHeader)
}
