import Layout from '@/components/layout/index.vue'

export default {
  name: 'User',
  path: '/user',
  component: Layout,
  redirect: '/user/profile',
  meta: {
    requireAuth: true,
    role: ['admin', 'player'],
  },
  children: [
    {
      name: 'UserProfile',
      path: 'profile',
      component: () => import('./Profile.vue'),
      meta: {
        title: '个人资料',
        requireAuth: true,
        role: ['admin', 'player'],
      },
    },
    {
      name: 'UserEdit',
      path: 'edit',
      component: () => import('./Edit'),
      meta: {
        pageHeader: {
          actions: { hidden: true },
        },
        title: '编辑个人资料',
        requireAuth: true,
        role: ['admin', 'player'],
      },
    },
    {
      name: 'UserSupplement',
      path: 'supplement',
      component: () => import('./Supplement'),
      meta: {
        pageHeader: {
          actions: { hidden: true },
        },
        title: 'user.supplement.title',
        requireAuth: true,
        role: ['admin', 'player'],
      },
    },
  ],
}
