import Layout from '@/components/layout/index.vue'

export default {
  name: 'Ranking',
  path: '/ranking',
  redirect: '/ranking/list/all',
  component: Layout,
  children: [
    {
      name: 'RankingListBase',
      path: 'list',
      redirect: '/ranking/list/all',
    },
    {
      name: 'RankingList',
      path: 'list/:scope',
      component: () => import('@/views/ranking/List'),
    },
  ],
}
