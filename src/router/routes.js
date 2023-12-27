import Layout from '@/components/layout/index.vue'
export default [
    {
        name: 'Home',
        path: '/',
        component: Layout,
        redirect: '/landing',
        children: [
          {
            name: 'Landing',
            path: 'landing',
            component: () => import('@/views/main/Landing.vue'),
          },
          {
            name: 'Perferences',
            path: '/perferences',
            component: () => import('@/views/main/Perferences'),
            meta: {
                title: '系统设置'
            }
         },
        ]
    },
    {
        name: '404',
        path: '/404',
        component: () => import('@/views/error/404.vue'),
        isHidden: true,
        meta: {
            title: 'Not found'
        }
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