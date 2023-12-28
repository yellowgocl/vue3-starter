import Layout from '@/components/layout/index.vue'

export default {
  name: 'Event',
  path: '/event',
  redirect: '/event/list',
  component: Layout,
  children: [
    {
      name: 'EventDetail',
      path: ':id',
      component: () => import('@/views/event/Detail.vue'),
      children: [{
        name: 'EventNotFound',
        path: '404',
        component: () => import('@/views/event/404.vue'),
      }],
    },
    {
      name: 'EventList',
      path: 'list',
      component: () => import('@/views/event/List'),
    },
  ],
}
