import Layout from '@/components/layout/index.vue'
import api from '@/services/api'

async function _checkHasJoinedEvent(to, _from) {
  let result
  if (to?.name === 'EventDetail') {
    try {
      await api['event/joined'](null, { urlParams: to?.params?.id })
      result = ({ name: 'EventJoined', params: to?.params })
    }
    catch (e) {
      console.error(e)
    }
  }
  return result
}

export default {
  name: 'Event',
  path: '/event',
  redirect: '/event/list',
  component: Layout,
  children: [
    {
      name: 'EventDetail',
      path: ':id',
      beforeEnter: async (to, from, next) => {
        const data = await _checkHasJoinedEvent(to, from)
        next(data)
      },
      component: () => import('@/views/event/Detail'),
    },
    {
      name: 'EventJoined',
      path: 'joined/:id',
      component: () => import('@/views/event/Joined'),
      meta: {

      },
    },
    {
      name: 'EventList',
      path: 'list',
      component: () => import('@/views/event/List'),
    },
  ],
}
