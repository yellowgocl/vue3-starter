export default [
    {
        path: '/event',
        component: () => import('@/views/event/Event.vue'),
        children: [
          {
            // 当 /user/:id/profile 匹配成功，
            // UserProfile 会被渲染在 User 的 <router-view> 中
            path: ':id',
            component: () => import('@/views/event/Detail.vue'),
            children:[{
              // 当 /user/:id/profile 匹配成功，
              // UserProfile 会被渲染在 User 的 <router-view> 中
              path: '404',
              component: () => import('@/views/event/404.vue')
            }],
          },
          {
            // 当 /user/:id/posts 匹配成功
            // UserPosts 会被渲染在 User 的 <router-view> 中
            path: '',
            component: () => import('@/views/event/List.vue')
          }
        ]
      }
]