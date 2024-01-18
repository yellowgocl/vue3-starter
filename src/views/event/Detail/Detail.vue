<script setup>
import { WhoJoinedView } from '../components'
import EventDetailSkeleton from './Skeleton.vue'
import { useService } from '@/hooks'
import { event as EventUtil } from '@/utils'

const [getEvent, getEventState, getEventActions] = useService('event/detail')
const [joinEvent, joinEventState] = useService('event/join')
const route = useRoute()
const router = useRouter()
const { params } = route || {}
const result = computed(() => getEventState.value.result)
const data = computed(() => EventUtil.parseData(result?.value?.data))

onMounted(async () => {
  try {
    const eventId = params?.id
    await getEvent(null, { urlParams: eventId })
  }
  catch (e) {
    console.error(e)
  }
})
onBeforeUnmount(async () => {
  await getEventActions?.cancel?.()
})

async function onClick() {
  const { code } = await joinEvent(null, { urlParams: params?.id })
  const flag = code === 1
  if (flag) {
    const _route = ({ name: 'EventJoined', params: params?.id, replace: true })
    router.push(_route)
  }
}
</script>

<template>
  <EventDetailSkeleton v-if="getEventState?.isPending" />
  <common-page v-else :title="data?.name">
    <router-view v-if="result?.code === 404" />
    <n-space v-else vertical size="large">
      <n-image width="100%" class="min-h-[200px]" :src="data?.image" rounded-2 alt="event_banner" />
      <n-space vertical size="large" w-full rounded-sm bg-gray-100 dark:bg-gray-800>
        <n-space vertical pa-4 size="large">
          <WhoJoinedView :event="data" />
          <div flex items-center>
            <n-icon circle mr-1 size="18">
              <icon-mdi-date-range />
            </n-icon>
            <span text-md>{{ data?.matchDay }}</span>
          </div>
          <div flex items-center>
            <n-icon circle mr-1 size="18">
              <icon-mdi-google-maps />
            </n-icon>
            <span text-md>{{ data?.address }}</span>
          </div>
        </n-space>
      </n-space>
      <n-space vertical px-2>
        <span text-lg>{{ $t('event.detail.introduction') }}</span>
        <span>{{ data?.descript }}</span>
      </n-space>
      <div px-6 pb-12>
        <n-button :loading="joinEventState.isPending" :disabled="joinEventState.isPending" round mt-12 w-full size="large" type="primary" @click="onClick">
          ￥{{ data?.fee }} - {{ $t('event.detail.signUp') }}
        </n-button>
      </div>
    </n-space>
  </common-page>
</template>
