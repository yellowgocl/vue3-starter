import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        title: '首页',
      },
      component: () => import('../views/Landing.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
      },
      component: () => import('../views/Login.vue')
    },
    {
      path: '/scanning',
      name: 'scanning',
      meta: {
        title: '扫描合同号归档',
      },
      component: () => import('../views/Scanning.vue')
    },
    {
      path: '/unfiled',
      name: 'unfiled',
      meta: {
        title: '待扫描归档合同查询',
      },
      component: () => import('../views/Unfiled.vue')
    },
    {
      path: '/archived',
      name: 'archived',
      meta: {
        title: '已扫描归档合同查询',
      },
      component: () => import('../views/Archived.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
