import Layout from '@/components/layout/index.vue'
export default {
    name: "User",
    path: '/user',
    component: Layout,
    redirect: '/user/profile',
    meta: {
        requireAuth: true,
        role: ['admin'],
    },
    children: [
        {
            path: 'profile',
            component: () => import('./Profile.vue'),
            meta: {
                title: '个人资料',
                requireAuth: true,
                role: ['admin'],
            }
        },
        {
            path: 'edit',
            component: () => import('./Edit.vue'),
            meta: {
                title: '编辑个人资料',
                requireAuth: true,
                role: ['admin'],
            }
        }
    ]
}