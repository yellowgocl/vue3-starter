<script setup>
import EventDetailSkeleton from './Skeleton.vue'
import { useService } from '@/hooks'
import { event as EventUtil } from '@/utils'

const [getEvent, getEventState, getEventActions] = useService('event/detail')
const [getWhoJoined, getWhoJoinedState, getWhoJoinedActions] = useService('event/who-joined')
const [joinEvent, joinEventState] = useService('event/join')
const route = useRoute()
const { params } = route || {}
const result = computed(() => getEventState.value.result)
const data = computed(() => EventUtil.parseData(result?.value?.data))
const whoJoinedList = computed(() => getWhoJoinedState?.value?.result?.data)

onMounted(async () => {
  try {
    const eventId = params?.id
    await getEvent(null, { urlParams: eventId })
    await getWhoJoined(null, { urlParams: eventId })
  }
  catch (e) {
    console.error(e)
  }
})
onBeforeUnmount(async () => {
  await getEventActions?.cancel?.()
  await getWhoJoinedActions?.cancel?.()
})

async function onClick() {
  await joinEvent(null, { urlParams: params?.id })
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
          <n-collapse>
            <n-collapse-item title="参赛人员" name="1">
              <template #header-extra>
                <span text-lime-500 font-bold>({{ data?.joined }} <span>/</span> {{ data?.maximum }})</span>
              </template>
              <n-space size="small">
                <n-tag v-for="(item, index) in whoJoinedList" :key="`${item.name}-${index}`" round :bordered="false">
                  {{ item.name }}
                  <template #avatar>
                    <n-avatar :src="item.avatar" />
                  </template>
                </n-tag>
              </n-space>
            </n-collapse-item>
          </n-collapse>
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
