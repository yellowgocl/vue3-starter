export default [
    {
        path: '/',
        component: () => import('@/views/Main.vue'),
    },
    {
        name: 'Login',
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        isHidden: true,
        meta: {
          title: '登录页',
        },
    },
]

export const NOT_FOUND_ROUTE = {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    isHidden: true,
}
  
export const EMPTY_ROUTE = {
    name: 'Empty',
    path: '/:pathMatch(.*)*',
    component: null,
}

const modules = import.meta.glob('@/views/**/route.js', { eager: true })
const asyncRoutes = []
Object.keys(modules).forEach((key) => {
  asyncRoutes.push(modules[key].default)
})

export { asyncRoutes }