import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import common, { EMPTY_ROUTE, NOT_FOUND_ROUTE } from './routes'
import setupRouterGuard from './guard'
import { usePermissionStore, useUserStore } from '@/store'
import { auth as authUtil, common as commonUtil } from '@/utils'

const { isNullOrWhitespace } = commonUtil
const { getToken } = authUtil
const isHash = import.meta.env.VITE_USE_HASH === 'true'
const basicRoutes = [...common]
export const router = new createRouter({
  history: isHash ? createWebHashHistory('/') : createWebHistory('/'),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
function getRouteName(route) {
  const names = [route.name]
  if (route.children && route.children.length)
    names.push(...route.children.map(item => getRouteName(item)).flat(1))

  return names
}
export const getRouteNames = routes => (routes.map(route => getRouteName(route)).flat(1))

export async function resetRouter() {
  const basicRouteNames = getRouteNames(basicRoutes)
  router.getRoutes().forEach((route) => {
    const name = route.name
    if (!basicRouteNames.includes(name))
      router.removeRoute(name)
  })
}

export async function addDynamicRoutes() {
  const token = getToken()
  // token invalid
  if (isNullOrWhitespace(token)) {
    router.addRoute(EMPTY_ROUTE)
    return
  }

  // valid
  const userStore = useUserStore()
  try {
    const permissionStore = usePermissionStore()
    !userStore.id && (await userStore.getUserInfo())
    const accessRoutes = permissionStore.generateRoutes(userStore.role)
    accessRoutes.forEach((route) => {
      !router.hasRoute(route.name) && router.addRoute(route)
    })
    router.hasRoute(EMPTY_ROUTE.name) && router.removeRoute(EMPTY_ROUTE.name)
    router.addRoute(NOT_FOUND_ROUTE)
    console.log('Login success', router.getRoutes())
  }
  catch (error) {
    console.error(error)
    // $message.error('fail to initial' + error)
    userStore.logout()
  }
}

export default async (app) => {
  await addDynamicRoutes()
  setupRouterGuard(router)
  app.use(router)
}
