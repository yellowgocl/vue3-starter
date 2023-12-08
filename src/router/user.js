export default [
    {
        path: '/user',
        component: () => import('@/views/user/User.vue'),
        redirect: (_) => '/login',
        children: [
            {
                path: 'profile',
                component: () => import('@/views/user/Profile.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'edit',
                component: () => import('@/views/user/Edit.vue'),
                meta: { requiresAuth: true }
            },
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/user/Login.vue'),
    }
]