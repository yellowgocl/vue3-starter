import Layout from '@/components/layout/index.vue'
export default {
  name: 'Event',
  path: '/event',
  component: Layout,
  children: [
    {
      path: ':id',
      component: () => import('@/views/event/Detail.vue'),
      children:[{
        path: '404',
        component: () => import('@/views/event/404.vue')
      }],
    },
    {
      path: '',
      component: () => import('@/views/event/List.vue')
    }
  ]
}
